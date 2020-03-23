<template>
	<view class="paper">
		<view class="member-bg">
			<view class="member-user">
				<view class="member-user-image">
					<image src="../../static/user-img.png"></image>
				</view>
				<view class="usermessage-user">
					<view class="user-name">123******552</view>
					<view class="user-level">
						<view class="user-level-img">
							<image src="../../static/order/member.png"></image>
						</view>
						<view class="user-level-writing"><text>普通会员</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="memberkinds">
			<view :class="kind==1?'active':'kind'" @click="kind=1">
				<view class="kindcontent">
					<view>￥<text>268</text>/年</view>
					<view>黄金会员</view>
				</view>
			</view>
			<view :class="kind==2?'active':'kind'" @click="kind=2">
				<view class="kindcontent">
					<view>￥<text>568</text>/年</view>
					<view>铂金会员</view>
				</view>
			</view>
			<view :class="kind==3?'active':'kind'" @click="kind=3">
				<view class="kindcontent">
					<view>￥<text>1680</text>/年</view>
					<view>钻石会员</view>
				</view>
			</view>
		</view>
		<view class="agreement" @click="goagreement()">
			<text>开通会员即代表接受</text>
			<text>《怀南汇会员服务协议》</text>
		</view>
		<view class="content">
			<view class="title">选择支付方式</view>
			<view class="pay-list">
				<view class="row" @tap="paytype = 'alipay'">
					<view class="left"><image src="/static/order/alipay.png"></image></view>
					<view class="center">支付宝支付</view>
					<view class="right"><radio :checked="paytype == 'alipay'" color="#DD0812" /></view>
				</view>
			</view>
			<view class="pay-list">
				<view class="row" @tap="paytype = 'wxpay'">
					<view class="left"><image src="/static/order/wxpay.png"></image></view>
					<view class="center">微信支付</view>
					<view class="right"><radio :checked="paytype == 'wxpay'" color="#DD0812" /></view>
				</view>
			</view>
		</view>
		<view class="paymemberfoot">
			<view class="foot-left">合计：<text>268.00</text></view>
			<view class="foot-right"><text>确认支付</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kind:1,
				paytype: '',
			}
		},
		methods: {
			goagreement(){
				uni.navigateTo({
					url:"../paymember/agreement"
				})
			}
				
		}
	}
</script>

<style>
	.paper{
		background: #F1F1F1;
		height: 1334rpx;
	}
	/* 头部用户信息 */
	.member-bg {
		width: 100%;
		height: 180rpx;
		background: #000000;
		position: relative;
	}

	.member-user {
		position: absolute;
		bottom: 30rpx;
		align-items: center;
		margin: 0rpx 30rpx;
		width: 690rpx;
		height: 140rpx;
		background: #FBE7C4;
		border-radius: 16rpx;
		display: flex;
	}

	.member-user-image {
		margin-left: 20rpx;
		text-align: center;
		width: 80rpx;
		height: 80rpx;
	}

	.member-user-image image {
		width: 80rpx;
		height: 80rpx;
	}

	.usermessage-user {
		align-items: center;
		margin-left: 20rpx;
		font-size: 28rpx;
	}

	.user-level {
		margin-top: 10rpx;
		position: relative;
	}

	.user-level-img image {
		position: absolute;
		top: -1px;
		left: -3px;
		width: 42rpx;
		height: 42rpx;
	}

	.user-level-writing {
		/* align-items: center; */
		text-align: right;
		padding-right: 20rpx;
		width: 140rpx;
		height: 38rpx;
		line-height: 38rpx;
		background: #1C0000;
		font-size: 20rpx;
		border-radius: 20rpx;
		color: #FBE7C4;
	}
	/* 会员分类 */
	.memberkinds{
		background: #FFFFFF;
		padding: 30rpx 32rpx 10rpx 32rpx;
		display: flex;
		width: 690rpx;
		height: 250rpx;
		text-align: center;
	}
	.kind{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 6rpx;
		width: 220rpx;
		height: 250rpx;
		background: #FBE7C4;
		border-radius: 16rpx;
		border:1px solid sandybrown;
		color: #1C0000;
		font-size: 30rpx;
	}
	.memberkinds .active{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 6rpx;
		width: 220rpx;
		height: 250rpx;
		background: #1C0000;
		border-radius: 20rpx;
		border:1px solid #1C0000;
		color: #FBE7C4;
		font-size: 30rpx;
	}
	.kindcontent text{
		font-size: 48rpx;
	}
	/* 会员协议 */
	.agreement{
		background: #FFFFFF;
		padding: 20rpx 30rpx;
		font-size: 28rpx;
	}
	.agreement text:first-child{
		color: #909399;
	}
	/* 选择支付方式 */
	.content{
		width: 100%;
		height:340rpx;
		margin-top: 20rpx;
		/* background: white; */
	}
	.content-line{
		height: 1px;
		background: #eee;
	}
	.title {
		background: #FFFFFF;
		line-height: 50rpx;
		font-size: 28rpx;
		padding-left: 4%;
		padding-right: 4%;
		width: 92%;
	}
	.pay-list {
		background: white;
		width: 100%;
		border-bottom: solid 1rpx #eee;
	}
	
	.pay-list .row {
		padding-left: 4%;
		width: 92%;
		height: 120rpx;
		display: flex;
		align-items: center;
	}
	
	.pay-list .row .left {
		width: 80rpx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
	}
	
	.pay-list .row .left image {
		width: 60rpx;
		height: 60rpx;
	}
	
	.pay-list .row .center {
		width: 100%;
		font-size: 30rpx;
	}
	.pay-list .row .right {
		width: 100rpx;
		flex-shrink: 0;
		display: flex;
		justify-content: flex-end;
	}
	.pay-list .row .right radio{
		transform: scale(0.8);
	}
	.paymemberfoot{
		position: fixed;
		display: flex;
		width: 100%;
		height: 100rpx;
		align-items: center;
		bottom: 0rpx;
		font-size: 30rpx;
	}
	.foot-left{
		background: #FFFFFF;
		width: 70%;
		height: 100rpx;
		text-align: right;
		padding-right: 20rpx;
	} 
	.foot-left text{
		line-height: 100rpx;
		color:#DD0812 ;
	}
	.foot-right{
		text-align: center;
		align-items: center;
		width: 30%;
		height: 100rpx;
		background: #F2DAA9;
	}
	.foot-right text{
		line-height: 100rpx;
	}
</style>
