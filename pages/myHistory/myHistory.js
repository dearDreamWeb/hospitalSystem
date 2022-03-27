const app = getApp();
const {
  queryUserAppointment
} = require('../../api/index')
const { formatTime } = require('../../utils/tools');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    options: [
      {
        status: 2,
        text: '全部'
      },
      {
        status: 0,
        text: '取消预约'
      },
      {
        status: 1,
        text: '预约成功'
      },
    ],
    selected: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.queryList();
  },

  async queryList() {
    const { selected, options } = this.data;
    const {
      userInfo
    } = app.globalData;
    const params = {
      page: 1,
      pageSize: 100000,
      reserveUser: userInfo.name
    }
    if (options[selected].status !== 2) {
      params.status = options[selected].status
    }
    const res = await queryUserAppointment(params);
    if (!res.success) {
      return;
    }
    let list = res.data.items || [];
    list = list.map((item) => {
      return {
        ...item,
        reserveTime: formatTime(item.reserveTime * 1000),
      }
    })
    this.setData({
      ...this.data,
      list
    })
  },
  changeStatus(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      ...this.data,
      selected: index
    },()=>{
      this.queryList();
    })
  },
})