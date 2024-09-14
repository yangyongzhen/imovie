
// 获取电影合集
export const getMovieMenus = async (kind) => {
  try {
	console.log('getMovieMenus request');
	const response = await uni.$http.get('/getmvmenus?kind='+kind);
	console.log(response);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data.data;
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