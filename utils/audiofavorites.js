// utils/audiofavorites.js

let favorites = [];

// 初始化收藏数据
function initAudioFavorites() {
  const storedFavorites = uni.getStorageSync('audiofavorites');
  if (storedFavorites) {
    favorites = storedFavorites;
  }
}

// 保存收藏数据到本地存储
function saveAudioFavorites() {
  uni.setStorageSync('audiofavorites', favorites);
}

// 添加收藏
function addAudioFavorite(item) {
  // 检查是否已存在相同记录，如果存在则移除旧记录
  favorites = favorites.filter(record => record.id !== item.id);
  // 添加新记录到最前面
  favorites.unshift(item);
  saveAudioFavorites();
}

// 检查是否已收藏
function isAudioFavorite(id) {
  return favorites.some(item => item.id === id);
}

// 获取已收藏的数量
function getAudioFavoriteCount() {
  return favorites.length;
}

// 取消收藏
function removeAudioFavorite(id) {
  favorites = favorites.filter(item => item.id !== id);
  saveAudioFavorites();
}

// 获取所有收藏信息
function getAllAudioFavorites() {
  return favorites;
}

// 导出方法
export default {
  initAudioFavorites,
  addAudioFavorite,
  isAudioFavorite,
  getAudioFavoriteCount,
  removeAudioFavorite,
  getAllAudioFavorites
};
