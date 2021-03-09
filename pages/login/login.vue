<template>
	<view class="login">
		<u-navbar :is-back="false" title="登录" :border-bottom="false" title-color="#000" titleBold></u-navbar>
		<view class="logo">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<view class="title-box">
			<view class="title">登录浮生</view>
			<view class="des">记录生活 游戏人间</view>
		</view>
		<view class="re">
			<u-input class="input" placeholder="请输入账号" height="80" v-model="username"></u-input>
			<u-input class="input" placeholder="请输入密码" height="80" type="password" v-model="password"></u-input>
			<u-button type="warning" shape="circle" class="loginB" @click="login">登录</u-button>
			<view class="between">没有账号？请注册</view>
			<u-button type="warning" shape="circle" class="register" @click="register" plain>注册</u-button>
		</view>
		<view class="bottom">
			<text>登录注册即表示同意</text>
			<text style="color: #2979FF;">用户协议、隐私条款</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#fcfcfc'
				},
				username: '',
				password: '',
			};
		},
		methods: {
			register() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			login() {
				uni.showToast({
					title: '加载中',
					icon: 'loading'
				})
				uniCloud.callFunction({
					name: 'login',
					data: {
						username: this.username,
						password: this.password
					},
					success(res) {
						if (res.result.code === 0) {
							console.log(res);
							uni.setStorageSync('token', res.result.token)
							uni.setStorageSync('username', res.result.username)
							uni.setStorageSync('avatar', res.result.userInfo.avatar)
							uni.setStorageSync('uid', res.result.uid)
							uni.setStorageSync('cpId', res.result.userInfo.cpId)
							uniCloud.callFunction({
								name: 'couple_info',
								data: {
									uid:res.result.userInfo.cpId
								},
								success(res) {
									console.log(res);
										uni.setStorageSync('cpAvatar', res.result.userInfo.avatar)
										uni.setStorageSync('cpUsername', res.result.userInfo.username)
								},
							})
							// 其他业务代码，如跳转到首页等
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
							let _this = this
							setTimeout(function() {
								uni.switchTab({
									url: '../index/index'
								});

							}, 1500)
						} else {
							uni.showToast({
								title: res.result.message,
								icon: 'none'
							})
						}
					},
					fail() {
						uni.showToast({
							title: '登录失败，请稍后再试',
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad(options) {
			this.op = options
		}
	}
</script>

<style lang="scss">
	page{
		overflow: auto;
	}
	.between {
		text-align: center;
		font-size: 12px;
		color: #999;
	}

	.title-box {
		text-align: center;
		margin-top: 20px;

		.title {
			font-weight: bold;
			font-size: 18px;
		}

		.des {
			margin-top: 5px;
			color: #999;
		}
	}

	.login {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.logo {
		width: 100px;
		height: 100px;
		margin-top: 30px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.re {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 20px;

		.input {
			margin-top: 10px;
			border-bottom: 1px #999 solid;
			padding: 5px;
		}

		.loginB {
			margin: 10px 0;
			margin-top: 20px;
			width: 100%;
		}

		.register {
			margin-top: 10px;
			width: 100%;
		}
	}

	.bottom {
		position: fixed;
		bottom: 20px;
		font-size: 12px;
	}
</style>
