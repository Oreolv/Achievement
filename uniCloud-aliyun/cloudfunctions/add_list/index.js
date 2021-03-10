'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
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
	const countcollection = db.collection('uni-id-users')
	switch (classify) {
		case '电影':
			await countcollection.where({
				username: username
			}).update({
				count: {
					movie: dbCmd.inc(1)
				}
			})
			break;
		case '图书':
			await countcollection.where({
				username: username
			}).update({
				count: {
					book: dbCmd.inc(1)
				}
			})
			break;
		case '小说':
			await countcollection.where({
				username: username
			}).update({
				count: {
					novel: dbCmd.inc(1)
				}
			})
			break;
		case '游戏':
			await countcollection.where({
				username: username
			}).update({
				count: {
					game: dbCmd.inc(1)
				}
			})
			break;
	}
	
	const collection = db.collection('list')
	let data = await collection.add({
		username: username,
		name: name,
		rate: rate,
		classify: classify,
		status: status,
		author: author,
		createTime: nowTime
	})
	
	return {
		code: 200,
		msg: '数据请求成功',
		data: data
	}

};
