<template>
	<div id="note" class="detail">
		<note-sidebar></note-sidebar>
		<div class="note-detail">
			<div class="note-bar">
				<!-- <span>创建日期：{{curNote.createdAtFriendly}}</span>
				<span>更新日期：{{curNote.updatedAtFriendly}}</span> -->
				<span>创建日期：{{curNote.createdAtFriendly}}</span>
				<span>更新日期：{{curNote.updatedAtFriendly}}</span>
				<span>已保存</span>
				<span class="iconfont icon-delete"></span>
				<span class="iconfont icon-fullscreen"></span>
			</div>
			<div class="note-title">
				<input type="text" :value="curNote.title" placeholder="请输入标题">
			</div>
			<div class="editor">
				<textarea v-show="true" :value="curNote.content" placeholder="请输入内容，支持markdown"></textarea>
				<div class="preview markdown-body" v-html="" v-show="false"></div>			
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Auth from '@/apis/auth'
import NoteSidebar from '@/components/NoteSidebar'

	export default{
		components:{
			NoteSidebar
		},
		data() {
			return{
				curNote:{
					title:'我的笔记',
					content:'我的笔记内容',
					createdAtFriendly:'一天前',
					updatedAtFriendly:'刚刚',
					stausText:'未更新'
				}
			}
		},
		created(){
			Auth.getInfo()
				.then(res=>{
					if(!res.isLogin){
						this.$router.push({path:'/login'})
					}
				})
	}}
</script>
<style lang="less"> 
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