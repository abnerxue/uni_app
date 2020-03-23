<template>
	<view class="background">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<view class="search">
			<view class="headss">
				<view class="searchs">
					<image class="back-left" src="../../static/order/left.png" @click="btn()"></image>
					<view class="search-inputs">
						<image class="search-image" src="./../../static/search.jpg"></image>
						<input type="text" class="search-input1" v-model="val" />
					</view>
					<view class="search-fomnt" @click="search()">搜索</view>
				</view>
			<!-- 	<view class="tabbar">
					<view :class="tag == 0 ? 'active' : ''" @click="tag = 0">综合</view>
					<view :class="tag == 2 ? 'active' : ''" @click="tag = 2">价格</view>
					<view :class="tag == 3 ? 'active' : ''" @click="tag = 3">筛选</view>
				</view> -->
			</view>
		</view>
		<view class="search-list">
			<view class="commodity" v-for="(goodsList, goodsLists) in goodsList" @click="del(goodsList.gid)">
				<view class="commodity-iamges" >
					<image class="commodity-iamge" :src="goodsList.thumb"></image>
					<view class="xianshi" v-if="goodsList.activity==2">
						<view class="xianshimiaosha">限时秒杀</view>
						<view class="times"><uni-countdown class="example-body" :minute="0"  color="#FFFFFF" splitorColor="#FFFFFF" backgroundColor="#C2060C" :second="goodsList.timeRemaining" /></view>
					</view>
				</view>
				<view class="title-mony">
					<view class="title">{{ goodsList.title }}</view>
					<view class="momey" v-if="goodsList.activity==0">￥{{ goodsList.originalCost }}</view>
					<view class="acti" v-if="goodsList.activity==1">
						<view class="mones">
							<text class="price">￥{{goodsList.price}}</text>
							<text class="originalCost">￥{{goodsList.originalCost}}</text>
						</view>
						<button class="btn">去拼团</button>
					</view>
					<view class="acti" v-if="goodsList.activity==2">
						<view class="mones">
							<text class="price">￥{{goodsList.price}}</text>
							<text class="originalCost">￥{{goodsList.originalCost}}</text>
						</view>
						<button class="btn">去抢购</button>
					</view>
					<view v-if="goodsList.activity==4" class="scores">
						<view class="score">积分{{goodsList.score}}</view>
						<button class="btn">去兑换</button>
					</view>
				</view>
			</view>
		</view>
		<view class="null" v-if="goodsList==null"><image src="../../static/search.png" class="search-null"></image><view class="myzhaodao">没有找到相关的商品</view></view>
	</view>
</template>

<script>
const server = require('../../utils/server');
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
export default {
	data() {
		return {
			tag: 0,
			goodsList: [],
			totalPage: 0,
			val: '',
			page:1,
			requireDtae: {
				ajax: 'true',
				span: 15,
				page: 1,
			},
			requireUrl:"/search.html",
			buttonLoading:true,
		};
	},
	components: {
		uniCountdown, 
	},
	methods: {
		btn() {
			uni.navigateBack({
				delta:1
			})
		},
		del(gid){
			uni.navigateTo({
				url:'../product/product_details?gid='+gid
			})
		},
		search() {
			let that = this;
			uni.showLoading({
			    title: '加载中'
			});
			server.getJSON(
				'/search.html',
				{
					page: 1, 
					span: 15,
					ajax: 'true',
					keyword: that.val
				},
				function(res) {
					console.log(res)
					that.goodsList = res.data.list;
					uni.hideLoading();
				}
			);
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		let that = this;
		that.page=1; 
		server.getJSON(
			'/search.html',
			{
				page: 1,
				span: 15,
				ajax: 'true',
				keyword: that.val
			},
			function(res) {
				that.goodsList = res.data.list;
			}
		);
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
		that.requireDtae.val = that.val;
		server.getJSON(
			'/search.html',
			{
				page: that.page,
				span: 15,
				ajax: 'true',
				keyword: that.val
			},
			function(res) {
				if(res!=null){
					 uni.hideLoading();
					 let result = res.data.list;
					 if (result.length > 0) {
					 	for (var i in result) {
					 		that.goodsList.push(result[i]);
					 	}
					 }
				}else{
					setTimeout(function() {
						uni.hideLoading();
					}, 5000);
				}
			}
		);
	},
};
</script>

<style>
uni-page-body,
uni-page-refresh {
	height: 100%;
}
.background {
	background: #f5f5f5;
	min-height: 100%;
}
.search {
	position: relative;
	width: 100%;
	height: 110rpx;
	z-index: 5;
}
.search-fomnt {
	font-size:30rpx;
	color: #7d272a;
}

.search-inputs {
	width: 520rpx;
	height: 48rpx;
	border-radius: 30rpx;
	background: #f5f5f5;
	color: #a2a2a2;
	display: flex;
	align-items: center;
	padding-left: 40rpx;
}
.search-image {
	width: 30rpx;
	height: 30rpx;
	margin-right: 20rpx;
}
.search-input1{
	width: 430rpx;
	font-size: 26rpx;
}
.headss {
	position: fixed;
	width: 100%;
}
.searchs {
	display: flex;
	justify-content: space-between;
	padding: 20rpx;
	background: white;
	width: 100%;
	box-sizing: border-box;
	align-items: center;
}
.search-input {
	background: #f5f5f5;
	width: 560rpx;
	border-radius: 30rpx;
}
.back-left {
	width: 50rpx;
	height: 50rpx;
}
.tabbar {
	position: fixed;
	background: white;
	box-sizing: border-box;
	padding: 0 40rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	font-size: 30rpx;
	height: 70rpx;
	color: #b2b2b2;
}
.active {
	color: #7d272a;
}
.search-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 18rpx;
}
.commodity {
	width: 350rpx;
	height: 520rpx;
	border-radius: 8rpx;
	background: white;
	font-size: 30rpx;
	margin-bottom: 16rpx;
	display: flex;
	flex-direction: column;
}
.commodity-iamge {
	border-radius: 8rpx 8rpx 0 0;
	width: 100%;
	height: 350rpx;
}
.xianshi{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 60rpx;
	background: #DD0812;
	display:flex;
	box-sizing: border-box;
	/* padding-right: 16rpx; */
	color: white;
	justify-content: space-between;
}
.xianshimiaosha{
	width: 40%;
	height: 70rpx;
	font-size: 23rpx;
	background:#C2060C;
	margin-top: -12rpx;
	border-radius: 10rpx 10rpx 0 0;
	text-align: center;
	line-height: 70rpx;
	font-weight: 600;
}
.times{
	align-items: center;
	display:flex;
	font-size: 23rpx;
}

.commodity-iamges{
	width: 100%;
	position: relative;
}
.title-mony {
	width: 100%;
	height: 220rpx;
	padding: 10rpx 0 0 10rpx;
	box-sizing: border-box;
}
.title {
	font-size: 28rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 300rpx;
}
.momey {
	color: #DD0812;
}
.acti{
	height: 60rpx;
	width: 100%;
	padding:0  10rpx 0 0;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.originalCost{
	font-size:20rpx;
	text-decoration:line-through;
	color: 	#808080;
}
.btn{
	width: 150rpx;
	height: 50rpx;
	border-radius: 30rpx;
	background: white;
	border: 1px solid #DD0812;
	color: #DD0812;
	font-size: 26rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
}
.price{
	color: #DD0812;
	font-size: 28rpx;
}
.scores{
	display: flex;
	padding: 0 10rpx 0 0;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	height: 80rpx;
}
.score{
	color:#DD0812;
	font-size: 20rpx;
}
.mones{
	display: flex;
	flex-direction: column;
}
.null{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	text-align: center;
}
.search-null{
	width: 300rpx;
	height: 192rpx;
}
.myzhaodao{
	font-size: 26rpx;
	color: #C3C3C3;
}
</style>
