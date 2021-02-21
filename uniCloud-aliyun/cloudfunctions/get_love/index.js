'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {name,page=1,pageSize=10} = event
	const love = await db.collection('love')
	.aggregate()
	.match({
		classify:name
	})
	.project({
		content: 0
	})
	// 要跳过多少数据
	.skip(pageSize * (page - 1))
	.limit(pageSize)
	.end()
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:love.data
	}
};
