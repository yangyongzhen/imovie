<template>
	<view class="wrapper">
		<!-- 个人资料 -->
		<view>
			<view class="top">
				<view class="center">
					<view class="center_top">
						<view class="center_img" >
							<!-- 这里可以放自己的静态头像 -->
							<image src="/static/me.jpg"></image>
							<!-- <open-data type="userAvatarUrl" class="user_head"></open-data> -->
						</view>
						<view class="center_info" >
							<view class="center_name">
								<!-- 这里可以放自己的名称图片 -->
								<view>张三</view>
							</view>
							<view class="center_vip">
								<image class="rank_icon" src="/static/vip.png" />
								<view class="vip_text">
									<text>普通会员</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 统计 -->
		<view class="count">
			<view class="cell"> 8 <text style="color: #AAAAAA;">收藏影视</text> </view>
			<view class="cell"> 14 <text style="color: #AAAAAA;">历史记录</text> </view>
			<view class="cell"> 18 <text style="color: #AAAAAA;">关注信息</text> </view>
			<view class="cell"> 84 <text style="color: #AAAAAA;">我的足迹</text> </view>
		</view>
		<!-- 其它 -->
		<view class="extra">
			<uni-list>
				<uni-list-item showArrow title="我的消息" ></uni-list-item>
				<uni-list-item showArrow title="意见反馈" ></uni-list-item>
				<uni-list-item showArrow title="关于我们" ></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		created(){
			
		},
		methods: {
			
		}
	};
</script>

<style scoped lang="scss">
	Page {
		font-size: 14px;
	}

	.top {
		width: 100%;
		height: 130px;
		// background: #23EBB9;
		background: #2979ff;
		padding-top: 15px;
		position: relative;
	}

	.center {
		width: 95%;
		height: 100px;
		background: #2979ff;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		border-radius: 5px;
	}

	.center_top {
		display: flex;
		flex-direction: row;
		width: 80%;
		height: 80px;
		margin: 0 auto;
		margin-top: 20rpx;
		border-bottom: 1px solid #2979ff;
	}

	.center_img {
		width: 66px;
		height: 66px;
		border-radius: 50%;
		overflow: hidden;
	}

	.center_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.center_img .user_head {
		width: 100%;
		height: 100%;
	}

	.center_info {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-left: 30px;
	}

	.center_name {
		font-size: 18px;
	}

	.center_phone {
		color: #BEBEBE;
	}

	// .center_down {
	// 	display: flex;
	// 	flex-direction: row;
	// 	width: 80%;
	// 	height: 35px;
	// 	margin: 0 auto;
	// 	margin-top: 20rpx;
	// }

	.center_rank {
		width: 50%;
		height: 35px;
		display: flex;
		flex-direction: row;
	}

	.rank_text {
		height: 35px;
		line-height: 35px;
		margin-left: 10rpx;
		color: #AAAAAA;
	}

	.center_vip image {
		width: 25px;
		height: 25px;
		margin-top: 15rpx;
	}

	.vip_icon {
		width: 25px;
		height: 25px;
		margin-top: -10rpx;
	}

	.vip_text {
		margin-top: -55rpx;
		margin-left: 50rpx;
		color: #AAAAAA;
	}

	.center_rank image {
		width: 35px;
		height: 35px;
	}

	.center_score {
		width: 50%;
		height: 35px;
		display: flex;
		flex-direction: row;
	}

	.center_score image {
		width: 35px;
		height: 35px;
	}

	.gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
	}

	.profile {
		height: 375rpx;
		background-color: #ea4451;
		display: flex;
		justify-content: center;
		align-items: center;

		.meta {
			.avatar {
				display: block;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: 2rpx solid #fff;
				overflow: hidden;
			}

			.nickname {
				display: block;
				text-align: center;
				margin-top: 20rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}

	.count {
		display: flex;
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

	.orders {
		margin: 20rpx 20rpx 0 20rpx;
		padding: 40rpx 0;
		background-color: #fff;
		border-radius: 4rpx;

		.title {
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #333;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
			margin-top: -30rpx;
		}

		.sorts {
			padding-top: 30rpx;
			text-align: center;
			display: flex;
		}

		[class*="icon-"] {
			flex: 1;
			font-size: 24rpx;

			&::before {
				display: block;
				font-size: 48rpx;
				margin-bottom: 8rpx;
				color: #ea4451;
			}
		}
	}

	.address {
		line-height: 1;
		background-color: #fff;
		font-size: 30rpx;
		padding: 25rpx 0 25rpx 20rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
	}

	.extra {
		margin: 10rpx 20rpx;
		background-color: #fff;
		border-radius: 4rpx;

		.item {
			line-height: 1;
			padding: 25rpx 0 25rpx 20rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 30rpx;
			color: #333;
		}

		button {
			text-align: left;
			background-color: #fff;

			&::after {
				border: none;
				border-radius: 0;
			}
		}
	}

	.icon-arrow {
		position: relative;

		&::before {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
		}
	}
</style>
