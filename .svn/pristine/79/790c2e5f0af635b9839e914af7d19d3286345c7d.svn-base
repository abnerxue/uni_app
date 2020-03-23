<template>
	<view>
		<view class="back">
			<view class="tan" v-show="tan">
				<text>{{message}}</text>
			</view>
			<view class="backs">
				<view class="wu" v-show="address_list==null">
					<view><image src="../../../static/sticon/address.png"></image></view>
					<view><text>暂无收货地址</text></view>
				</view>
				<view class="address" v-for="(addresss,index) in address_list">
					<radio-group @change="radioChange">
						<view class="address-list">
							<view class="address-name">
								<view class="addname">{{addresss.name}}</view>
								<view class="haoma">{{addresss.phone}}</view>
							</view>
							<view class="addres">
								{{addresss.city}}{{addresss.county}}{{addresss.address}}
							</view>
						</view>
						<view class="address-del" @click="address(addresss.name,addresss.phone,addresss.city,addresss.county,addresss.address,addresss.id)">
							<view v-if="addresss.default == 1">
								<radio :checked="addresss.default == 1" color="#DD0812" :value="addresss.id" style="transform: scale(0.6);" />
								<text class="moren" v-if="id==0">默认地址</text>
							</view>
							<view v-else>
								<radio :checked="addresss.default == 1" color="#DD0812" :value="addresss.id" style="transform: scale(0.6);" />
								<text class="moren" v-if="id==0">设为默认</text>
							</view>
							<view class="del-address">
						 		<view @click="edit(addresss.name,addresss.countyId,addresss.default,addresss.phone,addresss.address,addresss.id)"><text class="iconfont icon-bianji icons"></text>编辑</view>
								<view @click="dels(addresss.id,addresss.default)"><text class="iconfont icon-shanchu icons"></text>删除</view>
							</view>
						</view>
					</radio-group>
				</view>
				<view class="btn" @click="new_address()">
					<view class="btns">新增地址</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../../utils/server')
	export default {
		data() {
			return {
				address_list: [], //地址列表
				current: 0, // 单选按钮
				tan:false, //提示状态
				message:'',//提示信息
				id:0,//判断是从订单页面进入的还是我的页面进入的
			}
		},
		onLoad(option) {
			let that = this;
			that.id = option.id;
			uni.showLoading({
				title: '加载中'
			});
			server.postJSON('/api/address/get_list?ajax=true', res => {// 获取地址列表
				that.address_list = res.data.list;
				uni.hideLoading();
			})
		},
		methods: {
			// 设为默认
			radioChange(evt) {
				let that = this;
				if(that.id==0){
					server.postJSON('/user/address/set_default',{
						id:evt.target.value
					},res=>{
						uni.showLoading({
							title: '加载中'
						});
						uni.hideLoading();
						uni.redirectTo({
							url: 'address_list?id=0'
						});
					})
				}
				for (let i = 0; i < that.address_list.length; i++) {
					if (that.address_list[i].id === evt.target.value) {
						that.current = i;
						break;
					}
				}
			},
			// 删除地址
			dels(id,defaults){
				let that = this;
				if(defaults!=1){
					server.postJSON('/user/address/del',{
						id:id
					},res=>{
						that.tan = true;
						that.message = "删除成功"
						setTimeout(function(){
							uni.redirectTo({
								url: 'address_list'
							});
						},1000)
					})
				}else{
					that.message = "不能删除默认地址"
					that.tan = true;
					setTimeout(function(){
						that.tan = false;
					},1000)
				}
			},
			//跳转新增地址
			new_address(){
				uni.navigateTo({
					url:"./new_address"
				})
			},
			// 修改地址
			edit(name,countyId,defaults,phone,address,id){
				uni.navigateTo({
					url:"./new_address?name="+name+'&countyId='+countyId+'&defaults='+defaults+'&phone='+phone+'&address='+address+'&id='+id
				})
			},
			// 选择地址
			address(name,mobel,city,county,del_address,id){
				var obj ={}
				obj.name = name;
				obj.phone = mobel;
				obj.city = city;
				obj.county = county;
				obj.address = del_address;
				obj.id = id;
				if(this.id!=0){
					uni.setStorageSync('address',obj)
				}
			}
		},
		onPullDownRefresh() {
			let that = this;
			server.postJSON('/api/address/get_list?ajax=true', res => {
				that.address_list = res.data.list;
				uni.stopPullDownRefresh();
				uni.hideLoading();
			})
		},
	}
</script>

<style>
	.back {
		height: 100%;
		width: 100%;
		background: #F5F5F5;
		position: absolute;
	}

	.backs {
		background: #F5F5F5;
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
	.address {
		background: white;
		width: 100%;
		height: 236rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		margin-top: 4rpx;
	}

	.address-list {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		height: 154rpx;
		font-size: 28rpx;
		padding: 30rpx 0;
	}

	.addres {
		color: #808080;
	}

	.address-name {
		color: #1C0000;
		display: flex;

	}
	.addname{
		/* width: 150rpx; */
	}
	.haoma {
		margin-left: 40rpx;
	}

	.address-del {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding-right:50rpx;
		box-sizing: border-box;
	}
	.moren{
		font-size:26rpx;
		color: #1C0000;
	}
	.del-address{
		width: 180rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #9A9A9A;
		font-size: 26rpx;
	}
	.icons{
		font-size: 24rpx;
	}
	.btn{
		position: relative;
		width: 100%;
		height: 100rpx;
		margin-top: 20rpx;
	}
	.btns{
		position: fixed;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		background:#74181B;
		color: #FFFFFF;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
