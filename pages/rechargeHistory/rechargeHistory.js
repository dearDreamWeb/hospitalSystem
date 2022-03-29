const {
  queryRechargeHistory,
} = require('../../api/index')
const { formatTime } = require('../../utils/tools');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list: [],
    options: [{
        status: '',
        text: '全部'
      },
      {
        status: '成功充值',
        text: '成功充值'
      },
      {
        status: '取消预约',
        text: '取消预约'
      },
      {
        status: '成功预约',
        text: '成功预约'
      },
    ],
    selected: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      ...this.data,
      userInfo: app.globalData.userInfo,
    })
    this.queryList();
  },
  async queryList() {
    const {
      selected,
      options
    } = this.data;

    const params = {
      page: 1,
      pageSize: 100000,
    }
  
    if (options[selected].status !== '') {
      params.name = options[selected].status
    }
    const res = await queryRechargeHistory(params);
    if (!res.success) {
      return;
    }
    let list = res.data || [];
    list = list.map((item) => {
      return {
        ...item,
        createTime: formatTime(item.createTime),
      }
    })
    this.setData({
      ...this.data,
      list
    })
  },

  changeStatus(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      ...this.data,
      selected: index
    }, () => {
      this.queryList();
    })
  },
})