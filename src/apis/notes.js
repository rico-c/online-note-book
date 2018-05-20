import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'
// 已经在baseURL.js中写好了基础URL这里只需要写后面的URL
const URL = {
	GET: '/notes/from/:notebookId',
	ADD: '/notes/to/:notebookId',
	UPDATE: '/notes/:noteId',
	DELETE:  '/notes/:noteId'
}

export default{
	getAll({notebookId}){
		return new Promise((resolve,reject)=>{
			request(URL.GET.replace(':notebookId',notebookId))
				.then(res=>{
					// map会返回一个新数组，不对原数组产生影响,foreach不会产生新数组，foreach返回undefined
					res.notes = res.data.map(note =>{
						note.createdAtFriendly = friendlyDate(note.createdAt)
						note.updatedAtFriendly = friendlyDate(note.updatedAt)
						// 返回带有友好日期的笔记本的笔记对象
						return note
					}).sort((note1,note2)=>{
						// 根据笔记的更新时间排序
						return note1.updatedAt < note2.updatedAt
					})
					resolve(res)
				}).catch(err=>{
					reject(err)
				})
		})
	},
	updateNote({noteId},{title,content}){
		return request(URL.UPDATE.replace(':noteId',noteId),'PATCH',{title,content})
	},
	deleteNote({noteId}){
		return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
	},
	addNote({notebookId},{title='',content=''} = {title:'',content:''}){
		return new Promise((resolve,reject)=>{
			request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
				.then(res=>{
					res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
					res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
					resolve(res)
				}).catch(err=>{
					reject(err)
				})
		})
	}
}