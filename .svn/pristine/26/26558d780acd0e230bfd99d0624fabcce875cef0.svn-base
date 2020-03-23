<template>
	<view>
		<view class="group_good_news">
			<view class="goods">
				<image class="goods_image" :src="good.thumb"></image>
				<view class="goods_news">
					<view class="good_title">{{good.title}}</view>
					<view class="group_good_price"><text class="symbol">￥</text>{{group.price}}</view>
					<view class="group_price"><text class="symbol">￥</text>{{good.price}}</view>
					<image  v-if="group_news.group_initiate.status!=1" :src="group_news.group_initiate.status==2?'../../../static/group_success1.png':'../../../static/group_failure1.png'" class="group_image_cs"></image>
				</view>
			</view>
		</view>
		<view class="group_news">
			<view class="groups_ren" v-if="group_news.group_initiate.status==1">还差<text class="numbers">{{numbers}}人</text>拼团成功，还剩<view class="example-body"><uni-countdown :minute="0" :second="group_news.group_initiate.timeRemaining" :show-colon="false" /></view></view>
			<view class="groups_ren" v-if="group_news.group_initiate.status!=1">
				<image class="image_icon" :src="group_news.group_initiate.status==2?'../../../static/group_success.png':'../../../static/group_failure.png'"></image>
				<text v-if="group_news.group_initiate.status==3">恭喜您拼团成功</text>
				<text v-if="group_news.group_initiate.status==2">拼团时间到</text>
			</view>
			<view class="group_image_list">
				<image v-for="group_image in group_news.group_join" :src="group_image.avatar" class="group_image"></image>
				<image src="../../../static/group/person.png" class="group_image"></image>
			</view>
			<button class="btn" @click="participate" v-if="group_chanjia==1">我要参团</button>
			<button class="btn" v-if="group_news.group_initiate.status==1&&group_chanjia!=1">邀请好友</button>
			<button class="btn" v-if="group_news.group_initiate.status!=1&&group_chanjia!=1" @click="chakan">查看更多团购商品</button>
		</view>
		<view class="recommend_good">
			<view class="recommend_goods">推荐商品</view>
			<view class="goodss">
				<view class="good" v-for="goods in goods" @click="del(goods.gid)">
					<image :src="goods.thumb" class="goods-images"></image>
					<view class="goods-title_price">
						<view class="good_titles">{{goods.title}}</view>
						<view class="good_price">￥{{goods.price}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../../utils/server')
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		data() {
			return {
				good: {}, //商品信息
				group: {}, //拼团商品信息
				group_news: {}, //all信息
				numbers:'',
				goods:[],//推荐商品列表
				id:0,//参与活动的id
				group_chanjia:0,
			}
		},
		components: {
			uniCountdown,
		},
		onLoad(option) {
			let id = option.id;
			this.group_chanjia = option.group_chanjia;
			let that = this;
			server.getJSON('/group/group_detail', {
				ajax: true,
				id: option.id
			}, res => {
				console.log(res)
				that.good = res.data.goods;
				that.group = res.data.group;
				that.group_news = res.data;
				that.id= res.data.group_initiate.id; 
				that.numbers = that.group.number - res.data.group_join.length
			})
			server.getJSON('/goods/recommend_goods/345',res=>{
				that.goods = res.data;
			})
		},
		methods: {
			del(id){
				uni.navigateTo({
					url:'../../product/product_details?gid='+id
				})
			},
			participate(){
				let that = this
				uni.navigateTo({
					url:'../../order/confirm_order?gid='+that.good.gid+'&number=1&id=1&activityId='+that.good.activityId+'&activityLaunchId='+that.id
				})
			},
			// 跳转团购列表
			chakan(){
				uni.navigateTo({
					url:'../../active/active_list?id=1'
				})
			}
		}
	}
</script>

<style>
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	.group_good_news {
		width: 100%;
		height: 320rpx;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.goods {
		width: 702rpx;
		height: 280rpx;
		background: white;
		box-shadow: 0px 3rpx 6rpx #D8D8D8;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.goods_image {
		width: 226rpx;
		height: 226rpx;
	}

	.goods_news {
		height: 100%;
		width: 414rpx;
		padding: 16rpx 20rpx 16rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		position: relative;
	}

	.good_title {
		color: #1C0000;
		font-size: 28rpx;
		width: 100%;
		height: 80rpx;
		overflow: hidden;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.group_good_price {
		font-size: 36rpx;
		color: #DD0812;
	}

	.symbol {
		font-size: 26rpx;
	}

	.group_price {
		color: #808080;
		font-size: 28rpx;
		text-decoration: line-through;
	}
	.group_image_cs{
		position: absolute;
		width: 134rpx;
		height: 136rpx;
		right: 30rpx;
		top:100rpx;
		margin: 0 auto;
	}
	.group_news {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.groups_ren {
		font-size: 28rpx;
		display: flex;
		color: #1C0000;
		align-items: center;
	}
	.image_icon{
		width: 50rpx;
		height: 50rpx;
		margin-right: 16rpx;
	}
	.group_image_list{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 60rpx 0;
	}
	.group_image{
		width: 80rpx;
		height: 80rpx;
	}
	.numbers {
		color: #DD0812;
	}
	.btn{
		width: 100%;
		height: 88rpx;
		border-radius: 10rpx;
		background: #DD0812;
		color: #FFFFFF;
		font-size: 28rpx;
		line-height: 88rpx;
	}
	
	
	.recommend_good{
		padding: 8rpx 14rpx;
		box-sizing: border-box;
		background: #F5F5F5;
	}
	.recommend_goods{
		margin: 30rpx 0;
		width: 100%;
		color: #1C0000;
		font-size: 32rpx;
		text-align: center;
	}
	.goodss{
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.good{
		width: 351rpx;
		height: 482rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		background: white;
	}
	.goods-images{
		width: 100%;
		height: 351rpx;
	}
	.goods-title_price{
		height: 131rpx;
		width: 100%;
		padding: 20rpx;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: space-between;
	}
	.good_titles{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		color: #1C0000;
		font-size: 26rpx;
	}
	.good_price{
		color: #DD0812;
		font-size: 32rpx;
	}
</style>
