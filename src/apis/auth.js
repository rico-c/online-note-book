import request from '@/helpers/request'

const URL = {
	REGISTER: '/auth/register',
	LOGIN: '/auth/login',
	LOGOUT:'/auth/logout',
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