'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {_id} = event
	const collection = db.collection('list')
	//返回数据给客户端
	const data  = await collection.doc(_id).remove()
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}
};
