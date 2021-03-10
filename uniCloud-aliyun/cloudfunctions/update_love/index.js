'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		_id,
		name,
		date,
		classify,
		des
	} = event
	const collection = db.collection('love')
	var dateN = new Date();
	var month = dateN.getMonth()
	var nowTime = dateN.getFullYear() + '-' + Number(dateN.getMonth() + 1) + '-' + dateN.getDate();
	const data = await collection.doc(_id).update({
		name: name,
		classify: classify,
		date: date,
		des: des,
		updateTime: nowTime
	})
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}
};
