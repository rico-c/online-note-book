// 用于生成组件可以直接调用的api来执行获取、更新、新增、删除笔记本的操作
// 使用export default时，对应的import语句不需要使用大括号
// 使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名
import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'

const URL = {
	GET: '/notebooks',
	ADD: '/notebooks',
	UPDATE: '/notebooks/:id',
	DELETE:  '/notebooks/:id'
}

export default{
	getAll(){
		// 这里需要都获取到的笔记本data进行处理，添加友好的创建时间并排序
		return new Promise((resolve,reject)=>{
			request(URL.GET)
				.then(res=>{
					// res.data为对象数组，通过比较其,createdAt值来对数组排序
					res.data = res.data.sort((notebook1,notebook2) => notebook1.createdAt < notebook2.createdAt)
					// forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
					// 为每个notebook添加friendlyCreatedAt属性
					// map会返回一个新数组，不对原数组产生影响,foreach不会产生新数组，foreach返回undefined
					res.data.forEach(notebook=>{
						notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
					})
					resolve(res)
				}).catch(err=>{
					reject(err)
				})
		})
	},
	// 在参数处写title的默认值，在return时可以直接写已经默认处理过的title
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