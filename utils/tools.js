const {
    getUserInfo,
} = require('../api/index');

const resetUserInfo = async () => {
    const res = await getUserInfo();
    if (!res.success) {
        return;
    }
    wx.setStorageSync('userInfo', res.data);
    app.globalData.userInfo = res.data
}

module.exports = { resetUserInfo }