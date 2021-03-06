<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change" disable-touch>
		<swiper-item v-for="(item ,index) in tab" :key="index" class="swiper-item">
			<list-scroll class="list-scroll" @loadmore="loadmore" v-if="listCatchData[index]!=undefined">
				<list-card :item="item" v-for="(item,index) in listCatchData[index]" :key="item._id">{{index+1}}．</list-card>
				<uni-load-more iconType="snow" :status="load[index].loading" v-if="listCatchData[index].length>19||listCatchData[index]==undefined"></uni-load-more>
			</list-scroll>
		</swiper-item>

	</swiper>

</template>

<script>
	export default {
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			},
			toReload: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			toReload(toReload) {
				console.log(1);
			}
		},
		data() {
			return {
				list: [],
				// js 的限制 listCatchData[index] = data
				listCatchData: {},
				load: {
					loading: "loading"
				},
				// load: {},
				pageSize: 20,
			};
		},
		watch: {
			tab(newVal) {
				console.log(newVal);
				if (newVal.length === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			},
		},
		// onLoad 在页面 ，created 组件
		created() {
			// TODO tab 还没有赋值
			this.getList(0)
			let _this = this
			uni.$on('reload',function(data){
				if(data){
					_this.listCatchData = {}
					_this.getList(_this.activeIndex)
				}
			})
		},
		methods: {
			loadmore() {
				if (this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				// TODO 当数据不存在 或者 长度是 0 的情况下，才去请求数据
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}

			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				// console.log('当前的页数',this.load[current].page);
				// console.log('name',this.tab[current]);
				this.$api.get_list({
					name: this.tab[current],
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					// console.log(res);
					const {
						data
					} = res
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					// 懒加载
					this.$set(this.listCatchData, current, oldList)
				})

			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;
		margin: 5px 0;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
