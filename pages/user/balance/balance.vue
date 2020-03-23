<template>
	<view>
		<view class="back">
			<view class="balance">
				<view class="balances">
					<view class="balances-tile">账户余额(元)</view>
					<view class="balance_momeys">00.00</view>
					<view class="withdrawals_btn">提现</view>
				</view>
				<view class="balance_list">
					<view class="balance_del">
						<view><image src="../../../static/money.png" style="width: 26rpx;height: 28rpx;margin-right: 18rpx;"></image><text>资金明细</text></view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
					<view class="balance_del">
						<view><image src="../../../static/card.png" style="width: 30rpx;height: 24rpx;margin-right: 16rpx;"></image><text>我的银行卡</text></view>
						<view class="right"><text class="iconfont icon-right"></text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.back {
		height: 100%;
		width: 100%;
		background: #F5F5F5;
		position: absolute;
	}
	.balances{
		width: 100%;
		height: 330rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
		padding:30rpx 0;
		box-sizing: border-box;
	}
	.balances-tile{
		color:#9A9A9A;
		font-size: 26rpx;
	}
	.balance_momeys{
		color: #1C0000;
		font-size: 74rpx;
	}
	.withdrawals_btn{
		background: #74181B;
		color: #FFFFFF;
		width: 210rpx;
		height: 64rpx;
		font-size: 34rpx;
		border-radius: 16rpx;
		text-align: center;
		line-height: 64rpx;
	}
	.balance_list{
		width: 100%;
		background: white;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
	}
	.balance_del{
		width: 100%;
		border-bottom: 1rpx solid #F8F8F8;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #1C0000;
		font-size: 26rpx;
		line-height: 100rpx;
	}
	
	.right{
		font-size: 14rpx !important;
		color: #9A9A9A;
	}
</style>
