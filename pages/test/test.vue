<template>
	<view class="home">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="scroll">
			<scroll-view class="list-scroll" scroll-y>
				<view class="scroll-item" v-for="item in 100">{{item}}</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '待收货'
				}, {
					name: '待付款'
				}, {
					name: '待评价'
				}],
				current: 0
			};
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	};
</script>

<style lang="scss">
	//
	.scroll{
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		border: 1px red solid;
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	
	}
</style>
