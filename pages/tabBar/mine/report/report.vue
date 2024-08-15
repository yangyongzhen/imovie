<template>
  <view class="feedback-container">
    <uni-forms ref="feedbackForm" :model="formData" :rules="rules">
      <uni-forms-item label="用户" name="username" required>
        <uni-easyinput v-model="formData.username" placeholder="请输入用户名" />
      </uni-forms-item>
      <uni-forms-item label="邮箱" name="email" required>
        <uni-easyinput v-model="formData.email" placeholder="请输入邮箱"  />
      </uni-forms-item>
      <uni-forms-item label="内容" name="feedbackContent" required>
        <uni-easyinput type="textarea" autoHeight v-model="formData.feedbackContent" placeholder="请输入反馈内容" />
      </uni-forms-item>
      <button type="primary" @click="submitForm">提交反馈</button>
    </uni-forms>
  </view>
</template>

<script>
	import { postFeedBack } from '@/api/mine.js';
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        feedbackContent: ''
      },
      rules: {
        username: {
          rules: [{ required: true, errorMessage: '用户名不能为空' }]
        },
        email: {
          rules: [{ required: true, errorMessage: '邮箱不能为空' }, { format: 'email', errorMessage: '请输入正确的邮箱地址' }]
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.feedbackForm.validate().then(res => {
        console.log('表单数据:', res);
        postFeedBack(res.username,res.email,
                       this.formData.feedbackContent).then(result => {
        				console.log("postFeedBack,result:");
        				console.log(result);
        				if(result.code == 0){
        					uni.showToast({
        					  title: '提交成功,感谢反馈!',
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
</style>