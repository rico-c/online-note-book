// 用于生成组件可以直接调用的api来执行注册、登录、注销、查询数据的操作
import request from '@/helpers/request'
// 已经在baseURL.js中写好了基础URL这里只需要写后面的URL
const URL = {
	REGISTER: '/auth/register',
	LOGIN: '/auth/login',
	LOGOUT:'/auth/logout',
	// 判断用户是否登录
	GET_INFO:'/auth'
}
// 将完整的request请求封装好并依此命名为各个方法
export default{
	register({username,password}){
		return request(URL.REGISTER,'POST',{username,password})
	},
	login({username,password}){
		return request(URL.LOGIN,'POST',{username,password})
	},
	logout(){
		return request(URL.LOGOUT)
	},
	getInfo(){
		return request(URL.GET_INFO)
	}
}