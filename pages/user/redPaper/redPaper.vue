<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<view class="back">
			<view class="top_column">
				<view class="top_columns">
					<navigator open-type="navigateBack"><text class="iconfont icon-left"></text></navigator>
					<view class="top_column_title">我的红包</view>
					<view><text></text></view>
				</view>
			</view>
			<view class="tabbar">
				<view class="tabbars">
					<view :class="tag==1?'active':'actives'" @click="redpaper(1)">可使用</view>
					<view :class="tag==2?'active':'actives'" @click="redpaper(2)">已使用</view>
					<view :class="tag==3?'active':'actives'" @click="redpaper(3)">已失效</view>
				</view>
			</view>
			<view class="redpaper_conent" v-show="tag==1">
				<view class="wu" v-show="redPapers==null">
					<view><image src="../../../static/sticon/address.png"></image></view>
					<view><text>暂无可用红包</text></view>
				</view>
				<view class="redprapers" v-for="(redPa,index) in redPapers" :key="index" v-if="redPa.statusName=='未使用'">
					<view class="redpraper-momeys">
						<view class="momeys">
							<view class="mome">
								<view class="mom">￥{{redPa.redPaper}}</view>
								<view class="redpraper-reduction">满{{redPa.minPrice}}元可用</view>
							</view>
						</view>
						<view class="momes">
							<view class="zhuanxiao">新人专享红包</view>
							<view class="quanc">全场通用</view>
						</view>
					</view>
					<view class="redprapers-time">
						<view>{{(redPa.postTimeDate).slice(0,10)}}--{{(redPa.endTimeDate).slice(0,10)}}</view>
						<view class="redprapers_btn" @click="goindex()">去使用</view>
					</view>
				</view>
			</view>
			<view class="redpaper_conent" v-show="tag==2">
				<view class="redprapers" v-for="(redPa,index) in redPapers" :key="index" >
					<view class="redpraper-momeys">
						<view class="momeys">
							<view class="mome">
								<view class="moms">￥{{redPa.redPaper}}</view>
								<view class="redpraper-reduction">满{{redPa.minPrice}}元可用</view>
							</view>
						</view>
						<view class="momes">
							<view class="zhuanxiao">新人专享红包</view>
							<view class="quanc">全场通用</view>
						</view>
					</view>
					<view class="redprapers-time">
						<view>{{redPa.useTimeDate}}</view>
						<view class="redprapers_btns">已使用</view>
					</view>
				</view>
			</view>
			<view class="redpaper_conent" v-show="tag==3">
				<view class="redprapers" v-for="(redPa,index) in redPapers" :key="index">
					<view class="redpraper-momeys">
						<view class="momeys">
							<view class="mome">
								<view class="moms">￥{{redPa.redPaper}}</view>
								<view class="redpraper-reduction">满{{redPa.minPrice}}元可用</view>
							</view>
						</view>
						<view class="momes">
							<view class="zhuanxiao">新人专享红包</view>
							<view class="quanc">全场通用</view>
						</view>
					</view>
					<view class="redprapers-time">
						<view>{{redPa.useTimeDate}}</view>
						<view class="redprapers_btns">已失效</view>
					</view>
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
				tag:1,
				redPapers:[],//红包列表
				status:1//0全部，1有效并未使用，2已经使用，3过期
			}
		},
		methods: {
			goindex(){
				uni.redirectTo({
					url:'../../index/index'
				})
			},
			redpaper(id){
				let that = this;
				that.tag = id;
				that.status = id;
				that.redPapers= '';
				server.postJSON(
				'/api/red_paper/index.html',
				{
					token: uni.getStorageSync('token'),
					page:1,
					span:20,
					status:that.status
				}, res => {
					that.redPapers = res.data.list;
				})
			}
		},
		onLoad() {
			let that = this;
			server.postJSON(
			'/api/red_paper/index.html',
			{
				token: uni.getStorageSync('token'),
				page:1,
				span:20,
				status:1
			}, res => {
				that.redPapers = res.data.list;
			})
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
	.redpaper_conent{
		background: #F5F5F5;
		width: 100%;
		padding:20rpx 30rpx; 
		box-sizing: border-box;
	}
	/* 状态页 */
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
	.tabbar{
		width: 100%;
		height: 76rpx;
		background: white;
	}
	.tabbars{
		position: relative;
		width: 100%;
		height: 76rpx;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 28rpx;
		color: #9A9A9A;
	}
	.active{
		height: 100%;
		color: #74181B;
		line-height: 76rpx;
		border-bottom: 1px solid #74181B;
	}
	.actives{
		height: 100%;
		line-height: 76rpx;
	}
	.redprapers{
		height: auto;
		width: 100%;
		border-radius: 8rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.redpraper-momeys{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 26rpx;
	}
	.momeys{
		display: flex;
		flex-direction: row;
		color: #9A9A9A;
	}
	.mome{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.momes{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.mom{
		color: #DD0812;
		font-size: 48rpx;
	}
	.moms{
		color: #DD0812;
		font-size: 48rpx;
		opacity: 0.5;
	}
	.zhuanxiao{
		color: #1C0000;
		font-size: 28rpx;
	}
	.quanc{
		color:#9A9A9A ;
		font-size: 26rpx;
		margin-top:20rpx;
	}
	.btns{
		display: flex;
		align-items: flex-end;
	}
	.redprapers-time{
		height: 80rpx;
		width: 100%;
		padding:0 30rpx ;
		box-sizing: border-box;
		color: #9A9A9A;
		font-size: 26rpx;
		line-height: 82rpx;
		align-items: center;
		border-top: 1px solid #F8F8F8;
		display: flex;
		justify-content: space-between;
		
	}
	.redprapers_btns{
		height: 42rpx;
		width:130rpx;
		background: #DD0812;
		color: white;
		border-radius: 8rpx;
		text-align: center;
		line-height: 50rpx;
		opacity: 0.5;
	}
	.redprapers_btn{
		height: 50rpx;
		width:130rpx;
		background: #DD0812;
		color: white;
		border-radius: 8rpx;
		text-align: center;
		line-height: 50rpx;
	}
</style>
