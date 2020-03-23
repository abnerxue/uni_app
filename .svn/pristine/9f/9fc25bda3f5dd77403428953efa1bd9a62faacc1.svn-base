<template>
	<view>
		<view class="back">
			<view class="group_list">
				<view class="group_good" v-for="group in group_list">
					<view class="good_news" >
						<view class="group_time_news">
							<view>{{group.postTimeDate}}</view>
							<view class="state_1" v-if="group.status==1">拼团中,差{{group.goodsNum-group.joinNum}}人</view>
							<view class="state_1" v-if="group.status==2"><image src="../../../static/group/fail.png"></image></view>
							<view class="state_1" v-if="group.status==3"><image src="../../../static/group/success.png"></image></view>
						</view>
						<view class="group_good_news" >
							<view class="group_good_image_title">
								<image class="group_good_image" :src="group.thumb"></image>
								<view class="group_good_title">{{group.title}}</view>
							</view>
							<view class="group_price_number">
								<view class="group_price">￥{{group.price}}</view>
								<view class="group_number">x1</view>
							</view>
						</view>
					</view>
					<view class="good_btn">
						<view class="time">
							<view  class="time" v-if="group.status==1">倒计时<view class="example-body"><uni-countdown class="example-body" :minute="0" splitorColor="#DD0812" color="#DD0812" :second="group.timeRemaining" /></view></view>
						</view>
						<view class="btns_del" @click="order_del(group.id)">拼团详情</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../../utils/server');
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		data() {
			return {
				group_list:[],//团购订单列表
				page:1
			}
		},
		components: {
			uniCountdown, 
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			let that = this;
			let token = uni.getStorageSync('token');
			server.postJSON('/group/group_initiate?ajax=true', {
				page: 1,
				span: 15,
				token: token,
				activity:1,
			}, res => {
				that.group_list = res.data.list;
				uni.hideLoading();
			})
		},
		methods: {
			// 拼团详情
			order_del(id){
				uni.navigateTo({
					url:'./group_del?id='+id
				})
			}
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '加载中'
			});
			let that = this;
			let token = uni.getStorageSync('token');
			server.postJSON('/group/group_initiate?ajax=true', {
				page: 1,
				span: 15,
				token: token,
				activity:1,
			}, res => {
				that.group_list = res.data.list;
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.hideLoading();
				}, 1000);
			})
		},
		//上拉数据
		onReachBottom() { //触底获取新的商品
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			that.page += 1;
			let token = uni.getStorageSync('token');
			server.postJSON('/group/group_initiate?ajax=true', {
				page: that.page,
				span: 15,
				token: token,
				activity:1,
			}, res => {
				let result = res.data.list;
				for (var i in result) {
					that.group_list.push(result[i]);
				}
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
			})
		},
	}
</script>

<style>
	.example-body{
		color: #DD0812;
	}
	.group_list {
		width: 100%;
		background: #F5F5F5;
	}

	.group_good {
		height: 336rpx;
		width: 100%;
		background: white;
		margin-bottom: 20rpx;
	}

	.good_news {
		width: 100%;
		height: 250rpx;
		border-bottom: 1px solid #F9F9F9;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.group_time_news {
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #9A9A9A;
		/* position: relative; */
	}

	.state_1 {
		color: #74181B;
	}
	.state_1 image{
		position: absolute;
		right: 0;
		top: 0;
		height:60rpx;
		width: 192rpx;
	}

	.good_btn {
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.time{
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.btns_del {
		width: 160rpx;
		height: 56rpx;
		border-radius: 30rpx;
		border: 1px solid #74181B;
		color: #74181B;
		font-size: 28rpx;
		text-align: center;
		line-height: 56rpx;
	}

	.btns_Invitation {
		width: 160rpx;
		height: 56rpx;
		border-radius: 30rpx;
		color: white;
		font-size: 28rpx;
		text-align: center;
		background: #DD0812;
		line-height: 56rpx;
		margin-right: 20rpx;
	}

	.group_good_news {
		width: 100%;
		height: 140rpx;
		display: flex;
		justify-content: space-between;
	}

	.group_good_image_title {
		display: flex;
		font-size: 30rpx;
		color: #1C0000;
		width: 580rpx
	}

	.group_good_image {
		height: 100%;
		width: 140rpx;
	}

	.group_good_title {
		width: 400rpx;
		margin-left: 20rpx;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.group_price_number {
		color: #1C0000;
		font-size: 28rpx;
	}

	.group_number {
		color: #808080;
		text-align: end;
		margin-top: 10rpx;
	}
</style>
