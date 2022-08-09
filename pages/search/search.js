import request from '../../utils/request'
let isSend = null // 函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showKeyWord: {}, //搜索框关键词
    hotMusic: [], //获取热歌榜
    searchContent: '', //用户输入表单数据
    searchList: [], //搜索返回数据
    historyList: [], //存储历史搜索记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getShowKeyWord()
    this.getHotMusic()

    // 获取历史记录
    this.getSearchHistory();
  },


  //获取搜索框关键词
  async getShowKeyWord() {
    let showKeyWordData = await request('/search/default')
    let showKeyWord = showKeyWordData.data
    this.setData({
      showKeyWord
    })
  },

  //获取热歌榜
  async getHotMusic() {
    let hotMusicData = await request('/search/hot/detail')
    let hotMusic = hotMusicData.data
    this.setData({
      hotMusic
    })
  },


  //获取用户输入的数据
  handleInput(event) {
    //节流
    if (isSend) {
      clearTimeout(isSend)
    }
    isSend = setTimeout(() => {
      // 更新数据
      this.setData({
        searchContent: event.detail.value
      })
      // 获取搜索数据
      this.getSearchList();
    }, 300)
  },

  //搜索返回数据
  async getSearchList() {
    if (!this.data.searchContent) {
      this.setData({
        searchList: []
      })
      return;
    }
    let {
      searchContent,
      historyList
    } = this.data;
    let searchListData = await request('/search', {
      keywords: searchContent,
      limit: 10
    })
    let searchList = searchListData.result.songs
    this.setData({
      searchList
    })

    //将搜索关键字添加到搜索历史记录中
    if (historyList.indexOf(searchContent) != -1) {
      //把已经存在的去除
      historyList.splice(historyList.indexOf(searchContent), 1)
    }
    //添加到数组开头
    historyList.unshift(searchContent);
    this.setData({
      historyList
    })
    //将数据本地存储
    wx.setStorageSync('searchHistory', historyList)
  },

  //获取本地历史搜索记录数据
  getSearchHistory() {
    let historyList = wx.getStorageSync('searchHistory');
    if (historyList) {
      this.setData({
        historyList
      })
    }
  },

  //清除输入搜索数据
  clearSearchContent() {
    this.setData({
      searchContent: '',
      searchList: []
    })
  },

  //删除历史记录
  deleteSearchHistory() {
    wx.showModal({
      content: '确认删除吗?',
      success: (res) => {
        if (res.confirm) {
          // 清空data中historyList
          this.setData({
            historyList: []
          })
          // 移除本地的历史记录缓存
          wx.removeStorageSync('searchHistory');
        }
      }
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