'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
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
		region,
		content
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
		region:region,
		content:content
	})
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}

};
