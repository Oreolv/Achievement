<template>
	<view class="home">
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<u-toast ref="uToast" />
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	export default {
		data() {
			return {
				tabList: ['电影', '图书', '小说', '游戏'],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		onLoad() {

		},
		onReady() {
		},
		methods: {
			change(current) {
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：',current);
			},
			tab({
				data,
				index
			}) {
				console.log(data, index);
				this.activeIndex = index
			},

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
