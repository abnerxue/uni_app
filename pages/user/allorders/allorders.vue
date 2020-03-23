<template>
	<view class="background">
		<view class="backs">
			<view class="order-tab">
				<view class="order-tabs">
					<view :class="orderid==1?'active':'order'" @click="orders(1)">全部</view>
					<view :class="orderid==2?'active':'order'" @click="orders(2)">待付款</view>
					<view :class="orderid==3?'active':'order'" @click="orders(3)">待收货</view>
					<view :class="orderid==4?'active':'order'" @click="orders(4)">待评价</view>
				</view>
			</view>
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
			<view class="backs">
				<view class="order-list" v-for="orderlists in orderlist">
					<view class="order-time">
						<text class="order-time-font">{{orderlists.orderTime}}</text>
						<text class="order-time-fonts" v-if="orderlists.payStatus==1&&orderlists.logisticsStatus==1">等待付款</text>
						<text class="order-time-fonts" v-if="orderlists.payStatus==2&&orderlists.logisticsStatus==1">支付未成功</text>
						<text class="order-time-fonts" v-if="orderlists.logisticsStatus==1&&orderlists.payStatus==3">待发货</text>
						<text class="order-time-fonts" v-if="orderlists.logisticsStatus==2&&orderlists.payStatus==3">已发货</text>
						<text class="order-time-fonts" v-if="orderlists.logisticsStatus==3&&orderlists.appraise==0">待评价</text>
					</view>
					<view v-for="list in orderlists.goods">
						<view class="order-image" @click="order_del(orderlists.id)">
							<view class="order-title-image">
								<image class="order-images" :src="list.thumb"></image>
								<view class="order-title" >{{list.title}}</view>
							</view>
							<view class="momey">
								<view class="momeys">￥{{list.price}}</view>
								<view class="order-number" >X{{list.number}}</view>
							</view>
						</view>
					</view>
					<view class="miaoshu" >共{{orderlists.goods.length}}商品<text class="xufukuai">需付款:</text>
					<text class="mome">￥{{orderlists.totalPrice}}</text></view>
					<view class="btns">
						<!-- 待付款状态 -->
						<view class="btn" v-if="orderlists.payStatus<=2 " @click="pay(orderlists.serialNumber)">去支付</view>
						<view class="btn" v-if="orderlists.payStatus<=2" @click="qux(orderlists.id)">取消订单</view>
						<!-- 待发货状态 -->
			<!-- 			<view class="btn" v-if="orderlists.logisticsStatus>=1&&orderlists.payStatus==3" @click="shoho(orderlists.id,list.gid,orderlists.returned_purchase)">申请售后</view> -->
						<view class="btn" v-if="orderlists.logisticsStatus<3&&orderlists.payStatus==3" @click="queren(orderlists.id)">确认收货</view>
						<view class="btn" v-if="orderlists.logisticsStatus<=3&&orderlists.payStatus==3" @click="tans(orderlists.logisticsStatus,orderlists.id)">查看物流</view>
						<!-- 待评价状态 -->
						<view class="btn" v-if="orderlists.logisticsStatus==3&&orderlists.payStatus==3&&orderlists.appraise==0" @click="comment(orderlists.id,orderlists)">评价</view>
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
				orderid: 0, //判断订单类型 un_payment待付款，un_received未收到货物，un_evaluated待评价，all所有(默认)，service售后
				page: 1,
				status: '', //订单类型
				orderlist: [], //订单列表
				tan: false, //弹窗
				quxiao:false,//提示
				orderIds:'',//订单id
				message:'',//提示内容
				id:'',//订单ID
			}
		},
		onShow() {
			let that = this;
			let token = uni.getStorageSync('token');
			server.postJSON('/api/order/get_list.html', {
				page: 1,
				span: 20,
				status: that.status,
				token: token
			}, res => {
				uni.hideLoading();
				var arr = [];
				for (var i in res.data.list) {
					arr.push(res.data.list[i]);
				}
				that.orderlist = arr;
			})
		},
		onLoad(option) {
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			that.orderid = option.orderid;
			if (option.orderid == 1) { //1 全部订单  2待付款  3 待收货  4待评价
				uni.setNavigationBarTitle({
					title: '全部订单'
				});
				that.status = "all"
			} else if (option.orderid == 2) {
				uni.setNavigationBarTitle({
					title: '待付款'
				});
				that.status = "un_payment"
			} else if (option.orderid == 3) {
				uni.setNavigationBarTitle({
					title: '待收货'
				});
				that.status = "un_received"
			} else {
				uni.setNavigationBarTitle({
					title: '待评价'
				});
				that.status = "un_evaluated"
			}
			let token = uni.getStorageSync('token');
			server.postJSON('/api/order/get_list.html', {
				page: 1,
				span: 20,
				status: that.status,
				token: token
			}, res => {
				console.log(res)
				uni.hideLoading();
				// that.orderlist = res.data.list;
				var arr = [];
				for (var i in res.data.list) {
					arr.push(res.data.list[i]);
				}
				that.orderlist = arr;
				console.log(that.orderlist)
			})
		},
		methods: {
			orders(orderids) {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.orderlist = '';
				that.orderid = orderids;
				if (orderids == 1) { //1 全部订单  2待付款  3 待收货  4待评价
					uni.setNavigationBarTitle({
						title: '全部订单'
					});
					that.status = "all"
				} else if (orderids == 2) {
					uni.setNavigationBarTitle({
						title: '待付款'
					});
					that.status = "un_payment"
				} else if (orderids == 3) {
					uni.setNavigationBarTitle({
						title: '待收货'
					});
					that.status = "un_received"
				} else {
					uni.setNavigationBarTitle({
						title: '待评价'
					});
					that.status = "un_evaluated"
				}
				let token = uni.getStorageSync('token');
				server.postJSON('/api/order/get_list.html', {
					page: 1,
					span: 20,
					status: that.status,
					token: token
				}, res => {
					uni.hideLoading();
					var arr = [];
					for (var i in res.data.list) {
						arr.push(res.data.list[i]);
					}
					that.orderlist = arr;
				})
			},
			// 查看物流
			tans(logisticsStatus,id) {
				let that = this;
				if (logisticsStatus == 1) {
					that.tan = true;
					that.message = '商品还未发货'
					setTimeout(function(){
						that.tan = false;
					}, 1000)
				} else {
					uni.navigateTo({
						url:'../logistics/logistics?id='+id
					})
				}
			},
			//申请售后
			shoho(orderid,gid,returned_purchase){ //orderid订单id   gid 商品id
				// uni.navigateTo({
				// 	url:"./return?id="+orderid+'&gid='+gid
				// })
				if(returned_purchase==0){
					uni.navigateTo({
						url:"./return?id="+orderid+'&gid='+gid
					})
				}else{
					uni.navigateTo({
						url:'./refund_details?id='+orderid
					})
				}
			},
			// 订单详情
			order_del(id){
				uni.navigateTo({
					url:'./order_details?id='+id
				})
				
			},
			// 取消订单
			quedin(){
				this.quxiao = false;
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				server.postJSON('/user/order/trash?ajax=true',{
					orderId:that.id
				},res=>{
					uni.hideLoading();
					that.tan = true;
					that.message = res.data.message;
					setTimeout(function(){
						that.tan = false;
					},1000)
				})
			},
			qux(id){ //获得订单id
				this.id = id;
				this.quxiao = true;
			},
			// 确认收货
			queren(id){
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				server.postJSON('/user/order/confirm_receive?ajax=true',{
					orderId:id
				},res=>{
					that.message = res.data.message;
					uni.hideLoading();
					that.tan = true;
					setTimeout(function(){
						that.tan = false
					},1000)
				})
			},
			// 去评价
			comment(id,list){
				var goods = {}
				goods.name = list.goods[0].title;
				goods.thumb = list.goods[0].thumb;
				uni.setStorageSync('good',goods);
				uni.navigateTo({
					url:'./comment?id='+id
				})
			},
			pay(serialNumber){
				uni.navigateTo({
					url:'../../order/pay?serialNumber='+serialNumber
				})
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this;
			let token = uni.getStorageSync('token');
			that.page = 1;
			server.postJSON(
				'/api/order/get_list.html', {
					page: 1,
					span: 20,
					status: that.status,
					token: token
				},
				function(res) {
					uni.hideLoading();
					var arr = [];
					for (var i in res.data.list) {
						arr.push(res.data.list[i]);
					}
					that.orderlist = arr;
					setTimeout(function() {
						uni.stopPullDownRefresh();
					}, 1000);
				}
			);
		},
		//上拉数据
		onReachBottom() { //触底获取新的商品
			let that = this;
			let token = uni.getStorageSync('token');
			uni.showLoading({
				title: '加载中'
			});
			that.page += 1;
			server.postJSON(
				'/api/order/get_list.html', {
					page: that.page,
					span: 20,
					status: that.status,
					token: token
				},
				function(res) {
					for (var i in res.data.list) {
						that.orderlist.push(res.data.list[i]);
					}
					uni.hideLoading();
				}
			);
		},
	}
</script>

<style>
	/* .background {
	background: #f5f5f5;
	min-height: 100%;
} */
	.backs {
		background: #F5F5F5;
	}

	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #F5F5F5;
	}

	.order-tab {
		position: relative;
		width: 100%;
		height: 72rpx;	
	}

	.order-tabs {
		/* margin: 4rpx 0; */
		position: fixed;
		width: 100%;
		height: 72rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: space-around;
		background: white;
		z-index: 50;
	}

	.active {
		color: #74181B;
		padding: 0 20rpx;
		height: 100%;
		line-height: 72rpx;
		border-bottom: 2px solid #74181B;
	}

	.order {
		padding: 0 20rpx;
		height: 100%;
		line-height: 72rpx;
	}

	.order-list {
		padding: 30rpx 40rpx;
		box-sizing: border-box;
		width: 100%;
		
		background: white;
		margin-bottom: 16rpx;
	}

	.order-time {
		display: flex;
		justify-content: space-between;
	}

	.order-time-font {
		font-size: 28rpx;
		color: #9A9A9A;
	}

	.order-time-fonts {
		font-size: 28rpx;
		color: #74181B;
	}

	.order-image {
		display: flex;
		height: 142rpx;
		width: 100%;
		justify-content: space-between;
		margin: 30rpx 0;
	}

	.order-images {
		height: 142rpx;
		width: 142rpx;
	}

	.order-title {
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		width: 344rpx;
		height: 82rpx;
		font-size: 30rpx;
		color: #1C0000;
		margin-left: 20rpx;
	}

	.order-title-image {
		display: flex;
	}

	.momey {
		display: flex;
		flex-direction: column;

	}

	.momeys {
		font-size: 28rpx;
		color: #1C0000;
	}

	.order-number {
		font-size: 28rpx;
		color: #808080;
		text-align: right;
		margin-top: 10rpx;
	}

	.miaoshu {
		width: 100%;
		text-align: right;
		font-size: 28rpx;
		color: #9A9A9A;
	}

	.xufukuai {
		font-size: 28rpx;
		color: #1C0000;
	}

	.mome {
		font-size: 30rpx;
		color: #DD0812;
	}

	.btns {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-top: 30rpx;
	}

	.btn {
		font-size: 28rpx;
		border: 1px solid #74181B;
		width: 160rpx;
		height: 62rpx;
		box-sizing: border-box;
		color: #74181B;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		justify-content: center;
	}
</style>
