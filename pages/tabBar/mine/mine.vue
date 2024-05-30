<template>
	<view class="wrapper">
		<!-- 个人资料 -->
		<view>
			<view class="top">
				<view class="center">
					<view v-if="isLoggedIn">
						<view class="center_top">
							<view class="center_img" >
								<!-- 这里可以放自己的静态头像 -->
								<image src="/static/me.jpg"></image>
								<!-- <open-data type="userAvatarUrl" class="user_head"></open-data> -->
						    </view>
						    <view class="center_info" >
							      <view class="center_name">
							      	特立独行的猫
							      </view>
							      <view class="center_vip">
							      	<uni-icons type="vip" size="14"></uni-icons>
							      	<view class="vip_text">
							      		<text>普通会员</text>
							      	</view>
							      </view>
							      <!-- 其他个人中心内容 -->
							    </view>
							
						</view>
					</view>
					<view v-else class="loginButton" @click="onLoginClick">登录</view>
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
				isLoggedIn: true,
				userInfo: {}
			}
		},
		computed: {
			
		},
		created(){
			
		},
		methods: {
				onLoginClick() {
			      // 跳转至登录页面
			      //uni.navigateTo({ url: '/pages/login/login' });
			    },
				onShareClick($event,args){
					console.log($event);
					console.log("onShareClick");
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: "http://uniapp.dcloud.io/",
						title: "分享的标题",
						summary: "分享的内容",
						imageUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png",
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			
		}
	};
</script>

<style scoped lang="scss">
	Page {
		font-size: 14rpx;
	}

	.top {
		width: 100%;
		height: 200rpx;
		// background: #23EBB9;
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
		//background: #ffaa7f;
		height: 100rpx;
		margin-top: 0rpx;
		border-bottom: 1rpx solid #5555ff;
	}

	.center_img {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.center_img image {
		width: 100%;
		height: 100%;
	}

	.center_img .user_head {
		width: 100%;
		height: 100%;
	}

	.center_info {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.center_name {
		font-size: 14rpx;
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
		height: 35rpx;
		display: flex;
		flex-direction: row;
	}

	.rank_text {
		height: 35rpx;
		line-height: 35rpx;
		margin-left: 10rpx;
		color: #AAAAAA;
	}

	.center_vip image {
		width: 20rpx;
		height: 20rpx;
		margin-top: 10rpx;
	}

	.vip_icon {
		width: 25rpx;
		height: 25rpx;
		margin-top: 5rpx;
	}

	.vip_text {
		font-size: 14rpx;
		margin-top: -33rpx;
		margin-left: 40rpx;
		color: #AAAAAA;
	}

	.center_rank image {
		width: 35rpx;
		height: 35rpx;
	}

	.center_score {
		width: 50%;
		height: 35rpx;
		display: flex;
		flex-direction: row;
	}

	.center_score image {
		width: 35rpx;
		height: 35rpx;
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
	
	.loginButton {
	  padding: 20rpx 60rpx;
	  width: 30%;
	  background-color: #ffffff; /* 设置背景颜色为蓝色 */
	  color: #00aa00; /* 设置文本颜色为白色 */
	  font-size: 24rpx; /* 设置字体大小为 16px */
	  text-align: center;
	  border-radius: 35rpx; /* 设置圆角 */
	  cursor: pointer; /* 设置鼠标样式为指针 */
	}
</style>
