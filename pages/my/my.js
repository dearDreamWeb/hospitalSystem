//my.js
var app = getApp();
Page({
  data: {
    username: '未登录',
    money: 0
  },
  onShow: async function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    const storage = await wx.getStorage({
      key: 'userInfo'
    });
    const {
      phone_number
    } = storage.data.userInfo

    this.setData({
      ...this.data,
      username: phone_number
    })
  },
  /**
   * 充值
   */
  recharge: () => {
    wx.showModal({
      title: '充值',
      editable: true,
      placeholderText: '请输入充值金额',
      success(res) {
        if (res.confirm) {
          const {
            content
          } = res;
          const reg = /^[1-9][0-9]{0,}$/;
          if (!reg.test(content)) {
            wx.showToast({
              title: '输入金额错误',
              icon: 'error'
            })
            return;
          }
        }
      }
    })
  },
  /**
   * 跳转个人详情
   */
  jumpToMyInfo: () => {
    const {
      userInfo
    } = app.globalData;
    if (!userInfo) {
      return;
    }
    wx.navigateTo({
      url: '/pages/myInfo/myInfo',
    })
  }
})