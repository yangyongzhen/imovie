<template>
    <view>
        <view>
			<video id="myVideo" :src="vsrc" 
				  controls="true"
				  autoplay="false"
				  loop="false"
				  muted="false"
				  :play-strategy="2"
				  enable-progress-gesture="false"
				  enable-play-gesture="false"
				  @error="videoErrorCallback" :custom-cache="false">
			</video>
        </view>
		<view class="item-content-box">
			<uni-easyinput v-model="source" placeholder="请输入可播放的链接(https开头,支持mp4,m3u8等)" />
			<view class="item-button">
				<button type="primary" @click="onPlayClick">播放</button>
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
            vsrc: '',  //视频源
			source:'',
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
		onPlayClick() {
			console.log('onPlayClick');
			this.vsrc = this.source;
			this.$nextTick(() => {
			    if (this.videoContext) {
			        setTimeout(() => {
						console.log(this.source);
			            this.videoContext.play();
			        }, 500); // 500毫秒
			    }
			});
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
