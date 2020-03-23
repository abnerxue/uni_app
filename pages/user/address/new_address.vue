<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>
		<!--  #endif -->
		<view class="back">
			<view class="top_column">
				<view class="top_columns">
					<navigator open-type="navigateBack"><text class="iconfont icon-left"></text></navigator>
					<view class="top_column_title">新增地址</view>
					<view class="baocun" @click="tianjia"><text>保存</text></view>
				</view>
			</view>
			<view class="tan" v-show="tan">
				<text>{{message}}</text>
			</view>
			<view class="newlist">
				<view class="new_address">
					<view class="name">
						<text class="name-title">姓名</text>
						<input type="text" class="input-address" placeholder="收货人姓名" v-model="name">
					</view>
				</view>
				<view class="new_address">
					<view class="name">
						<text class="name-title">电话</text>
						<input type="text" class="input-address" placeholder="收货人手机号" v-model="telephone">
					</view>
				</view>
				<view class="new_address">
					<view class="name">
						<text class="name-title">所在地区</text>
						<view  class="input-address" @click="showCityPicker">{{ address2.key }}</view>
					</view>
				</view>
				<view class="new_address">
					<view class="name">
						<text class="name-title">详细地址</text>
						<input type="text" class="input-address" placeholder="街道门牌、楼层房间号等信息" v-model="address_del">
					</view>
				</view>
				<view class="new_address">
					<radio-group class="default" @change="radioChange">
						<radio color="#DD0812" value="1" style="transform: scale(0.6);" />
						<text class="name-title">设为默认</text>
					</radio-group>
				</view>
			</view>
			<mpvue-city-picker
				:themeColor="themeColor"
				ref="mpvueCityPicker"
				:pickerValueDefault="cityPickerValueDefault"
				@onCancel="onCancel"
				@onConfirm="onConfirm"
			></mpvue-city-picker>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	const server = require('../../../utils/server');
	export default {
		data() {
			return {
				name: '', //姓名
				telephone: '', //电话
				address_del: '', //详细地址
				defaults: 0,
				address2: {
					key: '选择省/市/区',
				},
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#d81e06',
				CountyId:'',//县id
				showPicker: false,/* 是否显示控件 */
				message:'',//提示信息
				tan:false, //提示状态
				addressid:'',//地址id
			}
		},
		components: {
			mpvueCityPicker,
		},
		onLoad(option) {
			let that = this;
			if(JSON.stringify(option)!='{}'){
				that.name = option.name;
				that.CountyId = option.countyId;
				that.defaults = option.defaults;
				that.telephone = option.phone;
				that.address_del = option.address;
				that.addressid = option.id;
				uni.setNavigationBarTitle({
					title: '编辑地址'
				});
			}
		},
		methods: {
			// 设为默认
			radioChange(evt) {
				this.defaults = evt.target.value;
			},
			// 三级联动选择
			showCityPicker() {
				var that = this;
				that.$refs.mpvueCityPicker.show();
			},
			//地区选择
			onConfirm(e) {
				this.address2.key = e.label;
				this.CountyId = e.cityCode;
				console.log(this.CountyId)
			},
			tianjia(){
				let that = this;
				if (!that.name) {
					that.tan = true;
					that.message = '请输入姓名'
					setTimeout(function(){
						that.tan = false;
					},1000)
					return;
				}
				if (!/(^1[0-9]{10}$)/.test(that.telephone)) {
					that.tan = true;
					that.message = '请输入正确的手机号'
					setTimeout(function(){
						that.tan = false;
					},1000)
					return;
				}
				if (!that.address_del) {
					that.tan = true;
					that.message = '请输入详细地址'
					setTimeout(function(){
						that.tan = false;
					},1000)
					return;
				}
				if (!that.CountyId) {
					that.tan = true;
					that.message = '请选择省市区'
					setTimeout(function(){
						that.tan = false;
					},1000)
					return;
				}
				server.postJSON('/user/address/add_edit',{
					name:that.name, // 收货人
					countyId:that.CountyId, // 县id
					address:that.address_del, //详细地址
					default:that.defaults,//默认收货地址
					phone:that.telephone,//手机号码  
					addressid:that.addressid,//地址id  为空添加地址
				},res=>{
					that.message = res.data.message;
					that.tan = true;
					if(res.data.code==0){
						setTimeout(function(){
							that.tan = false;
						},1000)
					}else{
						setTimeout(function(){
							uni.redirectTo({
								url: './address_list?id=0'
							});
						},1000)
					}
				})
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
			}
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
		height: 88rpx;
		background: white;
	}
	.top_columns{
		position: fixed;
		width: 100%;
		height: 88rpx;
		background: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 1px #F5F5F5;
		padding: 0 20rpx;
		z-index: 50;
		box-sizing: border-box;
	}
	.top_column_title{
		color: #1C0000;
		font-size: 34rpx;
	}
	.baocun{
		font-size: 26rpx;
		color: #808080;
	}

	.new_address {
		width: 100%;
	}

	.name {
		width: 100%;
		color: #1C0000;
		height: 120rpx;
		background: white;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.name-title {
		font-size: 26rpx;
		width: 160rpx;
	}

	.input-address {
		font-size: 26rpx;
		width: 440rpx;
		color: #9A9A9A;
	}

	.default {
		color: #9A9A9A;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}
</style>
