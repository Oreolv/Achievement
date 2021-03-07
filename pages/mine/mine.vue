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
		<view class="position">{{tianjin}}℃天津|重庆℃</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#fcfcfc'
				},
				tianjin:0
			}
		},
		methods: {
			getTem(city){
				const url = 'https://tianqiapi.com/api?version=v6&appid=64342745&appsecret=Ke8amAg3&city='+city
				this.$http.get(url).then(res => {
					console.log(res.body.tem1);
				  return res.body.tem1
				})
			}
		},
		onLoad() {
			this.tianjin = this.getTem('天津')
			console.log(this.getTem('天津'));
			// this.city.chongqing = this.getTem('重庆')
		}
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
</style>
