import request from '../../../utils/request'
import moment from 'moment'
import PubSub from 'pubsub-js'
//获取全局配置
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId: '', //音乐的Id
    musicInfo: {}, //歌曲详情
    isPlay: false, //是否正在播放
    musicLink: '', //音乐链接
    currentTime: '00:00', //实时总长
    durationTime: '00:00', //总时长
    currentWidth: 0, // 实时进度条的宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //console.log(options)
    let musicId = options.musicId
    this.setData({
      musicId
    })
    //歌曲详情
    this.getMusicInfoData(musicId)

    // 创建控制音乐播放的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 监视音乐播放/暂停/停止
    this.backgroundAudioManager.onPlay(() => {
      this.changePlayState(true);
      appInstance.globalData.musicId = musicId
    });
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false);
    });


    //监听音乐播放自然结束
    this.backgroundAudioManager.onEnded(() => {
      //自动切换至下一首音乐，并且自动播放
      PubSub.publish('switchType', 'next')
      //将实时进度条的长度还原成0 时间还原成0
      this.setData({
        currentWidth: 0,
        currentTime: '00:00'
      })
    })

    // 监听音乐实时播放的进度
    this.backgroundAudioManager.onTimeUpdate(() => {
      //console.log('总时长: ', this.backgroundAudioManager.duration);
      //console.log('实时的时长: ', this.backgroundAudioManager.currentTime);
      // 格式化实时的播放时间
      let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
      let currentWidth = this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration * 400;
      this.setData({
        currentTime,
        currentWidth
      })

    })
  },

  // 封装一个修改播放状态的功能函数
  changePlayState(isPlay) {
    // 修改音乐是否的状态
    this.setData({
      isPlay: isPlay
    })
    //修改全局的播放状态
    appInstance.globalData.isMusicPlay = isPlay
  },

  //获取歌曲详情
  async getMusicInfoData(musicId) {
    let musicInfoData = await request('/song/detail', {
      ids: musicId
    })
    let durationTime = moment(musicInfoData.songs[0].dt).format('mm:ss')
    this.setData({
      musicInfo: musicInfoData,
      durationTime
    })
  },

  // 点击播放暂停的回调
  handleMusicPlay() {
    let isPlay = !this.data.isPlay
    this.setData({
      isPlay
    })
    let {
      musicId,
      musicLink
    } = this.data;
    this.musicControl(isPlay, musicId, musicLink)
  },

  //切换歌曲
  handleSwitch(event) {
    let type = event.currentTarget.id

    // 关闭当前播放的音乐
    this.backgroundAudioManager.stop();

    //订阅来自recommend页面发布的musicId消息
    PubSub.subscribe('musicId', (msg, musicId) => {
      //获取当前音乐详情
      this.getMusicInfoData(musicId)
      //自动播放音乐
      this.musicControl(true, musicId)

      //取消订阅
      PubSub.unsubscribe('musicId')
    })
    //发布消息数据给recommend页面
    PubSub.publish('switchType', type)
  },

  // 音乐播放暂停的功能
  async musicControl(isPlay, musicId, musicLink) {
    let backgroundAudioManager = wx.getBackgroundAudioManager()
    if (isPlay) {
      if (!musicLink) {
        //获取音乐链接
        let musicLinkData = await request('/song/url', {
          id: musicId
        })
        musicLink = musicLinkData.data[0].url

        this.setData({
          musicLink
        })
      }

      backgroundAudioManager.src = musicLink
      backgroundAudioManager.title = this.data.musicInfo.songs[0].name
    } else {
      //暂停歌曲
      backgroundAudioManager.pause()
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