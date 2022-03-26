const {
  rechargeApi,getUserInfo
} = require('../../api/index')
const {resetUserInfo} = require('../../utils/tools')
var app = getApp();
Page({
  data: {
    userInfo: {},
  },
  onShow: async function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    const {
      userInfo
    } = app.globalData;
    this.setData({
      ...this.data,
      userInfo
    })
  },
  /**
   * 充值
   */
   recharge(){
    const that = this;
    wx.showModal({
      title: '充值',
      editable: true,
      placeholderText: '请输入充值金额',
      async success(res) {
        const {
          content
        } = res;
        if (res.confirm) {
          
          const reg = /^[1-9][0-9]{0,}$/;
          if (!reg.test(content)) {
            wx.showToast({
              title: '输入金额错误',
              icon: 'error'
            })
            return;
          }
          const resApi = await rechargeApi({
            rechargeValue: Number(content)
          });
          if (!resApi.success) {
            wx.showToast({
              title: res.message,
            })
            return;
          }
          const resUserInfo = await getUserInfo();
          if (!resUserInfo.success) {
              return;
          }
          wx.setStorageSync('userInfo', resUserInfo.data);
          app.globalData.userInfo = resUserInfo.data;
          that.setData({
            ...that.data,
            userInfo: resUserInfo.data
          })
        }
      }
    })
  },
  /**
   * 跳转个人详情
   */
  jumpToMyInfo(){
    const {
      userInfo
    } = app.globalData;
    if (!userInfo) {
      return;
    }
    wx.navigateTo({
      url: '/pages/myInfo/myInfo',
    })
  },

  /**
   * 退出登录
   */
  logOut: function () {
    wx.clearStorageSync('userInfo');
    wx.clearStorageSync('token');
    wx.navigateTo({
      url: '../rege_login/rege_login',
    })
  }
})