'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const cmd = db.command
exports.main = async (event, context) => {
	const {username,name,page=1,pageSize=10} = event
	const list = await db.collection('list')
	// .aggregate()
	// .match({
	// 	classify:name
	// })
	// .project({
	// 	_id: 0
	// })
	// // 要跳过多少数据
	.where({classify:cmd.eq(name),username:username})
	.orderBy('rate','asc')
	.skip(pageSize * (page - 1))
	.limit(pageSize)
	// .end()
	.get()
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:list.data
	}
};
