//发送ajax请求

/* 
封装功能函数
    功能明确
    函数内部应该保留固定代码
    将动态的数据抽成形参，由使用者根据自身情况动态的传入实参
    一个良好的功能函数应该设置形参的默认值

封装功能组件
    功能明确
    组件内部保留静态代码
    将动态数据抽取成props参数，由使用者根据自身的情况以标签的形式动态传入props数据
    一个良好的组件应该设置组件的必要性及数据类型 
*/

import config from "./config"

export default (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      //url: config.mobileHost + url,
      url: config.host + url,
      method,
      data,
      header: {
        cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
      },
      success: (res) => {
        // console.log("请求成功", res)
        if (data.isLogin) {
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res.data)
      },
      fail: (err) => {
        // console.log("请求失败", err)
        reject(err)
      }
    })
  })
}