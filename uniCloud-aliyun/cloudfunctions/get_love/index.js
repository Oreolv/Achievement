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
	var startDay,nowDay,dateSpan,tempDate,iDays;
	var date = new Date();
	var month = date.getMonth()
	if(month<9){
		var nowTime = date.getFullYear()+'-0'+Number(date.getMonth()+1)+'-'+date.getDate();
	}else{
		var nowTime = date.getFullYear()+'-'+Number(date.getMonth()+1)+'-'+date.getDate();
	}
	
	if(name === '纪念'){
		for(var i=0;i<love.data.length;i++){
			startDay = Date.parse(love.data[i].date);
			nowDay = Date.parse(nowTime);
			// console.log(startDay);
			// console.log(nowDay);
			dateSpan = nowDay - startDay;
			iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
			console.log(iDays);
			love.data[i].days = iDays
		}
	}
	console.log(love.data);
	
	return {
		code:200,
		msg:'数据请求成功',
		data:love.data
	}
};
