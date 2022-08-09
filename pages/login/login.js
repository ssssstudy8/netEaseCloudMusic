/*需求分析
    登录流程
      1）收集表单项数据
      2）前端验证
        验证用户信息（账号密码）是否合理
        前端验证不通过，不用发请求
        前端验证通过，发请求（携带账号密码）给服务器端
      3）后端验证
        验证用户是否存在
        用户不存在直接返回，告诉前端用户不存在
        用户存在需要验证密码是否正确
        密码不正确返回给前端提示密码不正确
        密码正确返回给前端数据，提示用户登录成功（携带用户相关信息）
*/

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },

  handleInput(event) {
    let type = event.currentTarget.id
    this.setData({
      [type]: event.detail.value
    })
  },

  //登录
  async login() {
    // 收集表单数据
    let {
      phone,
      password
    } = this.data
    /*  前端验证
       手机号验证
         内容为空
         手机号格式不正确
         手机号格式正确，验证通过 */

    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    }
    //正则验证
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }
    //验证密码
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    } 
    let result = await request('/login/cellphone',{phone,password,isLogin:true})
    if(result.code === 200){
      wx.showToast({
        title:'登录成功'
      })

      //将用户信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))

      //跳转至个人中心
      wx.reLaunch({
        url:'/pages/personal/personal'
      })
    }else if(result.code === 400){
      wx.showToast({
        title:'手机号错误',
        icon:'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title:'密码错误',
        icon:'none'
      })
    }else{
      wx.showToast({
        title:'登录失败，请重新登录',
        icon:'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})