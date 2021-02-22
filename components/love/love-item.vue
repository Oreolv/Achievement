<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<love-card mode="base" :item="item" v-for="(item,index) in list" :key="item._id">{{index+1}}．</love-card>
		<uni-load-more v-if="list.length === 0 || list.length > 10" iconType="snow" :status="load.loading"></uni-load-more>
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
			}
		}
	}
</script>

<style>
	.list-scroll {
		height: 100%;
	}
</style>
