<template>
	<div id="trash-detail">
		<h1>{{msg}}:{{$route.params.noteId}}</h1>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				msg:'回收站笔记详情'
			}
		}
	}
</script>
<style type="text/css" scoped>
	h1{
		color:blue;
	}
</style>