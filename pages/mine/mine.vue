<template>
	<view>
		<u-navbar :is-back="false" title="个人" :background="background" title-color="#000" titleBold></u-navbar>
		<view class="face">
			<view class="face-box">
				<image src="../../static/male.jpg"></image>
			</view>
			<view class="face-box">
				<image src="../../static/female.jpg"></image>
			</view>
		</view>
		<view class="name">欣愉·兔仔</view>
		<view class="position">{{tianjin}}℃天津|重庆{{chongqing}}℃</view>
		<u-button @click="exit">退出登录</u-button>
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
				tianjin:0,
				chongqing:0
			}
		},
		methods: {
			exit(){
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
		// onLoad() {
		// 	this.$http.get('https://tianqiapi.com/api?version=v6&appid=64342745&appsecret=Ke8amAg3&city=天津').then(res => {
		// 		this.tianjin = res.body.tem1
		// 	})
		// 	this.$http.get('https://tianqiapi.com/api?version=v6&appid=64342745&appsecret=Ke8amAg3&city=重庆').then(res => {
		// 		this.chongqing = res.body.tem1
		// 	})
		// },
		
	}
</script>

<style lang="scss">
	.face{
		display: flex;
		justify-content: center;
		.face-box{
			width: 50px;
			height: 50px;
			overflow: hidden;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.name,.position{
		text-align: center;
	}
</style>
