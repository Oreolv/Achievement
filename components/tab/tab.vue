<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll__box">
				<view v-for="(item, index) in list" :key="index" class="tab-scroll__item" :class="{active:activeIndex === index}"
				 @click="clickTab(item, index)">{{item}}
				 <!-- <view class="border"></view> -->
				 </view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		// 可以监听 data props 值的变化
		watch: {
			tabIndex(newVal) {
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods: {
			clickTab(item, index) {
				// console.log(item,index);
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index: index
				})
			},
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;
		margin-bottom: 5px;
		.tab-scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;

			.tab-scroll__box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				justify-content: space-between;
				padding: 0 10px;
				height: 40px;
				box-sizing: border-box;
				color: #999;
				.tab-scroll__item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
					.border{
						margin-top: 5px;
						}
					&.active {
						// color: #000;
						color: $uni-color-warning;
						font-weight: bold;
						.border{
							border-bottom: 2px #000 solid;
							margin: 0 4px;
							margin-top: 5px;
						}
					}
				}
			}

		}

	}
</style>
