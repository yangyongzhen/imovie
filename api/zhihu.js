
// 知乎日报 列表页
/**
 * date 日期 格式:yyyymmdd
 */
export const getZhihuNewsList = async (date) => {
  try {
	console.log('getZhihuNewsList request');
	let date_ = date.replace(/-/g, '')
    const response = await uni.$http.get('/zhihunews/'+date_);
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