// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxStar: [],
    count: 0,
    wxStarEdit: true,
    msgContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化星数
    this.wxStarInit();
  },

  wxStarChange(e) {
    if (!this.data.wxStarEdit) return; // 只可展示，不可评星
    var dataset = e.currentTarget.dataset,
      idx = dataset.idx,
      index = dataset.index;
    var star = this.data.wxStar,
      len = star.length;
    for (var i = 0; i < len; i++) {
      if (i < idx) star[i] = [1, 1];
      else if (i == idx) {
        if (index == 0) star[i] = [1, 0];
        else star[i] = [1, 1];
      } else star[i] = [0, 0];
    }
    this.setData({
      ...this.data,
      wxStar: star,
    }, () => {
      this.wxStarCont()
    })
  },

  wxStarInit() {
    let count = this.data.count;
    count = count != undefined ? parseInt(count, 10) : 10;
    var str = '';
    for (var i = 1; i <= 10; i++) {
      if (i <= count) str += '1,';
      else str += '0,';
    }
    var arr = str.split(',');
    this.setData({
      ...this.data,
      wxStar: [
        [arr[0], arr[1]],
        [arr[2], arr[3]],
        [arr[4], arr[5]],
        [arr[6], arr[7]],
        [arr[8], arr[9]],
      ]
    })
  },

  wxStarCont() {
    var star = this.data.wxStar,
      count = 0;
    for (var i = 0; i < 5; i++) {
      count += parseInt(star[i][0]);
      count += parseInt(star[i][1]);
    }
    this.setData({
      ...this.data,
      count
    })
  },
  changeContent(e) {
    this.setData({
      msgContent: e.detail.value
    })
  },
  submit() {
    console.log(this.data.msgContent)
  },

})