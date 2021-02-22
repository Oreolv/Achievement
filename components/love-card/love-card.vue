<template>
	<view class="list-card" @click="open">
		<u-cell-group>
				<u-cell-item :arrow="false" v-if="item.classify==='观影'" class="cell movie">
					<view slot="title" class="list-card_box">
						<view class="index"><slot></slot></view>
						<view class="name">{{item.name}}</view>
						<view class="time">
							<u-tag type="success" :text="item.date" mode="dark"/>
						</view>
						<view class="tags">
							<u-tag type="warning" :text="item.des" v-if="item.des!=''"/>
						</view>
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" v-else-if="item.classify==='纪念'" 
				:label="item.date" class="cell anniversary">
				<view class="title" slot="title">{{item.name}}已经</view>
					<view class="icons" slot="icon">
						<text class="iconfont icon-aixin"></text>
					</view>
					<view class="right-icon" slot="right-icon">
						<text class="days">{{item.days}}</text>
						<text>天</text>
					</view>
				</u-cell-item>
		</u-cell-group>
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
			};
		},
		methods:{
			open(){
				console.log(this.item._id);
			}
		}
		
	}
</script>

<style lang="scss">
	@import '../../common/icon.css';
	.cell{
		&.movie{
			.list-card_box{
				display: flex;
				.index{
					width: 25px;
				}
				.name{
					margin: 0 8px;
					width: 20vh;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.time{
					white-space: nowrap;
					margin-right: 5px;
				}
				.tags{
					white-space: nowrap;
				}
			}
		}
		&.anniversary{
			.title{
				color: #000;
				font-weight: 500;
			}
			.icons{
				margin-right: 15px;
				color: red;
			}
			.right-icon{
				.days{
					color: $uni-color-error;
					font-weight: bold;
					font-size: 20px;
					margin-right: 5px;
				}
			}
		}
	}
</style>
