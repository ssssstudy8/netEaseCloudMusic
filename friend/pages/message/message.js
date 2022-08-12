import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        friendId: '', //好友信息
        message: '', //好友输入的信息
        messageList: [], //发送所有的数据
        userName: '', //用户名
        result: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let friendId = options.id
        let userName = options.userName
        this.setData({
            friendId,
            userName
        })

        // 返回结果
        this.toSend()
    },

    //获取用户输入的数据
    inputMessage(event) {
        this.setData({
            message: event.detail.value
        })
    },

    //发消息
    async toSend() {
        let {
            friendId,
            message,
            messageList
        } = this.data
        let result = await request('/send/text', {
            user_ids: friendId,
            msg: message
        })
        if (result.newMsgs) {
            messageList.push(message)
        }
        this.setData({
            result,
            messageList
        })
        this.data.message = ''
        this.setData({
            message
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let {
            userName
        } = this.data
        wx.setNavigationBarTitle({
            title: userName
        })
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