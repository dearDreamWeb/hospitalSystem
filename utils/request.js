const request = ({
  url,
  method,
  data={},
}) => {

  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');
    wx.request({
      url, // 拼接接口地址
      method,
      data,
      header: {
        "token": token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(123123123);
        resolve(res.data)
      },
      fail() {
        console.log('fail');
        reject()
      }
    })
  })
}
module.exports.request = request