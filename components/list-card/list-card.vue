<template>
	<view class="list-card" @click="open">
		<u-cell-group>
			<u-cell-item :arrow="false">
				<view slot="title" class="list-card_box">
					<view class="index"><slot></slot></view>
					<view class="status" v-if="item.classify==='电影'">
						<u-tag v-if="item.status" type="success" text="已看完" size="mini" />
						<u-tag v-else type="error" text="我想看" size="mini" />
					</view>
					<view class="status" v-else-if="item.classify==='图书'">
						<u-tag v-if="item.des==='阅读中'" type="primary" :text="item.des" size="mini"  />
						<u-tag v-else-if="item.des==='已读完'" type="success" :text="item.des" size="mini"  />
						<u-tag v-else type="error" :text="item.des" size="mini"  />
					</view>
					<view class="name">{{item.name}}</view>

					<view class="rate">
						<u-rate active-color="#F7BA2A" disabled :value="item.rate/2"></u-rate>
						<text>{{item.rate}}分</text>
					</view>

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
		methods: {
			open() {
				console.log(this.item._id);
			}
		}

	}
</script>

<style lang="scss">
	.list-card_box {
		width: 100%;
		display: flex;
		align-items: center;
		// border: 1px red solid;
		.index{
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
