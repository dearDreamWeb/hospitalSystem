let test = 'http://192.168.31.98:8081/hospital';
let test0 = 'http://192.168.31.134:8081/hospital';
let test1 = 'http://hospital.liqiu.vip/hospital'
let test2 = 'http://dockerhospital.liqiu.vip/hospital';

let host = test1;

const request = ({
  url,
  method,
  data = {},
}) => {
  let requestUrl = `${host}${url}`
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');
    wx.request({
      url: requestUrl, // 拼接接口地址
      method,
      data,
      header: {
        "token": token,
      },
      success(res) {
        resolve(res.data)
      },
      fail() {
        console.log('fail');
        reject()
      }
    })
  })
}

const uploadAvatar = () => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      success: function (res) {
        wx.uploadFile({
          url: `${host}/common/imageUpload`,
          filePath: res.tempFilePaths[0],
          name: 'image',
          success: function (info) {
            resolve(JSON.parse(info.data))
          },
          fail: function (err) {
            reject(err);
            console.log(err);
          }
        })
      },
      fail: function () {
        console.log('头像上传失败');
        reject('头像上传失败')
      },
    })
  })
}
module.exports.request = request
module.exports.uploadAvatar = uploadAvatar