'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		_id,
		name,
		rate,
		classify,
		status,
		author
	} = event
	const collection = db.collection('list')
	var date = new Date();
	var month = date.getMonth()
	var nowTime = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate();
	const data  = await collection.doc(_id).update({
		name: name,
		rate: rate,
		classify: classify,
		status: status,
		author: author,
		updateTime: nowTime
	})
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}
};
