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
								  blog.csdn.net/qq8864
							      <!-- <view class="center_vip">
							      	<uni-icons type="vip" size="14"></uni-icons>
							      	<view class="vip_text">
							      		<text>普通会员</text>
							      	</view>
							      </view> -->
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
			<view class="cell" @click="goToMyfavs"> {{favCount}} <text style="color: #AAAAAA;">收藏影视</text> </view>
			<view class="cell" @click="goToHistory"> {{historyCount}} <text style="color: #AAAAAA;">播放历史</text> </view>
			<view class="cell" @click="goToMyfavMusic">{{favMusicCount}}  <text style="color: #AAAAAA;">收藏音乐</text> </view>
			<view class="cell"> 0 <text style="color: #AAAAAA;">我的足迹</text> </view>
		</view>
		<view class="grid-box">
		    <uni-section title="功能列表" >
				<uni-grid :column="4" :show-border="false" :square="false">
				  <!-- v-for 循环渲染按钮 -->
				  <uni-grid-item v-for="(item, index) in buttons" :key="index" @click="onClickButton(item)">
					  <view class="grid-item">
					  	<uni-icons :type="item.icon" :color="item.color" size="30"></uni-icons>
					  	<text class="grid-text">{{item.text}}</text>
					  </view>
				  </uni-grid-item>
				</uni-grid>
			</uni-section>
		</view>
		<!-- 其它 -->
		<view class="extra">
			<uni-list>
				<uni-list-item showArrow title="我的消息" ></uni-list-item>
				<uni-list-item showArrow title="意见反馈" link to="/pages/tabBar/mine/report/report"></uni-list-item>
				<uni-list-item showArrow title="分享链接" @click.native="onShareClick1($event,1)" link></uni-list-item>
				<uni-list-item showArrow title="检查更新" @click.native="onUpdateCheck()" link></uni-list-item>
				<uni-list-item showArrow title="关于我们"   to="/pages/about/about"></uni-list-item>
				<uni-list-item showArrow title="用户协议"  :to="`/pages/tabBar/mine/xieyi/xieyi`"></uni-list-item>
				<uni-list-item showArrow title="隐私政策"  :to="`/pages/tabBar/mine/yinsi/yinsi`"></uni-list-item>
				<!-- <uni-list-item showArrow title="关于我们" link="navigateTo" :to="'/pages/about/about?item=1'"></uni-list-item> -->
			</uni-list>
		</view>
		
		<view class="version">
			当前版本：{{version}}
		</view>
		
	</view>
</template>

<script>
	import favorites from '@/utils/favorites';
	import audiofavorites from '@/utils/audiofavorites';
	import playhistory from '@/utils/playhistory.js';
	import { checkUpdate } from '@/api/home.js';
	export default {
		data() {
			return {
				isLoggedIn: false,
				version: '',
				userInfo: {},
				favCount:0,
				historyCount:0,
				favMusicCount:0,
				// 功能按钮的数据数组
				buttons: [
					{
					  icon: 'videocam', 
					  text: '电视直播',
					  color: '#55aaff',
					  // 可以添加其他需要的数据，比如跳转的页面路径
					  pagePath: '/pages/home/home'
					},
					{
					  icon: 'videocam',
					  text: '本地视频',
					  color: '#ff0000',
					  pagePath: '/pages/tabBar/mine/playlocal/playlocal'
					},
					{
					  icon: 'images',
					  text: '本地图片',
					  color: '#aa55ff',
					  pagePath: '/pages/tabBar/mine/playimage/playimage'
					},
					{
					  icon: 'headphones',
					  text: '在线音乐',
					  color: '#ff007f',
					  pagePath: '/pages/tabBar/mine/musiclist/musiclist'
					},
					{
					  icon: 'link',
					  text: '播放链接',
					  color: '#5555ff',
					  pagePath: '/pages/tabBar/mine/playvideo/playvideo'
					},
					{
					  icon: 'hand-up',
					  text: '分享APP',
					  color: '#ffaa00',
					  pagePath: ''
					},
					{
					  icon: 'chat',
					  text: '加入群聊',
					  color: '#00aa00',
					  pagePath: ''
					},
					{
					  icon: 'more',
					  text: '其他功能',
					  color: '',
					  pagePath: ''
					},
					// ...其他按钮数据
				  ],
			}
		},
		onLoad() {
			console.log('mine onload');
			// #ifdef APP-PLUS
			this.version = plus.runtime.version;
			// #endif
			favorites.initFavorites();
			audiofavorites.initAudioFavorites();
			playhistory.initPlayHistory();
			this.favCount = favorites.getFavoriteCount();
			this.favMusicCount = audiofavorites.getAudioFavoriteCount();
			this.historyCount = playhistory.getPlayRecordCount();
			
		},
		onShow() {
		    // 每次切换到该页面时执行的操作
			console.log("mine onShow");
			this.favCount = favorites.getFavoriteCount();
			this.favMusicCount = audiofavorites.getAudioFavoriteCount();
			this.historyCount = playhistory.getPlayRecordCount();
		},
		computed: {
			
		},
		created(){
			
		},
		methods: {
				onLoginClick() {
			      // 跳转至登录页面
			      //uni.navigateTo({ url: '/pages/login/login' });
				  uni.showToast({
				    title: '登录暂未开放',
				    icon: 'none',
				    duration: 2000
				  });
			    },
				onClickButton(item) {
					console.log(item.text);
					if(item.text ==='电视直播'){
						uni.showToast({
						  title: '暂未开放，敬请期待',
						  icon: 'none',
						  duration: 2000
						});
						return;
					}
					if(item.text ==='分享APP'){
						uni.showModal({
							title: '分享链接',
							content: '爱影app下载地址:\n' + "https://www.123pan.com/s/d27lVv-NjrSv",
							showCancel:false,
							success: res => {
								uni.setClipboardData({
								    data: "https://www.123pan.com/s/d27lVv-NjrSv",
								    success: function () {
								      // 可以在这里添加一些提示信息，告知用户内容已复制
								      uni.showToast({
								        title: '链接已复制',
								        icon: 'success',
								        duration: 2000
								      });
								    }
								  });
							}
						});
						return;
					}
					if(item.text ==='加入群聊'){
						uni.showToast({
						  title: '加Q:534117529',
						  icon: 'success',
						  duration: 2000
						});
						return;
					}
					if (item && item.pagePath) {
						console.log(item.pagePath);
					    // 如果 pagePath 存在，使用 uni.navigateTo 进行页面跳转
					    uni.navigateTo({
						  url: item.pagePath
					    });
					}
				},
				goToMyfavs(){
					uni.navigateTo({ url: '/pages/tabBar/mine/myfavs/myfavs' });
				},
				goToMyfavMusic(){
					uni.navigateTo({ url: '/pages/tabBar/mine/favmusic/favmusic' });
				},
				goToHistory(){
					uni.navigateTo({ url: '/pages/tabBar/mine/playhistory/playhistory' });
				},
				onUpdateCheck() {
				  // 检查更新
				  console.log("checkVersion:")
				  // 获取本地应用资源版本号
				  let version = "1.0.0"
				  let verCode = 0
				  const systemInfo = uni.getSystemInfoSync();
				  // 应用程序版本号
				  // #ifdef APP
				  version = plus.runtime.version;
				  verCode = plus.runtime.versionCode;
				  // #endif
				  // #ifdef H5
				  version = systemInfo.appVersion;
				  // #endif
				  console.log(version)
				  checkUpdate(verCode,version).then(result => {
						console.log("checkUpdate,result:");
						console.log(result);
						this.notice = result.notice;
						if(verCode < result.versionCode){
							uni.showModal({
								title: '有新版本，请及时更新',
								content: '待更新版本：' + result.versionName +'\n更新说明:'+result.versionDesc,
								showCancel:false,
								success: res => {
								}
							});
						}else{
							uni.showModal({
								title: '当前已是最新版本',
								content: '版本号：' + result.versionName,
								showCancel:false,
								success: res => {
								}
							});
						}
				   });
				},
				onShareClick($event,args){
					console.log($event);
					console.log("onShareClick");
					uni.showModal({
						title: '分享链接',
						content: '爱影app下载地址:\n' + "https://www.123pan.com/s/d27lVv-NjrSv",
						showCancel:false,
						success: res => {
							uni.setClipboardData({
							    data: "https://www.123pan.com/s/d27lVv-NjrSv",
							    success: function () {
							      // 可以在这里添加一些提示信息，告知用户内容已复制
							      uni.showToast({
							        title: '链接已复制',
							        icon: 'success',
							        duration: 2000
							      });
							    }
							  });
						}
					});
					/*
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
					*/
				},
				onShareClick1($event,args){
					console.log($event);
					console.log("onShareClick1");
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: "http://uniapp.dcloud.io/",
						title: "下载链接",
						summary: "爱影家免费观影app，下载地址：https://www.123pan.com/s/d27lVv-zFrSv.html",
						imageUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png",
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				},
			
		}
	};
</script>

<style scoped lang="scss">
	Page {
		font-size: 14rpx;
	}
	
	.wrapper {
		display: flex;
		flex-direction: column;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
	}

	.top {
		width: 100%;
		height: 300rpx;
		// background: #23EBB9;
		//background: #2979ff;
		background-color: rgba(85, 170, 255, 0.6);
		padding-top: 30rpx;
		position: relative;
	}

	.center {
		width: 95%;
		height: 260rpx;
		//background: #55aaff;
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
		font-size: 18rpx;
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
			cursor: pointer;
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
		margin: -10rpx 20rpx;
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
	
	.grid-box {
	  padding: 20rpx;
	}
	.grid-item {
	 flex: 1;
	// position: relative;
	/* #ifndef APP-NVUE */
	 display: flex;
	/* #endif */
	 flex-direction: column;
	 align-items: center;
	 justify-content: center;
	 padding: 0rpx 0;
	}
	.grid-text {
	  display: block;
	  font-size: 22rpx; 
	  padding: 10rpx 0;
	}
	
	.version {
		height: 80rpx;
		line-height: 80rpx;
		align-self: center;
		padding: 20rpx;
		color: #ccc;
	}
</style>
