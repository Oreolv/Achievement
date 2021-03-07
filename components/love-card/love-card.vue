<template>
	<view class="list-card" @click="open">
		<u-cell-group v-if="item.show==null">
			<u-swipe-action :options="options" @click="click" :key="item._id">
				<u-cell-item :arrow="false" v-if="item.classify==='观影'" class="cell movie">
					<view slot="title" class="list-card_box">
						<view class="index">
							<slot></slot>
						</view>
						<view class="name">{{item.name}}</view>
						<view class="time">
							<u-tag type="success" :text="item.date" mode="dark" />
						</view>
						<view class="tags">
							<u-tag type="warning" :text="item.des" v-if="item.des!=''" />
						</view>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" v-else-if="item.classify==='纪念'" :label="item.date" class="cell anniversary">
					<view class="title" slot="title">{{item.name}}已经</view>
					<view class="icons" slot="icon">
						<text class="iconfont icon-aixin"></text>
					</view>
					<view class="right-icon" slot="right-icon">
						<text class="days">{{item.days}}</text>
						<text>天</text>
					</view>
				</u-cell-item>
			</u-swipe-action>
		</u-cell-group>
		<uni-popup ref="popup" type="center" :maskClick="true">
			<pop-love :classify="item.classify" title="修改记录" :list="item"></pop-love>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				options: [{
						text: '修改',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
			};
		},
		methods: {
			open() {
				console.log(this.item._id);
			},
			click(index, index1) {
				if (index1 === 0) {
					this.$refs.popup.open()
				}
				if (index1 === 1) {
					this.$api.delete_love({
						_id: this.item._id,
					}).then(res => {
						console.log(res);
					})
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
					let _this = this
					setTimeout(function() {
						uni.$emit('reload', true)
					}, 1500)

				}
			},
		}

	}
</script>

<style lang="scss">
	@import '../../common/icon.css';

	.cell {
		&.movie {
			.list-card_box {
				display: flex;

				.index {
					width: 25px;
				}

				.name {
					margin: 0 8px;
					width: 20vh;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.time {
					white-space: nowrap;
					margin-right: 5px;
				}

				.tags {
					white-space: nowrap;
				}
			}
		}

		&.anniversary {
			.title {
				color: #000;
				font-weight: 500;
			}

			.icons {
				margin-right: 15px;
				color: red;
			}

			.right-icon {
				.days {
					color: $uni-color-error;
					font-weight: bold;
					font-size: 20px;
					margin-right: 5px;
				}
			}
		}
	}
</style>
