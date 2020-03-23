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
			<!-- 自定义导航栏 -->
			<view class="head">
				<view class="heads">
					<view  @click="returns()"><text class="iconfont icon-left"></text></view>
					<view  v-if="after_details.type==1">退货退款</view>
					<view  v-if="after_details.type==2">申请换货</view>
					<view  v-if="after_details.type==3">申请退货</view>
					<view></view>
				</view>
			</view>
			<view class="content">
				<view class="state_time">
					<view class="state" v-if="after_details.step!=7&&after_details.step!=5&&after_details.type==1">
						<view><image src="../../../static/order/tuikuan.png"></image></view><text>请等待商家处理</text>
					</view>
					<view class="state" v-if="after_details.step!=7&&after_details.step!=5&&after_details.type==2">
						<image src="../../../static/order/huanhuo.png"></image><text>请等待商家处理</text>
					</view>
					<view class="state" v-if="after_details.step==7"><view><image src="../../../static/order/tuioff.png"></image></view><text>退款关闭</text></view>
					<view class="time"  v-if="after_details.step==7">{{after_details.auditTime}}</view>
					<view class="state" v-if="after_details.step==5">退款成功</view>
					<view class="time"  v-if="after_details.step==5">{{after_details.auditTime}}</view>
					<view class="time" v-if="after_details.step!=7&&after_details.step!=5">				<uni-countdown class="example-body" :minute="0" splitorColor="#9A9A9A" color="#9A9A9A" :second="after_details.timeRemaining" /> </view>
				</view>
				<view class="refund_content" v-if="after_details.step!=7&&after_details.step!=5">
					<view class="refund_contents" v-if="after_details.type==1">您已经进入退货退款流程，请耐心等待客服为您处理~</view>
					<view class="refund_contents" v-if="after_details.type==2">您已经进入换货流程，请耐心等待客服为您处理~</view>
					<view class="refund_contents" v-if="after_details.type==3">您已经进入退货流程，请耐心等待客服为您处理~</view>
					<view class="refund_btn">
						<view class="modify_btn" @click="quxiaoshoho">撤销申请</view>
						<!-- <view class="modify_btn">修改申请</view> -->
					</view>
				</view>
				<view v-if="after_details.step==7" class="cexiao">
					<view class="refund_contents">因您主动撤销,退款申请关闭,如问题仍未解决,售后保障期间,您可以重新发起售后申请</view>
				</view>
				<view class="refund_moey" v-if="after_details.step==5">
					<view class="all_moey">
						<view>退款总金额</view>
						<view class="allmoeys"><text class="fuhao">￥</text>{{after_details.money}}</view>
					</view>
					<view class="zfb_moey">
						<view>退回支付宝</view>
						<view class="zhifubao"><text class="fuhao">￥</text>{{after_details.money}}</view>
					</view>
				</view>
				<view class="goods-news">
					<view class="goods-title-image">
						<view class="news">换货信息</view>
						<view class="goods_news">
							<image :src="goods.thumb" class="goods-images"></image>
							<view class="goods-title">{{goods.title}}</view>
						</view>
					</view>
					<view class="refund_news">
						<view class="refund_new">
							<view>换货原因</view>
							<view>{{after_details.cause}}</view>
						</view>
						<view class="refund_new">
							<view>退款金额</view>
							<view>￥{{after_details.money}}</view>
						</view>
						<view class="refund_new">
							<view>申请时间</view>
							<view>{{after_details.postTime}}</view>
						</view>
						<view class="refund_new">
							<view>换货编号</view>
							<view>{{after_details.serialNumber}}</view>
						</view>
						<view class="refund_new">
							<view>收货地址</view>
							<view>江苏省常州市钟楼区南大街街道</view>
						</view>
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
				after_details:{},//售后信息
				tan:false,
				message:'',
				goods:{},
			}
		},
		onLoad(option) {
			let that  = this;
			that.goods = uni.getStorageSync('good');
			server.postJSON('/api/post_sale/detail.html',{
				token:uni.getStorageSync('token'),
				id:option.id
			},res=>{
				console.log(res)
				that.after_details = res.data;
				console.log(that.after_details)
			})
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
			quxiaoshoho(){
				let that = this;
				server.postJSON('/api/post_sale/cancel',{
					token:uni.getStorageSync('token'),
					id:that.after_details.id
				},res=>{
					that.message = res.data.message
					that.tan = true;
					setTimeout(function(){
						that.tan = false;
						uni.navigateBack({
							delta:1
						})
					},1000)
				})
			}
		}
	}
</script>

<style>
	.back {
		background: #F5F5F5;
		height: 100%;
		width: 100%;
		position: absolute;
	}

	.content {
		width: 100%;
		background: #F5F5F5;
	}

	.state_time {
		background: white;
		height: 90rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.state {
		color: #1C0000;
		font-size: 30rpx;
		display: flex;
	}
	.state image{
		width: 48rpx;
		height: 46rpx;
	}
	.time {
		color: #808080;
		font-size: 28rpx;
	}

	.refund_content {
		width: 100%;
		height: 213rpx;
		background: white;
		margin: 20rpx 0;
		padding: 26rpx 36rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.cexiao{
		width: 100%;
		height: 122rpx;
		background: white;
		margin: 20rpx 0;
		padding: 26rpx 36rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.refund_moey{
		width: 100%;
		height: 138rpx;
		display: flex;
		flex-direction: column;
		background: white;
		margin: 20rpx 0;
	}
	.zfb_moey{
		width: 100%;
		height: 69rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
	}
	.fuhao{
		font-size: 20rpx;
	}
	.allmoeys{
		color: #74181B;
	}
	.zhifubao{
		color: #808080;
	}
	.all_moey{
		width: 100%;
		height: 69rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-bottom: 1px  solid #D8D8D8;
		font-size: 26rpx;
	}
	.refund_contents {
		color: #1C0000;
		width: 100%;
		font-size: 28rpx;
	}

	.refund_btn {
		width: 100%;
		text-align: right;
		display: flex;
		justify-content: flex-end;
	}

	.repeal_btn {
		border: 1px solid #808080;
		width: 162rpx;
		height: 62rpx;
		box-sizing: border-box;
		border-radius: 26rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #808080;
		margin-right: 20rpx;
	}

	.modify_btn {
		border: 1px solid #74181B;
		width: 162rpx;
		height: 62rpx;
		box-sizing: border-box;
		border-radius: 26rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #74181B;
	}

	.goods-news {
		height: 605rpx;
		width: 100%;
		background: white;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.news {
		color: #1C0000;
		font-size: 28rpx;
		margin-bottom: 40rpx;
	}

	.goods_news {
		width: 100%;
		display: flex;
		margin-top: 20rpx;
	}

	.goods-images {
		height: 158rpx;
		width: 158rpx;
	}

	.goods-title {
		color: #1C0000;
		font-size: 30rpx;
		width: 512rpx;
		margin-left: 30rpx;
		height: 40rpx;
		height: 78rpx;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.goods-title-image {
		height: 280rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.refund_news{
		display: flex;
		height: 338rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #9A9A9A;
		font-size: 28rpx;
		padding: 10rpx 0;
		box-sizing: border-box;
	}
	.refund_new{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
