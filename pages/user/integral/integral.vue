<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<view class="back">
			<!-- 顶部栏 -->
			<view class="top_column">
				<view class="top_columns">
					<navigator open-type="navigateBack"><text class="iconfont icon-left"></text></navigator>
					<view class="top_column_title">我的积分</view>
					<view></view>
				</view>
			</view> 
			<view class="integral">
				<view class="keyon_integral">
					<view>
						<view class="integrals">{{userinfo.score}}</view>
						<view  class="font_integrals">我的可用积分</view>
					</view>
				</view>
				<view class="integral_details">
					 <view class="details_title">积分明细</view>
					 <view class="details_tabber">
						 <view :class="tag==1?'active':'shoru'" @click="tag=1">收入</view>
						 <view :class="tag==2?'active':'shoru'" @click="tag=2">支出</view>
					 </view>
				</view>
				<view class="wu" v-show="scoreList==null">
					<view><image src="../../../static/sticon/jifen.png"></image></view>
					<view><text>暂无积分明细</text></view>
				</view>
				<view v-show="tag==1">
					<view class="goods" v-for="score in scoreList" v-if="score.score>=1">
						<view class="goods_news">
							<image class="goods_image" src="../../../static/product.png"></image>
							<view class="goods_ti">
								<view class="goods_title">天然A货翡翠弥勒佛吊坠 带证书正品包邮</view>
								<view class="goods_gowu">购物送积分<text class="add_integrals_time">{{score.postTime}}</text></view>
							</view>
						</view>
						<view class="add_integrals">+{{score.score}}</view>
					</view>
				</view>
				<view v-show="tag==2">
					<view class="goods" v-for="score in scoreList" v-if="score.score<1">
						<view class="goods_news">
							<image class="goods_image" src="../../../static/product.png"></image>
							<view class="goods_ti">
								<view class="goods_title">天然A货翡翠弥勒佛吊坠 带证书正品包邮</view>
								<view class="goods_gowu">购物送积分<text class="add_integrals_time">{{score.postTime}}</text></view>
							</view>
						</view>
						<view class="add_integrals">-{{score.score}}</view>
					</view>
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
				tag:1,
				userinfo:{},//总积分
				scoreList:[],//收入列表
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token');
			let that = this;
			server.postJSON(
				'/api/user/home_index',
				{
					ajax: 'true',
					token: token
				},
				function(res) {
					that.userinfo = res.data.result;
				}
			);
			server.getJSON(
				'/api/user/get_score_list',
				{
					ajax: 'true',
					span: 15,
					page: 1,
					sort: 0,
					token: token
				},
				function(res) {
					that.scoreList = res.data.list;
				}
			);
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

	.top_column {
		position: relative;
		top: 0;
		width: 100%;
		height: 106rpx;
		background: white;
	}
	.top_columns{
		position: fixed;
		width: 100%;
		height: 106rpx;
		background: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 3px 2px #F5F5F5;
		padding: 0 20rpx;
		z-index: 50;
		box-sizing: border-box;
	}
	.top_column_title{
		color: #1C0000;
		font-size: 34rpx;
	}
	.integral{
		background: #F5F5F5;
		width: 100%;
		
	}
		
	.keyon_integral{
		width: 100%;
		height: 210rpx;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.integrals{
		color: #DD0812;
		text-align: center;
		font-size: 48rpx;
	}
	.font_integrals{
		font-size: 26rpx;
		color: #9A9A9A;
	}
	.integral_details{
		width: 100%;
		height: 160rpx;
		background: white;
		margin-top: 20rpx;
		color: #1C0000;
		font-size: 28rpx;
		padding:0 40rpx;
		box-sizing: border-box;
	}
	.details_title{
		width: 100%;
		height: 50%;
		display: flex;
		align-items: center;
	}
	.details_tabber{
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: space-around;
	}
	.shoru{
		height: 100%;
		display: flex;
		align-items: center;
		width: 100rpx;
		justify-content: center;
	}
	.active{
		border-bottom:1px solid #74181B;
		height: 100%;
		display: flex;
		align-items: center;
		color: #74181B;
		width: 100rpx;
		justify-content: center;
	}
	.wu{
		display: flex;
		flex-direction: column;
		color: #C3C3C3;
		font-size: 26rpx;
		height: 600rpx;
		width:100%;
		text-align: center;
		margin-top: 200rpx;
	}
	.wu image{
		width: 200rpx;
		height: 200rpx;
	}
	.goods{
		height: 220rpx;
		width: 100%;
		background: white;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.goods_news{
		height: 146rpx;
		display: flex;
	}
	.add_integrals{
		color: #DD0812;
		font-size: 48rpx;
		display: flex;
		align-items: center;
	}
	.goods_image{
		height: 100%;
		width: 146rpx;
	}
	.goods_ti{
		color: #1C0000;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left:30rpx;
	}
	.goods_title{
		width: 380rpx;
		height: 86rpx;
		
	}
	.goods_gowu{
		color: #B2B2B2;
		font-size: 26rpx;
	}
	.add_integrals_time{
		margin-left: 20rpx;
	}
</style>
