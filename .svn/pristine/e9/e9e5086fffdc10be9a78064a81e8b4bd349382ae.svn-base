<template>
	<view class="back">
		<view>
			<view class="baozheng">
				<view class="baozhengtip">
					<view class="tiptitle">本期竞拍需要支付保证金</view>
					<view class="price">￥30</view>
					<view>竞拍不成功，保证金将原路返回</view>
				</view>
			</view>
			<view class="payment_method">支付方式</view>
			<radio-group @change="pays" class="paymethod">
				<view class="payment_method_zfb">
					<view class="zhifubao"><image src="../../static/order/alipay.png" class="zfb"></image>支付宝</view>
					<radio  color="#DD0812" value="3" style="transform: scale(0.7);" />
				</view>
			<!-- 	<view class="payment_method_zfb">
					<view class="zhifubao"><image src="../../static/order/wxpay.png" class="zfb"></image>微信</view>
					<radio  color="#DD0812" value="2" style="transform: scale(0.7);" />
				</view> -->
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
				aid:0,
				pay_id:0,//支付方式
			}
		},
		onLoad(option) {
			this.aid = option.aid;
			console.log(option)
		},
		methods: {
			pays(event){
				this.pay_id=event.target.value;
			},
			pay(){
				let that = this;
				server.postJSON('/api/auction/bond',{
					token:uni.getStorageSync('token'),
					payment:that.pay_id,
					aid:that.aid
				},res=>{
					console.log(res)
					let payinfo = res.data.payinfo;
					uni.getProvider({
						service: 'payment',
						success: function(res) {
							uni.requestPayment({
								provider: res.provider[0], //服务提供商
								orderInfo: payinfo, //订单信息
								success: function(result) {
									console.log(result)
									uni.redirectTo({
										url:'./payoff'
									})
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
.baozheng{
	width: 100%;
	text-align: center;
}
.baozhengtip{
	line-height: 60rpx;
	font-size: 26rpx;
	color: #4A4A4A;
	margin: 30rpx;
	height: 216rpx;
	border-radius: 8rpx;
	background: #FFFFFF;
}
.tiptitle{
	font-size: 28rpx;
	color: #1C0000;
	line-height: 70rpx;
}
.price{
	font-size: 34rpx;
	color: #74181B;
	margin-bottom: 10rpx;
}
.payment_method{
	margin-bottom: 10rpx;
	color: #808080;
	font-size: 26rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
}
.paymethod{
	margin-bottom: 60rpx;
}
.payment_method_zfb{
	width: 690rpx;
	height: 110rpx;
	border-radius: 8rpx;
	background: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 26rpx;
	padding: 0 30rpx;
	margin-left: 30rpx;
	box-sizing: border-box;
	margin-bottom: 4rpx;
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
