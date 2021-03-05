<template>
	<view>
		<view class="popup-content" v-if="classify=='电影'">
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
						<input placeholder="请输入名称" v-model="list.name"/>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox rate" slot="title">
						<view class="title">评分</view>
						<input placeholder="请输入评分" type="number" v-model="list.rate"/>
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
			<u-button type="success" class="submit" @click="submit">提交</u-button>
		</view>
		<view class="popup-content" v-else-if="classify=='图书'||classify=='小说'">
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
						<input placeholder="请输入名称" v-model="list.name"/>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" v-if="classify=='小说'">
					<view class="slotbox author" slot="title">
						<view class="title">作者</view>
						<input placeholder="请输入作者" v-model="list.author"/>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" v-if="classify!='小说'">
					<view class="slotbox rate" slot="title">
						<view class="title">评分</view>
						<input placeholder="请输入评分" type="number" v-model="list.rate"/>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox status" slot="title">
						<text class="title">状态</text>
						<picker @change="bindstatusPickerChange" :value="statusindex" :range="Astatus">
							<view class="status-text">{{Bstatus[statusindex]}}</view>
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
		props: {
			classify:{
				type: String,
				default:'电影'
			},
			title:{
				type: String,
				default:'添加记录'
			},
		},
		watch: {
			
		},
		data() {
			return {
				statusindex: 0,
				Astatus: ['已看完', '我想看'],
				Bstatus: ['阅读中', '我想看', '已读完'],
				list:[]
			};
		},
		methods: {
			bindstatusPickerChange(e) {
				this.statusindex = e.detail.value
			},
			submit(){
				if(this.title=='添加记录'){
					console.log(true);
					this.list.classify = this.classify
					if(this.classify=='电影'){
						this.list.status = this.Astatus[this.statusindex]
					}else{
						this.list.status = this.Bstatus[this.statusindex]
					}
					this.$api.add_list({
						name: this.list.name,
						rate: this.list.rate,
						classify: this.list.classify, 
						status: this.list.status,
						author: this.list.author,
					}).then(res => {
						console.log(res);
					})
					uni.showToast({
						title:'成功添加一条记录',
					})
					let _this = this
					setTimeout(function() {
						_this.list = []
						location.reload()
					}, 1500)
				}
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

			.status-text,
			.classify-text {
				color: $uni-color-primary;
				font-size: 16px;
				width: 150px;
			}
		}

	}

	
</style>
