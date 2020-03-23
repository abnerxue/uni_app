<template>
	<view class="back">
		<view class="coment">
			评价成功
		</view>
		<view class="recommend_good">
			<view class="recommend_goods">推荐商品</view>
			<view class="goods">
				<view class="good" v-for="goods in good" @click="del(goods.gid)">
					<image :src="goods.thumb" class="goods-images"></image>
					<view class="goods-title_price">
						<view class="good_title">{{goods.title}}</view>
						<view class="good_price">￥{{goods.price}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../../utils/server')
	export default {
		data() {
			return {
				good:[],//推荐商品列表
			}
		},
		onLoad() {
			let that = this;
			server.getJSON('/goods/recommend_goods/345',res=>{
				that.good = res.data;
			})
		},
		methods: {
			del(gid){
				uni.redirectTo({
					url:'../../product/product_details?gid='+gid
				})
			}
		}
	}
</script>

<style>
.coment{
	color: #74181B;
	font-size: 28rpx;
	align-items: center;
	justify-content: center;
	display: flex;
	background: white;
	width: 100%;
	height: 500rpx;
}
.recommend_good{
	padding: 0 14rpx;
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
.goods{
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
.good_title{
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
