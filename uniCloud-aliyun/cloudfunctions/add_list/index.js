'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		username,
		name,
		rate,
		classify,
		status,
		author
	} = event
	var date = new Date();
	var month = date.getMonth()
	var nowTime = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate();
	const collection = db.collection('list')
	let data = collection.add({
		username:username,
		name: name,
		rate: rate,
		classify: classify,
		status: status,
		author: author,
		createTime: nowTime
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}

};
