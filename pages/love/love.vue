<template>
	<view class="home">
		<u-navbar :is-back="false" title="爱情" :background="background" title-color="#000" titleBold>
			<u-icon name="plus" slot="right" class="plus-icon" size="20px" @click="open"></u-icon>
		</u-navbar>
		<tab :list="tabList" :tabIndex="tabIndex"  @tab="tab"></tab>
		<view class="home-list">
			<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
			<love :tab="tabList" :activeIndex="activeIndex" @change="change"></love>
			<uni-popup ref="popup" type="center" :maskClick="true">
					<pop-love :classify="tabList[tabIndex]" title="添加记录"></pop-love>
			</uni-popup>
			</view>
		</view>
	</view>
</template>
<script>
	// easyCom components/组件名/组件名.vue 局部引入
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#fcfcfc',
				},
				title: 'Hello',
				tabList: ['观影','纪念','旅行','记录'],
				tabIndex:0,
				activeIndex:0,
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				navbarHeight: 44
			}
		},
onPullDownRefresh() {
			uni.$emit('reload',true)
			console.log("push");
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1500);
		},
		methods: {
			change(current){
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：',current);
			},
			tab({data,index}){
				// console.log(data,index);
				this.activeIndex = index
			},
			
			open() {
				this.$refs.popup.open()
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex:1;
			box-sizing: border-box;
		}
	}
	.plus-icon{
		margin-right: 20px;
		color: #000;
		padding-top: 5px;
	}
	
</style>
