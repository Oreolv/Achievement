<template>
	<view class="list-card">
		
		<view class="list-card_box" @longpress="showSheet" @click="changeColor" @onmouseup="reColor" :style="{'background-color':clickColor}">
			<u-action-sheet :list="sheetList" v-model="show" :tips="{text:item.name}" @click="clickSheet"></u-action-sheet>
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
			<view class="rate" v-if="item.classify!='小说'&&item.classify!='游戏'">
				<uni-rate :size="16" v-model="item.rate/2" allow-half readonly activeColor="#F7BA2A" margin="5" />
				<view style="margin-left: 10px;">{{item.rate}}分</view>
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
					text: '修改',
				}, {
					color: 'red',
					text: '删除'
				}],
				show: false,
				clickColor:'#FFF'
			};
		},
		created() {

		},
		methods: {
			changeColor(){
				// this.clickColor = '#F3F4F6'
			},
			reColor(){
				this.clickColor = '#FFF'
			},
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
			}
		}

	}
</script>

<style lang="scss">
	.list-card_box {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 15px;
		border-bottom: 1px #ebeef5 solid;

		&:first-child {
			border-top: 1px #ebeef5 solid;
		}

		background-color: #FFF;

		.index {
			width: 120rpx;
		}

		.name {
			margin: 0 8px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			// width: 25vh;
			width: 60%;
		}

		.rate {
			display: flex;
			align-items: center;
			// width: 80%;
			white-space: nowrap;
		}

		.status {
			// width: 100%;
			white-space: nowrap;
			display: flex;
		}
	}
</style>
