<template>
	<view class="audio_container">
		<!-- video标签 -->
		<video id="videoPlayer" ref="videoPlayer" :src="src" :autoplay="autoplay" :muted="false"
			style="width: 1rpx;height:1rpx;opacity: .1;" class="videoPlay" @loadedmetadata="onCanplay"
			 @timeupdate="onTimeUpdate" @error="errorFn" ></video>
			 
		<view class="audio-title"
			style="width: 100%; text-align: left; font-size: 36rpx;font-weight: bold;padding: 0rpx 0rpx;position: relative;">
			<uni-notice-bar single :scrollable="titleScroll" :size="titleFontSize"
				:background-color="titleBackgroundColor" :color="titleColor" :speed="titleScrollSpeed" :text="title" style="padding-right: 50rpx;">
			</uni-notice-bar>
			<uni-icons v-show="isCollectBtn" @click="handleCollec"  type="heart" size="20" style="color:#848484; position: absolute;top: 0rpx;right: 0px;" ></uni-icons>
		</view>
		<view class="audio-subTitle"
			:style="'font-size: '+subTitleFontSize+';font-weight: bold;padding: 0rpx 0rpx 4rpx 0rpx;position: relative;'">
			<uni-notice-bar single :scrollable="titleScroll" :size="titleFontSize"
				:background-color="titleBackgroundColor" :color="subTitleColor" :speed="titleScrollSpeed"
				:text="subTitle" style="padding-right: 50rpx;">
			</uni-notice-bar>
			<uni-icons v-show="isShareBtn" @click="handleShare" type="redo" size="20" style="color:#848484;position: absolute;top: 0rpx;right: 0px;" ></uni-icons>
		</view>
		<view>
			<slider :backgroundColor='backgroundColor' :activeColor='activeColor' @change="handleSliderChange"
				:value="sliderIndex" :max="maxSliderIndex" block-color="#343434" block-size="16" />
		</view>
		<view style="padding: 0rpx 15rpx 0rpx 15rpx ; display: block; ">
			<view style="float: left; font-size: 20rpx;color:#848484;">
				{{currentTimeText}}
			</view>
			<view style="float: right;font-size: 20rpx;color:#848484;">
				{{totalTimeText}}
			</view>
		</view>
		<view style="margin-top: 70rpx;">
			<uni-grid :column="5" :showBorder="false" :square="false">
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleChageSpeed" src="../../static/images/multiple.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
							<text class="speed-text">{{playSpeed}}</text>
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleFastRewind" src="../../static/images/get-back.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleChangeAudioState" v-show="!isPlaying" src="../../static/images/play.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
						<image @tap="handleChangeAudioState" v-show="isPlaying" src="../../static/images/pause.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleFastForward" src="../../static/images/fast-forward.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleLoopPlay" src="../../static/images/Loop.svg"
							style="width: 48rpx;height: 48rpx; top:6rpx; ">
						</image>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'my-video',
		//audioPlay开始播放
		//audioPause停止播放
		//audioEnd音频自然播放结束事件
		//audioCanplay音频进入可以播放状态，但不保证后面可以流畅播放
		//change播放状态改变 返回值false停止播放 true开始播放
		emits: ['audioPlay', 'audioPause', 'audioEnd', 'audioCanplay', 'change'],
		props: {
			//标题文字
			title: {
				type: String,
				default: ''
			},
			//标题默认字体大小
			titleFontSize: {
				type: Number,
				default: 35
			},
			//标题文字颜色
			titleColor: {
				type: String,
				default: '#303030'
			},
			//标题背景色
			titleBackgroundColor: {
				type: String,
				default: 'white'
			},
			//标题是否滚动
			titleScroll: {
				type: Boolean,
				default: false
			},
			//标题滚动速度
			titleScrollSpeed: {
				type: Number,
				default: 100
			},

			subTitle: {
				type: String,
				default: ''
			},
			subTitleColor: {
				type: String,
				default: '#6C7996'
			},
			subTitleFontSize: {
				type: String,
				default: "30rpx"
			},
			autoplay: {
				type: Boolean,
				default: false
			},
			//滑块左侧已选择部分的线条颜色
			activeColor: {
				type: String,
				default: '#7C7C7C'
			},
			//滑块右侧背景条的颜色
			backgroundColor: {
				type: String,
				default: '#E5E5E5'
			},

			//音频地址
			src: {
				type: [String, Array],
				default: ''
			},

			//是否倒计时
			isCountDown: {
				type: Boolean,
				default: false
			},

			//音乐封面
			audioCover: {
				type: String,
				default: ''
			},
			//是否显示收藏按钮
			isCollectBtn: {
				type: Boolean,
				default: false
			},
			//是否显示分享按钮
			isShareBtn: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				totalTimeText: '00:00', //视频总长度文字
				currentTimeText: '00:00:00', //视频已播放长度文字

				isPlaying: false, //播放状态

				sliderIndex: 0, //滑块当前值
				maxSliderIndex: 100, //滑块最大值

				IsReadyPlay: false, //是否已经准备好可以播放了

				isLoop: false, //是否循环播放

				speedValue:[0.5,0.8,1.0,1.25,1.5,2.0],
				speedValueIndex:2,
				playSpeed: '1.0', //播放倍速 可取值：0.5/0.8/1.0/1.25/1.5/2.0

				stringObject: (data) => {
					return typeof(data)
				},
				innerAudioContext: null,
				// 后台音频控制器
				backAudio:null,
			}
		},
		created() {
			// 获取 video 对象
			this.innerAudioContext = uni.createVideoContext("videoPlayer", this);
			
		},
		async mounted() {
			this.innerAudioContext.src = typeof(this.src) == 'string' ? this.src : this.src[0];
		},
		methods: {
			//音频进入可以播放状态，但不保证后面可以流畅播放
			onCanplay(e){
				this.IsReadyPlay = true;
				let  duration=e.detail.duration;
				
				this.$emit('audioCanplay');
				
				//将当前音频长度秒转换为00：00：00格式
				this.totalTimeText = this.getFormateTime(duration);
				this.maxSliderIndex = parseFloat(duration).toFixed(2);
				
				// #ifdef MP
				this.totalTimeText = parseFloat(duration).toFixed(2);
				this.maxSliderIndex = parseFloat(duration).toFixed(2);
				// #endif
				
			},
			// 音频播放事件处理函数 (持续触发) - 获取当前播放时长
			onTimeUpdate(e) {
				this.sliderIndex = parseFloat(e.detail.currentTime).toFixed(2);
				this.currentTimeText = this.getFormateTime(e.detail.currentTime);
				
				//如果已经播放到结尾,回到音频开始
				if(this.sliderIndex==this.maxSliderIndex)
				{
					let prevState=this.isPlaying;
					this.sliderIndex=0;
					this.changePlayProgress(0);
					this.audioPause();
					
					//如果开启循环播放，且结束前还是播放状态
					if(this.isLoop && prevState)
					{
						this.audioPlay();
					}
				}
			},
			
			//销毁innerAudioContext()实例
			audioDestroy() {
				if (this.innerAudioContext) {
					if (this.isPlaying && !this.innerAudioContext.paused) {
						this.audioPause();
					}
					this.innerAudioContext=null;
					this.isPlaying = false;
				}
			},
			//点击变更播放状态
			handleChangeAudioState() {
				if (this.isPlaying && !this.innerAudioContext.paused) {
					this.audioPause();
				} else {
					this.audioPlay();
				}
			},
			//开始播放
			audioPlay(){
				this.innerAudioContext.play();
				this.isPlaying=true;
				this.$emit('audioPlay')
				
				this.$emit('change', {
					state: true
				});
			},
			//暂停播放
			audioPause(){
				this.innerAudioContext.pause();
				this.isPlaying=false;
				
				this.$emit('audioPause');
				this.$emit('change', {
					state: false
				});
			},
			//变更滑块位置
			handleSliderChange(e) {
				this.changePlayProgress(e.detail ? e.detail.value : e)
			},
			//更改播放倍速
			handleChageSpeed(){
				//获取播放倍速列表长度
				let speedCount=this.speedValue.length;
				//如果当前是最大倍速，从-1开始
				if(this.speedValueIndex==(speedCount-1))
				{
					this.speedValueIndex=-1;
				}
				//最新倍速序号
				this.speedValueIndex+=1;
				//获取最新倍速文字
				this.playSpeed=this.speedValue[this.speedValueIndex].toFixed(1);
				//暂停播放
				this.audioPause();
				//变更播放倍速
				this.innerAudioContext.playbackRate(this.speedValue[this.speedValueIndex]);
				//开始播放
				this.audioPlay();
			},
			//快退15秒
			handleFastRewind() {
				if (this.IsReadyPlay) {
					let value = parseInt(this.sliderIndex) - 15;
					this.changePlayProgress(value >= 0 ? value : 0);
				}
			},
			//快进15秒
			handleFastForward() {
				if (this.IsReadyPlay) {
					let value = parseInt(this.sliderIndex) + 15;
					this.changePlayProgress(value <= this.maxSliderIndex ? value : this.maxSliderIndex);
				}
			},
			//开启循环播放
			handleLoopPlay() {
				this.isLoop = !this.isLoop;
				if (this.isLoop) {
					uni.showToast({
						title: '已开启循环播放',
						duration: 1000
					});
				}
				else{
					uni.showToast({
						title: '取消循环播放',
						duration: 1000
					});
				}
			},
			//更改播放进度
			changePlayProgress(value) {
				this.innerAudioContext.seek(value);
				
				this.sliderIndex = value;
				this.currentTimeText = this.getFormateTime(value);
			},
			//秒转换为00:00:00
			getFormateTime(time) {
				let ms = time * 1000; // 1485000毫秒
				let date = new Date(ms);

				// 注意这里是使用的getUTCHours()方法，转换成UTC(协调世界时)时间的小时
				let hour = date.getUTCHours();
				// let hour = date.getHours(); 如果直接使用getHours()方法，则得到的时分秒格式会多出来8个小时（在国内开发基本都是使用的是东八区时间），getHours()方法会把当前的时区给加上。
				let minute = date.getMinutes();
				let second = date.getSeconds();

				let formatTime =
					`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

				return formatTime;
			},
			handleCollec(){
				this.$emit('audioCollec');
			},
			handleShare(){
				this.$emit('audioShare');
			},
			errorFn(){
				this.$emit('change', {
					state: false
				});
				this.audioPause();
				this.$emit('error');
			}
		},
		onUnload() {
			console.log("onUnload")
			this.audioDestroy()
		},
		onHide() {
			console.log("onHide")
			this.audioDestroy()
		},
		beforeDestroy() {
			console.log("beforeDestroy")
			this.audioDestroy()
		}
	}
</script>

<style lang="scss" scoped>
	.audio_container {
		box-shadow: 0 0 10rpx #c3c3c3;
		padding: 15rpx 15rpx 40rpx 15rpx;

		.audio-title {
			font-size: 28rpx;
		}

		.uni-noticebar {
			padding: 0px;
		}

		.audio-subTitle {
			width: 100%;
			text-align: left;
			font-size: 40rpx;
			color: blue;
		}

		.speed-text {
			position: absolute;
			top: 0rpx;
			left: 30rpx;
			right: 0;
			color: #475266;
			font-size: 16rpx;
			font-weight: 600;
		}

		.uni-grid-icon {
			text-align: center;
		}

	}
</style>