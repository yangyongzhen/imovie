<template>
	<view class="content">
		<view class="uni-margin-wrap">

			<view class="search-bar-box">
			 <uni-search-bar 
			       ref="searchBar"
			       @confirm="onSearch" 
			       placeholder="搜索" 
				   clearButton="none"
			       @focus="onSearchFocus"
			       :maxlength="50" 
			       :clearbutton="true"
			     />
			</view>
			
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration"  lazy-render>
				
				<swiper-item v-for="item in swiperList" :key="item.id" @click="toSwiper(item.id)">
				    <image :src="item.imageUrl" :alt="item.title" mode="widthFix" class="swiper-image"></image>
					 <view class="swiper-desc" v-if="item.title">{{ item.title }}</view>
				</swiper-item>
				
			</swiper>
			<!-- 公告通知 -->
			<uni-notice-bar show-icon scrollable :speed="20" :text="notice"/>
			
			<!-- 今日票房====================== -->
			<TodayBoxOffice/>
			
			<view class="title">
				<view class="title-item">
					即将上映
				</view>
				<view class="title-more" @click="goToMore(1)">
					查看更多 >
				</view>
			</view>
			
			 <scroll-view
			    :scroll-x="true"
			    :show-scrollbar="false"
			    class="scroll"
			  >
			  <view class="movie-box">
			        <view  v-for="(item, index) in soonList"
			        :key="index"
			        @click="goToDetail(item.id)" class="movie-item">
			          <image :src="item.cover" class="movie-item-img" mode="heightFix" />
			          <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
					  <view class="movie-rate">
					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
					  	</uni-rate>
					  	<text class="movie-rate-t">{{item.rate}}</text>
					  </view>
			        </view>
			  </view>  
			  </scroll-view>
			 
			  <!-- 最新上映====================== -->
			  <view class="title">
			  	<view class="title-item">
			  		最新上映
			  	</view>
			  	<view class="title-more" @click="goToMore(2)">
			  		查看更多 >
			  	</view>
			  </view>
			  <scroll-view
			     :scroll-x="true"
			     :show-scrollbar="false"
			     class="scroll"
			   >
			   <view class="movie-box">
			         <view  v-for="(item, index) in newsList"
			         :key="index"
			         @click="goToDetail(item.id)" class="movie-item">
			           <image class="movie-item-img" :src="item.cover" mode="heightFix" />
			           <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
			  					  <view class="movie-rate">
			  					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
			  					  	</uni-rate>
			  					  	<text class="movie-rate-t">{{item.rate}}</text>
			  					  </view>
			         </view>
			   </view>  
			   </scroll-view>
			   <!-- 正在热映 -->
			  <view class="title">
			  	<view class="title-item">
			  		正在热映
			  	</view>
			  	<view class="title-more" @click="goToMore(3)">
			  		查看更多 >
			  	</view>
			  </view>
			  <scroll-view
			     :scroll-x="true"
			     :show-scrollbar="false"
			     class="scroll"
			   >
			   <view class="movie-box">
			         <view  v-for="(item, index) in hotList"
			         :key="index"
			         @click="goToDetail(item.id)" class="movie-item">
			           <image class="movie-item-img" :src="item.cover" mode="heightFix" />
			           <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
			  					  <view class="movie-rate">
			  					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
			  					  	</uni-rate>
			  					  	<text class="movie-rate-t">{{item.rate}}</text>
			  					  </view>
			         </view>
			   </view>  
			   </scroll-view>
			   <!-- 一周热榜====================== -->
			   <view class="title">
			   	<view class="title-item">
			   		一周热榜
			   	</view>
			   	<view class="title-more" @click="goToMore(4)">
			   		查看更多 >
			   	</view>
			   </view>
			   <scroll-view
			      :scroll-x="true"
			      :show-scrollbar="false"
			      class="scroll"
			    >
			    <view class="movie-box">
			          <view  v-for="(item, index) in weekList"
			          :key="index"
			          @click="goToDetail(item.id)" class="movie-item">
			            <image class="movie-item-img" :src="item.cover" mode="heightFix" />
			            <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
			   					  <view class="movie-rate">
			   					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
			   					  	</uni-rate>
			   					  	<text class="movie-rate-t">{{item.rate}}</text>
			   					  </view>
			          </view>
			    </view>  
			    </scroll-view>
				
				<!-- 豆瓣高分===================== -->
				<view class="title">
					<view class="title-item">
						豆瓣高分
					</view>
					<view class="title-more" @click="goToMore(5)">
						查看更多 >
					</view>
				</view>
				<scroll-view
				   :scroll-x="true"
				   :show-scrollbar="false"
				   class="scroll"
				 >
				 <view class="movie-box">
				       <view  v-for="(item, index) in top250List"
				       :key="index"
				       @click="goToDetail(item.id)" class="movie-item">
				         <image class="movie-item-img" :src="item.cover" mode="heightFix" />
				         <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
									  <view class="movie-rate">
									  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
									  	</uni-rate>
									  	<text class="movie-rate-t">{{item.rate}}</text>
									  </view>
				       </view>
				 </view>  
				 </scroll-view>
				<!-- 北美票房榜====================== -->
				<view class="title">
					<view class="title-item">
						北美票房榜
					</view>
					<view class="title-more" @click="goToMore(6)">
						查看更多 >
					</view>
				</view>
				<scroll-view
				   :scroll-x="true"
				   :show-scrollbar="false"
				   class="scroll"
				 >
				 <view class="movie-box">
				       <view  v-for="(item, index) in usBoxList"
				       :key="index"
				       @click="goToDetail(item.id)" class="movie-item">
				         <image class="movie-item-img" :src="item.cover" mode="heightFix" />
				         <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
									  <view class="movie-rate">
									  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
									  	</uni-rate>
									  	<text class="movie-rate-t">{{item.rate}}</text>
									  </view>
				       </view>
				 </view>  
				 </scroll-view>
				 
				 <!-- 北美票房榜====================== -->
				 <view class="title">
				 	<view class="title-item">
				 		近期热播剧
				 	</view>
				 	<view class="title-more" @click="goToMore(7)">
				 		查看更多 >
				 	</view>
				 </view>
				 <scroll-view
				    :scroll-x="true"
				    :show-scrollbar="false"
				    class="scroll"
				  >
				  <view class="movie-box">
				        <view  v-for="(item, index) in tvHotList"
				        :key="index"
				        @click="goToDetail(item.id)" class="movie-item">
				          <image class="movie-item-img" :src="item.cover" mode="heightFix" />
				          <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
				 					  <view class="movie-rate">
				 					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
				 					  	</uni-rate>
				 					  	<text class="movie-rate-t">{{item.rate}}</text>
				 					  </view>
				        </view>
				  </view>  
				  </scroll-view>
				 
				<!-- 升级弹出框 -->
				 <uni-popup ref="popup" type="center" :mask-click="false" catchTouchMove>
				   <view class="popup-content">
					 <text>{{percentText}}</text>
					 <progress  :percent="progress" :stroke-width="10" />
				   </view>
				 </uni-popup>
			
		</view>
	</view>
</template>

<script>
	import TodayBoxOffice from '@/components/TodayBoxOffice.vue';
	import { downloadApp,installApp } from '@/utils/upgrade.js';
	import { getSwiperList, getTop250,getNowHot,getSoonMovie,
	         getWeekMovie,getNewMovie,getUsBoxMovie,checkUpdate,getTvHot } from '@/api/home.js';
	
	export default {
		components: {
		    TodayBoxOffice
		  },
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 轮播图的数据列表，默认为空数组
				swiperList:[],
				soonList:[], //即将上映
				weekList:[], //一周热榜
				newsList:[], //最新上映
				top250List:[],//豆瓣高分
				usBoxList:[], //北美票房
			    hotList: [],  //热映电影
				tvHotList:[], //近期热播剧
				notice:'如果看到这个公告，抱歉，后台服务到期了。请搜索并关注微信公众号[猫青年]，及时获取更新。',    //公告通知
				//升级相关
				downloadUrl: '', //APP下载链接
				isDownloadFinish: false, //是否下载完成
				progress: 0,  //升级进度条百分比
				fileName: '', //下载后app本地路径名称
			}
		},
		async onLoad() {
			console.log("onLoad")
			//console.log(this.swiperList)
		},
		onShow(){
			console.log("onShow")
		},
		computed: {
			//百分比文字
			percentText() {
				let percent = this.progress;
				if (typeof percent !== 'number' || isNaN(percent)) return '正在升级中...'
				if (percent < 100) return `正在升级中... ${percent}%`
				return '下载完成'
			}
		},
		methods: {
			// 名称超出显示省略号
			ellipsis(value) {
				if (!value) return '';
				if (value.length > 7) {
					return value.slice(0, 6) + '...'
				}
				return value
			},
			goToDetail(id){
				console.log("goToDetail:")
				console.log(id)
				uni.navigateTo({
					url: `../index/detail/detail?id=${id}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			onSearch(){
				console.log("onSearch:")
				uni.navigateTo({url: `../index/search/search`});
			},
			onSearchFocus() {
				  // 阻止默认的弹起键盘行为
				 this.$refs.searchBar.blur();
			      // 调用页面跳转方法
			      uni.navigateTo({
			        url: '../index/search/search',
			      });
			},
			
			toSwiper(id) {
			      uni.navigateTo({
			        url: `../index/detail/detail?id=${id}`,
			      });
			},
			
			goToMore(item) {
				console.log(item)
				uni.navigateTo({
					url: `../index/moreMovie/moreMovie?item=${item}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			checkVersion(){
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
					if( result.notice !==''){
						this.notice = result.notice;
					}
					if(verCode < result.versionCode){
						// 更新提醒
						uni.showModal({
							title: '发现新版本，是否更新',
							content: '待更新版本：' + result.versionName +'\n更新说明:'+result.versionDesc,
							success: res => {
								// 点击确定
								if (res.confirm) {
									// 打开手机自带浏览器下载
									//plus.runtime.openURL(result.downloadUrl+result.appName)
									this.downloadUrl = result.downloadUrl+result.appName
									console.log('downloadUrl:'+this.downloadUrl)
									//显示升级进度
									this.showPopup();
									if (this.downloadUrl) {
										this.isStartDownload = true
										//开始下载App
										downloadApp(this.downloadUrl, current => {
											//下载进度
											this.progress = current
										}).then(fileName => {
											//下载完成
											this.isDownloadFinish = true
											this.fileName = fileName
											if (fileName) {
												//自动安装App
												this.handleInstallApp()
											}else{
												this.$refs.popup.close();
												uni.showToast({
													title: '下载失败',
													icon: 'none',
													duration:1500
												})
											}
										}).catch(e => {
											//console.log(e, 'e')
											this.$refs.popup.close();
											uni.showToast({
												title: '升级失败,'+e,
												icon: 'none',
												duration:1500
											})
										})
									} else {
										this.$refs.popup.close();
										uni.showToast({
											title: '下载链接不存在',
											icon: 'none',
											duration:1500
										})
									}
									//this.startProgress();
								}
							}
						});
					}
					
				})
			},
			showPopup() {
			    this.$refs.popup.open();
			},
			//安装app
			handleInstallApp() {
				//下载完成才能安装，防止下载过程中点击
				if (this.isDownloadFinish && this.fileName) {
					this.$refs.popup.close();
					installApp(this.fileName, () => {
						//安装成功,关闭升级弹窗
						 this.$refs.popup.close();
					})
				}
			}
		},
		mounted() {
			console.log("mounted")
			getSwiperList().then(item => {
				this.swiperList = item;
			});
			getTop250(0,10).then(result => {
				console.log("getTop250,result:");
				console.log(result);
				this.top250List = result.data; 
			});
			getNowHot(0,10,"郑州").then(result => {
				//this.swiperList = item;
				console.log("getNowHot,result:");
				console.log(result);
				this.hotList = result.data; 
			});
			getSoonMovie(0,10).then(result => {
				//this.swiperList = item;
				console.log("getSoonMovie,result:");
				console.log(result);
				this.soonList = result.data; 
			});
			getWeekMovie(0,10).then(result => {
				//this.swiperList = item;
				console.log("getWeekMovie,result:");
				console.log(result);
				this.weekList = result.data; 
			});
			
			getNewMovie(0,10).then(result => {
				//this.swiperList = item;
				console.log("getNewMovie,result:");
				console.log(result);
				this.newsList = result.data; 
			});
			
			getUsBoxMovie(0,10).then(result => {
				//this.swiperList = item;
				console.log("getUsBoxMovie,result:");
				console.log(result);
				this.usBoxList = result.data; 
			});
			
			getTvHot(0,10).then(result => {
				//this.swiperList = item;
				console.log("getTvHot,result:");
				console.log(result);
				this.tvHotList = result.data; 
			});
		
		   this.checkVersion();
			
		}
	}
</script>

<style scoped>
	page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #efeff4;
			min-height: 100%;
			height: auto;
			font-size: 30rpx;
		}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.uni-margin-wrap {
			width: 690rpx;
			width: 100%;
		}
		
	.swiper {
		height: 350rpx;
	}
	
	.swiper-image{
		width: 100%; 
		height: auto;
	}
	
	.swiper-desc {
	  position: absolute;
	  bottom: 20px;
	  left: 0;
	  right: 0;
	  color: #fff;
	  background-color: rgba(0, 0, 0, 0.5);
	  padding: 10px;
	  text-align: center;
	}
	
	.swiper-item {
		display: block;
		height: 350rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-top: 15rpx;
	}
	.title-item{
		font-weight: bold;
	}
	.title-more{
		 color: #00aaff;
	}
	
	.scroll{
		height:320rpx;
		width: 100%;
		white-space: nowrap;
		margin-top:15rpx;
	}
	
	.movie-box{
		display: flex;
		flex-direction: row;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	
	.movie-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 200rpx;
	  height: 330rpx;
	  margin-right: 22rpx;
	}
	
	.movie-item-img {
		border-radius: 10rpx;
	}
	.movie-item-title {
	  color: #606266;
	  font-size: 20rpx;
	  font-weight: bold;
	  margin-top: 10rpx;
	}
	.movie-rate {
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}
	
	.movie-rate-t {
		margin-right: 4rpx;
		font-size: 8rpx;
	}
	
	.search-bar-box {
	  background-color: rgba(85, 170, 255, 0.6);
	  padding: 0rpx;
	  border-radius: 4rpx; 
	}
	
	.popup-content {
	  text-align: center;
	  max-width: 500rpx; /* 限定最大高度 */
	  overflow:hidden;
	  background-color: #00aaff;
	  border-radius: 10rpx; 
	  padding: 50px;
	}
</style>
