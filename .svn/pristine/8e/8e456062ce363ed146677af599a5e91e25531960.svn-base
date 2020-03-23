<template>
	<view class="back">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<heads tab="2"></heads>
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<view class="primary_tabs">
			<view class="primary_tab">
				<view class="primary_option" :class="primary_tab_id==0?'primary_active':''" @click="alls()">全部</view>
				<view class="primary_option" v-for="primary in primary_tab" :class="primary_tab_id==primary.id?'primary_active':''"
				 @click="primarys(primary.id)">
					{{primary.name}}
				</view>
			</view>
		</view>
		<view class="zhigou">
			<view class="secondary_tab">
				<view :class="secondary_tab_ids==0?'secondary_tab_active':'secend'" @click="comprehensive()">综合</view>
				<view :class="secondary_tab_ids==1?'secondary_tab_active':'secend'" @click="price_sorting()">价格</view>
				<view :class="secondary_tab_ids==3?'secondary_tab_active':'secend'" @click="screening=true">筛选</view>
				
			</view>
		</view>
		<view class="screening" v-show="screening==true" @click="screening=false">
			<scroll-view class="screen" @click.native.stop scroll-y="true">
				<!-- #ifdef APP-PLUS -->
				<view class="status_bar">
					<view class="top_view"></view>
				</view>
				<!--#endif-->
				<view class="screens">
					<view class="titles" v-for="first in primary_tab">
						<view class="father_title" v-if="firsts||first.id==primary_tab_id">{{first.name}}</view>
						<view class="son_title" >
							<view class="son_titles" v-for="second in secondary_tab[first.id]" :class="second.id==secondary_tab_id?'second_active':''"  v-if="firsts||second.fid==primary_tab_id" @click="second_id(second)">{{second.name}}</view>
						</view>
					</view>
				</view>
				<view class="btns_quedin">
					<view class="btns_choze">重置</view>
					<view class="quedin" @click="xuanze()">确定</view>
				</view>
			</scroll-view>
		</view>
		<view class="wu" v-if="goods==null">暂无商品</view>
		<view class="good_list">
			<view class="good_news" v-for="good in goods" @click="del(good.gid)" >
				<image class="good_image" :src="good.thumb"></image>
				<view class="good_new">
					<view class="good_title">{{good.title}}</view>
					<view><text class="good_price">￥</text>{{good.price}}</view>
				</view>
			</view>
		</view>
		<bottomtabbar tags="1"></bottomtabbar>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	import heads from './top_tabbar.vue';
	import bottomtabbar from 'pages/bottomtabbar/bottomtabbar';
	export default {
		data() {
			return {
				goods: [], //商品列表
				page: 1,
				primary_tab_id: 0, //一级选项id
				primary_tab: [], //一级选项卡
				secondary_tab:[],//二级选项卡
				secondary_tab_id: 0, //二级选项id
				price_id:0,//0商品gid降序排序，1价格升序排序，2价格降序排序，3销量升序排序，4销量降序排序
				tan:false,//提示
				message:'没有更多了',
				screening:false,//筛选
				firsts:true,
				firsts_id:0,//父级id判断
				all:1,//全部
				secondary_tab_ids:0,//选中颜色
			}
		},
		components: {
			heads,
			bottomtabbar
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中'
			});
			let that = this;
			that.primary_tab = uni.getStorageSync('first');
			that.secondary_tab = uni.getStorageSync('second');
			server.postJSON('/api/goods/get', {
				span: 15,
				page: 1,
				sort: 0
			}, res => {
				that.goods = res.data.list;
				uni.hideLoading();
			})
		},
		methods: {
			//详情页
			del(gid) {
				uni.navigateTo({
					url: "/pages/product/product_details?gid=" + gid
				})
			},
			// 全部
			alls() {
				uni.showLoading({
				    title: '加载中'
				});
				let that = this;
				that.firsts = true;
				that.goods = '';
				that.all = 1;
				that.primary_tab_id = 0;
				that.secondary_tab_id = 0;
				server.getJSON(
					'/api/goods/get', {
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
			},
			// 分类
			primarys(id) {
				uni.showLoading({
				    title: '加载中'
				});
				let that = this;
				that.all = 0;
				that.secondary_tab_id = 0;
				that.firsts = false;
				that.primary_tab_id = id;
				that.goods = '';
				server.getJSON(
					'/api/goods/get', {
						page: 1,
						span: 15,
						sort: that.price_id,
						categoryId:that.primary_tab_id
					},
					function(res) {
						that.goods = res.data.list;
						uni.hideLoading();
					}
				);
				uni.hideLoading();
			},
			// 综合
			comprehensive() {
				uni.showLoading({
				    title: '加载中'
				});
				let that = this;
				that.tans = 0;
				that.goods = '';
				that.price_id =0;
				that.secondary_tab_ids =0;
				server.getJSON(
					'/api/goods/get', {
						page: 1,
						span: 15,
						sort: 0,
						categoryId:that.primary_tab_id
					},
					function(res) {
						that.goods = res.data.list;
						uni.hideLoading();
					}
				);
				uni.hideLoading();
			},
			// 价格排序
			price_sorting() {
				uni.showLoading({
				    title: '加载中'
				});
				let that = this;
				that.secondary_tab_ids =1;
				that.tans = 0;
				that.goods = '';  //清空商品列表
				if(that.price_id==0){  //排序
					that.price_id = 2;
				}
				if(that.price_id==1){
					that.price_id =2;
				}else if(that.price_id ==2){
					that.price_id =1;
				}
				if(that.secondary_tab_id==0){
					if(that.all == 1){
						server.getJSON(
							'/api/goods/get', {
								page: 1,
								span: 15,
								sort: that.price_id,//价格升序降序
							},
							function(res) {
								console.log(res)
								console.log(that.price_id)//价格升序降序
								that.goods = res.data.list;
								uni.hideLoading();
							}
						);
					}else{
						server.getJSON(
							'/api/goods/get', {
								page: 1,
								span: 15,
								sort: that.price_id,
								categoryId:that.primary_tab_id
							},
							function(res) {
								that.goods = res.data.list;
								uni.hideLoading();
							}
						);
					}
				}else{
					server.getJSON(
						'/api/goods/get', {
							page: 1,
							span: 15,
							sort: that.price_id,
							categoryId:that.secondary_tab_id
						},
						function(res) {
							that.goods = res.data.list;
							uni.hideLoading();
						}
					);
				}
			},
			// 筛选 子级 标题
			second_id(secon){
				let that = this;
				that.secondary_tab_id = secon.id;
				that.firsts_id = secon.fid;
			},
			// 筛选 子级 标题
			xuanze(){
				let that = this;
				that.all = 0;
				that.goods = '';
				that.screening = false;
				that.primary_tab_id = that.firsts_id;
				server.getJSON(
					'/api/goods/get', {
						page: 1,
						span: 15,
						sort: that.price_id,
						categoryId:that.secondary_tab_id,
					},
					function(res) {
						that.goods = res.data.list;
						uni.hideLoading();
					}
				);
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this;
			that.page = 1;
			if(that.secondary_tab_id==0){
				server.getJSON(
					'/api/goods/get', {
						page: 1,
						span: 15,
						sort: that.price_id,
						categoryId:that.primary_tab_id,
					},
					function(res) {
						that.goods = res.data.list;
					}
				);
			}else{
				server.getJSON(
					'/api/goods/get', {
						page: 1,
						span: 15,
						sort: that.price_id,
						categoryId:that.secondary_tab_id,
					},
					function(res) {
						that.goods = res.data.list;
					}
				);
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉数据
		onReachBottom() { //触底获取新的商品
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			that.page += 1;
			if(that.secondary_tab_id==0){
				if(that.all==1){
					server.getJSON(
						'/api/goods/get', {
							page: that.page,
							span: 15,
							sort: that.price_id,
						},
						function(res) {
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
				}else{
					server.getJSON(
						'/api/goods/get', {
							page: that.page,
							span: 15,
							sort: that.price_id,
							categoryId:that.primary_tab_id
						},
						function(res) {
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
				}
			}else{
				server.getJSON(
					'/api/goods/get', {
						page: that.page,
						span: 15,
						sort: that.price_id,
						categoryId:that.secondary_tab_id,
					},
					function(res) {
						if(res.data.list.length<15){
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
	.secend{
		color: #808080;
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
	
	.wu{
		height: 600rpx;
		width:100%;
		text-align: center;
		line-height: 600rpx;
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
		padding: 10rpx;
		font-size: 32rpx;
		box-sizing: border-box;
		color: #DD0812;
		display: flex;
		flex-direction: column;
	}
	
	.screening{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background: rgba(000,000,000,0.5);
		z-index: 77;
		display: flex;
		justify-content: flex-end;
	}
	.screen{
		width: 644rpx;
		height: 100%;
		background: white;
		padding:30rpx 30rpx 0;
		box-sizing: border-box;
		overflow: scroll;
	}
	.screens{
		margin-bottom: 88rpx;
	}
	.titles{
		font-size: 26rpx;
		color: #1C0000;
		margin-bottom: 20rpx;
	}
	.btns_quedin{
		width: 644rpx;
		position: fixed;
		bottom: 0;
		right: 0;
		height: 88rpx;
		display: flex;
	}
	.btns_choze{
		width: 50%;
		height: 100%;
		background: #E9E9E9;
		color: #808080;
		font-size: 32rpx;
		line-height: 88rpx;
		text-align: center;
	}
	.quedin{
		width: 50%;
		height: 100%;
		background: #74181B;
		color:white;
		font-size: 32rpx;line-height: 88rpx;
		text-align: center;
	}
	.father_title{
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	.son_title{
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.son_titles{
		width: 188rpx;
		height: 60rpx;
		border-radius: 40rpx;
		background: #F5F5F5;
		line-height: 60rpx;
		text-align: center;
		margin: 16rpx 0;
	}
	.second_active{
		background: #E4D1D2;
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
