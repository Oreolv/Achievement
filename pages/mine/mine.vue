<template>
	<view>
		<u-navbar :is-back="false" title="个人" :background="background" title-color="#000" titleBold></u-navbar>
		
		<button type="default" @click="login">注册</button>
		<button type="default" @click="logon">登录</button>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#fcfcfc'
				},
			}
		},
		methods: {
			login(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			logon(){
				uni.navigateTo({
					url:'../logon/logon'
				})
			}
		}
	}
</script>

<style>

</style>
