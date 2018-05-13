<template>
	<div id="note-detail">
		<h1>{{msg}}:{{$route.params.noteId}}</h1>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			msg:'笔记本详情页'
		}
	}	
}
</script>
<style type="text/css" scoped>
	h1{
		color:blue;
	}
</style>