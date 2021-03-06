<template>
	<view>
		<view class="popup-content">
			<view class="pop-title">{{title}}</view>
			<u-cell-group :border="false">
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
					<view class="slotbox date" slot="title">
						<view class="title">日期</view>
						<date-picker @getDate="getDate"></date-picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" v-if="classify=='观影'">
					<view class="slotbox des" slot="title">
						<view class="title">描述</view>
						<input placeholder="非必填" v-model="list.des" />
					</view>
				</u-cell-item>

			</u-cell-group>
			<view class="button">
				<u-button type="success" class="submit" @click="submit">提交</u-button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: ''
			};
		},
		inject: ['popup'],
		props: {
			classify: {
				type: String,
				default: '观影'
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
		methods: {
			bindclassifyPickerChange(e) {
				this.classifyindex = e.detail.value
			},
			submit() {
				if (this.title == '添加记录') {
					this.$api.add_love({
						name: this.list.name,
						date: this.date,
						classify: this.classify,
						des: this.list.des
					}).then(res => {
						console.log(res);
					})
					uni.showToast({
						title: '添加成功',
					})
					let _this = this
					setTimeout(function() {
						uni.$emit('reload', true)
						_this.popup.close()
					}, 1500)
				} else {
					this.$api.update_love({
						_id: this.list._id,
						name: this.list.name,
						date: this.date,
						classify: this.classify,
						des: this.list.des,
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
			getDate(date) {
				this.date = date
			}
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

			.date-text,
			.classify-text {
				color: $uni-color-primary;
				font-size: 16px;
				width: 150px;
			}
		}
	}
</style>
