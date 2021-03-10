<template>
	<view class="list-card">
		<view class="home-box" @longpress="showSheet">
			<u-action-sheet :list="sheetList" v-model="show" :tips="{text:item.name}" @click="clickSheet"></u-action-sheet>
			<view class="box movie" v-if="item.classify=='电影'">
				<view class="index">
					<slot></slot>
				</view>
				<view class="status">
					<u-tag v-show="item.status=='已看完'" type="success" text="已看完" size="mini" />
					<u-tag v-show="item.status=='我想看'" type="error" text="我想看" size="mini" />
				</view>
				<view class="name">{{item.name}}</view>
				<view class="rate">
					<uni-rate :size="16" v-model="item.rate/2" allow-half readonly activeColor="#F7BA2A" margin="5" />
					<view style="margin-left: 10px;">{{item.rate}}分</view>
				</view>
			</view>
			<view class="box book" v-if="item.classify=='图书'">
				<view class="index">
					<slot></slot>
				</view>
				<view class="status">
					<u-tag v-show="item.status=='阅读中'" type="primary" :text="item.status" size="mini" />
					<u-tag v-show="item.status=='已读完'" type="success" :text="item.status" size="mini" />
					<u-tag v-show="item.status=='我想看'" type="error" :text="item.status" size="mini" />
				</view>
				<view class="name">{{item.name}}</view>
				<view class="rate">
					<uni-rate :size="16" v-model="item.rate/2" allow-half readonly activeColor="#F7BA2A" margin="5" />
					<view style="margin-left: 10px;">{{item.rate}}分</view>
				</view>
			</view>
			<view class="box novel" v-if="item.classify=='小说'">
				<view class="index">
					<slot></slot>
				</view>
				<view class="status">
					<u-tag v-show="item.status=='阅读中'" type="primary" :text="item.status" size="mini" />
					<u-tag v-show="item.status=='已读完'" type="success" :text="item.status" size="mini" />
					<u-tag v-show="item.status=='我想看'" type="error" :text="item.status" size="mini" />
				</view>
				<view class="name">{{item.name}}</view>
			</view>
			<view class="box game" v-if="item.classify=='游戏'">
				<view class="index">
					<slot></slot>
				</view>
				<view class="status">
					<u-tag v-show="item.status=='游戏中'" type="primary" :text="item.status" size="mini" />
					<u-tag v-show="item.status=='已通关'" type="success" :text="item.status" size="mini" />
					<u-tag v-show="item.status=='无限类'" type="info" :text="item.status" size="mini" />
				</view>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
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
				sheetList:[{
					color: 'black',
					text: '修改',
				}, {
					color: 'red',
					text: '删除'
				}],
				show: false,
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
								// console.log(res);
							})
							uni.showToast({
								title: '删除成功'
							})
							let _this = this
							setTimeout(function() {
								uni.$emit('reload', true)
							}, 1500)
				}
			}
		}

	}
</script>

<style lang="scss">
	.home-box {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15px;
		border-bottom: 1px #ebeef5 solid;
		background-color: #FFF;
		&:first-child {
			border-top: 1px #ebeef5 solid;
		}
		
		.box{
			display: flex;
			width: 100%;
			.index {
				width: 50rpx;
				flex-direction: 0;
			}
			.name {
				margin: 0 8px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.rate {
				display: flex;
				align-items: center;
				white-space: nowrap;
				margin-left: auto;
			}
			.status {
				white-space: nowrap;
				display: flex;
			}
		}

		
	}
</style>
