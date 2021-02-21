<template>
	<view class="list-card" @click="open">
		<u-cell-group>
				<u-cell-item>
					<view slot="title" class="list-card_box">
						
						<view class="name">{{item.name}}</view>
						<view class="rate"><u-rate active-color="#F7BA2A" disabled :value="item.rate/2"></u-rate>{{item.rate}}</view>
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
	.list-card_box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-shrink: 0;
		.name{
			margin:0 8px;
		}
	}
</style>
