<template>
	<view>
		<view class="back">
			<view class="redpraper">
				<radio-group @change="redpraper" >
					<view class="redprapers" v-for="(redPa,index) in redPapers" :key="index">
						<view class="redpraper-momeys">
							<view class="momeys">
								<view class="momes">
									<view class="mom">￥{{redPa.redPaper}}</view>
									<view class="redpraper-reduction">满{{redPa.minPrice}}元可用</view>
								</view>
								<view class="momes">
									<view class="zhuanxiao">新人专享红包</view>
									<view >全场通用</view>
								</view>
							</view>
							<view class="btns">
								<radio :value="redPa" style="transform: scale(0.8);" color="#DD0812"/>
							</view>
						</view>
						<view class="redprapers-time">
							{{redPa.postTimeDate}}——{{redPa.endTimeDate}}
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server')
	export default {
		data() {
			return {
				redPapers:[],//红包列表
				redPaper:[],//
			}
		},
		methods: {
			redpraper(event){
				uni.setStorageSync('redpaper_price',event.detail.value.redPaper)
				uni.setStorageSync('redpaper_Id',event.detail.value.id)
			}
		},
		onLoad() {
			let that = this;
			let token = uni.getStorageSync('token');
			that.redPaper = uni.getStorageSync('redPaper');
			server.postJSON('/user/red_paper/get_list?ajax=true', {
				token: token
			}, res => {
				var rl = res.data.list;
				for (let i in rl) {
					if (server.id_in_array(rl[i].id, that.redPaper)) {
						that.redPapers.push(res.data.list[i]);
					}
				}
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
	.redpraper{
		background: #F5F5F5;
		padding: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
	}
	.redprapers{
		height: 220rpx;
		width: 100%;
		border-radius: 20rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.redpraper-momeys{
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 28rpx;
	}
	.momeys{
		display: flex;
		flex-direction: row;
		color: #9A9A9A;
	}
	.momes{
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		margin-right: 40rpx;
	}
	.mom{
		color: #DD0812;
		font-size: 50rpx;
	}
	.redpraper-reduction{
		margin-top: 10rpx;
	}
	.zhuanxiao{
		color: #1C0000;
	}
	.btns{
		display: flex;
		align-items: flex-end;
	}
	.redprapers-time{
		height: 80rpx;
		width: 100%;
		padding-left: 20rpx;
		box-sizing: border-box;
		color: #9A9A9A;
		font-size: 26rpx;
		line-height: 82rpx;
		align-items: center;
		border-top: 1px solid #F8F8F8;
	}
</style>
