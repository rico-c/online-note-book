export function friendlyDate(datStr){
	// 将日期字符串转为日期对象
	let dateObj = typeof datStr === 'object' ? datsStr :new Date(datStr)
	// getTime()方法可返回距1970的毫秒数。
	let time = dateObj.getTime()
	// 获取自1970来的累计毫秒数
	let now = Date.now()
	let space = now - time
	let str = ''
	// 表达式的值会与结构中的每个case 的值做比较。如果匹配则与该 case 关联的代码块会被执行
	switch(true){
		case space < 1000*60:
			str = '刚刚'
			break
		case space < 1000*3600:
		// 向下取整计算
			str = Math.floor(space/(1000*60)) + '分钟前'
			break
		case space < 1000*3600*24:
			str = Math.floor(space/(1000*3600))+'小时前'
			break
		default:
			str = Math.floor(space/(1000*3600*24))+'天前'
	}
	return str
}
