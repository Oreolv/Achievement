<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<!-- 首页导航栏 -->
			<view class="navbar-content" :style="{height: navBarHeight+'px',width:windowWidth+'px'}" :class="{search:isSearch}" v-if="!normal">
				<!-- 返回图标 -->
				<view class="navbar-back_icon" v-if="isSearch" @click="backIndex">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<!-- 标题 -->
				<text class="navbar-title" :class="{jx:title === '首页'}">{{title}}</text>
				<!-- 首页框 -->
				<view class="navbar-search" @click="open" v-if="!isSearch">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">
						<text>请输入搜索内容</text>
					</view>
				</view>
				<!-- 搜索栏框 -->
				<view class="navbar-search" v-else="isSearch">
					<input class="navbar-search_text" type="text" placeholder="请输入搜索内容" />
				</view>
				<!-- 右侧图标 -->
				<view class="navbar-righticon">
					<view class="navbar-righticon_message" v-if="!isSearch">
						<uni-icons type="chat" size="26" color="#fff"></uni-icons>
					</view>
				</view>

			</view>
			
			<!-- 普通导航栏 -->
			<view class="navbar-content" :style="{height: navBarHeight+'px'}" v-else>
				<!-- <view class="navbar-back_icon" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view> -->
				<text class="navbar-title">{{title}}</text>
			</view>

		</view>
		
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			normal: {
				type: Boolean,
				default:true
			},
			isSearch:{
				type: Boolean,
				default:false
				}
		},
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 40,
				windowWidth: 375
			};
		},
		created() {
			const info = uni.getSystemInfoSync()
			// 状态栏高度
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const meunButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏高度
			this.navBarHeight = meunButtonInfo.bottom - info.statusBarHeight + meunButtonInfo.top - info.statusBarHeight
			// 胶囊的宽度
			this.windowWidth = meunButtonInfo.left
			// #endif
		},
		methods: {
			open() {
				if (this.index === 'search') return
				uni.navigateTo({
					url: '/pages/home-search/home-search',

				})
			},
			backIndex() {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed {
			width: 100%;
			background-color: $mk-base-color;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				// flex-wrap: wrap;

				.navbar-title {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					white-space: nowrap;
					font-weight: bold;

					&.jx {
						margin-left: 15px;
					}
				}
				.navbar-back_icon{
					// display: flex;
					// position: fixed;
					// left: 10px;
				}


				.navbar-search {
					display: flex;
					align-items: center;
					margin: 0 15px;
					width: 100%;
					height: 30px;
					background-color: #fff;
					border-radius: 30px;
					padding: 0 10px;

					.navbar-search_icon {
						display: flex;
						align-items: center;
						margin-right: 10px;
					}

					.navbar-search_text {
						font-size: 14px;
						color: #999;
						// text{
						// 	overflow: hidden;
						// 	text-overflow: ellipsis;
						// 	white-space: nowrap;
						// }


					}
				}

				&.search {
					.navbar-back_icon {
						
						margin-left: 10px;
					}

					.navbar-search {
						border-radius: 5px;
					}
				}

				.navbar-righticon {
					display: flex;

					justify-content: flex-end;

					.navbar-righticon_message {
						margin-right: 15px;
					}

				}

			}

		}
	}
</style>
