<template>
	<div id="note-detail">
		<h1>{{msg}}:{{$route.params.noteId}}</h1>
	</div>
</template>
<script type="text/javascript">
import Auth from '@/apis/auth'
	export default{
		data() {
			return{
				msg:'笔记本详情页'
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
<style type="text/css" scoped>
	h1{
		color:blue;
	}
</style>