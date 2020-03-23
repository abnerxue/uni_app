<template>
	<view class="background">
		<view class="back">
			<view class="backs">
				<view class="order-list" v-for="orderlist in orderlist">
					<view v-for="good in orderlist.goods">
						<view class="order-time" >
							<text class="order-time-font">{{good.returned_purchase.postTime}}</text>
							<text class="order-time-fonts" v-if="good.returned_purchase.type==1">退货退款</text>
							<text class="order-time-fonts" v-if="good.returned_purchase.type==2">换货</text>
							<text class="order-time-fonts" v-if="good.returned_purchase.type==3">退款</text>
							<!-- 退款方式：1退货退款，2换货，3退货 -->
						</view>
						<view class="order-image" >
							<view class="order-title-image">
								<image class="order-images" :src="good.thumb"></image>
								<view class="order-title">{{good.title}}</view>
							</view>
							<view class="momey">
								<view class="momeys">￥{{good.price}}</view>
								<view class="order-number">X{{good.number}}</view>
							</view>
						</view>
						<view class="btns">
							<view class="btn" @click="del_shoho(good.returned_purchase.id,good)">查看详情</view>
						</view>
					</view> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require("../../../utils/server")
	export default {
		data() {
			return {
				orderlist:[],//售后订单列表
			}
		},
		onLoad() {
			let that = this;
			server.postJSON('/api/order/get_list.html',{
				page:0,
				span:15,
				status:"service"
			},res=>{
				that.orderlist=res.data.list;
			})
		},
		onShow() {
			let that = this;
			server.postJSON('/api/order/get_list.html',{
				page:0,
				span:15,
				status:"service"
			},res=>{
				that.orderlist=res.data.list; 
			})
		},
		methods: {
			del_shoho(id,good){
				uni.setStorageSync('good',good)
				uni.navigateTo({
					url:'../allorders/refund_details?id='+id
				})
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this;
			uni.stopPullDownRefresh();
		},
		//上拉数据
		onReachBottom() { //触底获取新的商品
			let that = this;
			uni.showLoading({
			    title: '加载中'
			});
			uni.hideLoading();
		},
	}
</script>

<style>
	.back {
		margin-top: 1px;
		background: #F5F5F5;
	}
	.backs{
		background: #F5F5F5;
	}
	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #F5F5F5;
	}

	.order-tab {
		position: relative;
		width: 100%;
		height: 72rpx;
	}

	.order-tabs {
		position: fixed;
		width: 100%;
		height: 72rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: space-around;
		background: white;
		z-index: 50;
	}

	.active {
		color: #74181B;
		padding: 0 20rpx;
		height: 100%;
		line-height: 72rpx;
		border-bottom: 2px solid #74181B;
	}

	.order {
		padding: 0 20rpx;
		height: 100%;
		line-height: 72rpx;
	}

	.order-list {
		padding: 24rpx 36rpx;
		box-sizing: border-box;
		width: 100%;
		height: auto;
		background: white;
		margin-bottom: 16rpx;
	}

	.order-time {
		display: flex;
		justify-content: space-between;
	}

	.order-time-font {
		font-size: 28rpx;
		color: #9A9A9A;
	}

	.order-time-fonts {
		font-size: 28rpx;
		color: #74181B;
	}

	.order-image {
		display: flex;
		/* height: 142rpx; */
		width: 100%;
		justify-content: space-between;
		margin: 30rpx 0;
	}

	.order-images {
		height: 142rpx;
		width: 142rpx;
	}

	.order-title {
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		width: 344rpx;
		height: 82rpx;
		font-size: 30rpx;
		color: #1C0000;
		margin-left: 20rpx;
	}

	.order-title-image {
		display: flex;
	}

	.momey {
		display: flex;
		flex-direction: column;

	}

	.momeys {
		font-size: 28rpx;
		color: #1C0000;
	}

	.order-number {
		font-size: 28rpx;
		color: #808080;
		text-align: right;
		margin-top: 10rpx;
	}

	.miaoshu {
		width: 100%;
		text-align: left;
		height: 62rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		background: #F5F5F5;
		color: #1C0000;
		line-height: 62rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.xufukuai {
		font-size: 28rpx;
		color: #1C0000;
	}

	.mome {
		font-size: 30rpx;
		color: #DD0812;
	}

	.btns {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-top: 24rpx;
	}

	.btn {
		font-size: 28rpx;
		border: 1px solid #74181B;
		width: 160rpx;
		height: 62rpx;
		box-sizing: border-box;
		color: #74181B;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		justify-content: center;
	}
</style>
