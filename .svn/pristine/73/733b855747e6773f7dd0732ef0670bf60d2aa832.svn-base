<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<view class="back">
			<!-- 提示弹窗 -->
			<view class="tan" v-show="tan">
				<text>{{message}}</text>
			</view>
			<view class="tishi" v-show="quxiao">
				<view class="tishis">
					<view class="tishis-content">是否取消此订单</view>
					<view class="tishi-btn">
						<view class="quxiaos" @click="quxiao=false">取消</view>
						<view class="quedin" @click="quedin()">确定</view>
					</view>
				</view>
			</view>
			<!-- 自定义导航栏 -->
			<view class="head">
				<view class="heads">
					<view @click="returns()"><text class="iconfont icon-left"></text></view>
					<view>订单详情</view>
					<view></view>
				</view>
			</view>
			<view class="order_del">
				<view class="state_time">
					<view class="state" v-if="order.payStatus==1&&order.logisticsStatus==1">
						<view style="margin-top: 10rpx;margin-right: 10rpx;"><image src="../../../static/order/notpay.png" style="width: 42rpx;height: 40rpx;"></image></view>
						<text>等待买家付款</text>
					</view>
					<!-- <text class="state" v-if="order.payStatus==2&&order.logisticsStatus==1">支付未成功</text> -->
					<view class="state" v-if="order.logisticsStatus==1&&order.payStatus==3">
						<view style="margin-top: 10rpx;margin-right: 10rpx;"><image src="../../../static/order/pay1.png" style="width: 38rpx;height: 40rpx;"></image></view>
						<text>买家已付款</text>
					</view>
					<view class="state" v-if="order.logisticsStatus==2&&order.payStatus==3">
						<view style="margin-top: 10rpx;margin-right: 10rpx;"><image src="../../../static/order/deliver.png" style="width: 46rpx;height: 36rpx;"></image></view>
						<text>卖家已发货</text>
					</view>
					<view class="state" v-if="order.logisticsStatus==3&&order.appraise==0">
						<view style="margin-top: 10rpx;margin-right: 10rpx;"><image src="../../../static/order/transaction.png" style="width: 44rpx;height: 40rpx;"></image></view>
						<text>交易成功</text>
					</view>
					<view class="time" v-if="order.payStatus==1&&order.logisticsStatus==1">
						<view class="example-body">
							<uni-countdown :second="order.payTimeRemaining" :show-colon="false" />
						</view>
					</view>
					<view class="time" v-if="order.logisticsStatus==2&&order.payStatus==3">
						<view class="example-body">
							<uni-countdown :second="order.takeTimeRemaining" :show-colon="false" />
						</view>
					</view>
				</view>
				<view class="personal_news">
					<view><text>{{address.name}}</text><text class="phope">{{address.phone}}</text></view>
					<view>{{address.address}}</view>
				</view>
				<view class="goods">
					<view class="goods_list" v-for="goods in order.goods">
						<view class="goods_title_image" @click="del(goods.gid)">
							<image class="goods-image" :src="goods.thumb"></image>
							<view class="goods-title">{{goods.title}}</view>
						</view>
						<view class="momey">
							<view class="momeys">￥{{goods.price}}</view>
							<view class="nuber">X{{goods.number}}</view>
							<view class="btn" v-if="order.logisticsStatus>=1&&order.payStatus==3" @click="shoho(order.id,goods.gid,goods.returned_purchase)">
								申请售后
							</view>
						</view>
					</view>
				</view>
				<view class="refund_news">
					<view class="refund_new">
						<view>商品金额</view>
						<view>{{order.totalPrice-order.logisticsExpenses}}</view>
					</view>
					<view class="refund_new">
						<view>红包</view>
						<view v-if="order.redPaper==null">无</view>
						<view v-if="order.redPaper!=null">￥{{order.redPaper.redPaper}}</view>
					</view>
					<view class="refund_new"> 
						<view>配送运费</view>
						<view>￥{{order.logisticsExpenses}}</view>
					</view>
					<view class="refund_new">
						<view>订单备注</view>
						<view>{{order.message}}</view>
					</view>
					<view class="refund_new">
						<view>实付金额</view>
						<view>￥{{order.totalPrice}}</view>
					</view>
				</view>
				<view class="order_news">
					<view class="order_n">订单信息</view>
					<view class="refund_new">
						<view>创建时间</view>
						<view>{{order.orderTime}}</view>
					</view>
					<view class="refund_new">
						<view>订单编号</view>
						<view>{{order.serialNumber}}</view>
					</view>
					<view class="refund_new">
						<view>付款时间</view>
						<view v-if="order.payStatus>2">{{order.payTime}}</view>
						<view v-if="order.payStatus<=2">待付款</view>
					</view>
				</view>
				<view class="botms">
					<view class="bottoms">
						<!-- 待付款状态 -->
						<view class="quxiao" v-if="order.payStatus<=2 " @click="pay(order.serialNumber)">去支付</view>
						<view class="quxiao" v-if="order.payStatus<=2" @click="quxiao=true">取消订单</view>
						<!-- 待发货状态 -->
						<view class="quxiao" v-if="order.logisticsStatus<3&&order.payStatus==3" @click="queren()">确认收货</view>
						<view class="quxiao" v-if="order.logisticsStatus<=3&&order.payStatus==3" @click="tans()">查看物流</view>
						<!-- 待评价状态 -->
						<view class="quxiao" v-if="order.logisticsStatus==3&&order.payStatus==3&&order.appraise==0">评价</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	const server = require('../../../utils/server');
	export default {
		data() {
			return {
				order: [], //订单信息
				address: [],
				log: [],
				tan: false, //弹窗
				quxiao: false, //提示
				message: '', //提示内容
			};
		},
		components: {
			uniCountdown,
		},
		methods: {
			// 返回
			returns(){
				uni.navigateBack({
					delta:1
				})
			},
			// 取消订单
			quedin() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.quxiao = false;
				server.postJSON('/user/order/trash?ajax=true', {
					orderId: that.order.id
				}, res => {
					uni.hideLoading();
					that.tan = true;
					that.message = res.data.message;
					setTimeout(function() {
						that.tan = false;
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				})
			},
			// 售后
			shoho(id, gid, returned_purchase) {
				console.log(returned_purchase)
				if (returned_purchase == undefined) {
					uni.navigateTo({
						url: "./return?id=" + id + '&gid=' + gid
					})
				} else {
					uni.navigateTo({
						url: './refund_details?id=' + returned_purchase.id
					})
				}
			},
			// 确认收货
			queren() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				server.postJSON('/user/order/confirm_receive?ajax=true', {
					orderId: that.order.id
				}, res => {
					that.message = res.data.message;
					uni.hideLoading();
					that.tan = true;
					setTimeout(function() {
						that.tan = false
					}, 1000)
				})
			},
			tans() {
				let that = this;
				if (that.order.logisticsStatus == 1) {
					that.tan = true;
					that.message = '商品还未发货'
					setTimeout(function() {
						that.tan = false;
					}, 1000)
				} else {
					uni.navigateTo({
						url: '../logistics/logistics?id=' + that.order.id
					})
				}
			},
			// 支付
			pay(serialNumber) {
				uni.navigateTo({
					url: '../../order/pay?serialNumber=' + serialNumber
				})
			},
			// 跳转商品详情
			del(gid) {
				uni.navigateTo({
					url: '../../product/product_details?gid=' + gid
				})
			}
		},
		onShow() {

		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			let that = this;
			server.postJSON('/api/order/detail', {
				orderId: option.id
			}, function(res) {
				console.log(res)
				that.order = res.data;
				that.address = res.data.address;
				that.log = res.data.log;
				uni.hideLoading();
			});
		}
	};
</script>
<style>
	/* 提示 */
	.tishi {
		background: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100;
		padding: 0 50rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tishis {
		width: 100%;
		height: 210rpx;
		background: white;
		border-radius: 16rpx;
	}

	.tishis-content {
		width: 100%;
		height: 56%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #1C0000;
		border-bottom: 1px solid #E9E9E9;
	}

	.tishi-btn {
		width: 100%;
		height: 44%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.quedin {
		height: 100%;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #74181B;
		font-size: 26rpx;
	}

	.quxiaos {
		height: 100%;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		border-right: 1px solid #E9E9E9;
	}

	/*  */
	.back {
		background: #F5F5F5;
		height: 100%;
		width: 100%;
		position: absolute;
	}

	.order_del {
		background: #F5F5F5;
	}

	.state_time {
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		padding: 0 40rpx;
		box-sizing: border-box;
		line-height: 90rpx;
	}

	.state {
		display: flex;
		font-size: 30rpx;
		color: #1C0000;
	}
	
	.time {
		font-size: 28rpx;
		color: #808080;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	.personal_news {
		width: 100%;
		height: 160rpx;
		padding: 30rpx 40rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #1C0000;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: white;
		margin: 20rpx 0;
	}

	.phope {
		margin-left: 50rpx;
	}

	.goods {
		width: 100%;
		background: white;
	}

	.goods_list {
		padding: 20rpx 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.goods-image {
		width: 170rpx;
		height: 170rpx;
	}

	.goods-title {
		width: 300rpx;
		height: 82rpx;
		margin-left: 16rpx;
		font-size: 30rpx;
		color: #1C0000;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.goods_title_image {
		display: flex;
		width: 520rpx;
	}

	.momey {
		font-size: 28rpx;
		color: #1C0000;
	}

	.nuber {
		color: #808080;
		text-align: right;
		margin-top: 10rpx;
	}

	.momeys {
		text-align: right;
	}

	.refund_news {
		display: flex;
		height: 338rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #9A9A9A;
		font-size: 28rpx;
		padding: 10rpx 40rpx;
		box-sizing: border-box;
		background: white;
		margin: 20rpx 0;
	}

	.refund_new {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.order_news {
		display: flex;
		height: 246rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #9A9A9A;
		font-size: 28rpx;
		padding: 10rpx 40rpx;
		box-sizing: border-box;
		background: white;
	}

	.order_n {
		color: #1C0000;
	}

	.botms {
		position: relative;
		width: 100%;
		height: 100rpx;
	}

	.bottoms {
		width: 100%;
		height: 100rpx;
		padding: 16rpx 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		position: fixed;
		background: white;
		bottom: 0;
	}

	.quxiao {
		border: 1px solid #74181B;
		width: 162rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #74181B;
		margin-left: 20rpx;
	}

	.buy {
		border: 1px solid #74181B;
		width: 162rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #74181B;
	}

	.btn {
		height: 54rpx;
		width: 150rpx;
		border: 1px solid #74181B;
		border-radius: 40rpx;
		color: #74181B;
		margin-top: 20rpx;
		line-height: 54rpx;
		text-align: center;
	}
</style>
