import request from '../../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendSong: [], //每日推荐
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo')
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
    //日期
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    //获取推荐数据
    this.getRecommendSongData()

    //订阅来自songDetail页面发布的消息
    PubSub.subscribe('switchType', (msg, type) => {
      let {
        index,
        recommendSong
      } = this.data;
      if (type === 'pre') {
        //上一首
        (index == 0) && (index = recommendSong.length)
        index -= 1
      } else {
        //下一首
        (index === recommendSong.length - 1) && (index = -1)
        index += 1

      }

      //更新下标
      this.setData({
        index
      })

      let musicId = this.data.recommendSong[index].id
      //将musicId回传给songDetail页面
      PubSub.publish('musicId', musicId)
    })
  },

  //每日推荐歌曲
  async getRecommendSongData() {
    let recommendSongData = await request('/recommend/songs')
    this.setData({
      recommendSong: recommendSongData.data.dailySongs
    })
  },

  //歌曲详情
  toSongDetail(event) {
    let {
      song,
      index
    } = event.currentTarget.dataset
    this.setData({
      index
    })
    wx.navigateTo({
      url: '../songDetail/songDetail?musicId=' + song.id
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