'use strict';
const db = uniCloud.database()
const cmd = db.command
exports.main = async (event, context) => {
	const {uid,name,page=1,pageSize=10} = event
	const list = await db.collection('list')
	.where({classify:cmd.eq(name),uid:uid})
	
	.orderBy('rate','asc')
	.skip(pageSize * (page - 1))
	.limit(pageSize)
	
	.get()
	
	let count = await db.collection('list').where({classify:cmd.eq(name),uid:uid}
	).count()
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data,
		count:count
	}
};
