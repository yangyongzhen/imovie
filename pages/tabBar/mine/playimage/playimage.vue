<template>
    <view>
        <view class="content">
        	<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
        		:duration="duration" lazy-render>
        		
        		<swiper-item v-for="(item, index) in swiperList" :key="index" @click="toSwiper(index)" >
        			<image :src="item" mode="widthFix" class="swiper-image"></image>
        		</swiper-item>
        	</swiper>
		</view>
		<view class="item-content-box">
			<checkbox-group @change="onCheckboxChange">
			<label>
				<checkbox value="cb" :checked="isLoop"  style="transform:scale(0.7)" />循环播放
			</label>
			</checkbox-group>
			<view class="item-button">
				<button type="primary" @click="chooseImage">选择图片</button>
			</view>
			<view class="item-button">
				<button type="primary" @click="loopPlay">幻灯播放</button>
			</view>
			
		</view>
		
    </view>
</template>


<script>
	import { chooseFile } from '@/uni_modules/lime-choose-file'
	export default {
    data() {
        return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			swiperList: [], // 存储视频路径的数组
			currentIndex: 0,
			timer: null,
			isLoop: true // 是否循环播放
        }
    },
	computed: {
	   
	},
    onReady: function(res) {
    },
	onLoad(params) {
		console.log('playimage onLoad');
	},
	onShow(){
		console.log('playimage onShow');
		stopAutoPlay();
	},
	onUnload() {
	    console.log('playimage onUnload');
		if(this.timer!=null){
			clearInterval(this.timer);
			this.timer = null;
			this.currentIndex = 0;
		}
	},
	mounted() {
		console.log("mounted")
	},
    methods: {
		chooseImage() {
		      chooseFile({
				count: 80,
				type: 'image',
		        success: (res) => {
		          this.swiperList = res.tempFiles.map((item) => item.path)
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
		toSwiper(idx) {
			this.currentIndex = idx;
			uni.previewImage({
			  urls: this.swiperList, // 需要预览的图片链接列表
			  current: this.swiperList[idx], // 当前显示图片的链接
			  loop: this.isLoop,
			  success: (res) => {
				// 成功的回调
			  },
			  fail: (res) => {
					// 失败的回调
			  },
			});
			
		},
		loopPlay(){
			console.log('loopPlay');
			this.playNextImage(this.currentIndex);
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
		playNextImage(idx) {
			console.log('playNextImage');
			uni.previewImage({
			        urls: this.swiperList,
			        current: this.swiperList[this.currentIndex],
			        success: () => {
			          this.startAutoPlay();
			        }
			});
		},
		startAutoPlay() {
			console.log("startAutoPlay");
			if(this.timer == null){
				this.timer = setInterval(() => {
				    this.currentIndex = (this.currentIndex + 1) % this.swiperList.length;
				    uni.previewImage({
				      urls: this.swiperList,
				      current: this.swiperList[this.currentIndex],
					  complete: () => {
						if(!this.isLoop){
							this.stopAutoPlay();
						}
					  }
				    });
				}, 3000); // 每3秒切换一次图片
			}
		},
		stopAutoPlay() {
			console.log("stopAutoPlay");
			if(this.timer != null){
				clearInterval(this.timer);
				this.timer = null;
				this.currentIndex = 0;
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
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
		
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.swiper {
		width: 100%;
		height: 500rpx;
		background-color: #000000;
	}
	.swiper-image{
		width: 100%; 
		height: auto;
	}
	
	.item-content-box {
	  padding: 20rpx;
	  flex-direction: column;
	
	}
	
	.item-button {
	  margin-top: 20px;
	}

</style>
