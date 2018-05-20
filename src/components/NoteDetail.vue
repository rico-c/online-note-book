<template>
	<div id="note" class="detail">
		<note-sidebar :curNote="curNote" @update:notes="val=>{notes=val}" ></note-sidebar>
		<div class="note-detail">
		<!-- 通过curnote的id来判断是否有笔记，因为判断对象是否为空麻烦 -->
			<div class="note-empty" v-show="!curNote.id">请选择笔记</div>
			<div v-show="curNote.id">
				<div class="note-bar">
					<span>创建日期：{{curNote.createdAtFriendly}}</span>
					<span>更新日期：{{curNote.updatedAtFriendly}}</span>
					<span>{{statusText}}</span>
					<span class="iconfont icon-delete" @click="deleteNote"></span>
					<span class="iconfont icon-fullscreen"></span>
				</div>
				<div class="note-title">
					<input type="text" v-model:value="curNote.title" placeholder="请输入标题" @input="updateNote" @keydown="statusText='正在输入...'">
				</div>
				<div class="editor">
					<textarea v-show="true" v-model:value="curNote.content" placeholder="请输入内容，支持markdown" @input="updateNote" @keydown="statusText='正在输入...'"></textarea>
					<div class="preview markdown-body" v-html="" v-show="false"></div>			
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Auth from '@/apis/auth'
// NoteSidebar是NoteDetail的子组件，在这里注册并引入、使用
import NoteSidebar from '@/components/NoteSidebar'
import Bus from '@/helpers/bus'
import _ from 'lodash'
import Notes from '@/apis/notes'

	export default{
		components:{
			NoteSidebar
		},
		data() {
			return{
				curNote:{},
				notes:[],
				statusText:'笔记未改动'
			}
		},
		created(){
			Auth.getInfo()
				.then(res=>{
					if(!res.isLogin){
						this.$router.push({path:'/login'})
					}
				})
			// ？？？
			Bus.$once('update:notes',val=>{
				this.curNote = val.find(note=>note.id == this.$route.query.noteId)||{}
			})

		},
		methods:{
			// 连续输入延迟发送请求
			updateNote:_.debounce(function(){
				console.log('延迟发送')
				Notes.updateNote({noteId:this.curNote.id},{title:this.curNote.title,content:this.curNote.content})
					.then(data=>{
						this.statusText='已保存'
					}).catch(
					data=>{
						this.statusText='保存出错'
					})
			},300),
			deleteNote(){
				Notes.deleteNote({noteId:this.curNote.id})
					.then(data=>{
						this.$message(data.msg)
						// 实时显示
						this.notes.splice(this.notes.indexOf(this.curNote),1)
						// 路由退回到选择界面
						this.$router.replace({path:'/note'})
					})
			}
		},
		// 路由守卫，组件内变化监控
		beforeRouteUpdate(to,from,next){
			console.log(to,from)
			// 如果查找不到则为空对象
			this.curNote = this.notes.find(note=>note.id == to.query.noteId) || {}
			next()
		}
	}
</script>
<style lang="less"> 
	.note-empty{
		font-size:50px;
		color:#ccc;
		text-align:center;
		margin-top:25%;
	}
	#note{
		display:flex;
		align-items: stretch;
		background-color:#fff;
		flex:1;
	}
	.note-detail{
		flex:1;
		display:flex;
		flex-direction: column;

		.note-bar{
			padding:4px 20px;
			border-bottom:1px solid #eee;
			&:after{
				content:'';
				display:block;
				clear:both;
			}
			span{
				font-size:12px;
				color:#999;
				margin-right:4px;
			}
			.iconfont{
				float:right;
				margin-left:4px;
				font-size:18px;
				cursor:pointer;
			}
		}
		.note-title{
			input,span{
				display:inline-block;
				width:100%;
				border:none;
				outline:none;
				font-size:18px;
				padding:10px 20px;
			}
		}
		.editor{
			flex:1;
			position:relative;
		}
		textarea,.preview{
			position:absolute;
			width:100%;
			height:100%;
			padding:20px;
		}
		textarea{
			border:none;
			resize:none;
			outline:none;
			font-size:14px;
			font-family:'Monaco',courier,monospace;
		}
		code{
			color:#f66;
		}
	}
</style>