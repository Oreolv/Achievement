<template>
	<view class="scroll">
		<scroll-view class="list-scroll" scroll-y @scrolltolower="loadmore" :enable-flex="true">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
			width: 100%;
		}
	}
</style>
