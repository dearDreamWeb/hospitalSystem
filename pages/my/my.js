const {
  rechargeApi, getUserInfo, doctorGetMessageTotal
} = require('../../api/index')
const { resetUserInfo } = require('../../utils/tools')
var app = getApp();
Page({
  data: {
    userInfo: {},
    doctorInfo: {},
    unReadNum: 0
  },
  onShow: async function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    const {
      userInfo,
      doctorInfo,
    } = app.globalData;

    this.setData({
      ...this.data,
      userInfo,
      doctorInfo
    })
    this.queryComments()
  },
  /**
   * 充值
   */
  recharge() {
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
  jumpToMyInfo() {
    const {
      userInfo,
      doctorInfo
    } = app.globalData;
    if (!userInfo && !doctorInfo) {
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
    wx.clearStorageSync('doctorInfo');
    wx.clearStorageSync('token');
    wx.navigateTo({
      url: '../rege_login/rege_login',
    })
  },

  async queryComments() {
    const doctorInfo = app.globalData.doctorInfo;
    const res = await doctorGetMessageTotal({ doctorId: doctorInfo.id });
    if (!res.success) {
      return;
    }
    console.log()
    this.setData({
      ...this.data,
      unReadNum: res.data.total || 0
    })
  },
})