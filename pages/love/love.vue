<template>
	<view>
		<view class="wrap">
			<u-navbar :is-back="false" title="爱情" height="44" title-color="#000" titleBold>
				<!-- #ifndef MP-WEIXIN -->
				<u-icon name="plus-circle" slot="right" class="icon" @click="open"></u-icon>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<u-icon name="plus-circle" class="icon" @click="open"></u-icon>
				<!-- #endif -->
			</u-navbar>
			<view class="u-tabs-box">
				<u-tabs-swiper ref="uTabs" :list="tabList" :current="current" @change="tabsChange" :is-scroll="false"></u-tabs-swiper>
			</view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper-box" :style="{height:windowHeight + 'px'}">
				<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="item.name">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="loadmore">
						<love-card :item="item" v-for="(item,index1) in listCatchData[index]" :key="index1">{{index1+1}}．</love-card>
						<uni-load-more iconType="snow" :status="load[index].loading" v-if="listCatchData[index]==undefined || listCatchData[index].length>10" class="loadmore"></uni-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
			<uni-popup ref="popup" type="center" :maskClick="true">
				<pop-love :classify="tabList[current].name" title="添加记录">
				</pop-love>
			</uni-popup>
		</view>
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
				tabList: [{
					name: '观影'
				}, {
					name: '纪念'
				}, {
					name: '旅行'
				}, {
					name: '记录'
				}],
				current: 0, 
				windowHeight:573,
				statusBarHeight:20,
				swiperCurrent: 0, 
				listCatchData: {},
				load: [{
					loading: 'loading'
				},{
					loading: 'loading'
				},{
					loading: 'loading'
				},{
					loading: 'loading'
				}],
				pageSize: 20,
			};
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			loadmore() {
				if (this.load[this.current].loading === 'noMore') return
				this.load[this.current].page++
				this.getList(this.current)
			},
			getList(current) {
				if (this.load[current].page==undefined) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_love({
					name: this.tabList[current].name,
					username:uni.getStorageSync('username'),
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res.data);
					const {
						data
					} = res
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					oldList.sort(function(a,b){
						return b.date < a.date ? 1 : -1
					})
					// 懒加载
					this.$set(this.listCatchData, current, oldList)
				})
				this.$forceUpdate()
			}
		},
		onLoad() {
			loginRes = this.checkLogin('../index/index', 2)
				if (loginRes) {
					this.getList(0)
					const info = uni.getSystemInfoSync()
					this.statusBarHeight = info.statusBarHeight
					this.windowHeight = info.windowHeight - uni.upx2px(80) - 44
					// #ifdef MP-WEIXIN
					this.windowHeight = this.windowHeight - this.statusBarHeight
					// #endif
					
					let _this = this
					uni.$on('reload',function(data){
						if(data){
							_this.listCatchData = {}
							_this.getList(_this.current)
							_this.$forceUpdate()
						}
					})
				} else {
					return;
				}
			
			}
	};
</script>

<style lang="scss">
	.icon {
		margin: 0 15px;
		font-size: 22px;
	}
	page {
		height: 100%;
		background-color: #f2f2f2;
		overflow: hidden;
	}
	.submit {
		margin-top: 10px;
	}
	.wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		// flex: 1;
		height: 100%;
	}
	.swiper-box {
		// margin: 5px 0;
		flex: 1;
		.swiper-item {
			height: 100%;
		}
	}
	
	.item {
		box-sizing: border-box;
	}
</style>
