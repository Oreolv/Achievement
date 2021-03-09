'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		username,
		avatar,
		name,
		date,
		classify,
		des,
		createTime,
		startDate,
		endDate,
		region
	} = event
	const collection = db.collection('love')
	let data = await collection.add({
		name: name,
		date: date,
		classify: classify,
		des: des,
		username:username,
		avatar:avatar,
		createTime:createTime,
		startDate:startDate,
		endDate:endDate,
		region:region
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}

};
