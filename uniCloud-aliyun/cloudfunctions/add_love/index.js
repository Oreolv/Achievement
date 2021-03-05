'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {name,date,classify,des} = event
		const collection = db.collection('love')
		let data = collection.add({
			name:name,
			date:date,
			classify:classify,
			des:des
		})
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:data
	}
	
};
