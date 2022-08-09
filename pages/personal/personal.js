import request from "../../utils/request";

let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: 'translateY(0)',
        coveTransition: '',
        userInfo: {}, // 用户信息
        recentPlayList: [],
        playList: [], //歌单
        collectionPlayList: [], //收藏歌单
        createPlayList: [], //创建歌单
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 读取用户的基本信息
        let userInfo = wx.getStorageSync('userInfo');
        if (userInfo) { // 用户登录
            // 更新userInfo的状态
            this.setData({
                userInfo: JSON.parse(userInfo)
            })

            // 获取用户播放记录
            this.getUserRecentPlayList(this.data.userInfo.userId)

            //获取歌单数据
            this.getPlayListData(this.data.userInfo.userId)
        }
    },

    //获取用户播放记录的功能
    async getUserRecentPlayList(userId) {
        let recentPlayListData = await request('/user/record', {
            uid: userId,
            type: 0
        });
        let index = 0;
        let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
            item.id = index++;
            return item;
        })
        this.setData({
            recentPlayList
        })
    },

    //获取歌单数据
    async getPlayListData(userId) {
        let {
            createPlayList,
            collectionPlayList
        } = this.data
        let playListData = await request('/user/playlist', {
            uid: userId
        })
        let playList = playListData.playlist
        this.setData({
            playList
        })
        for (let i = 0; i < playList.length; i++) {
            if (playList[i].userId == 487735907) {
                createPlayList.push(playList[i])
                this.setData({
                    createPlayList
                })
            } else {
                collectionPlayList.push(playList[i])
                this.setData({
                    collectionPlayList
                })
            }
        }


    },

    handleTouchStart(event) {
        this.setData({
            coveTransition: ''
        })
        // 获取手指起始坐标
        startY = event.touches[0].clientY;

    },
    handleTouchMove(event) {
        moveY = event.touches[0].clientY;
        moveDistance = moveY - startY;

        if (moveDistance <= 0) {
            return;
        }
        if (moveDistance >= 80) {
            moveDistance = 80;
        }
        // 动态更新coverTransform的状态值
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`
        })
    },
    handleTouchEnd() {
        // 动态更新coverTransform的状态值
        this.setData({
            coverTransform: `translateY(0rpx)`,
            coveTransition: 'transform 1s linear'
        })
    },
    toLogin() {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },

    //我的好友
    goFriend() {
        wx.navigateTo({
            url: '/pages/friends/friends'
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