<template>
	<view class="agreementcontent">
		<view class="agreement-title">
			<text>淮南会会员服务协议</text>
		</view>
		<view class="agreement-time">
			<text>生效日期：2019年12月21日</text>
		</view>
		<view class="content">
			<text>提示条款</text>
		</view>
		<view class="content">
			<text>
				各服务条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用,不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表达
			</text>
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
	.agreementcontent{
		margin: 0 30rpx;
	}
	.agreement-title text{
		line-height: 70rpx;
	}
	.agreement-time text{
		line-height: 30rpx;
	}
.agreement-title,.agreement-time{
		text-align: center;
	}
	.agreement-title{
		height: 70rpx;
		font-size: 32rpx;
		font-weight: 550;
	}
	.agreement-time{
		height: 30rpx;
		font-size: 20rpx;
	}
	.content{
		margin-top: 20rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		text-align: left;
	}
</style>
