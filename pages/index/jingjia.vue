<template>
	<view class="back">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!--#endif-->
		<heads tab="0"></heads>
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<view class="primary_tabs">
			<view class="primary_tab">
				<view class="primary_option" :class="primary_tab_id==0?'primary_active':''" @click="all()">全部</view>
				<view class="primary_option" v-for="primary in primary_tab" :class="primary_tab_id==primary.id?'primary_active':''"
				 @click="primarys(primary.id)">
					{{primary.name}}
				</view>
			</view>
		</view>
		<view class="good_list">
			<view class="good_news" v-for="good in goods" @click="det(good.id)">
				<image class="good_image" :src="good.thumb"></image>
				<view class="good_new">
					<view class="good_title">{{good.title}}</view>
					<view>当前<text class="good_price">￥</text>{{good.currentPrice}}</view>
				</view>
			</view>
		</view>
		<bottomtabbar tags="1"></bottomtabbar>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	import heads from './top_tabbar';
	import bottomtabbar from 'pages/bottomtabbar/bottomtabbar';
	export default {
		data() {
			return {
				goods: [], //商品列表
				page: 1, //当前页码
				primary_tab_id: 0, //一级选项id
				primary_tab: [], //一级选项卡
				secondary_tab_id: 0, //二级选项id
				sort: 0, //排序规则，0默认，1升价，2降价
				tan: false, //提示
				message: '没有更多了',
				tans: 0,
			}
		},
		components: {
			heads,
			bottomtabbar
		},
		methods: {
			det(id) {
				uni.navigateTo({
					url: '../jingjiadetail/jingjiadetail?id=' + id
				})
			},
			primarys(id) {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.tans = 0;
				that.primary_tab_id = id;
				that.goods = '';
				server.getJSON(
					'/api/auction/get_list', {
						page: 1,
						span: 15,
						categoryId: that.primary_tab_id
					},
					function(res) {
						that.goods = res.data.list;
						uni.hideLoading();
					}
				);
				uni.hideLoading();
			},
			all() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.primary_tab_id = 0;
				that.goods = '';
				server.getJSON(
					'/api/auction/get_list', {
						page: 1,
						span: 15,
						sort: 0,
					},
					function(res) {
						that.goods = res.data.list;
						uni.hideLoading();
					}
				);
				uni.hideLoading();
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			let that = this;
			that.primary_tab = uni.getStorageSync('first');
			server.getJSON('/api/auction/get_list', {
					sort: 0,
					page: 1,
					span: 15,
				},
				function(res) {
					console.log(res)
					that.goods = res.data.list;
					uni.hideLoading();
				}
			);
		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this;
			that.tans = 0;
			that.page = 1;
			var data ={}
			if(that.primary_tab_id==0){
				data = {
					page: 1,
					span: 15,
					sort: 0,
				}
			}else{
				data = {
					page: 1,
					span: 15,
					sort: 0,
					categoryId: that.primary_tab_id
				}
			}
			server.getJSON(
				'/api/auction/get_list',data,res=>{
					if (res.data.list.length < 15) {
						that.tans = 1;
					}
					that.goods = res.data.list;
				}
			);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉数据
		onReachBottom() { //触底获取新的商品
			let that = this;
			if (that.tans != 1) {
				uni.showLoading({
					title: '加载中'
				});
				that.page += 1;
				var data ={}
				if(that.primary_tab_id==0){
					data = {
						page:that.page,
						span: 15,
						sort: 0,
					}
				}else{
					data = {
						page:that.page,
						span: 15,
						sort: 0,
						categoryId: that.primary_tab_id
					}
				}
				server.getJSON(
					'/api/auction/get_list',data,res=>{
						if (res.data.list.length < 15) {
							that.tans = 1;
						}
						if (res != null) {
							uni.hideLoading();
							let result = res.data.list;
							if (result.length > 0) {
								for (var i in result) {
									that.goods.push(result[i]);
								}
							}
						} else {
							setTimeout(function() {
								uni.hideLoading();
							}, 5000);
						}
					}
				);
			} else {
				that.tan = true;
				setTimeout(function() {
					that.tan = false;
				}, 1000)
			}
		},
	}
</script>

<style>
	.zhigou {
		width: 100%;
		height: 60rpx;
		position: relative;
		display: flex;
	}

	.primary_tabs {
		position: relative;
		width: 100%;
		height: 88rpx;
	}

	.primary_tab {
		width: 100%;
		height: 88rpx;
		position: fixed;
		background: white;
		align-items: center;
		flex-direction: row;
		padding: 0 20rpx;
		box-sizing: border-box;
		overflow: auto;
		white-space: nowrap;
		display: flex;
		align-items: center;
		z-index: 50;
	}

	.primary_option {
		padding: 10rpx 46rpx;
		border-radius: 40rpx;
		color: #2E2E2E;
		font-size: 28rpx;
		display: inline-block;
		background: #F5F5F5;
		margin-right: 20rpx;
	}

	.primary_active {
		background: #E4D1D2;
		color: #74181B;
	}

	.secondary_tab_active {
		color: #74181B;
	}

	.secondary_tab {
		height: 60rpx;
		width: 100%;
		color: #808080;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: fixed;
		z-index: 50;
		background: white;
		align-items: center;
	}

	.good_list {
		background: #F5F5F5;
		display: flex;
		flex-wrap: wrap;
		padding: 16rpx;
		box-sizing: border-box;
		justify-content: space-between;
		margin-bottom: 100rpx;
	}

	.good_news {
		width: 351rpx;
		height: 482rpx;
		background: white;
		flex-direction: column;
		margin-bottom: 20rpx;
	}

	.good_image {
		width: 100%;
		height: 351rpx;
	}

	.good_new {
		height: 131rpx;
		width: 100%;
		padding: 10rpx 10rpx 32rpx;
		font-size: 32rpx;
		box-sizing: border-box;
		color: #DD0812;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.good_title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		color: #1C0000;
	}

	.good_price {
		font-size: 26rpx;
	}
</style>
