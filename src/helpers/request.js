// request 用来完成ajax功能，封装了promise/axios，提供了基础的axios请求的接口
import axios from 'axios'
import baseURLConfig from './config-baseURL'
// 独立引入饿了么UI的message部分
import {Message} from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
// 允许请求携带cookie
axios.defaults.withCredentials = true

export default function request(url,type = 'GET',data = {}){
	return new Promise((resolve,reject) => {
		// 设置option对象用于axios请求
		let option = {
			url,
			method:type,
			// axios选项，如果不满足200或400的状态码直接进入catch
			validateStatus(status){
				return(status >= 200 && status <300) || status === 400
			}
		}
		// 判断不同的请求方式get/post对应不同的属性值
		if(type.toLowerCase()==='get'){
			option.params = data
		}else{
			option.data = data
		}
		// 开始axios请求
		// then方法返回的是一个新的Promise实例
		axios(option).then(res => {
			// 通过axios的返回状态码来确定promise异步操作成功
			if(res.status===200){
				resolve(res.data)
			}else{
				// 调用饿了么UI弹框
				Message.error(res.data.msg)
				reject(res.data)
			}
		}).catch(err=>{
			Message.error('网络异常')
			reject({msg:'网络异常'})
		})
	})
}

