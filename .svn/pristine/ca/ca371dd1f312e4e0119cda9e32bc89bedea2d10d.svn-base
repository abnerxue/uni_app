<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!--#endif-->
		<view class="head">
			<view class="search" @click="search()">
				<view class="search_view"><text class="iconfont icon-xia"></text>请输入搜索关键词</view>
			</view>
		</view>
		<view class="class_fy">
			<scroll-view class="sidebar" scroll-y="true" :style="{ 'height':scrollHeight }">
				<view class="sidebars" :style="{ 'height':scrollHeight }"> 
					<view :class="tag==index?'active':'sidebar_class'" v-for="(side,index) in sidebar_list" 
					 @click="leftTap(index)">{{side.name}}</view>
				</view>
			</scroll-view>
			<swiper class="class_list" :current="tag" :style="{ 'height':scrollHeight }" vertical="true" duration="300" @change="swiperChange">
				<swiper-item v-for="side in sidebar_list" class="class_lists" >
					<view class="emerald">{{side.name}}</view>
					<view class="good_list_title">
						<view class="good_title_images" v-for="emeralds in emerald[side.id]" @click="classlist(emeralds)">
							<image :src="emeralds.thumb" class="good_image"></image>
							<view>{{emeralds.name}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<bottomtabbar tags="3"></bottomtabbar>
	</view>
</template>

<script>
	import bottomtabbar from 'pages/bottomtabbar/bottomtabbar';
	const server = require('../../utils/server.js')
	export default {
		data() {
			return {
				tag: 0,
				sidebar_list: [], //侧边栏分类名称
				emerald: [],
				scrollHeight: ''
			}
		},
		components: {
			bottomtabbar
		},
		computed: {

		},
		onLoad() {
			let that = this;
			uni.getSystemInfo({
				success: (res) => {
					/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
					this.scrollHeight = res.windowHeight - 88 + 'px'
				}
			});
			that.sidebar_list = uni.getStorageSync('first'); //父级列表
			that.emerald = uni.getStorageSync('second'); //子级列表
			that.tag = 0;
			// server.getJSON('/goods/get_category', res => {
			// 	that.sidebar_list = res.data.first;
				
			// 	that.emerald = res.data.second;
			// 	console.log(res.data.second)
			// })
		},
		methods: {
			// 监听当前轮播
			swiperChange(e){
				this.tag =e.detail.current;
			},
			// 搜索
			search() {
				uni.navigateTo({
					url: '../index/search'
				})
			},
			leftTap(e) {
				this.tag = e;
			},
			classlist(categoryIds) {
				uni.navigateTo({
					url: './classfy_list?categoryId=' + categoryIds.id + '&fid=' + categoryIds.fid
				})
			}
		}
	}
</script>

<style>
	.search {
		position: fixed;
		height: 90rpx;
		width: 100%;
		background: white;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		box-shadow: 0 3px 15px #F5F5F5;
		z-index: 100;
	}

	.search_view {
		background: #F5F5F5;
		border-radius: 26rpx;
		color: #9A9A9A;
		font-size: 26rpx;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sidebar {
		width: 156rpx;
		/* height: 1206rpx; */
		position: relative;
	}

	.sidebars {
		position: fixed;
		width: 156rpx;
		/* height: 1206rpx; */
		background: #F5F5F5;
		display: flex;
		flex-direction: column;
		color: #1C0000;
		font-size: 28rpx;
	}

	.sidebar_class {
		width: 100%;
		height: 81rpx;
		line-height: 81rpx;
		text-align: center;
	}

	.active {
		width: 100%;
		height: 81rpx;
		line-height: 81rpx;
		text-align: center;
		background: #FFFFFF;
		color: #74181B;
	}

	.class_fy {
		display: flex;
	}

	.class_list {
		width: 80%;
	}

	.class_lists {
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		width: 100%;
		margin-bottom: 465px;
	}

	.good_list_title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 16rpx;
		box-sizing: border-box;
		flex-wrap: wrap;
	}

	.good_image {
		width: 100rpx;
		height: 100rpx;
	}

	.good_title_images {
		width: 132rpx;
		height: 156rpx;
		text-align: center;
		color: #2E2E2E;
		font-size: 26rpx;
		margin: 0 10rpx 30rpx;
	}

	/* 节点 */
	.emerald {
		width: 300rpx;
		height: 46rpx;
		font-size: 28rpx;
		color: #74181B;
		border-left: 3px solid #74181B;
		line-height: 46rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}

	.hetian_jade {
		width: 300rpx;
		height: 46rpx;
		font-size: 28rpx;
		color: #74181B;
		border-left: 3px solid #74181B;
		line-height: 46rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}
</style>
