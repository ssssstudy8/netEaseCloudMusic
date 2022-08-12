import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图数据
    recommendList: [], //推荐歌单
    topList: [], //推荐电台
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //轮播图数据
    this.getBannerList()

    //获取推荐歌单数据
    this.getRecommendListData()

    //获取排行榜数据
    this.getTopListData()
  },

  //轮播图数据
  async getBannerList() {
    let bannerListData = await request('/banner', {
      type: 2
    })
    //更新bannerList的状态值
    this.setData({
      bannerList: bannerListData.banners
    })
  },

  async getTopListData() {
    let topListData = await request('/toplist/detail');
    // splice(会修改原数组，可以对指定的数组进行增删改) slice(不会修改原数组)
    let topList = topListData.list.splice(0, 6)

    // 不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
    this.setData({
      topList
    })
  },

  //获取推荐歌单
  async getRecommendListData() {
    //推荐歌单数据
    let recommendListData = await request('/personalized', {
      limit: 10
    })
    //更新recommendList的状态值
    this.setData({
      recommendList: recommendListData.result
    })
  },

  //跳转到每日推荐页面
  toRecommend() {
    wx.navigateTo({
      url: '../../music/pages/recommend/recommend'
    })
  },

  morePlayList() {
    wx.navigateTo({
      url: '/music/pages/playlist/playlist'
    })
  },

  toMusic(event) {
    // console.log(event)
    let palyList = event.currentTarget.dataset
    wx.navigateTo({
      url: '/music/pages/music/music?palyListId=' + palyList.palylistid
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