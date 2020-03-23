<template>
	<view>
		<view v-html="content">
			
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				content:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			uni.showLoading({
			    title: '加载中'
			});
			uni.setNavigationBarTitle({
				title:option.title
			});
			console.log(option)
			let that = this;
			server.getJSON('/api/article/detail?ajax=true',{
				id:option.id
			},res=>{
				that.content = res.data.content;
				console.log(res)
				uni.hideLoading();
			})
		}
	}
</script>

<style>

</style>
