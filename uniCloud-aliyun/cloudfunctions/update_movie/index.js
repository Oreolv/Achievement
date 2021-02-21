'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {name,rate} = event
	const collection = db.collection('movie');
	let res = await collection.add([{
	  name:name,
		rate:rate
	}])
	return event
};
