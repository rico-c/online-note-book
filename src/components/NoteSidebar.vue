<template>
	<div class="note-sidebar">

		<span class="btn add-note" @click="addNote">添加笔记</span>
		<!-- elementUI组件 -->
		<el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
			<span class="el-dropdown-link">
				{{curBook.title}}<i class="iconfont icon-down"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-for="notebook in notebooks" :key="notebook.createdAt" :command="notebook.id">
					{{notebook.title}}
				</el-dropdown-item>
				<el-dropdown-item command="trash">回收站</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>

		<div class="menu">
			<div>更新时间</div>
			<div>标题</div>
		</div>

		<ul class="notes">
			<li v-for="note in notes">
			<!-- `${}`用法 -->
				<router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
					<span class="date">{{note.updatedAtFriendly}}</span>
					<span class="title">{{note.title}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import Notebooks from '@/apis/notebooks'
	import Notes from '@/apis/notes'
	import Bus from '@/helpers/bus'

	export default{
		created(){
			Notebooks.getAll()
				.then(res=>{
					this.notebooks = res.data
					this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId)
					// 可以自动显示第一个notebook
					|| this.notebooks[0] || {}
					return Notes.getAll({notebookId: this.curBook.id})
				}).then(res=>{
					this.notes = res.data
					this.$emit('update:notes',this.notes)
					Bus.$emit('update:notes',this.notes)
				})
		},

		props:['curNote'],

		data(){
			return{
				notebooks:[],
				notes:[],
				curBook:{}
			}
		},
		methods:{
			handleCommand(notebookId){
				
				if(notebookId == 'trash'){
					return this.$router.push({path:'/trash'})
				}
				this.curBook = this.notebooks.find(notebook => notebook.id == notebookId)
				Notes.getAll({notebookId})
					.then(res =>{
						this.notes = res.data
						this.$emit('update:notes',this.notes)
					})
			},
			addNote(){
				Notes.addNote({notebookId:this.curBook.id})
					.then(res=>{
						console.log(res)
						// 向数组的开头添加一个或更多元素，并返回新的长度。
						this.notes.unshift(res.data)	
					})
			}
		}
	}
</script>
<style type="text/css">
	.notes{
		height:100%;
	}
	.date,.title{
		width:150px;
		height:30px;
	}
	.note-sidebar{
		width:300px;
		background-color:#F8F6F8;
		text-align: center;
		border-right:0.5px solid grey;
		position:relative;
	}
	.add-note{
		position:absolute;
		right:10px;
		top:15px;
		cursor:pointer;
	}
	.notebook-title{
		width:100%;
		height:50px;
		line-height: 50px;

	}
	.el-dropdown-link{
		font-size: 18px;
		cursor:pointer;
	}
	.menu{
		width:100%;
		background-color:#EEEDEF;
		height:30px;
	}
	.menu div{
		display: inline-block;
		width:50%;
		float:left;
		border:0.5px solid grey;
		border-right:0px solid grey;
		height:30px;
		line-height: 30px;
	}
	.date,.title{
		line-height: 30px;
		display: inline-block;
		width:50%;
		float:left;
	}
</style>