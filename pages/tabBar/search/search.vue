<template>
	<view class="wrapper">
		<view class="top">
			<view class="center">
				<view class="center_top">
				</view>
			</view>
			
		</view>
		
		<!-- 统计 -->
		<view class="count">
			<view class="cell"> 8  <text style="color: #AAAAAA;">收藏影视</text> </view>
			<view class="cell"> 14 <text style="color: #AAAAAA;">历史记录</text> </view>
			<view class="cell"> 18 <text style="color: #AAAAAA;">关注信息</text> </view>
			<view class="cell"> 84 <text style="color: #AAAAAA;">我的足迹</text> </view>
		</view>
		
		<!-- 其它 -->
		<view class="extra">
			<uni-list>
				<uni-list-item showArrow title="我的消息" ></uni-list-item>
				<uni-list-item showArrow title="意见反馈" ></uni-list-item>
				<uni-list-item showArrow title="分享链接" @click.native="onShareClick($event,1)" link></uni-list-item>
				<uni-list-item showArrow title="关于我们" link to="/pages/about/about?item=2"></uni-list-item>
				<!-- <uni-list-item showArrow title="关于我们" link="navigateTo" :to="'/pages/about/about?item=1'"></uni-list-item> -->
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
	}
	
	.top {
		width: 100%;
		height: 200rpx;
		background: #2979ff;
		padding-top: 30rpx;
		position: relative;
	}
	
	.center {
		width: 95%;
		height: 160rpx;
		background: #55aaff;
		display: flex;
		flex-direction: column;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		margin: 0 auto;
		border-radius: 5rpx;
	}
	
	.center_top {
		display: flex;
		min-width: 350rpx; 
		flex-direction: row;
		background: #ffaa7f;
		
		height: 100rpx;
		margin-top: 0rpx;
		border-bottom: 1rpx solid #5555ff;
	}
	
	.count {
		display: flex;
		flex-direction: row;
		margin: 0 20rpx;
		height: 120rpx;
		text-align: center;
		border-radius: 4rpx;
		background-color: #fff;
	
		position: relative;
		top: 10rpx;
	
		.cell {
			margin-top: 10rpx;
			flex: 1;
			padding-top: 20rpx;
			font-size: 27rpx;
			color: #333;
		}
	
		text {
			display: block;
			font-size: 24rpx;
		}
	}
</style>
