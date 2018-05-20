<template>
	<div class="detail" id="notebook-list">
		<header>
			<a href="#" class="btn" @click.stop.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
		</header>	
		<main>
			<div class="layout">
				<h3>笔记本列表({{notebooks.length}})</h3>
				<div class="book-list">
				<!-- ：to  和es6的数据绑定写法 -->
					<router-link v-for="notebook in notebooks" :key="notebook.createdAt" :to="`/note?notebookId=${notebook.id}`" class="notebook">
						<div>
							<span class="iconfont icon-notebook"></span>{{notebook.title}}
							<span>{{notebook.noteCounts}}</span>
							<span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
							<span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
							<span class="date">{{notebook.friendlyCreatedAt}}</span>
						</div>
					</router-link>
				</div>
			</div>
		</main>
	</div>
</template>
<script type="text/javascript">
	import Auth from '@/apis/auth'
	import Notebooks from '@/apis/notebooks'
	import {friendlyDate} from '@/helpers/util'

	export default{
		data() {
			return{
				notebooks:[]
			}
		},
		created(){
			// 如果没登录则路由到登录页面
			Auth.getInfo()
				.then(res=>{
					if(!res.isLogin){
						this.$router.push({path:'/login'})
					}
				})
			// 获取笔记本列表并赋值给notebooks数组
			Notebooks.getAll()
				.then(res=>{
					this.notebooks = res.data
				})
		},
		methods:{
			onCreate(){
				// 饿了么UI组件
				this.$prompt('输入新笔记本标题', '创建笔记本', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPattern: /^.{1,30}$/,
		          inputErrorMessage: '标题不能为空，且不超过30个字符'
		        }).then(({value}) => {
		        	// 输入标题后,进入该then的value,并调用notebooks的添加笔记本API
		        	return Notebooks.addNoteBook({ title:value })
		        }).then(res=>{
						console.log(res)
						// 添加后实时在页面上显示而不需刷新，将友好时间添加到res后再进行页面的显示步骤
						res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
						this.notebooks.unshift(res.data)
						this.$message.success(res.msg)
		        })
			},
			onEdit(notebook){
				// 饿了么UI组件
				let title = ''
				this.$prompt('输入新笔记本标题', '修改笔记本', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPattern: /^.{1,30}$/,
		          inputValue:notebook.title,
		          inputErrorMessage: '标题不能为空，且不超过30个字符'
		        }).then(({value}) => {
		        	title = value
		        	return Notebooks.updateNotebook(notebook.id,{title})
		        }).then(res=>{
		        	// 实时将修改过的数据显示出来
					notebook.title = title
					this.$message.success(res.msg)	 
		        })
			},

			onDelete(notebook) {
				this.$confirm('确认要删除笔记本', '删除笔记本', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(()=>{
		        	return Notebooks.deleteNotebook(notebook.id)
		        }).then((res)=>{
		        	// 实时将修改过的数据显示出来
		        	this.notebooks.splice(this.notebooks.indexOf(notebook),1)
		        	this.$message.success(res.msg)
		        })
			}
		}
	}
</script>
<style type="text/css" lang="less" scoped>
	#notebook-list{
		flex:1;
		
		.iconfont{
			font-size:12px;
		}
		.btn{
			font-size:12px;
			color:#666;
			cursor:pointer;
			margin-left:10px;
		}
		.btn .iconfont{
			font-size:12px;
		}
		input{
			width:300px;
			height:30px;
			line-height:30px;
			border:1px solid #ccc;
			border-radius:3px;
			padding:3px 5px;
			outline:none;
		}
		header{
			padding:12px;
			border-bottom:1px solid #ccc;
		}
		main{
			padding:30px 40px;
		}
		.layout{
			max-width:966px;
			margin:0 auto;
		}
		main h3{
			font-size:12px;
			color:#000;
		}
		main .book-list{
			margin-top:10px;
			font-size:14px;
			color:#666;
			background-color:#fff;
			border-radius:4px;
			font-weight:bold;
		}
		main .book-list span{
			font-size:12px;
			font-weight:bold;
			color:#b3c0c8;
		}
		main .date,main .action{
			float:right;
			margin-left:10px;
		}
		main .iconfont{
			color:#1687ea;
			margin-right:4px;
			font-size:12px;
		}
		main .notebook{
			display:block;
			cursor:pointer;
		}
		main a.notebook:hover{
			background-color:#f7fafd;
		}
		main a.notebook div{
			border-bottom:1px solid #ebebeb;
			padding:12px 14px;
		}
		main .error-msg{
			font-size:12px;
			color:red;
		}
	}
</style>