<template>
	<view class="love-card" @click="open">
		<u-cell-group v-if="item.show==null">
				<u-cell-item :arrow="false" v-if="item.classify==='观影'" class="cell movie" @longpress="showSheet">
					<u-action-sheet :list="sheetList" v-model="show" :tips="{text:item.name}" @click="clickSheet"></u-action-sheet>
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
				<u-cell-item :arrow="false" v-else-if="item.classify==='纪念'" :label="item.date" class="cell anniversary" @longpress="showSheet">
					<u-action-sheet :list="sheetList" v-model="show" :tips="{text:item.name}" @click="clickSheet"></u-action-sheet>
					<view class="title" slot="title">{{item.name}}已经</view>
					<view class="icons" slot="icon">
						<text class="iconfont icon-aixin"></text>
					</view>
					<view class="right-icon" slot="right-icon">
						<text class="days">{{item.days}}</text>
						<text>天</text>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" v-else-if="item.classify==='记录'" class="cell record" @longpress="showSheet">
					<u-action-sheet :list="sheetList" v-model="show" :tips="{text:item.name}" @click="clickSheet"></u-action-sheet>
					<view slot="title" class="list-card_box">
						<view class="header">
							<view class="face">
								<image :src="item.avatar"></image>
							</view>
							<view class="info">
								<view class="username">{{item.username}}</view>
								<view class="time">{{item.createTime}}</view>
							</view>
						</view>
						<view class="content">
							{{item.des}}
						</view>
						
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" v-else="item.classify==='旅行'" class="cell travel" :label="item.startDate+'-'+item.endDate" @longpress="showSheet" >
					<u-action-sheet :list="sheetList" v-model="show" :tips="{text:item.name}" @click="clickSheet"></u-action-sheet>
					<view class="title" slot="title">{{item.region}}</view>
					<view class="icons" slot="icon">
						<text class="iconfont icon-diqiu"></text>
					</view>
				</u-cell-item>
				
			<!-- </u-swipe-action> -->
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
				sheetList:[{
					text: '修改',
				}, {
					color: 'red',
					text: '删除'
				}],
				show: false
			};
		},
		methods: {
			showSheet() {
				this.show = !this.show
			},
			clickSheet(e){
				if(e==0){
					this.$refs.popup.open()
				}else{
					this.$api.delete_list({
								_id: this.item._id,
								username: uni.getStorageSync('username'),
								classify: this.item.classify
							}).then(res => {
								console.log(res);
							})
							uni.showToast({
								title: '删除成功'
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
					width: 30rpx;
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

		&.record {
			// margin-bottom: 10px;
			.header {
				display: flex;
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
					width: 100%;

					.username {
						font-weight: bold;
					}

					.time {
						color: #999;
						font-size: 13px;
					}
				}
			}

			.content {
				margin-top: 10px;
				width: 100%;
			}

		}

		&.travel {
			.title {
				color: #000;
				font-weight: bold;
			}
			.iconfont {
				margin-right: 15px;
				font-size: 22px;
				color: #0F4C81;
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
