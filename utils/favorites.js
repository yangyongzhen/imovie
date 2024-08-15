// utils/favorites.js

let favorites = [];

// 初始化收藏数据
function initFavorites() {
  const storedFavorites = uni.getStorageSync('favorites');
  if (storedFavorites) {
    favorites = storedFavorites;
  }
}

// 保存收藏数据到本地存储
function saveFavorites() {
  uni.setStorageSync('favorites', favorites);
}

// 添加收藏
function addFavorite(item) {
  // 检查是否已存在相同记录，如果存在则移除旧记录
  favorites = favorites.filter(record => record.id !== item.id);
  // 添加新记录到最前面
  favorites.unshift(item);
  saveFavorites();
}

// 检查是否已收藏
function isFavorite(id) {
  return favorites.some(item => item.id === id);
}

// 获取已收藏的数量
function getFavoriteCount() {
  return favorites.length;
}

// 取消收藏
function removeFavorite(id) {
  favorites = favorites.filter(item => item.id !== id);
  saveFavorites();
}

// 获取所有收藏信息
function getAllFavorites() {
  return favorites;
}

// 导出方法
export default {
  initFavorites,
  addFavorite,
  isFavorite,
  getFavoriteCount,
  removeFavorite,
  getAllFavorites
};
