<template>
	<div class="detail" id="notebook-list">
		<header>
			<a href="#" class="btn" @click.stop.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
		</header>	
		<main>
			<div class="layout">
				<h3>笔记本列表({{notebooks.length}})</h3>
				<div class="book-list">
					<router-link v-for="notebook in notebooks" to="/note/1" class="notebook">
						<div>
							<span class="iconfont icon-notebook"></span>{{notebook.title}}
							<span>{{notebook.noteCounts}}</span>
							<span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
							<span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
							<span class="date">3天前</span>
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

	export default{
		data() {
			return{
				notebooks:[]
			}
		},
		created(){
			Auth.getInfo()
				.then(res=>{
					if(!res.isLogin){
						this.$router.push({path:'/login'})
					}
				})
			Notebooks.getAll()
				.then(res=>{
					this.notebooks = res.data
				})
		},
		methods:{
			onCreate(){
				let title = window.prompt('创建笔记')
				// .trim() 函数用于去除字符串两端的空白字符。
				if(title.trim() ===''){
					alert('不能为空')
					return
				}
				Notebooks.addNoteBook({title})
					.then(res=>{
						console.log(res)
						alert(res.msg)
						this.notebooks.unshift(res.data)
					})
			},
			onEdit(notebook){
				console.log('edit...')
				let title = window.prompt('修改',notebook.title)
				Notebooks.updateNotebook(notebook.id,{title})
					.then(res =>{
						console.log(res)
						alert(res.msg)
						notebook.title = title
					})
			},
			onDelete(notebook) {
				console.log('delete...')
				let isConfirm = window.confirm('你确定要删除？')
				if (isConfirm){
					Notebooks.deleteNotebook(notebook.id)
						.then(res =>{
							console.log(res)
							this.notebooks.splice(this.notebooks.indexOf(notebook),1)
						})
				}

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