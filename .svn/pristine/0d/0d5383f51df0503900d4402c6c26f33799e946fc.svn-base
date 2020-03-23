<template>
	<view>
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<view class="back">
			<view class="logistics_news">
				<view class="good">
					<image class="good_image" src="../../../static/product.png"></image>
					<view class="express_news">
						<view class="expressname">{{express.name}}</view>
						<view class="copys">
							<view>快递单号: {{express.logisticCode}}</view>
							<view class="copy" @click="copy">复制</view>
						</view>
					</view>
				</view>
			</view>
			<view class="trancebg">
				<view class="logistictrance" v-for="trance in trance" v-if="trance.Action==3||trance.Action==301||trance.Action==302||trance.Action==304">
					<view class="lefts">
						<view class="leftday">{{(trance.AcceptTime).slice(5,10)}}</view>
						<view class="lefttime">{{(trance.AcceptTime).slice(11,16)}}</view>
					</view>
					<view class="rights" v-if="trance.Action==304"><text class="right-0">代签收,客户签收人凭取货码签收。</text></view>
					<view class="rights" v-else><text class="right-0">已签收,客户签收人凭取货码签收。</text></view>
				</view>
				<view class="logistictrance" v-for="trance in trance">
					<view class="left">
						<view class="leftday">{{(trance.AcceptTime).slice(5,10)}}</view>
						<view class="lefttime">{{(trance.AcceptTime).slice(11,16)}}</view>
					</view>
					<view class="right"><text class="right-0">{{trance.AcceptStation}}</text></view>
				</view>
				<view class="logistictrance">
					<view class="left">
						<view class="leftday"></view>
						<view class="lefttime"></view>
					</view>
					<view class="right1">已发货</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../../utils/server');
	export default {
		data() {
			return {
				tan:false, //弹窗
				message:'', //弹窗提示语
				// Couriernumber:9861300245111412,//快递单号
				express:'',
				trance:[],
				image_order:''
			}
		},
		onLoad(option) {
			let token = uni.getStorageSync('token');
			this.image_order = uni.getStorageSync('image_order');
			let that = this;
			server.postJSON(
				'/api/order/express',
				{
					token: token,
					orderId: option.id
				},
				function(res) {
					that.express=res.data.express;
					that.trance=res.data.express.traces.reverse();
				}
			);
		},
		methods: {
			copy(){
				let that = this;
				uni.setClipboardData({
					data:that.Couriernumber, 
					success:function(res){}, 
				})
				uni.getClipboardData({
					success:function(res){
						if(res.data==that.Couriernumber){
							that.message = '复制成功'
							that.tan = true;
							setTimeout(function(){
								that.tan = false;
							},1000)
						}
					}
				})
			}
		}
	}
</script>

<style>
.logistics_news{
	background:#F5F5F5;
}
.good{
	width: 100%;
	height: 120rpx;
	background: white;
	margin-top: 1px;
	display: flex;
	align-items: center;
	padding:16rpx 20rpx;
	box-sizing: border-box;
}
.good_image{
	width: 88rpx;
	height: 88rpx;
}
.expressname{
	color: #2E2E2E;
	font-size: 28rpx;
	margin-bottom: 20rpx;
}
.express_news{
	color: #4A4A4A;
	font-size: 26rpx;
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
	justify-content: center;
}
.copys{
	display: flex;
	color: #4A4A4A;
	font-size: 26rpx;
}
.copy{
	margin-left: 30rpx;
	border: 1px solid #B2B2B2;
	font-size: 20rpx;
	border-radius: 20rpx;
	padding:5rpx 20rpx;
}

.trancebg{
	margin-top: 16rpx;
	padding: 30rpx 30rpx;
	background: #FFFFFF;
}

.logistictrance{
	height: 120rpx;
	display: flex;
	align-items: center;
	padding-bottom: 10rpx;
}
.logistictrance .left{
	width: 20%;
	height: 120rpx;
	text-align: left;
	font-size: 26rpx;
	color: #9A9A9A;
	position: relative;
}
/* 圆圈 */
.logistictrance .left::after{
	content: '';
	height: 16rpx;
	width: 16rpx;
	border-radius: 16rpx;
	background: #B2B2B2;
	position: absolute;
	right: -10rpx;
	top:0rpx;
	
}
.logistictrance .right1{
	width: 80%;
	font-size: 28rpx;
	height: 120rpx;
	color: #4A4A4A;
	position: relative;
	padding-left: 50rpx;
	/* padding-bottom: 10rpx; */
}
.logistictrance .right{
	width: 80%;
	font-size: 28rpx;
	/* line-height: 50rpx; */
	height: 120rpx;
	color: #4A4A4A;
	position: relative;
	padding-left: 50rpx;
}
.right-0{
	max-width: 500rpx;
	overflow: hidden;
	/* white-space: nowrap; */
	text-overflow: ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
/* 竖线 */
.logistictrance .right::before{
		content: '';/* 必须存在如果没有图标就留空 */
		bottom: -10rpx;/* 定位 距离*/
		border-left:1px solid #B2B2B2;/* 横线颜色 */
		left:0rpx;/* 定位 距离*/
		height: 120rpx;/* 高度 */
		position: absolute;/* 定位 */
}
.logistictrance .rights::before{
		content: '';/* 必须存在如果没有图标就留空 */
		bottom: -10rpx;/* 定位 距离*/
		border-left:1px solid #B2B2B2;/* 横线颜色 */
		left:0rpx;/* 定位 距离*/
		height: 120rpx;/* 高度 */
		position: absolute;/* 定位 */
}
.rights{
	width: 80%;
	font-size: 28rpx;
	height: 120rpx;
	color: #74181B;
	padding-left: 50rpx;
	position: relative;
}
.lefts{
	width: 20%;
	height: 120rpx;
	text-align: left;
	font-size: 26rpx;
	color: #4A4A4A;
	position: relative;
}
.logistictrance .lefts::after{
	content: '√';  /* 这里要放图标 */
	height: 40rpx;
	width: 40rpx;
	border-radius: 40rpx;
	color: #FFFFFF;
	background: #74181B;
	text-align: center;
	position: absolute;
	right: -22rpx;
	top:0rpx;	
	z-index: 10;
}
</style>
