import request from '../../utils/request'
import moment from 'moment'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        friendId: '', //好友id
        friendInfo: '', //好友信息
        birthday: '', //好友生日
        createTime: '', //创建时间
        createDays: '', //创建的日期
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let friendId = options.uid
        this.setData({
            friendId
        })
        //获取好友信息
        this.getFriendInfoData()
    },


    //获取好友信息
    async getFriendInfoData() {
        let friendInfoData = await request('/user/detail', {
            uid: this.data.friendId
        })
        let birthday = moment(friendInfoData.profile.birthday).format('YYYY年MM月DD日')
        let createTime = moment(friendInfoData.createTime).format('YYYY年MM月DD日')
        let createDays = Math.trunc(friendInfoData.createDays / 365) //去除小数
        this.setData({
            friendInfo: friendInfoData,
            birthday: birthday,
            createTime,
            createDays
        })
    },

    //私信
    toTalk(){
        
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