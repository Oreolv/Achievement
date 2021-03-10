'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {_id,username,classify} = event
	const collection = db.collection('list')
	const countcollection = db.collection('uni-id-users')
	switch (classify) {
		case '电影':
			await countcollection.where({
				username: username
			}).update({
				count: {
					movie: dbCmd.inc(-1)
				}
			})
			break;
		case '图书':
			await countcollection.where({
				username: username
			}).update({
				count: {
					book: dbCmd.inc(-1)
				}
			})
			break;
		case '小说':
			await countcollection.where({
				username: username
			}).update({
				count: {
					novel: dbCmd.inc(-1)
				}
			})
			break;
		case '游戏':
			await countcollection.where({
				username: username
			}).update({
				count: {
					game: dbCmd.inc(-1)
				}
			})
			break;
	}
	
	const data  = await collection.doc(_id).remove()
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}
};
