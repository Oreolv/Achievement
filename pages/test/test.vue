<template>
	<view class="wrap">
	</view>
</template>
<script>
	const date = new Date()
	export default {
		created() {
			var nowTime = date.getFullYear()+'-'+Number(date.getMonth()+1)+'-'+date.getDate();
			
			
			var starTime = '2019-03-03';
			var endTime = '2021-02-22';
			
			console.log(endTime);
			console.log(nowTime);
			console.log(Date.parse(nowTime));
			console.log(Date.parse(endTime));
			// var Days = this.datedifference(endTime, starTime);
			// console.log(Days);
		},
		data() {
			return {
				
			};
		},
		methods: {
			datedifference(sDate1, sDate2) {
				var dateSpan,tempDate,iDays;
				// console.log(date.getTime());
				sDate1 = Date.parse(sDate1);
				sDate2 = Date.parse(sDate2);
				console.log(sDate1);
				dateSpan = sDate2 - sDate1;
				dateSpan = Math.abs(dateSpan);
				iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
				return iDays
			}
			
		}
	

	}
</script>
<style scoped lang="scss">

</style>
