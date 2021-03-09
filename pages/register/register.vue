<template>
	<view class="register">
		<u-navbar title="注册" :background="background" title-color="#000" titleBold></u-navbar>
		<view class="logo">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<!-- <view class="title-box">
			<view class="title">登录浮生</view>
			<view class="des">记录生活 游戏人间</view>
		</view> -->
		<view class="re">
			<u-input class="input" placeholder="请输入账号" height="80" v-model="username"></u-input>
			<u-input class="input" placeholder="请输入密码" height="80" type="password" v-model="password"></u-input>
			<u-button type="warning" shape="circle" class="register" @click="register">注册</u-button>
			<view class="between">已有账号？请登录</view>
			<u-button type="warning" shape="circle" class="login" @click="login" plain>登录</u-button>
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
			login() {
				uni.redirectTo({
					url: '../login/login'
				})
			},
			register() {
				uni.showToast({
					title: '加载中',
					icon: 'loading'
				})
				uniCloud.callFunction({
					name: 'register',
					data: {
						username: this.username,
						password: this.password
					},
					success(res) {
						if (res.result.code === 0) {
							uni.setStorageSync('uniIdToken', res.result.token)
							// 其他业务代码，如跳转到首页等
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							})
							setTimeout(function() {
								uni.redirectTo({
									url: '../login/login'
								})
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
							title: '注册失败，请稍后再试',
							icon: 'none'
						})
					}
				})
			}

		},
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

	.logo {
		width: 100px;
		height: 100px;
		margin-top: 30px;

		image {
			width: 100%;
			height: 100%;
		}
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

	.register {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
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

		.login {
			margin: 10px 0;
			width: 100%;
		}

		.register {
			margin: 10px 0;
			margin-top: 20px;
			width: 100%;
		}
	}

	.bottom {
		position: fixed;
		bottom: 20px;
		font-size: 12px;
	}
</style>
