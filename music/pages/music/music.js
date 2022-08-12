import request from '../../../utils/request'
import PubSub from 'pubsub-js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        palyListId: '', //歌单Id
        musicList: [], //歌单内的歌曲
        playListDetail: '', //获取歌单详情
        index: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options)
        let palyListId = options.palyListId
        this.setData({
            palyListId
        })

        //获取歌单详情
        this.getPlayListDetailData()

        //获取歌单内的歌曲
        this.getMusicListIdData()

        //订阅来自songDetail页面发布的消息
        PubSub.subscribe('switchType', (msg, type) => {
            let {
                index,
                musicList
            } = this.data;
            if (type === 'pre') {
                //上一首
                (index == 0) && (index = musicList.length)
                index -= 1
            } else {
                //下一首
                (index === musicList.length - 1) && (index = -1)
                index += 1
            }

            //更新下标
            this.setData({
                index
            })

            let musicId = this.data.musicList[index].id
            //将musicId回传给songDetail页面
            PubSub.publish('musicId', musicId)
        })

    },

    //获取歌单详情
    async getPlayListDetailData() {
        let playListDetailData = await request('/playlist/detail', {
            id: this.data.palyListId,
        })
        this.setData({
            playListDetail: playListDetailData.playlist
        })
    },

    //获取歌单内的歌曲
    async getMusicListIdData() {
        let musicListIdData = await request('/playlist/track/all', {
            id: this.data.palyListId,
            limit: 50,
            offset: 0
        })
        this.setData({
            musicList: musicListIdData.songs
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