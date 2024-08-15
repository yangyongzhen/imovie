
// 提交意见反馈
export const postFeedBack = async (user,email,note) => {
  try {
	console.log('postFeedBack request');
    const response = await uni.$http.post('/feedback',{
		user:user,email:email,note:note});
	
	console.log(response);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Network request failed:', error);
    uni.showToast({
      title: '网络请求失败! ',
      duration: 1500,
      icon: 'none',
    });
    return [];
  }
};