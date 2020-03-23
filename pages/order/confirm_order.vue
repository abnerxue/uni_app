<template>
	<view>
		<view class="back">
			<view class="confirm_order">
				<!-- 选择地址 -->
				<view class="address" @click="choose_address">
					<view class="address_name_phone">
						<view class="address_name">
							<view>{{address.name}}</view>
							<view class="phone">{{address.phone}}</view>
						</view>
						<view class="address_add">{{address.province}}{{address.city}}{{address.county}}{{address.address}}</view>
					</view>
					<view class="icons">></view>
				</view>
				<view class="goods">
					<view class="goods_news" v-for="good in goods">
						<image :src="good.thumb" class="goods_image"></image>
						<view class="goods_title_price">
							<view class="goods_title">{{good.title}}</view>
							<view class="goods_price">￥{{good.price}}</view>
						</view>
						<view class="goods_number">x{{good.number}}</view>
					</view>
					<view class="line"></view>
					<view class="goods-other">
						<view>配送运费</view>
						<view class="font">￥{{order_news.postage}}</view>
					</view>
					<view class="line"></view>
					<view class="goods-other" @click="remarks=!remarks">
						<view>订单备注：</view>
						<view class="font"><text class="iconfont icon-right iconrights"></text></view>
					</view>
					<view class="beizu" v-show="remarks==true"><textarea maxlength="100" v-model="pay_data.memo" class="beizus" placeholder="填写订单备注（100字以内）"></textarea></view>
				</view>
				<view class="total">
					<view class="freight">
						<view>商品金额</view>
						<view class="font">￥{{order_news.goodsTotal}}</view>
					</view>
					<view class="line"></view>
					<view class="freight" @click="choose_redpaper()">
						<view>红包</view>
						<view v-if="order_news.redPaper!=null&&order_news.redPaper!=''" class="font">￥{{redPapers}}</view>
						<view v-else class="font">无可用红包</view>
					</view>
					<view class="line"></view>
					<view class="freight">
						<view>合计</view>
						<view class="momey">￥{{totalMoneys}}</view>
					</view>
				</view>
			</view>
			<view class="zhifu">
				<view class="zhifus">
					<view class="zhifu-totalMoneys">还需支付：<text class="totalMoneys">￥{{totalMoneys}}</text></view>
					<view class="zhifu-btn" @click="pay()">去支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server')
	export default {
		data() {
			return {
				gid: '', //商品id
				number: '', //数量
				goods: [], //商品
				order_news: {}, //订单信息
				redPapers: 0.00, //红包
				totalMoneys: 0.00, //需支付
				activityId: 0, //活动id
				id: 0, //  1 团购  2 秒杀  4积分换购
				activityLaunchId: 0, //发起活动的id
				address: {}, //地址
				redPaperId: 0, //红包id
				addressId: 0, //地址id
				url: '', //接口地址
				urls: '', //生成订单地址
				data: {
					gid: 0, //商品id
					number: 0, //数量
					token: uni.getStorageSync('token'),
					activityId: 0, //活动id
					activity: 0, //1团购，2秒杀，3砍价，4积分换购
					activityLaunchId: 0, //发起的活动id
					cart: [], //购物车id
				},
				pay_data: {
					token: uni.getStorageSync('token'),
					gid: 0,
					number: 0,
					redPaperId: 0,
					addressId: {},
					activity: 0,
					activityId: 0,
					activityLaunchId: 0,
					cart: [],
					memo:''
				},
				remarks: false,
				cart_list_id: [], //购物车id
			}
		},
		methods: {
			// 选择红包
			choose_redpaper() {
				uni.navigateTo({
					url: './choose_redPaper'
				})
			},
			// 选择地址
			choose_address() {
				uni.navigateTo({
					url: '../user/address/address_list?id=1'
				})
			},
			// 生成订单
			pay() {
				let that = this;
				that.pay_data.gid = that.data.gid;
				that.pay_data.number = that.data.number;
				that.pay_data.redPaperId = that.redPaperId;
				that.pay_data.addressId = that.address.id;
				that.pay_data.activity = that.data.activity;
				that.pay_data.activityId = that.data.activityId;
				that.pay_data.activityLaunchId = that.data.activityLaunchId;
				that.pay_data.cart = that.data.cart;
				server.postJSON(that.urls, that.pay_data, res => {
					console.log(that.pay_data)
					if (res.data.code == 1) {
						uni.redirectTo({
							url: './pay?serialNumber=' + res.data.serialNumber
						})
					}
				})
			}
		},
		onShow() {
			let token = uni.getStorageSync('token');
			let that = this;
			server.postJSON(that.url, that.data, res => {
				that.goods = res.data.goodsList; //商品信息
				if (uni.getStorageSync('address') == '' || uni.getStorageSync('address') == null) {
					that.address = res.data.address[0]; //默认地址
				} else {
					that.address = uni.getStorageSync('address');
				}
				that.order_news = res.data;
				if (uni.getStorageSync('redpaper_price') == '' || uni.getStorageSync('redpaper_price') == null) {
					that.redPapers = res.data.redPaper[0].redPaper / 100;
				} else {
					that.redPapers = uni.getStorageSync('redpaper_price'); //红包
					that.redPaperId = uni.getStorageSync('redpaper_Id'); //红包
				}
				that.totalMoneys = res.data.totalMoney - that.redPapers; //还需支付
			})
		},
		onLoad(option) {
			let token = uni.getStorageSync('token');
			uni.setStorageSync('redpaper_price', '');
			uni.setStorageSync('redpaper_Id', '');
			uni.setStorageSync('address', '');
			let that = this;
			that.data.gid = option.gid; //商品id
			that.data.number = option.number; //购买数量
			that.data.activity = option.id; //1 团购  2 秒杀  4积分换购
			that.data.activityId = option.activityId; //活动ID
			that.data.activityLaunchId = option.activityLaunchId; //参与团购的id
			uni.setStorageSync('gid', option.gid) 
			uni.setStorageSync('number', option.number)
			if (option.cartid != undefined) {
				that.url = '/api/cart/pay_now?ajax=true';
				that.urls = '/api/cart/settle_accounts_ajax?ajax=true'
				that.data.cart = uni.getStorageSync('cart');
			} else {
				that.url = '/api/goods/settle_accounts?ajax=true'
				that.urls = '/api/goods/buy?ajax=true'
			}
			server.postJSON(that.url, that.data, res => {
				that.address = res.data.address[0]; //默认地址
				that.goods = res.data.goodsList;
				that.order_news = res.data;
				uni.setStorageSync('redPaper', res.data.redPaper);
				if (res.data.redPaper == null || res.data.redPaper == false || res.data.redPaper == '' || res.data.redPaper ==
					'null') {
					uni.setStorageSync('redpaper_price', 0.00);
				} else {
					that.redPapers = res.data.redPaper[0].redPaper / 100;
					that.redPaperId = res.data.redPaper[0].id
				}
				that.totalMoneys = res.data.totalMoney - that.redPapers; //还需支付
			})
		}
	}
</script>

<style>
	.back {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #F5F5F5;
	}

	.confirm_order {
		background: #F5F5F5;
		color: #1C0000;
		padding-bottom: 30rpx;
	}

	.address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		height: 168rpx;
		width: 100%;
		background: white;
		font-size: 28rpx;
	}

	.address_name_phone {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}

	.address_name {
		display: flex;
	}

	.phone {
		margin-left: 60rpx;
	}

	.address_add {
		color: #808080;
	}

	.goods {
		box-sizing: border-box;
		width: 100%;
		background: white;
		margin-top: 20rpx;
	}

	.goods_news {
		height: 210rpx;
		width: 100%;
		padding: 30rpx 0rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-content: space-between;
	}

	.goods_image {
		padding-left: 30rpx;
		width: 146rpx;
		height: 146rpx;
	}

	.goods_title_price {
		width: 488rpx;
		height: 146rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 20rpx;
	}

	.goods_title {
		font-size: 28rpx;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.goods_price {
		color: #DD0812;
		font-size: 30rpx;
	}

	.goods_number {

		display: flex;
		align-items: flex-end;
		color: #808080;
		font-size: 28rpx;
	}

	.goods-other {
		padding: 0 30rpx;
		height: 88rpx;
		width: 690rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #1C0000;
	}

	.beizu {
		/* padding: 0 30rpx; */
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 158rpx;
	}

	.beizus {
		border: 1px solid #F5F5F5;
		width: 100%;
		border-radius: 8rpx;
		height: 130rpx;
		color: #9A9A9A;
		font-size: 26rpx;
		padding: 16rpx 20rpx;
		box-sizing: border-box;
	}

	.freight {
		padding: 0 30rpx;
		height: 88rpx;
		width: 690rpx;
		background: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #1C0000;
	}

	.line {
		width: 100%;
		height: 1px;
		background: #F8F8F8;
		;
	}

	.font {
		font-size: 28rpx;
		color: #808080;
	}

	.iconrights {
		font-size: 26rpx;
	}

	.input {
		text-align: end;
	}

	.total {
		margin-top: 10rpx;
		box-sizing: border-box;
		background: white;
	}

	.momey {
		color: #DD0812;
		font-size: 28rpx;
	}

	.zhifu {
		position: relative;
		width: 100%;
		height: 98rpx;
		background: #F5F5F5;
	}

	.zhifus {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98rpx;
		background: white;
		display: flex;
		align-items: center;
		color: #1C0000;
		font-size: 28rpx;
		justify-content: flex-end;
	}

	.zhifu-btn {
		height: 100%;
		width: 210rpx;
		line-height: 106rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 28rpx;
		background: #DD0812;
	}

	.totalMoneys {
		color: #DD0812;
		font-size: 30rpx;
	}

	.zhifu-totalMoneys {
		margin-right: 20rpx;
	}
</style>
