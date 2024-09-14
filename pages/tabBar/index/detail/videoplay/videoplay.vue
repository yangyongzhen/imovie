<template>
    <view>
        <view>
            <view class="container">
                <video id="myVideo" :src="vsrc" 
				      controls="true"
				      autoplay="false"
				      loop="false"
				      muted="false"
					  :title="title"
					  :play-strategy="2"
					  @fullscreenchange="onFullscreenChange"
					  @tap="onTapVideo"
					  enable-progress-gesture="false"
					  enable-play-gesture="false"
					  @timeupdate="onTimeUpdate"
                      @error="videoErrorCallback" :custom-cache="false">
				<cover-view v-if="showTitle" class="fullscreen-title">
				      <text class="title">{{ title }}</text>
				</cover-view>
				</video>
				
            </view>
        </view>
		<uni-card :is-shadow="false"  :title="mv.title" extra="豆瓣评分 >" margin="10rpx">
			<view class="movie-rate">
				<uni-rate :readonly="true" :value="mv.rate/2" size=18 active-color="#ffaa00" color="#DADADA">
				</uni-rate>
				<text class="movie-rate-t">{{mv.rate}}</text>
			</view>
		</uni-card>
		 <!-- 判断 tvurls 是否为空 -->
		<view v-if="tvurls.length > 0">
		  <view>
		    <view class="icon-container" @click="showPopup">
		          <text class="icon-text">选集</text>
		          <view class="icon-badge-wrapper">
		            <uni-icons type="list" size="24" color="#000"></uni-icons>
		            <uni-badge :text="tvurls.length" type="error"></uni-badge>
		          </view>
		    </view>
			<view>
				<uni-grid :column="5" :showBorder="false" :square="false">
				  <uni-grid-item v-for="(url, idx) in limitedTvurls" :key="idx" @click="playEpisode(idx,0)">
				    <view :class="['episode-item', { active: selectedIndex === idx }]">
				      <text>{{ `第${idx + 1}集` }}</text>
				    </view>
				  </uni-grid-item>
				</uni-grid>
			</view>
		     <uni-popup ref="popup" type="bottom" @maskClick="closePopup">
		       <view class="popup-content">
		         <uni-grid :column="4" :showBorder="false" :square="false">
		           <uni-grid-item v-for="(url, index) in tvurls" :key="index" @click="playEpisode(index,0)">
		             <view :class="['episode-item', { active: selectedIndex === index }]">
		               <text>{{ `第${index + 1}集` }}</text>
		             </view>
		           </uni-grid-item>
		         </uni-grid>
		       </view>
		     </uni-popup>
		   </view>
		</view>
		<view class="sub-title" >
			简介
		</view>
		<view class="description">
		    <view :class="{'folded': isFolded}" v-html="mv.summary">
				
		    </view>
		    <view @click="toggleDescription" class="toggle-button">
		        {{ isFolded ? '展开' : '收起' }}
		    </view>
		</view>
    </view>
</template>


<script>
	import { getMovieSource } from '@/api/detail.js';
	import playhistory  from '@/utils/playhistory.js';
	import { formatDate } from '@/common/util.js';
	export default {
    data() {
        return {
			s_id:'',
			mv:{},
			history:{},   //播放历史
			isFolded: true ,// 初始状态为折叠
            vsrc: '',  //视频源
			playTime: 0,// 当前播放时间
			tvurls:[],  // 电视资源
			selectedIndex: -1, //  电视集数 初始化选中索引为 -1，表示没有选中任何项
			isFullscreen: false,
		    showTitle: false,
		    title: '我的视频标题',
			timeoutId: null,
        }
    },
	computed: {
	    limitedTvurls() {
	      return this.tvurls.slice(0, 5);
	    }
	},
    onReady: function(res) {
        // #ifndef MP-ALIPAY
        this.videoContext = uni.createVideoContext('myVideo')
        // #endif
    },
	onLoad(params) {
		console.log('videoplay onLoad');
		if (Object.keys(params).length !== 0) {
			if (typeof params.isHistory !== 'undefined' && params.isHistory === 'true') {
				this.playTime = params.playtime;
				this.selectedIndex = params.tvindex;
				console.log(this.playTime);
				console.log(this.selectedIndex);
			}
			const mv_ = JSON.parse(decodeURIComponent(params.mv));
			this.s_id = params.id;
			this.mv = mv_;
			this.history.mv = mv_;
			this.title = mv_.title
			if(this.selectedIndex >= 0){
				this.title = this.mv.title + ` 第${this.selectedIndex+1}集`
			}
		}
		playhistory.initPlayHistory();
	},
	onUnload() {
	    console.log('videoplay onUnload');
	    // 在组件销毁之前保存播放记录
		if(this.vsrc != ''){
			this.history.id = this.s_id;
			this.history.vsrc = this.vsrc;
			this.history.playTime = this.playTime;
			this.history.tvIndex =  this.selectedIndex;
			this.history.time = formatDate();
			console.log("playTime:");
			console.log(this.playTime);
			playhistory.addPlayRecord(this.history);
		}
	},
	mounted() {
		console.log("mounted")
		console.log(this.s_id)
		getMovieSource(this.s_id).then(result => {
			console.log("getMovieSource,result:");
			console.log(result);
			this.title = result.title
			if (Array.isArray(result.urls) && (result.urls[0] != "")) {
				this.vsrc = result.urls[0]
				this.$nextTick(() => {
				    if (this.videoContext) {
				        setTimeout(() => {
							console.log(this.playTime);
							this.videoContext.seek(parseInt(this.playTime));
				            this.videoContext.play();
				        }, 200); // 200毫秒
				    }
				});
			}else if (Array.isArray(result.tvurls) && result.tvurls.length > 0) {
				this.tvurls = result.tvurls;
				//如果来自历史播放记录，则接着播放
				if (this.selectedIndex >= 0){
					this.playEpisode(this.selectedIndex,this.playTime);
				}
			}
			else{
				//this.vsrc = "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4";
				//this.videoContext = uni.createVideoContext('myVideo')
			    // if (this.videoContext) {
			    // 	this.videoContext.play();
			    // }
				uni.showModal({
				    content: "暂未找到片源,可留言反馈",
				    showCancel: false
				})
			}
			//console.log(this.v_src);
			
		});
	},
    methods: {
        videoErrorCallback: function(e) {
			console.log(e)
            // uni.showModal({
            //     content: "播放失败,"+e.detail.errMsg,
            //     showCancel: false
            // })
        },
		videoReadyCallback: function(e) {
			console.log('Video ready:', e);
			// 确保视频已准备好再播放
			if (this.vsrc && this.videoContext) {
				this.videoContext.play();
			}
		},
		onTimeUpdate(event) {
		      this.playTime = event.detail.currentTime;
		},
		showPopup() {
		    this.$refs.popup.open();
		},
		closePopup() {
		  this.$refs.popup.close();
		},
		playEpisode(index,ptime) {
		  this.selectedIndex = index;
		  // 播放选集的逻辑
		  const url = this.tvurls[index];
		  console.log('play:', url);
		  this.vsrc = url;
		  if(this.selectedIndex >= 0){
		  	this.title = this.mv.title + ` 第${this.selectedIndex+1}集`
		  }
		  this.$nextTick(() => {
		      if (this.videoContext) {
		          setTimeout(() => {
					  this.videoContext.seek(parseInt(ptime));
		              this.videoContext.play();
		          }, 200); // 延时200毫秒
		      }
		  });
		  this.closePopup();
		  // 可以在这里调用播放视频的 API
		},
        getRandomColor: function() {
            const rgb = []
            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16)
                color = color.length == 1 ? '0' + color : color
                rgb.push(color)
            }
            return '#' + rgb.join('')
        },
		toggleDescription() {
			this.isFolded = !this.isFolded;
		},
		onFullscreenChange(e) {
		      this.isFullscreen = e.detail.fullScreen;
		      if (this.isFullscreen) {
		        this.showTitle = false; // 进入全屏时先隐藏标题
		      }
		},
		onTapVideo() {
		      if (!this.isFullscreen) return;
		
		      if (this.timeoutId) {
		        clearTimeout(this.timeoutId);
		      }
		
		      this.showTitle = !this.showTitle;
		
		      if (this.showTitle) {
		        this.timeoutId = setTimeout(() => {
		          this.showTitle = false;
		        }, 2000);
		      }
		}
    }
}
</script>

<style lang="scss" scoped>
	
	page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #f8f4f5;
			min-height: 100%;
			height: auto;
		}
		
	.content {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 100vh;
	}

	video {
	  width: 100%;
	  max-width: 800px;
	}
	
	.movie-rate {
		display: flex;
		align-items: center;
		padding: 0rpx;
		margin-bottom: 0rpx;
	}
	
	.movie-rate-t {
		margin-left: 14rpx;
		font-size: 42rpx;
		font-weight: bold;
	}
	.sub-title {
		padding-left: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.description {
		display: flex; /* 添加flex布局 */
		flex-direction: column; /* 设置为列方向 */
	    line-height: 1.5;
		padding: 20rpx;
		font-size: 28rpx;
	}
	
	.folded {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    line-clamp: 4; /* 控制显示行数 */
	    -webkit-box-orient: vertical;
	}
	.toggle-button {
	    cursor: pointer;
	    margin-top: 20rpx;
		align-self: flex-end; /* 使按钮靠右对齐 */
	}
	
	.popup-content {
	  max-height: 600rpx; /* 限定最大高度 */
	  overflow:hidden;
	  overflow-y: auto; /* 添加滚动条 */
	  background-color: #fff;
	  padding: 20px;
	}
	
	.episode-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  height: 100%;
	  padding: 10rpx;
	  margin: 5rpx;
	  border: 1px solid #ccc;
	  border-radius: 15rpx;
	  cursor: pointer;
	}
	
	.episode-item.active {
	  background-color: #007aff;
	  color: #fff;
	}
	
	.episode-item text {
	  margin-bottom: 10rpx;
	}
	
	.icon-container {
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  cursor: pointer;
	  padding: 10px;
	}
	
	.icon-text {
	  font-size: 32rpx;
	  font-weight: bold;
	  color: #000;
	}
	
	.icon-badge-wrapper {
	  display: flex;
	  align-items: center;
	}
	
	.container {
	  position: relative;
	}
	.fullscreen-title {
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  visibility: visible;
	  background-color: rgba(0, 0, 0, 0.5); /* 背景颜色 */
	  color: #fff; /* 文字颜色 */
	  padding: 10rpx;
	  z-index: 1000; /* 确保标题在最上层 */
	}
	
	.title {
	  font-size: 32rpx;
	  text-align: center;
	}

</style>
