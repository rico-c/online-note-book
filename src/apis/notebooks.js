import request from '@/helpers/request'

const URL = {
	GET: '/notebooks',
	ADD: '/notebooks',
	UPDATE: '/notebooks/:id',
	DELETE:  '/notebooks/:id'
}

export default{
	getAll(){
		return request(URL.GET)
	},
	updateNotebook(notebookId,{title = ''} = { title :''}){
		return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title:title})
	},
	deleteNotebook(notebookId){
		return request(URL.DELETE.replace(':id',notebookId),'DELETE')
	},
	addNoteBook({title=''}={title:''}){
		return request(URL.ADD,'POST',{title:title})
	}
}