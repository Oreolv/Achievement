<template>
	<view>
		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="binddateChange">
			<view class="date-text">{{date}}</view>
		</picker>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		created() {
			this.$emit('getDate',this.date)
		},
		methods:{
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			binddateChange(e) {
				this.date = e.target.value
				this.$emit('getDate',this.date)
			},
		}
	}
</script>

<style lang="scss">
	.date-text{
		color: $uni-color-primary;
	}
</style>
