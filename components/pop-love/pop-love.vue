<template>
	<view>
		<view class="popup-content">
			<view class="pop-title">{{title}}</view>
			<u-cell-group :border="false" v-if="classify=='观影'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						</picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox name" slot="title" >
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
				<u-cell-item :arrow="false">
					<view class="slotbox des" slot="title">
						<view class="title">描述</view>
						<input placeholder="非必填" v-model="list.des" />
					</view>
				</u-cell-item>
				
			</u-cell-group>
			<u-cell-group :border="false" v-if="classify=='纪念'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						</picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox name" slot="title" >
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
	
			</u-cell-group>
			<u-cell-group :border="false" v-if="classify=='旅行'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox date" slot="title">
						<view class="title">启程</view>
						<date-picker @getDate="getStartdate"></date-picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox date" slot="title">
						<view class="title">返程</view>
						<date-picker @getDate="getEnddate"></date-picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false">
					<view class="slotbox date" slot="title">
						<view class="title">地点</view>
						<u-picker mode="region" v-model="show" class="picker" :params="params" @confirm="confirm"></u-picker>
						<text @click="show = !show" class="region-text">{{region}}</text>
					</view>
				</u-cell-item>
			</u-cell-group>
			<u-cell-group :border="false" v-if="classify=='记录'">
				<u-cell-item :arrow="false">
					<view class="slotbox classify" slot="title">
						<text class="title">分类</text>
						<view class="classify-text">{{classify}}</view>
						</picker>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" title-width="500">
					<view class="slotbox des" slot="title">
						<view class="title">描述</view>
						<!-- <textarea class="textarea" placeholder="请输入内容"></textarea> -->
						<u-input v-model="list.des" type="textarea" class="textarea"/>
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
				date: '',
				show:false,
				params:{
					province: true,
					city: true,
					area: false
				},
				region:'选择城市',
				regionDate:{}
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
			confirm(e){
				if(e.city.label=='市辖区'){
					this.region = e.province.label
				}else{
					this.region = e.province.label + ' ' + e.city.label
				}
			},
			bindclassifyPickerChange(e) {
				this.classifyindex = e.detail.value
			},
			submit() {
				var date1 = new Date();
				if (this.title == '添加记录') {
					if(this.classify!='旅行'){
						this.region = undefined
					}
					this.$api.add_love({
						username:uni.getStorageSync('username'),
						avatar:uni.getStorageSync('avatar'),
						name: this.list.name,
						date: this.date,
						createTime:this.formatDate(date1.getTime()),
						classify: this.classify,
						des: this.list.des,
						startDate:this.regionDate.startDate,
						endDate:this.regionDate.endDate,
						region:this.region
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
			},
			getStartdate(date){
				this.regionDate.startDate = date
			},
			getEnddate(date){
				this.regionDate.endDate = date
			}
			
		}
	}
</script>

<style lang="scss">
	.picker{
		position: fixed;
		bottom: 50px;
	}
	.textarea{
		overflow: auto;
	}
	.popup-content {
		margin: 0 20px;
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
			&.des{
				// width: 100%;
			}
			input {
				font-size: 14px;
			}

			.title {
				margin-right: 15px;
				font-weight: bold;
				font-size: 16px;
				white-space: nowrap;
			}

			.date-text,
			.classify-text,
			.region-text{
				color: $uni-color-primary;
				font-size: 16px;
				width: 150px;
			}
		}
	}
</style>
