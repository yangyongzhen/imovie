<template>
    <view>
        <view>
			<video id="myVideo" :src="vsrc" 
				  controls="true"
				  autoplay="false"
				  loop="false"
				  muted="false"
				  :play-strategy="0"
				  enable-progress-gesture="false"
				  enable-play-gesture="false"
				  @ended="playNextVideo"
				  @error="videoErrorCallback" :custom-cache="false">
			</video>
        </view>
		<view class="item-content-box">
			<checkbox-group @change="onCheckboxChange">
			<label>
				<checkbox value="cb" :checked="isLoop"  style="transform:scale(0.7)" />循环播放
			</label>
			</checkbox-group>
			<view class="item-button">
				<button type="primary" @click="chooseVideo">选择视频</button>
			</view>
			
		</view>
		
    </view>
</template>


<script>
	import { chooseFile } from '@/uni_modules/lime-choose-file'
	export default {
    data() {
        return {
			videoPaths: [], // 存储视频路径的数组
		    currentVideoIndex: 0, // 当前播放视频的索引
            vsrc: '',  //视频源
			isLoop: true // 是否循环播放
        }
    },
	computed: {
	   
	},
    onReady: function(res) {
        // #ifndef MP-ALIPAY
        this.videoContext = uni.createVideoContext('myVideo')
        // #endif
    },
	onLoad(params) {
		console.log('playvideo onLoad');
	},
	onUnload() {
	    console.log('playvideo onUnload');
	},
	mounted() {
		console.log("mounted")
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
		chooseVideo() {
		      chooseFile({
				count: 30,
				type: 'video',
		        success: (res) => {
				  this.currentVideoIndex = 0;
		          this.videoPaths = res.tempFiles.map((item) => item.path)
				  this.playNextVideo();
		        },
				fail(err){
					console.log('err', err)
					uni.showToast({
					  title: err,
					  icon: 'fail'
					});
				}
		      });
		},
		onCheckboxChange(event) {
			console.log('onCheckboxChange')
			console.log(event.detail.value)
			if (event.detail.value.includes('cb')) {
				 this.isLoop = true;
			}else{
				 this.isLoop = false;
			}
			console.log(this.isLoop);
		},
		playNextVideo() {
			if (this.currentVideoIndex < this.videoPaths.length) {
			        this.vsrc = this.videoPaths[this.currentVideoIndex];
			        this.currentVideoIndex++;
			} else {
				if(this.isLoop){
					this.currentVideoIndex = 0;
					this.vsrc = this.videoPaths[this.currentVideoIndex];
				}else{
					this.currentVideoIndex = -1;
					this.vsrc = '';
				    uni.showToast({
					  title: '所有视频播放完毕',
					  icon: 'none'
				    });
				}
		    }
			
			if(this.currentVideoIndex >= 0){
				this.$nextTick(() => {
				    if (this.videoContext) {
				        setTimeout(() => {
							console.log(this.vsrc);
				            this.videoContext.play();
				        }, 100); // 100毫秒
				    }
				});
			}
		},
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
	
	.item-content-box {
	  padding: 20rpx;
	  flex-direction: column;
	
	}
	
	.item-button {
	  margin-top: 20px;
	}

</style>
