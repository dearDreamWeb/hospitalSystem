var app = getApp();
Page({
  data: {
    // tab 切换
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1,
      defaultType: true,
      passwordType: true,
    }

  },
  //defaultType：眼睛状态   passwordType：密码可见与否状态
  eyeStatus: function () {
    if (this.data.defaultType) {
      this.setData({
        passwordType: false,
        defaultType: false,
      })
    } else {
      this.setData({
        passwordType: true,
        defaultType: true,
      })
    }
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');

  },
  /**
   * 注册
   * @param {*} e 
   */
  RegisterInfo: function (e) {
    console.log("RegisterInfojson:" + e.detail.value)
    const {
      name,
      phone_number,
      pwd,
      sex,
      age
    } = e.detail.value;

    if (!name || !phone_number || !pwd || !sex || !age) {
      wx.showToast({
        title: '请完善个人信息',
        icon: 'error',
        mask: true
      })
      return;
    }
    const reg = /^1[0-9]{10}$/;
    if (!reg.test(phone_number)) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'error',
        mask: true
      })
      return;
    }
    
    const regAge = /^[1-9][0-9]{0,2}$/
    if (!regAge.test(age)) {
      wx.showToast({
        title: '年龄输入错误',
        icon: 'error',
        mask: true
      })
      return;
    }

    this.setData({
      tabArr: {
        ...this.tabArr,
        curHdIndex: 2,
        curBdIndex: 2,
      }
    })
  },
  
  /**
   * 登录
   * @param {*} e 
   */
  UserLogin: function (e) {
    var json = JSON.stringify(e.detail.value)
    console.log("userlogin:" + json)
    wx.request({
      url: app.getHeader() + '/userLogin', // 拼接接口地址
      method: 'post',
      data: json,
      contentType: 'application/json',
      success(res) {
        console.log('res.data:' + res.data)
        app.globalData.uid = res.data
        if (res.data != "failure") {
          wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            }),
            wx.switchTab({
              url: '../index/index',
            })
          // setTimeout(function () {
          //   wx.navigateBack({
          //     delta: 2
          //   })
          // }, 1000)
        } else {
          wx.showToast({
            title: '登录失败',
            duration: 1000,
            icon: 'none'
          })
        }
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //tab切换
  tab: function (e) {
    //var dataId = e.currentTarget.dataset.id;
    var dataId = e.currentTarget.id;
    var obj = {};
    // dataId为1时为注册，为2时为登录
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj
    })
  },
  showok: function () {
    wx.showToast({
      title: '信息提交成功',
      icon: 'success',
      duration: 2000
    })
  }
})