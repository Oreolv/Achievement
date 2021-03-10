'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const cmd = db.command
exports.main = async (event, context) => {
	const {name,page=1,pageSize=10} = event
	const love = await db.collection('love')
	.where({classify:cmd.eq(name)})
	.orderBy('rate','asc')
	.skip(pageSize * (page - 1))
	.limit(pageSize)
	.get()
	var startDay,nowDay,dateSpan,tempDate,iDays;
	var date = new Date();
	var month = date.getMonth()
	var day = date.getDate()
	if(month<9){
		if(day<10){
			var nowTime = date.getFullYear()+'-0'+Number(date.getMonth()+1)+'-0'+date.getDate();
		}else{
			var nowTime = date.getFullYear()+'-0'+Number(date.getMonth()+1)+'-'+date.getDate();
		}
	}else{
		if(day<10){
			var nowTime = date.getFullYear()+'-'+Number(date.getMonth()+1)+'-0'+date.getDate();
		}else{
			var nowTime = date.getFullYear()+'-'+Number(date.getMonth()+1)+'-'+date.getDate();
		}
	}
	
	if(name === '纪念'){
		for(var i=0;i<love.data.length;i++){
			startDay = Date.parse(love.data[i].date);
			nowDay = Date.parse(nowTime);
			dateSpan = nowDay - startDay;
			iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
			love.data[i].days = iDays
		}
	}
	
	return {
		code:200,
		msg:'数据请求成功',
		data:love.data
	}
};
