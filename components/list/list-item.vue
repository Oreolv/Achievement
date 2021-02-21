<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<list-card :item="item" v-for="(item,index) in list" :key="item._id">{{index+1}}．</list-card>
		<uni-load-more v-if="list.length === 0 || list.length > 19" iconType="snow" :status="load.loading"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			load: {
				type: Object,
				default () {
					return {
						loading: "loading"
					}
				}
			}
		},
		methods: {
			loadmore() {
				this.$emit('loadmore')
			},
			open(){
				console.log(this.index);
			}
		}
	}
</script>

<style>
	.list-scroll {
		height: 100%;
	}
</style>
