<template>
	<view class="paper">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<!-- 顶部栏搜索 -->
		<!-- <view class="search-div" >
			<view class="search-inputs" @click="search"><image class="search-image" src="./../../static/search.jpg" ></image><text>请输入您想要搜索的关键词</text></view>
			<image class="message" src="./../../static/message.jpg" ></image>
		</view>	 -->
		<toptabbar tab="1"></toptabbar>
		<view class="tuijian">
			<!-- 首页轮播 -->
			<swiper indicator-dots="true" class="banner">
				<swiper-item v-for="(slide,slides) in slide" :key="slides">
					<image class="banner" :src="slide.img"></image>
				</swiper-item>
			</swiper>
			<view class="fast">
				<view class="line">
					<view class="piece" v-for="(goodsCategoryFirst,goodsCategoryFirsts) in goodsCategoryFirst" @click="class_list(goodsCategoryFirst.id)">
						<image :src="goodsCategoryFirst.thumb" class="imgu"></image>
						<text class="text">{{goodsCategoryFirst.name}}</text>
					</view>
					<view v-for="(index_link,index_links) in index_link">
						<view @click="actives(index_link.id)" class="piece">
							<image :src="index_link.img" class="imgu"></image>
							<text class="text">{{index_link.name}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="imagecenter" @click="xinren()">
				<image class="imagecenter" src="../../static/banner.png"></image>
			</view>
			<view class="dynamic">
				<image src="../../static/dongtai.png"></image>
				<text class="dongtai">怀南会动态</text>
				<view class="guanjianzi">
					<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 60rpx;">
						<swiper-item v-for="news in msg" :key="news.id" @click="article(news.id,news.title)">
							<view class="news">{{ news.title}}</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="leftimg">
					<image src="../../static/left.png"></image>
				</view>
			</view>
			<view class="limittime">
				<view class="limit" @click="shangpin_list(1)">
					<image src="../../static/tuangou@3x.png"></image>
					<view class="obj">
						<view class="objone">
							<text class="iconfont icon-tuan objone_image"></text>
							<text>限时团购</text>
						</view>
						<view class="objtwo" >马上抢></view>
					</view>
				</view>
				<view class="limit" @click="shangpin_list(2)">
					<image src="../../static/miaosha.png"></image>
					<view class="obj">
						<view class="objone">
							<text class="iconfont icon-xianshimiaosha objone_image"></text>
							<text>限时秒杀</text>
						</view>
						<view class="objtwo">马上抢></view>
					</view>
				</view>
			</view>
			<view class="newshare">
				<view class="title">新人专享</view>
				<view class="row">
					<view class="newpiece" v-for="newcomer_list in newcomer_list" @click="delt(newcomer_list.gid)">
						<image :src="newcomer_list.thumb"></image>
						<view class="detail">
							<view class="smalltitle">{{newcomer_list.title}}</view>
							<view class="price">
								<text>￥{{newcomer_list.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="dayrecomment">
				<view class="title">每日上新</view>
				<view class="recommentcontent">
					<view class="contentpiece" v-for="newGood in newGoods" @click="news(newGood.gid)">
						<image :src="newGood.thumb"></image>
						<view class="detail">
							<view class="smalltitle">{{newGood.title}}</view>
							<view class="price">￥{{newGood.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<bottomtabbar tags="1"></bottomtabbar>
	</view>
</template>
<script>
	const server = require('../../utils/server');
	import bottomtabbar from 'pages/bottomtabbar/bottomtabbar';
	import toptabbar from './top_tabbar';
	export default {
		data() {
			return {
				slide: [],
				goodsCategoryFirst: [],
				index_link: [],
				newcomer_list: [], //新人专享
				newGoods: [], //每日上新
				msg: {},
			}
		},
		components: {
			// heads,
			bottomtabbar,
			toptabbar
		},
		onLoad() {
			const that = this;
			that.index_link = [{
					id: 1,
					url: '/pages/activity/activity?activity=1',
					img: './../../static/group.jpg',
					name: '团购'
				},
				{
					id: 2,
					url: '/pages/activity/activity?activity=2',
					img: '../../static/sekill.jpg',
					name: '秒杀'
				},
				{
					id: 3,
					url: '/pages/activity/activity?activity=4',
					img: '../../static/integral.jpg',
					name: '积分换购'
				},
				{
					id: 4,
					url: '/pages/share/share',
					img: '../../static/share.jpg',
					name: '分享'
				}
			];
			server.getJSON(
				'/app/home/get', {
					ajax: 'true'
				},
				function(res) {
					that.goodsCategoryFirst = res.data.goodsCategory.first; //首页商品分类
					uni.setStorageSync('first', res.data.goodsCategory.first);
					uni.setStorageSync('second', res.data.goodsCategory.second);
				}
			);
			server.getJSON(
				'/api/app/home', res => {
					that.newcomer_list = res.data.newcomerDiscount;
					that.slide = res.data.slide; //轮播图
					that.newGoods = res.data.newGoods; //每日上新
					console.log(res.data.newGoods)
					that.msg = res.data.newsList;
				}
			)
		},
		methods: {
			gozhigou() {
				uni.redirectTo({
					url: "page/index/zhigou"
				})
			},
			search() {
				uni.navigateTo({
					url: "./search"
				})
			},
			shangpin_list(id) {
				uni.navigateTo({
					url: '/pages/active/active_list?id=' + id
				})
			},
			// 跳转活动商品列表
			actives(id) {
				if (id == 4) {
					if(uni.getStorageSync('token')==''||uni.getStorageSync('token')==null||uni.getStorageSync('token')==undefined){
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}else{
						uni.navigateTo({
							url: '/pages/share/share?id=' + id
						})
					}
				} else {
					uni.navigateTo({
						url: '/pages/active/active_list?id='+id
					})
				}
			},
			xinren() {
				uni.navigateTo({
					url: "./../newcomer/newcomer"
				})
			},
			// 跳转商品详情页
			delt(gid) {
				uni.navigateTo({
					url: "../product/product_details?gid=" + gid
				})
			},
			//每日上新
			news(gid) {
				uni.navigateTo({
					url: "../product/product_details?gid=" + gid
				})
			},
			// 分类列表
			class_list(id) {
				uni.navigateTo({
					url: '../classfy/classfy_list?fid=' + id
				})
			},
			//文章
			article(id,title){
				uni.navigateTo({
					url:'../wiki/article?id='+id+'&title='+title
				})
			}
		}
	}
</script>
<style>
	/* 搜索框 */
	.search-div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 80rpx;
	}

	.search-inputs {
		width: 600rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background: #F5F5F5;
		color: #A2A2A2;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		padding-left: 40rpx;
	}

	.search-image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.message {
		width: 36rpx;
		height: 36rpx;
	}

	/* 推荐 */
	.tuijian {
		background: #F1F1F1;
	}

	.banner {

		width: 100%;
		height: 340rpx;
		background: #333333;
	}

	.banner swiper-item {
		width: 100%;
	}

	.imagecenter {
		width: 750rpx;
		height: 150rpx;
		background: #2C405A;
	}

	.fast {}

	.line {
		background: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		padding: 0 10rpx;
		/* border-bottom: #cccccc solid 2rpx; */
	}

	.piece {
		width: 144rpx;
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.imgu {
		width: 66rpx;
		height: 66rpx;
		/* margin-bottom: 10rpx; */
		margin-left: 30rpx;
		margin-right: 30rpx;
		/* border-radius: 55rpx;
 */
	}

	.text {
		font-size: 26rpx;
		padding: 0rpx;
		/* margin-top: 20rpx; */
	}

	/* 怀南汇动态 */
	/* .dynamic {
		display: flex;
		height: 70rpx;
		background: #FFFFFF;
		width: 100%;
		margin-top: 20rpx;
		align-items: center;
		padding: 0 40rpx;
		box-sizing: border-box;
	}

	.dongtai {
		color: #74181B;
		font-size: 28rpx;
		font-weight: 550;
	}

	.lunbo {
		height: 100%;
		width: 450rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #1C0000;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-left: 10rpx;
	}
 */
	.dynamic {
		position: relative;
		display: flex;
		height: 80rpx;
		background: #FFFFFF;
		margin-top: 16rpx;
		padding: 0 30rpx;
		align-items: center;
	}

	.dynamic image {
		width: 30rpx;
		height: 30rpx;
	}

	.dynamic .dongtai {
		padding-left: 10rpx;
		font-size: 30rpx;
		color: #74181B;
		font-weight: 600;
		line-height: 80rpx;
	}

	.dynamic .guanjianzi {
		height: 80rpx;
		width: 400rpx;
		font-size: 24rpx;
		line-height: 80rpx;
		align-items: center;
		padding-left: 20rpx;
	}

	.news {
		max-width: 400rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.leftimg {
		position: absolute;
		right: 30rpx;
		line-height: 80rpx;
	}

	.leftimg image {
		width: 10rpx;
		height: 20rpx;
	}

	/* 限时活动 */
	.limittime {
		margin: 16rpx 6rpx;
		height: 200rpx;
		display: flex;
	}

	.limit {
		position: relative;
		margin-left: 10rpx;
		width: 354rpx;
		height: 200rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
	}

	.limit image {
		width: 354rpx;
		height: 200rpx;
	}

	.obj {
		position: absolute;
		left: 20rpx;
		top: 20rpx;
	}

	.objone {
		font-size: 30rpx;
		color: red;
	}

	.objone_image {
		padding-right: 10rpx;
		width: 20rpx;
		height: 20rpx;
		font-size: 26rpx;
	}

	.objtwo {
		margin-top: 16rpx;
		/* padding-top: 5rpx; */
		text-align: center;
		width: 120rpx;
		height: 36rpx;
		line-height: 36rpx;
		border-radius: 36rpx;
		color: white;
		font-size: 26rpx;
		background: red;
	}

	/* 新人专享 */
	.newshare {
		margin-top: 24rpx;
		margin-left: 16rpx;
		height: auto;
	}

	.title {
		font-size: 30rpx;
		font-weight: 550;
	}

	.row {
		height: 420rpx;
		display: flex;
		width: 730rpx;
		overflow: auto;
	}

	.row::-webkit-scrollbar {
		display: none;
	}

	.newpiece {
		margin-right: 12rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 260rpx;
		height: 380rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	}

	.newpiece image {
		height: 260rpx;
		width: 260rpx;
	}
 
	.detail {
		margin-left: 16rpx;
		font-size: 26rpx;
	}

	.smalltitle {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 230rpx;
		height: 40rpx;
	}

	.price {
		margin-top: 6rpx;
		color:#DD0812;
	}

	.delete {
		font-size: 16rpx;
		color: #9A9A9A;
		text-decoration: line-through;
	}

	.price s {
		/* padding-left: 10rpx; */
		font-size: 16rpx;
		color: #9A9A9A;
	}

	/* 每日推荐 */
	.dayrecomment {
		margin-top: 10rpx;
		margin-left: 16rpx;
		height: auto;
		margin-bottom: 100rpx;
	}

	.recommentcontent {
		margin-top: 10rpx;
		height: auto;
		/* background: #2C405A; */
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20rpx;
	}

	.contentpiece {
		margin-top: 16rpx;
		margin-right: 16rpx;
		width: 350rpx;
		height: 460rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
	}

	.contentpiece image {
		width: 350rpx;
		height: 350rpx;
	}
</style>
