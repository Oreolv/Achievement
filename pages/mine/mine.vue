<template>
	<view>
		<u-navbar :is-back="false" title="个人" :background="background" title-color="#000" titleBold></u-navbar>
		<view class="mine-box">
			<view class="header">
				<view class="face">
					<image :src="avatar.mine"></image>
				</view>
				<view class="info">
					<view class="username">
						{{username.mine}}
					</view>
					<view class="des">{{des}}</view>
				</view>
				<view class="setting">
					<uni-icons type="gear" size="20"></uni-icons>
				</view>
			</view>
			<u-line hair-line margin="10px"></u-line>
			<view class="classify">
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
		<view class="love-box">
			<view class="face-box">
				<view class="face">
					<image :src="avatar.mine"></image>
				</view>
				<view class="name">{{username.mine}}</view>
			</view>
			<u-icon name="heart-fill" color="#FFC0CB" class="love-icon"></u-icon>
			<view class="face-box">
				<view class="face">
					<image :src="avatar.cp"></image>
				</view>
				<view class="name">{{username.cp}}</view>
			</view>
		</view>
		<view class="exit-box" @click="exit">
			退出当前账号
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
				avatar: {},
				username: {},
				count: {},
				des: ''
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
			}

		},
		onLoad() {
			this.avatar.mine = uni.getStorageSync('avatar')
			this.avatar.cp = uni.getStorageSync('cpAvatar')
			this.username.mine = uni.getStorageSync('username')
			this.username.cp = uni.getStorageSync('cpUsername')
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
			
			// this.$http.get('https://tianqiapi.com/api?version=v6&appid=64342745&appsecret=Ke8amAg3&city=天津').then(res => {
			// 	this.tianjin = res.body.tem1
			// })
			// this.$http.get('https://tianqiapi.com/api?version=v6&appid=64342745&appsecret=Ke8amAg3&city=重庆').then(res => {
			// 	this.chongqing = res.body.tem1
			// })
		},

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
