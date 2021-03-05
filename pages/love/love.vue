<template>
	<view class="home">
		<u-navbar :is-back="false" title="爱情" :background="background" title-color="#000" titleBold>
			<u-icon name="plus" slot="right" class="plus-icon" size="20px" @click="open"></u-icon>
		</u-navbar>
		<tab :list="tabList" :tabIndex="tabIndex"  @tab="tab"></tab>
		<view class="home-list">
			<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
			<love :tab="tabList" :activeIndex="activeIndex" @change="change"></love>
			<uni-popup ref="popup" type="center" :maskClick="false">
					<view class="popup-content">
						<view class="pop-title">添加记录</view>
						<u-cell-group :border="false">
							<u-cell-item :arrow="false" >
								<view class="slotbox classify" slot="title">
									<text class="title">分类</text>
									<picker @change="bindclassifyPickerChange" :value="classifyindex" :range="classifyarray">
										<view class="classify-text">{{classifyarray[classifyindex]}}</view>
									</picker>
								</view>
							</u-cell-item>
							<u-cell-item :arrow="false" >
								<view class="slotbox name" slot="title">
									<view class="title">名称</view>
									<input placeholder="请输入名称" v-model="addLove.name" />
								</view>
							</u-cell-item>
							<u-cell-item :arrow="false" >
								<view class="slotbox date" slot="title">
									<view class="title">日期</view>
									<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="binddateChange">
										<view class="date-text">{{date}}</view>
									</picker>
								</view>
							</u-cell-item>
							<u-cell-item :arrow="false" v-if="showDes">
								<view class="slotbox des" slot="title">
									<view class="title">描述</view>
									<input placeholder="非必填"  v-model="addLove.des"/>
								</view>
							</u-cell-item>
							
						</u-cell-group>
						<view class="button">
							<u-button type="success" plain @click="add">提交</u-button>
							<u-button type="default" plain @click="close">取消</u-button>
						</view>
					</view>
			
				</uni-popup>
			</view>
		</view>
	</view>
</template>
<script>
	// easyCom components/组件名/组件名.vue 局部引入
	export default {
		
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				background: {
					backgroundColor: '#fcfcfc',
				},
				title: 'Hello',
				tabList: ['观影','纪念','旅行','检讨'],
				tabIndex:0,
				activeIndex:0,
				addLove:[],
				classifyarray: ['观影','纪念'],
				classifyindex: 0,
				date: currentDate,
				showDes: true,
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				navbarHeight: 44
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		watch: {
			classifyindex: function(val) {
				if (val === 1) {
					this.showDes = false
				}
			},
		},
		onLoad() {
			
		},
		methods: {
			change(current){
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：',current);
			},
			tab({data,index}){
				// console.log(data,index);
				this.activeIndex = index
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			bindclassifyPickerChange(e) {
				this.classifyindex = e.detail.value
			},
			binddateChange(e) {
				this.date = e.target.value
			},
			add(){
				this.addLove.classify = this.classifyarray[this.classifyindex]
				this.addLove.date = this.date
				this.$api.add_love({
					name: this.addLove.name,
					date: this.addLove.date,
					classify: this.addLove.classify,
					des: this.addLove.des
				}).then(res => {
					// console.log(res);
				})
				this.addLove = []
				this.$forceUpdate()
				this.$refs.popup.close()
				this.$refs.uTips.show({
								title: '成功添加一条数据',
								type: 'success',
								duration: '1500'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex:1;
			box-sizing: border-box;
		}
	}
	.plus-icon{
		margin-right: 20px;
		color: #000;
		padding-top: 5px;
	}
	.popup-content {
		padding: 20px;
		background-color: #FFF;
		border-radius: 20px;
		.pop-title{
			text-align: center;
			margin-bottom: 10px;
			font-weight: bold;
			font-size: 20px;
		}
		.slotbox{
			display: flex;
			align-items: center;
			input{
				font-size: 14px;
			}
			.title{
				margin-right: 15px;
				font-weight: bold;
				font-size: 16px;
			}
			.date-text,.classify-text{
				color: $uni-color-primary;
				font-size: 16px;
				width: 150px;
			}
		}
		.button{
			display: flex;
			margin-top: 15px;
		}
	}
</style>
