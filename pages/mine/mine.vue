<template>
	<view class="u-skeleton">
		<view class="u-skeleton mine-box">
			<view class="header">
				<view class="u-skeleton-circle face">
					<image :src="avatar.mine"></image>
				</view>
				<view class="info">
					<view class="u-skeleton-rect username">
						{{username.mine}}
					</view>
					<view class="u-skeleton-rect des">{{des}}</view>
				</view>
				<view class="setting">
					<u-icon name="setting-fill"></u-icon>
				</view>
			</view>
			<u-line hair-line margin="10px"></u-line>
			<view class="u-skeleton-fillet classify">
				<view class="box">
					<view class="count">{{count.movie}}</view>
					<view class="name">电影</view>
				</view>
				<view class="box">
					<view class="count">{{count.book}}</view>
					<view class="name">图书</view>
				</view>
				<view class="box">
					<view class="count">{{count.novel}}</view>
					<view class="name">小说</view>
				</view>
				<view class="box">
					<view class="count">{{count.game}}</view>
					<view class="name">游戏</view>
				</view>
			</view>
		</view>
		<view class="u-skeleton love-box" >
			<view class="face-box">
				<view class="u-skeleton-circle face">
					<image :src="avatar.mine"></image>
				</view>
				<view class="u-skeleton-rect name">{{username.mine}}</view>
			</view>
			<u-icon name="heart-fill" color="#FFC0CB" class="love-icon"></u-icon>
			<view class="face-box">
				<view class="u-skeleton-circle face" >
					<image :src="avatar.couple"></image>
				</view>
				<view class="u-skeleton-rect name">{{username.couple}}</view>
			</view>
		</view>
		<view class="exit-box" @click="exit">
			退出当前账号
		</view>
		<u-skeleton :loading="loading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
	var loginRes;
	export default {
		data() {
			return {
				avatar: {},
				username: {mine:'skeleton',couple:'skeleton'},
				count: {book:0,movie:0,novel:0,travel:0,},
				des: 'skeleton',
				loading:true
			}
		},
		methods: {
			exit() {
				uni.clearStorageSync()
				uni.showToast({
					title: '退出成功',
					icon: 'none'
				})
				let _this = this
				setTimeout(function() {
					uni.redirectTo({
						url: '../login/login'
					})
				}, 1500)
			},
			getInfo(){
				let _this = this
				uniCloud.callFunction({
					name: 'user_info',
					data: {
						uid: uni.getStorageSync('uid')
					},
					success(res) {
						_this.count = res.result.userInfo.count
						_this.des = res.result.userInfo.des
					},
				})
			}

		},
		onLoad() {
			this.avatar.mine = uni.getStorageSync('avatar')
			this.avatar.couple = uni.getStorageSync('cpAvatar')
			this.username.mine = uni.getStorageSync('username')
			this.username.couple = uni.getStorageSync('cpUsername')
			this.getInfo()
			setTimeout(() => {
							this.loading = false;
						}, 1000)
		},
		onShow() {
			this.getInfo()
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
	}

	.mine-box {
		background-color: #FFF;

		.header {
			display: flex;
			margin-top: 10px;
			padding: 20px;
			padding-bottom: 0px;

			.face {
				width: 50px;
				height: 50px;
				overflow: hidden;
				border-radius: 50%;
				flex-shrink: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.info {
				display: flex;
				margin-left: 10px;
				flex-direction: column;
				justify-content: space-between;
				padding: 5px;
				width: 100%;

				.username {
					font-weight: bold;
				}

				.des {
					color: #999;
					font-size: 13px;
				}
			}

			.setting {
				margin: -10px;
			}


		}

		.classify {
			display: flex;
			justify-content: space-around;
			padding: 0 20px;

			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 10px;

				.name {
					font-size: 13px;
					color: #999;
				}

				.count {
					font-weight: bold;
				}
			}
		}
	}
	.love-box {
		background-color: #FFF;
		margin-top: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		.love-icon{
			margin-top: -25px;
		}
		.face-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.face {
				margin: 0 5px;
				width: 50px;
				height: 50px;
				overflow: hidden;
				border-radius: 50%;
				flex-shrink: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				margin-top: 10px;
			}

		}
	}

	.exit-box{
		margin-top: 10px;
		background-color: #FFF;
		color: red;
		padding: 10px;
		text-align: center;
		font-weight: 500;
	}
</style>
