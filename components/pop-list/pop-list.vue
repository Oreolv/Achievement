<template>
	<view>
		<view class="popup-content">
			<view class="pop-title">{{title}}</view>
			<u-cell-group :border="false" v-if="classify=='电影'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						</picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox name" slot="title">
						<view class="title">名称</view>
						<input placeholder="请输入名称" v-model="list.name" />
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox rate" slot="title">
						<view class="title">评分</view>
						<input placeholder="请输入评分" type="number" v-model="list.rate" />
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox status" slot="title">
						<text class="title">状态</text>
						<picker @change="bindstatusPickerChange" :value="statusindex" :range="Astatus">
							<view class="status-text">{{Astatus[statusindex]}}</view>
						</picker>
					</view>
				</u-cell-item>
			</u-cell-group>
			<u-cell-group :border="false" v-if="classify=='图书'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						</picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox name" slot="title">
						<view class="title">名称</view>
						<input placeholder="请输入名称" v-model="list.name" />
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox rate" slot="title">
						<view class="title">评分</view>
						<input placeholder="请输入评分" type="number" v-model="list.rate" />
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox status" slot="title">
						<text class="title">状态</text>
						<picker @change="bindstatusPickerChange" :value="statusindex" :range="Bstatus">
							<view class="status-text">{{Bstatus[statusindex]}}</view>
						</picker>
					</view>
				</u-cell-item>
			</u-cell-group>
			<u-cell-group :border="false" v-if="classify=='小说'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						</picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox name" slot="title">
						<view class="title">名称</view>
						<input placeholder="请输入名称" v-model="list.name" />
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox author" slot="title">
						<view class="title">作者</view>
						<input placeholder="请输入作者" v-model="list.author" />
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">

					<view class="slotbox status" slot="title">
						<text class="title">状态</text>
						<picker @change="bindstatusPickerChange" :value="statusindex" :range="Bstatus">
							<view class="status-text">{{Bstatus[statusindex]}}</view>
						</picker>
					</view>
				</u-cell-item>
			</u-cell-group>
			<u-cell-group :border="false" v-if="classify=='游戏'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						</picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox name" slot="title">
						<view class="title">名称</view>
						<input placeholder="请输入名称" v-model="list.name" />
					</view>
				</u-cell-item>

				<u-cell-item :arrow="false">
					<view class="slotbox status" slot="title">
						<text class="title">状态</text>
						<picker @change="bindstatusPickerChange" :value="statusindex" :range="Cstatus">
							<view class="status-text">{{Cstatus[statusindex]}}</view>
						</picker>
					</view>
				</u-cell-item>
			</u-cell-group>
			<u-button type="success" class="submit" @click="submit">提交</u-button>
		</view>

	</view>

</template>

<script>
	export default {
		inject: ['popup'],
		props: {
			classify: {
				type: String,
				default: '电影'
			},
			title: {
				type: String,
				default: '添加记录'
			},
			list: {
				type: Object,
				default () {
					return {};
				}
			},
		},
		data() {
			return {
				statusindex: 0,
				Astatus: ['已看完', '我想看'],
				Bstatus: ['阅读中', '我想看', '已读完'],
				Cstatus: ['已通关', '游戏中', '无限类'],
				newList: {}
			};
		},
		methods: {
			bindstatusPickerChange(e) {
				this.statusindex = e.detail.value
			},
			submit() {
				if (this.title == '添加记录') {
					if (this.classify == '电影') {
						this.newList.status = this.Astatus[this.statusindex]
					} else if (this.classify == '游戏') {
						this.newList.status = this.Cstatus[this.statusindex]
					} else {
						this.newList.status = this.Bstatus[this.statusindex]
					}
					uniCloud.callFunction({
						name: 'add_list',
						data: {
							username: uni.getStorageSync('username'),
							name: this.list.name,
							rate: this.list.rate,
							classify: this.classify,
							status: this.newList.status,
							author: this.list.author,
						},
						success(res) {
							// console.log(res);
						},
					})

					uni.showToast({
						title: '添加成功'
					})
					let _this = this
					setTimeout(function() {
						uni.$emit('reload', true)
						_this.popup.close()
					}, 1500)
				} else {
					if (this.classify == '电影') {
						this.newList.status = this.Astatus[this.statusindex]
					} else if (this.classify == '游戏') {
						this.newList.status = this.Cstatus[this.statusindex]
					} else {
						this.newList.status = this.Bstatus[this.statusindex]
					}
					this.$api.update_list({
						_id: this.list._id,
						name: this.list.name,
						rate: this.list.rate,
						classify: this.classify,
						status: this.newList.status,
						author: this.list.author,
					}).then(res => {
						console.log(res);
					})
					uni.showToast({
						title: '修改成功',
					})
					let _this = this
					setTimeout(function() {
						uni.$emit('reload', true)
						_this.popup.close()
					}, 1500)
				}
			},
		}
	}
</script>

<style lang="scss">
	.popup-content {
		padding: 20px;
		background-color: #FFF;
		border-radius: 20px;

		.submit {
			margin-top: 10px;
		}

		.pop-title {
			text-align: center;
			margin-bottom: 10px;
			font-weight: bold;
			font-size: 20px;
		}

		.slotbox {
			display: flex;
			align-items: center;

			input {
				font-size: 14px;
			}

			.title {
				margin-right: 15px;
				font-weight: bold;
				font-size: 16px;
			}

			.status-text,
			.classify-text {
				color: $uni-color-primary;
				font-size: 16px;
				width: 150px;
			}
		}

	}
</style>
