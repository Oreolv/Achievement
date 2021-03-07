<template>
	<view class="home">
		<u-navbar :is-back="false" title="首页" :background="background" title-color="#000" titleBold>
			<u-icon name="plus" slot="right" class="plus-icon" size="20px" @click="open"></u-icon>
		</u-navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
			<list :tab="tabList" :activeIndex="activeIndex" @change="change" :toReload="reload"></list>

		</view>
		<uni-popup ref="popup" type="center" :maskClick="true">
			<pop-list :classify="tabList[tabIndex]" title="添加记录">
			</pop-list>
		</uni-popup>

	</view>
</template>

<script>
	var loginRes;
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#fcfcfc'
				},
				tabList: ['电影', '图书', '小说', '游戏'],
				tabIndex: 0,
				activeIndex: 0,
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				navbarHeight: 44,
				reload: false
			}
		},
		watch: {},
		onShow() {
			loginRes = this.checkLogin('../index/index', 2)
			if (!loginRes) {
				return;
			}
		},
		onLoad() {
			loginRes = this.checkLogin('../index/index', 2)
			if (!loginRes) {
				return;
			}
		},
		onPullDownRefresh() {
			uni.$emit('reload', true)
			console.log("push");
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1500);
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
				// console.log(data, index);
				this.activeIndex = index
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
		},

	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.submit {
		margin-top: 10px;
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

	.plus-icon {
		margin-right: 20px;
		color: #000;
		padding-top: 5px;
		// background-color: $uni-color-warning;
		// padding: 3px;
		// border-radius: 50%;
	}
</style>
