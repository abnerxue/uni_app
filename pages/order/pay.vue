<template>
	<view class="back">
		<view>
			<view class="orderid">
				<view>订单号</view>
				<view class="order_hao">{{serialNumber}}</view>
			</view>
			<view class="payment_method">支付方式</view>
			<radio-group @change="pays">
				<view class="payment_method_zfb">
					<view class="zhifubao"><image src="../../static/order/alipay.png" class="zfb"></image>支付宝</view>
					<radio  color="#DD0812" value="3" style="transform: scale(0.7);" />
				</view>
			</radio-group>
			<button class="zhifu" @click="pay">立即支付</button>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server')
	export default {
		data() {
			return {
				serialNumber:0,
				pay_id:0,//支付方式
			}
		},
		onLoad(option) {
			this.serialNumber = option.serialNumber;
		},
		methods: {
			pays(event){
				this.pay_id=event.target.value;
			},
			pay(){
				let that = this;
				server.postJSON('/user/order/pay',{
					serialNumber:that.serialNumber,
					payment:that.pay_id
				},res=>{
					let payinfo = res.data.payinfo;
					uni.getProvider({
						service: 'payment',
						success: function(res) {
							uni.requestPayment({
								provider: res.provider[0], //服务提供商
								orderInfo: payinfo, //订单信息
								success: function(result) {
									uni.showToast({
										title: '支付成功',
										mask: true
									});
									setTimeout(function() {
										uni.navigateTo({
											url: '/pages/order_details/order_details?id=' + orderId
										});
									}, 1500);
								}
							});
						}
					});
				})
			}
		}
	}
</script>

<style>
.orderid{
	width: 100%;
	height: 88rpx;
	background: white;
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 26rpx;
	color: #1C0000;
	margin-bottom: 30rpx;
}
.order_hao{
	color: #808080;
}
.payment_method{
	margin-bottom: 10rpx;
	color: #808080;
	font-size: 26rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
}
.payment_method_zfb{
	width: 100%;
	height: 110rpx;
	background: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 26rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	margin-bottom: 60rpx;
}
.zhifubao{
	display: flex;
	align-items: center;
}
.zfb{
	width: 61rpx;
	height: 61rpx;
	margin-right: 16rpx;
}
.zhifu{
	background: #DD0812;
	color: white;
	font-size: 32rpx;
	height: 88rpx;
	width: 702rpx;
	margin: 0 auto;
	line-height: 88rpx;
}
</style>
