<template>
	<view class="list-card">
		<u-cell-group v-if="item.show==null">
			<u-swipe-action :options="options" btn-width="200" @click="click" :key="item._id">
				<u-cell-item :arrow="false">
					<view slot="title" class="list-card_box">
						<view class="index">
							<slot></slot>
						</view>
						<view class="status" v-if="item.classify==='电影'">
							<u-tag v-if="item.status==='已看完'" type="success" text="已看完" size="mini" />
							<u-tag v-else type="error" text="我想看" size="mini" />
						</view>
						<view class="status" v-else-if="item.classify==='图书'||item.classify==='小说'">
							<u-tag v-if="item.status==='阅读中'" type="primary" :text="item.status" size="mini" />
							<u-tag v-else-if="item.status==='已读完'" type="success" :text="item.status" size="mini" />
							<u-tag v-else type="error" :text="item.status" size="mini" />
						</view>
						<view class="status" v-else-if="item.classify==='游戏'">
							<u-tag v-if="item.status==='游戏中'" type="primary" :text="item.status" size="mini" />
							<u-tag v-else-if="item.status==='已通关'" type="success" :text="item.status" size="mini" />
							<u-tag v-else type="info" :text="item.status" size="mini" />
						</view>
						<view class="name">{{item.name}}</view>
						<!-- <view class="author">{{item.author}}</view> -->
						<view class="rate" v-if="item.classify!='小说'&&item.classify!='游戏'">
							<u-rate active-color="#F7BA2A" disabled :value="item.rate/2"></u-rate>
							<text>{{item.rate}}分</text>
						</view>

					</view>
				</u-cell-item>
			</u-swipe-action>
		</u-cell-group>
		<uni-popup ref="popup" type="center" :maskClick="true">
			<pop-list :classify="item.classify" title="修改记录" :list="item"></pop-list>
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
		created() {

		},
		methods: {
			click(index, index1) {
				if (index1 === 0) {
					// console.log(this.item._id);
					this.$refs.popup.open()
				}
				if (index1 === 1) {
					this.$api.delete_list({
						_id: this.item._id,
						username:uni.getStorageSync('username'),
						classify:this.item.classify
					}).then(res => {
						console.log(res);
					})
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
					let _this = this
					setTimeout(function() {
						uni.$emit('reload',true)
					}, 1500)
				}
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		}

	}
</script>

<style lang="scss">
	.list-card_box {
		width: 100%;
		display: flex;
		align-items: center;

		// border: 1px red solid;
		.index {
			width: 25px;
		}

		.name {
			margin: 0 8px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			width: 33vh;
		}

		.rate {
			text {
				margin-left: 5px;
			}

			width: 100%;
		}

		.status {
			// width: 100%;
			white-space: nowrap;
			display: flex;
		}
	}
</style>
