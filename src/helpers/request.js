// request 用来完成ajax功能，封装了promise/axios
import axios from 'axios'
import baseURLConfig from './config-baseURL'
import {Message} from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
// 是否带cookie
axios.defaults.withCredentials = true

export default function request(url,type = 'GET',data = {}){
	return new Promise((resolve,reject) => {
		// 设置option对象
		let option = {
			url,
			method:type,
			validateStatus(status){
				return(status >= 200 && status <300) || status === 400
			}
		}
		// 判断不同的请求方式对应不同的属性值
		if(type.toLowerCase()==='get'){
			option.params = data
		}else{
			option.data = data
		}
		// 开始axios请求
		axios(option).then(res => {
			if(res.status===200){
				resolve(res.data)
			}else{
				Message.error(res.data.msg)
				// Message({
				// 	type:'error',
				// 	message:res.data.msg
				// })
				reject(res.data)
			}
		}).catch(err=>{
			Message({
					type:'error',
					message:'网络异常'
				})
			reject({msg:'网络异常'})
		})
	})
}

