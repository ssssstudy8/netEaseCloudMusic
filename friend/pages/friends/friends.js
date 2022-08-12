import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendsList: [], //关注列表
    userInfo: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: function () {
          //跳转至登录页面
          wx.reLaunch({
            //关闭所有页面，打开到应用内的某个页面
            url: '/pages/login/login'
          })
        }
      })
    }
    if (userInfo) { // 用户登录
      // 更新userInfo的状态
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    this.getFriendsListData(this.data.userInfo.userId)
  },

  //获取关注列表数据
  async getFriendsListData(userId) {
    let friendsListData = await request('/user/follows', {
      uid: userId
    })
    let friendsList = friendsListData.follow
    this.setData({
      friendsList
    })
  },

  //朋友主页
  friendInfo(event) {
    let friends = event.currentTarget.dataset
    // console.log(friends.friendinfo.userId)
    wx.navigateTo({
      url: '../friendHome/friendHome?uid=' + friends.friendinfo.userId
    })
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