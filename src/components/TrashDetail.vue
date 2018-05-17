<template>
	<div id="trash-detail">
		<h1>{{msg}}:{{$route.params.noteId}}</h1>
	</div>
</template>
<script type="text/javascript">
	import Auth from '@/apis/auth'
	export default{
		data() {
			return{
				msg:'回收站笔记详情'
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