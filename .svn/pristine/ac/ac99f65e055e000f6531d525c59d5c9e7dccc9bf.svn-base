<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!--#endif-->
		<!-- 自定义导航栏 -->
		<view class="head">
			<view class="heads">
				<view></view>
				<view class="cart_title">购物车({{length}})</view>
				<view class="edit" @click="edit=false" v-show="edit==true">编辑</view>
				<view class="edit" @click="edit=true" v-show="edit==false">完成</view>
			</view>
		</view>
		<!-- 提示弹窗 -->
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<view class="tishi" v-show="quxiao">
			<view class="tishis">
				<view class="tishis-content">确认删除该商品吗？</view>
				<view class="tishi-btn">
					<view class="quxiaos" @click="quxiaos">取消</view>
					<view class="quedin" @click="quedin()">确定</view>
				</view>
			</view>
		</view>
		<view class="back">
			<view class="wu" v-if="cart_list==''||cart_list.length==0">
				<view><image src="../../../static/sticon/gouwu.png"></image></view>
				<view @click="go()"><text>购物车还是空的，您还可以<text class="go">再逛逛</text></text></view>
			</view>
			<view class="cart-content">
				<checkbox-group @change="cart_lists">
					<view class="cart-goods" v-for="(list,index) in cart_list" :key="list.id">
						<checkbox :value="list.id" @click="check('item', index,list.gid)" color="#DD0812" style="transform: scale(0.8);"></checkbox>
						<view>
							<image class="cart-goods-image" :src="list.thumb" @click="del(list.gid)"></image>
						</view>
						<view class="cart-goods-title-momey">
							<view class="goods-title" @click="del(list.gid)">{{list.title}}</view>
							<view class="goods-momey-number">
								<view class="goods-momey">￥{{list.price}}</view>
								<view class="goods-number"> 
									<view class="btn" @click="_calcValue('subtract', index)"><text>-</text></view>
									<input class="btn1" type="number" :disabled="disabled" :value="list.number" />
									<view class="btn"  v-if="list.inventory>list.number" @click="_calcValue('add', index)"><text>+</text></view>
									<view class="btn" v-if="list.inventory<=list.number" @click="Prompt()"><text>+</text></view>
								</view>
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>
		</view>
		<!-- 底部栏结算 -->
		<view class="settlements">
			<view class="settlem">
				<view class="quanxuan">
				</view>
				<view class="jiesuan">
					<view class="heji" v-show="edit==true">
						<view class="totals">
							合计：<text class="momeys">￥{{totalPrice}}</text>
						</view>
						<view class="yunf">
							不含运费
						</view>
					</view>
					<view class="btn-settlement" @click="settlement()" v-show="edit==true">结算({{numb}})</view>
					<view class="btn-settlement" @click="quxiao=true" v-show="edit==false">删除</view>
				</view>
			</view>
		</view>
		<bottomtabbar tags="4"></bottomtabbar>
	</view>
</template>

<script>
	import bottomtabbar from 'pages/bottomtabbar/bottomtabbar';
	const server = require('../../utils/server.js')
	export default {
		data() {
			return {
				cart_list: [], //购物车列表
				length: 0, //购物车数量
				number: 0,
				message: '', //提示信息
				tan: false, //提示信息
				quxiao: false, //提示信息
				gid:[], //商品gid
				totalPrice: 0, //合计价格
				numb: 0, //结算数量
				cart_list_id: [], //选中商品的id
				edit:true,//是否是删除
				disabled: true,
			}
		},
		components: {
			bottomtabbar
		},
		methods: {
			go(){
				console.log("1111111111")
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
			cart_lists(e) {
				this.numb = e.detail.value.length;
				this.cart_list_id = e.detail.value
			},
			// 跳转详情页
			del(id) {
				let token = uni.getStorageSync('token');
				let that = this;
				uni.navigateTo({
					url: '../product/product_details?gid=' + id
				})
			},
			// 增加数量
			add(gid) {
				let token = uni.getStorageSync('token');
				let that = this;
				server.postJSON('/user/cart/add?ajax=true', {
					gid: gid,
					number: 1,
				}, res => {})
				this.updateTotalPrice();
			},
			Prompt() {
				let that = this;
				that.tan = true;
				that.message = '商品库存不足,无法继续添加';
				setTimeout(function() {
					that.tan = false;
				}, 1000)
			},
			// 减少数量
			reduce(gid) {
				let token = uni.getStorageSync('token');
				let that = this;
				that.gid = gid;
				server.postJSON('/user/cart/add?ajax=true', {
					gid: gid,
					number: -1,
				}, res => {
				
				})
				this.updateTotalPrice();
				// @click="_calcValue('subtract', index)"
			},
			_calcValue: function(type, index) {
				let that = this;
				let gid = that.cart_list[index].gid;
				let token = uni.getStorageSync('token');
				let number = 1;
				if (type == 'subtract') {
					number = -1;
				}
				if (that.cart_list[index].number < 2 && type == 'subtract') {
					// uni.showModal({
					// 	title: '提示',
					// 	content: '确定要删除购物车中的商品？',
					// 	success: showResult => {
					// 		if (showResult.confirm) {
					// 			//确定删除
					// 			that.updateCart(gid, number, index);
					// 		}
					// 	}
					// });
				} else {
					that.updateCart(gid, number, index);
				}
			},
			updateCart(gid, number, index) {
				var that = this;
				server.postJSON(
					'/user/cart/add?ajax=true',
					{
						token: uni.getStorageSync('token'),
						gid: gid,
						number: number
					},
					function(res) {
						// console.log(res)
						if (res.data.code == '0') {
							if (type == 'subtract') {
								server.showErr('更新购物车失败');
							} else {
								server.showErr('加入购物车失败');
							}
						} else {
							var temp = parseInt(that.cart_list[index].number) + number;
							if (temp < 1) {
								that.cart_list.splice(index, 1);
							} else {
								that.cart_list[index].number = temp;
							}
							that.updateTotalPrice();
						}
					}
				);
			},
			// 删除购物车商品
			quedin() {
				let that = this;
				that.quxiao = false;
				uni.showLoading({
					title: '加载中'
				});
				let gid = that.gid;
				for(var i in gid){
					server.postJSON('/user/cart/del', {
						gid: gid[i],
						token:uni.getStorageSync('token')
					}, res => {
						that.message = res.data.message;
					})
				}
				uni.hideLoading();
				that.tan = true;
				setTimeout(function() {
					that.tan = false
					uni.redirectTo({
						url: 'cart'
					});
				}, 1000)
			},
			quxiaos() {
				uni.redirectTo({
					url: 'cart'
				});
			},
			//计算总价
			updateTotalPrice() {
				let that = this;
				let list = that.cart_list;
				if (list.length === 0) {
					return;
				}
				let totalPrice = 0;
				list.forEach(item => {
					if (item.checked === true) {
						totalPrice += item.price * item.number;
					}
				});
				that.totalPrice = server.cent2dollar(totalPrice * 100);
			},
			check(type, index,gid) {
				this.gid.push(gid)
				if (type === 'item') {
					this.cart_list[index].checked = !this.cart_list[index].checked;
				}
				this.updateTotalPrice();
			},
			//结算
			settlement() {
				let that = this;
				if(that.cart_list_id.length==0){
					that.tan = true;
					that.message = '请选择需要结算的商品'
					setTimeout(function(){
						that.tan = false;
					},1500)
				}else{
					uni.setStorageSync('cart', that.cart_list_id)
					uni.navigateTo({
						url: '../order/confirm_order?cartid=' + that.cart_list_id[0]
					})
				}
			},
		},
		onShow(){
		
		},
		onLoad() {
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			server.postJSON(
				'/api/cart/get_list?ajax=true', {
					token: uni.getStorageSync('token')
				}, res => {
					let result = res.data.cart;
					that.length = res.data.cart.length;
					if (res.data.login == '0') {
						uni.navigateTo({
							url: '../login/login'
						})
					} else if (res.data.code != 1) {
						server.showErr('网络延迟，请重新请求');
					} else if (result.length > 0) {
						for (var i in result) {
							result[i].checked = false;
							that.cart_list.push(result[i]);
						}
						that.updateTotalPrice();
					}
					if (res.data.code == 1) {
						uni.hideLoading();
					}
				}
			);
		},
	}
</script>

<style>
	.heads {
		position: fixed;
		width: 100%;
		height: 90rpx;
		background: white;
		line-height: 90rpx;
		color: #1C0000;
		text-align: center;
		font-size: 34rpx;
		font-weight: 600;
		z-index: 60;
		box-shadow: 0 3px 15px #F5F5F5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	
	.edit{
		color: #808080;
		font-size: 26rpx;
	}
	
	.cart_title{
		margin-left: 40rpx;
	}
	.settlements {
		position: fixed;
		bottom: 0;
		height: 106rpx;
		width: 100%;
		background: white;
		margin-bottom: 100rpx;
		z-index: 30;
	}

	.settlem {
		position: relative;
		height: 106rpx;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		color: #1C0000;
		font-size: 28rpx;
		border-bottom: 1rpx solid #DCDFE6;
	}

	.back {
		position: absolute;
		background: #F5F5F5;
		width: 100%;
		height: 80%;
		margin-bottom: 100rpx;
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
		width: 300rpx;
		height: 160rpx;
	}
	.go{
		color: #74181B;
	}
	.cart-content {
		background: #F5F5F5;
		margin-bottom: 200rpx;
	}

	.cart-goods {
		background: white;
		padding: 20rpx 20rpx;
		width: 100%;
		height: 230rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.cart-goods-image {
		width: 146rpx;
		height: 146rpx;
	}

	.cart-goods-title-momey {
		height: 146rpx;
		width: 480rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 20rpx;
	}

	.goods-title {
		height: 80rpx;
		width: 480rpx;
		color: #1C0000;
		font-size: 28rpx;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		word-wrap: break-word;
		word-break: normal;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.goods-momey-number {
		display: flex;
		justify-content: space-between;
	}

	.goods-momey {
		font-size: 30rpx;
		color: #DD0812;
	}

	.goods-number {
		width: 170rpx;
		height: 52rpx;
		display: flex;
	}

	.btn {
		width: 52rpx;
		height: 52rpx;
		border: 1rpx solid #C9C9C9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #130000;
	}
	.btn1{
		height: 52rpx;
		border: 1rpx solid #C9C9C9;
		text-align: center;
		font-size: 26rpx;
		color: #130000;
		width:30%;
	}
	.jiesuan {
		height: 100%;
		display: flex;
	}

	.quanxuan {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.btn-settlement {
		height: 104rpx;
		width: 188rpx;
		background: #DD0812;
		color: #FFFFFF;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.heji {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 20rpx;
	}

	.momeys {
		font-size: 30rpx;
		color: #DD0812;
	}

	.yunf {
		color: #808080;
		font-size: 22rpx;
		text-align: right;
	}
</style>
