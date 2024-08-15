<template>
  <view class="feedback-container">
    <uni-forms ref="feedbackForm" :model="formData" :rules="rules">
      <uni-forms-item label="视频源" name="source" required>
        <uni-easyinput v-model="formData.source" placeholder="请输入可播放的链接(https开头,支持mp4,m3u8等)" />
      </uni-forms-item>
	  <uni-forms-item label="贡献者" name="name" required>
        <uni-easyinput v-model="formData.name" placeholder="请输入贡献者用户名" />
      </uni-forms-item>
      <uni-forms-item label="邮箱" name="email" required >
        <uni-easyinput v-model="formData.email" placeholder="请输入您的联系邮箱"  />
      </uni-forms-item>
      <uni-forms-item label="备注" name="note" >
        <uni-easyinput type="textarea" autoHeight v-model="formData.note" placeholder="请输入其他备注信息" />
      </uni-forms-item>
      <button type="primary" @click="submitForm">提交</button>
    </uni-forms>
	<view class="notice">
		感谢：感谢您贡献视频资源！
	</view>
  </view>
</template>

<script>
	import { postMovieSource } from '@/api/detail.js';
export default {
  data() {
    return {
      formData: {
		source:'',
        name: '',
        email: '',
        note: '',
		sid:'',
		title:'',
      },
      rules: {
	    source: {
		 rules: [{ required: true, errorMessage: '片源信息不能为空' }]
	    },
        name: {
          rules: [{ required: true, errorMessage: '用户名不能为空' }]
        },
        email: {
          rules: [{ required: true, errorMessage: '邮箱不能为空' }, { format: 'email', errorMessage: '请输入正确的邮箱地址' }]
        }
      }
    };
  },
  onLoad(params) {
  	console.log('sharesource onload');
  	console.log(params);
  	this.formData.sid = params.id;
	this.formData.title = params.title;
  },
  methods: {
    submitForm() {
      this.$refs.feedbackForm.validate().then(res => {
        console.log('表单数据:', res);
        postMovieSource(this.formData.sid,res.source,
		                res.name,res.email,res.note,this.formData.title).then(result => {
						console.log("postMovieSource,result:");
						console.log(result);
						if(result.code == 0){
							uni.showToast({
							  title: '提交成功,资源审核中',
							duration: 1500,
							  icon: 'success'
							});
							// 提交成功后返回上一页
							uni.navigateBack();
						}else{
							uni.showToast({
							  title: '提交失败,'+result.message,
							  duration: 1500,
							  icon: 'error'
							});
						}
						
					});
      }).catch(err => {
        console.log('表单校验失败:', err);
      });
    }
  }
};
</script>

<style scoped>
.feedback-container {
  padding: 20rpx;
  flex-direction: column;

}
.notice{
	font-size: 24rpx;
	padding-top: 20rpx;
}
</style>