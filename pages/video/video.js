import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [], //导航数据
        navId: '',
        videoList: [], //视频列表数据
        isTriggered: false //标记下拉刷新是否被触发
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //判断是否登录 
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo) {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                success: function () {
                    //跳至登录页面
                    wx.reLaunch({
                        //关闭所有页面，打开到应用的某个页面
                        url: '/pages/login/login'
                    })
                }
            })
        }

        this.getVideoGroupListData()
    },

    //获取导航数据
    async getVideoGroupListData() {
        let videoGroupListData = await request('/video/group/list')
        this.setData({
            videoGroupList: videoGroupListData.data.slice(0, 14),
            navId: videoGroupListData.data[0].id
        })
        // 获取视频列表数据
        this.getVideoList(this.data.navId);
    },

    //获取视频列表数据
    async getVideoList(navId) {
        if (!navId) {
            return
        }
        let videoListData = await request('/video/group', {
            id: navId
        })
        //关闭消息提示框
        wx.hideLoading();
        //关闭下拉刷新
        this.setData({
            isTriggered: false
        })
        let index = 0
        let videoList = videoListData.datas.map(item => {
            item.id = index++
            return item
        })
        this.setData({
            videoList
        })
    },

    //点击切换导航回调
    changeNav(event) {
        let navId = event.currentTarget.id
        this.setData({
            navId: navId * 1,
            videoList: []
        })
        //显示正在加载
        wx.showLoading({
            title: '正在加载'
        });
        //动态获取当前导航对应的视频数据
        this.getVideoList(this.data.navId)
    },

    //点击播放/继续播放的回调
    handlePlay(event) {
        /* 在点击播放的事件中需要找到上一个播放的视频
        在播放新的视频之前关闭上一个正在播放的视频 */

        let id = event.currentTarget.id
        //关闭上一个视频
        this.id !== id && this.videoContext && this.videoContext.stop()
        this.id = id

        //创建控制video标签的实例对象
        this.videoContext = wx.createVideoContext(id)
    },

    //自定义下拉刷新的回调
    handleRefresher() {
        this.getVideoList(this.data.navId);
    },

    //自定义上拉触底
    handleToLower() {
        //网易没有提供分页的api
        //此处模拟原有数据
        let newVideoList = [{
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_62CA39CCE0A91E44154281E3E64BCE52",
                    "coverUrl": "https://p2.music.126.net/eunJtcg8C2mLOtjgk3IpSA==/109951165118136104.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "华晨宇暖心演唱《好想爱这个世界啊》",
                    "description": null,
                    "commentCount": 615,
                    "shareCount": 2434,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 22964468
                        },
                        {
                            "resolution": 480,
                            "size": 37839406
                        },
                        {
                            "resolution": 720,
                            "size": 48172831
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 110000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/9gFwnq_vOpFz1Ct7dJiQDA==/109951165189537660.jpg",
                        "accountStatus": 0,
                        "gender": 2,
                        "city": 110101,
                        "birthday": 803234082000,
                        "userId": 556757640,
                        "userType": 0,
                        "nickname": "卡卡西_yu",
                        "signature": "",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951165189537660,
                        "backgroundImgId": 109951165226825680,
                        "backgroundUrl": "http://p1.music.126.net/S1jyw8LTCZzu0qMhaZRgFA==/109951165226825682.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951165189537660",
                        "backgroundImgIdStr": "109951165226825682"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 59101,
                            "name": "华语现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 23118,
                            "name": "华晨宇",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "好想爱这个世界啊 (Live)",
                        "id": 1436910205,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 861777,
                            "name": "华晨宇",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "",
                        "fee": 8,
                        "v": 84,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 87498640,
                            "name": "歌手·当打之年 第9期",
                            "picUrl": "http://p3.music.126.net/p7n_zp4eoxY3a1XPzIomHQ==/109951164863688864.jpg",
                            "tns": [],
                            "pic_str": "109951164863688864",
                            "pic": 109951164863688860
                        },
                        "dt": 262700,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 10510125,
                            "vd": -24489
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 6306093,
                            "vd": -21891
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 4204077,
                            "vd": -20205
                        },
                        "a": null,
                        "cd": "01",
                        "no": 6,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 0,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 1416682,
                        "mv": 0,
                        "publishTime": 0,
                        "privilege": {
                            "id": 1436910205,
                            "fee": 0,
                            "payed": 1,
                            "st": 0,
                            "pl": 999000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 0,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "62CA39CCE0A91E44154281E3E64BCE52",
                    "durationms": 271650,
                    "playTime": 1325544,
                    "praisedCount": 21899,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_7FE0BC505A8AAE1F2C3D8E6B99A6EB5F",
                    "coverUrl": "https://p2.music.126.net/xkdqzuSROvAaN5GDjoBlbA==/109951163837089775.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "周传雄现场演唱经典歌曲《黄昏》一首男人的悲伤情歌",
                    "description": "周传雄现场演唱经典歌曲《黄昏》一首男人的悲伤情歌",
                    "commentCount": 1566,
                    "shareCount": 2522,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 20531077
                        },
                        {
                            "resolution": 480,
                            "size": 33378980
                        },
                        {
                            "resolution": 720,
                            "size": 45595012
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 440000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/9OiKGFgSPf6sFkXrwxNEIw==/109951163920736368.jpg",
                        "accountStatus": 0,
                        "gender": 2,
                        "city": 440100,
                        "birthday": -2209017600000,
                        "userId": 58418680,
                        "userType": 0,
                        "nickname": "在游街头",
                        "signature": "让我带你走",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951163920736370,
                        "backgroundImgId": 1411772932150156,
                        "backgroundUrl": "http://p1.music.126.net/C1G_w4V6YV_PlilLWq_OmA==/1411772932150156.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人"
                        },
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951163920736368",
                        "backgroundImgIdStr": "1411772932150156"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 12100,
                            "name": "流行",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 4101,
                            "name": "娱乐",
                            "alg": null
                        },
                        {
                            "id": 3101,
                            "name": "综艺",
                            "alg": null
                        },
                        {
                            "id": 14242,
                            "name": "伤感",
                            "alg": null
                        },
                        {
                            "id": 13222,
                            "name": "华语",
                            "alg": null
                        },
                        {
                            "id": 76108,
                            "name": "综艺片段",
                            "alg": null
                        },
                        {
                            "id": 77102,
                            "name": "内地综艺",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_2291882561_yDCDNd0d.webp?wsSecret=c201b250ea16fde80493a0ffc9e827bc&wsTime=1659497102",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "黄昏",
                        "id": 190072,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 6652,
                            "name": "周传雄",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "600902000001024407",
                        "fee": 8,
                        "v": 33,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 19203,
                            "name": "忘记 transfer",
                            "picUrl": "http://p3.music.126.net/mFM2Ii6Kxktb_87b4q3TYQ==/109951167366664357.jpg",
                            "tns": [],
                            "pic_str": "109951167366664357",
                            "pic": 109951167366664350
                        },
                        "dt": 344200,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 13770754,
                            "vd": -30141
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 8262470,
                            "vd": -27534
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 5508328,
                            "vd": -25890
                        },
                        "a": null,
                        "cd": "1",
                        "no": 8,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7001,
                        "mv": 5441483,
                        "publishTime": 975600000000,
                        "privilege": {
                            "id": 190072,
                            "fee": 8,
                            "payed": 1,
                            "st": 0,
                            "pl": 999000,
                            "dl": 999000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "7FE0BC505A8AAE1F2C3D8E6B99A6EB5F",
                    "durationms": 200040,
                    "playTime": 3613978,
                    "praisedCount": 22533,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_51826E10E1605F3FF5CD9932864D5AC9",
                    "coverUrl": "https://p2.music.126.net/O70RjsiWOzSeOLTDdFNNYQ==/109951164805941462.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "【王俊凯】【我们的乐队】树读 摇滚版",
                    "description": null,
                    "commentCount": 70,
                    "shareCount": 163,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 20006030
                        },
                        {
                            "resolution": 480,
                            "size": 34627354
                        },
                        {
                            "resolution": 720,
                            "size": 54451458
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 110000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/BtRNk2T7fR7nkgqrsHX7Og==/109951167214147510.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 110101,
                        "birthday": 937845552000,
                        "userId": 119059470,
                        "userType": 0,
                        "nickname": "igniteybones_",
                        "signature": "往事暗沉不可追   来日之路光明灿烂",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951167214147500,
                        "backgroundImgId": 109951166620338240,
                        "backgroundUrl": "http://p1.music.126.net/YTk5Kx_MqV0EcvnjU-riuA==/109951166620338239.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 10,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951167214147510",
                        "backgroundImgIdStr": "109951166620338239"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 59101,
                            "name": "华语现场",
                            "alg": null
                        },
                        {
                            "id": 57110,
                            "name": "饭拍现场",
                            "alg": null
                        },
                        {
                            "id": 11137,
                            "name": "TFBOYS",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 25108,
                            "name": "王俊凯",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "树读",
                        "id": 490602336,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                                "id": 999220,
                                "name": "王俊凯",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 12505170,
                                "name": "林可欣",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 8,
                        "v": 28,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 35758075,
                            "name": "我想和你唱 第二季 第12期",
                            "picUrl": "http://p4.music.126.net/n257D9re3_ZCf0svunYrCg==/18935789253797636.jpg",
                            "tns": [],
                            "pic_str": "18935789253797636",
                            "pic": 18935789253797636
                        },
                        "dt": 190388,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 7618395,
                            "vd": -53832
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 4571054,
                            "vd": -53832
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3047384,
                            "vd": -53832
                        },
                        "a": null,
                        "cd": "01",
                        "no": 5,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 2,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 404023,
                        "mv": 0,
                        "publishTime": 1500048000007,
                        "privilege": {
                            "id": 490602336,
                            "fee": 8,
                            "payed": 1,
                            "st": 0,
                            "pl": 999000,
                            "dl": 999000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "51826E10E1605F3FF5CD9932864D5AC9",
                    "durationms": 208000,
                    "playTime": 220951,
                    "praisedCount": 2291,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_170B10353EF9A655A3A2A8A35B5488C5",
                    "coverUrl": "https://p2.music.126.net/552Fe46g_nHrcxsRzlczRA==/109951163573958949.jpg",
                    "height": 720,
                    "width": 960,
                    "title": "许冠英 - 半斤八兩",
                    "description": "",
                    "commentCount": 1027,
                    "shareCount": 2259,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 15744961
                        },
                        {
                            "resolution": 480,
                            "size": 25547799
                        },
                        {
                            "resolution": 720,
                            "size": 36583975
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 110000,
                        "authStatus": 1,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/52TS_cdymtuHjNKvHWLRsQ==/109951165830343629.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 110101,
                        "birthday": 688190113033,
                        "userId": 506604847,
                        "userType": 204,
                        "nickname": "唱歌有点难听",
                        "signature": "喜欢唱歌，但是唱歌贼难听！",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951165830343630,
                        "backgroundImgId": 109951163287976660,
                        "backgroundUrl": "http://p1.music.126.net/zKgem43jXipNPAWzKKOoQQ==/109951163287976661.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人"
                        },
                        "djStatus": 10,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951165830343629",
                        "backgroundImgIdStr": "109951163287976661"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57105,
                            "name": "粤语现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_1781534161_ycPr7VUD.webp?wsSecret=ff023095e387adb35729fa85bc6aaaba&wsTime=1659497102",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "半斤八两",
                        "id": 172386,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 5782,
                            "name": "许冠杰",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [
                            "电影《半斤八两》主题曲"
                        ],
                        "pop": 100,
                        "st": 0,
                        "rt": "600902000005602905",
                        "fee": 8,
                        "v": 23,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 17317,
                            "name": "半斤八两",
                            "picUrl": "http://p4.music.126.net/Wg-nrULm75dl0K3EkyQFLQ==/109951166280515519.jpg",
                            "tns": [],
                            "pic_str": "109951166280515519",
                            "pic": 109951166280515520
                        },
                        "dt": 141867,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 5676974,
                            "vd": -36702
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 3406202,
                            "vd": -34098
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 2270816,
                            "vd": -32392
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7003,
                        "mv": 14212279,
                        "publishTime": 218217600000,
                        "privilege": {
                            "id": 172386,
                            "fee": 8,
                            "payed": 1,
                            "st": 0,
                            "pl": 999000,
                            "dl": 999000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 260,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "170B10353EF9A655A3A2A8A35B5488C5",
                    "durationms": 130296,
                    "playTime": 2522249,
                    "praisedCount": 11204,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_F161C7443A64B9954E957D805DF7373B",
                    "coverUrl": "https://p2.music.126.net/8kqVpDgW7GVIbni5LfS6uw==/109951163573132863.jpg",
                    "height": 480,
                    "width": 852,
                    "title": "霉霉",
                    "description": null,
                    "commentCount": 1092,
                    "shareCount": 6434,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 42120912
                        },
                        {
                            "resolution": 480,
                            "size": 33330881
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 440000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/SZbji76jdZi2ZtVwhegPFQ==/109951164256479833.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 440300,
                        "birthday": 669484800000,
                        "userId": 535599,
                        "userType": 0,
                        "nickname": "德诺7",
                        "signature": "以梦为马，不负韶华",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951164256479840,
                        "backgroundImgId": 109951164334615150,
                        "backgroundUrl": "http://p1.music.126.net/AJE4XHyIYCg3-KEULoI4tg==/109951164334615149.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": null,
                        "djStatus": 0,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951164256479833",
                        "backgroundImgIdStr": "109951164334615149"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 12100,
                            "name": "流行",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 64100,
                            "name": "Taylor Swift",
                            "alg": null
                        },
                        {
                            "id": 13164,
                            "name": "快乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/cloudmusic/preview_1357888619_mD47bTRB.webp?wsSecret=7d508369db5534b0f69c1730ff546db5&wsTime=1659497102",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": [
                        109
                    ],
                    "relateSong": [{
                            "name": "Enchanted",
                            "id": 19292852,
                            "pst": 0,
                            "t": 0,
                            "ar": [{
                                "id": 44266,
                                "name": "Taylor Swift",
                                "tns": [],
                                "alias": []
                            }],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": "600902000008723970",
                            "fee": 1,
                            "v": 59,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 1770431,
                                "name": "Speak Now (Deluxe Edition)",
                                "picUrl": "http://p4.music.126.net/fyKxfDUUIL65oDwSgtDLMw==/109951166119330991.jpg",
                                "tns": [],
                                "pic_str": "109951166119330991",
                                "pic": 109951166119330990
                            },
                            "dt": 353280,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 14132289,
                                "vd": -70017
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 8479391,
                                "vd": -67607
                            },
                            "l": null,
                            "a": null,
                            "cd": "1",
                            "no": 9,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 1,
                            "s_id": 0,
                            "rtype": 0,
                            "rurl": null,
                            "mst": 9,
                            "cp": 7003,
                            "mv": 0,
                            "publishTime": 1262275200000,
                            "privilege": {
                                "id": 19292852,
                                "fee": 1,
                                "payed": 1,
                                "st": 0,
                                "pl": 320000,
                                "dl": 320000,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 320000,
                                "fl": 0,
                                "toast": false,
                                "flag": 260,
                                "preSell": false
                            }
                        },
                        {
                            "name": "Wildest Dreams",
                            "id": 29572506,
                            "pst": 0,
                            "t": 0,
                            "ar": [{
                                "id": 44266,
                                "name": "Taylor Swift",
                                "tns": [],
                                "alias": []
                            }],
                            "alia": [],
                            "pop": 100,
                            "st": 0,
                            "rt": null,
                            "fee": 1,
                            "v": 94,
                            "crbt": null,
                            "cf": "",
                            "al": {
                                "id": 3029801,
                                "name": "1989 (Deluxe)",
                                "picUrl": "http://p4.music.126.net/3KDqQ9XW2Khj5Ia4tRqAAw==/18771962022688349.jpg",
                                "tns": [],
                                "pic_str": "18771962022688349",
                                "pic": 18771962022688348
                            },
                            "dt": 220440,
                            "h": {
                                "br": 320000,
                                "fid": 0,
                                "size": 8820027,
                                "vd": -40196
                            },
                            "m": {
                                "br": 192000,
                                "fid": 0,
                                "size": 5292034,
                                "vd": -37605
                            },
                            "l": {
                                "br": 128000,
                                "fid": 0,
                                "size": 3528037,
                                "vd": -35914
                            },
                            "a": null,
                            "cd": "1",
                            "no": 9,
                            "rtUrl": null,
                            "ftype": 0,
                            "rtUrls": [],
                            "djId": 0,
                            "copyright": 2,
                            "s_id": 0,
                            "rtype": 0,
                            "rurl": null,
                            "mst": 9,
                            "cp": 7003,
                            "mv": 466904,
                            "publishTime": 1414339200007,
                            "privilege": {
                                "id": 29572506,
                                "fee": 1,
                                "payed": 1,
                                "st": 0,
                                "pl": 999000,
                                "dl": 999000,
                                "sp": 7,
                                "cp": 1,
                                "subp": 1,
                                "cs": false,
                                "maxbr": 999000,
                                "fl": 0,
                                "toast": false,
                                "flag": 260,
                                "preSell": false
                            }
                        }
                    ],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "F161C7443A64B9954E957D805DF7373B",
                    "durationms": 360000,
                    "playTime": 2751065,
                    "praisedCount": 20287,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_BDA538CBADA74AE93D5E665C00CE4CF5",
                    "coverUrl": "https://p2.music.126.net/eeP9KByE5t7ICpNEIOU4Fw==/109951164959703938.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "iu史诗级现场《Blueming》超级好听了！看完心情都变好了",
                    "description": null,
                    "commentCount": 241,
                    "shareCount": 676,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 29045010
                        },
                        {
                            "resolution": 480,
                            "size": 47187785
                        },
                        {
                            "resolution": 720,
                            "size": 63352332
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 1000000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/J9v-1UvEgeuJg8rvYqSKEQ==/109951166729816505.jpg",
                        "accountStatus": 0,
                        "gender": 1,
                        "city": 1001300,
                        "birthday": 1664477948680,
                        "userId": 388378562,
                        "userType": 207,
                        "nickname": "砚青钦墨",
                        "signature": "十八线文艺青年！！vx:yqqm11",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951166729816510,
                        "backgroundImgId": 109951166543554300,
                        "backgroundUrl": "http://p1.music.126.net/eosKSYzmUVpSyGDiZhJGJQ==/109951166543554309.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "生活图文达人"
                        },
                        "djStatus": 10,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "109951166729816505",
                        "backgroundImgIdStr": "109951166543554309"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57107,
                            "name": "韩语现场",
                            "alg": null
                        },
                        {
                            "id": 57108,
                            "name": "流行现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": null,
                    "previewDurationms": 0,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [{
                        "name": "Blueming",
                        "id": 1404511131,
                        "pst": 0,
                        "t": 0,
                        "ar": [{
                            "id": 160947,
                            "name": "IU",
                            "tns": [],
                            "alias": []
                        }],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "",
                        "fee": 8,
                        "v": 19,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 83487317,
                            "name": "Love poem",
                            "picUrl": "http://p4.music.126.net/2pF-tKT79yQLWfOnm49-hA==/109951164496579083.jpg",
                            "tns": [],
                            "pic_str": "109951164496579083",
                            "pic": 109951164496579090
                        },
                        "dt": 217053,
                        "h": {
                            "br": 320002,
                            "fid": 0,
                            "size": 8684205,
                            "vd": -75718
                        },
                        "m": {
                            "br": 192002,
                            "fid": 0,
                            "size": 5210541,
                            "vd": -73212
                        },
                        "l": {
                            "br": 128002,
                            "fid": 0,
                            "size": 3473709,
                            "vd": -71637
                        },
                        "a": null,
                        "cd": "01",
                        "no": 3,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 0,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 1410822,
                        "mv": 10903021,
                        "publishTime": 0,
                        "privilege": {
                            "id": 1404511131,
                            "fee": 8,
                            "payed": 1,
                            "st": 0,
                            "pl": 999000,
                            "dl": 999000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 260,
                            "preSell": false
                        }
                    }],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "BDA538CBADA74AE93D5E665C00CE4CF5",
                    "durationms": 279361,
                    "playTime": 697443,
                    "praisedCount": 9255,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_5D8008332D9C1820B7AE130C01666670",
                    "coverUrl": "https://p2.music.126.net/21a231yYOVtEpb1mpXtSiQ==/109951163929564586.jpg",
                    "height": 720,
                    "width": 1280,
                    "title": "这个中国小姐姐蹦迪太棒！心动的感觉啊啊啊",
                    "description": null,
                    "commentCount": 629,
                    "shareCount": 282,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 4493906
                        },
                        {
                            "resolution": 480,
                            "size": 10738261
                        },
                        {
                            "resolution": 720,
                            "size": 13624690
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 510000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/I7lICvVbJDjnpQv_YUzI5g==/109951163305390629.jpg",
                        "accountStatus": 0,
                        "gender": 2,
                        "city": 510100,
                        "birthday": 713030400000,
                        "userId": 3442152,
                        "userType": 207,
                        "nickname": "迷因爱音乐",
                        "signature": "你想，在春天，怀你温暖的梦，不踏草青，不恋花红，大步走到秋，不闻蝉鸣，不识落英，然后戴上你的耳机，听到月睁眼，你再闭眼·····",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951163305390620,
                        "backgroundImgId": 109951162879621170,
                        "backgroundUrl": "http://p1.music.126.net/DqN9xFjy6fJYN47Hzy4lHg==/109951162879621175.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人",
                            "2": "电子资讯达人"
                        },
                        "djStatus": 10,
                        "vipType": 0,
                        "remarkName": null,
                        "avatarImgIdStr": "109951163305390629",
                        "backgroundImgIdStr": "109951162879621175"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 57106,
                            "name": "欧美现场",
                            "alg": null
                        },
                        {
                            "id": 59108,
                            "name": "巡演现场",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/cloudmusic/preview_2379831094_8qkh23T6.webp?wsSecret=ee324072ae10ef5542680891abc00c00&wsTime=1659497102",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "5D8008332D9C1820B7AE130C01666670",
                    "durationms": 25000,
                    "playTime": 5311249,
                    "praisedCount": 9469,
                    "praised": false,
                    "subscribed": false
                }
            },
            {
                "type": 1,
                "displayed": false,
                "alg": "onlineHotGroup",
                "extAlg": null,
                "data": {
                    "alg": "onlineHotGroup",
                    "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                    "threadId": "R_VI_62_DF0062BEF97CC90685C04E21B4DD7788",
                    "coverUrl": "https://p2.music.126.net/pONfOgwwjasRuEf7CiZKZg==/109951164478511327.jpg",
                    "height": 1080,
                    "width": 1920,
                    "title": "选手一开口的烟嗓嗨翻全场，结果一看是王嘉尔，林俊杰：骗人",
                    "description": "选手一开口的烟嗓嗨翻全场，结果一看是王嘉尔，林俊杰：骗人",
                    "commentCount": 308,
                    "shareCount": 116,
                    "resolutions": [{
                            "resolution": 240,
                            "size": 22035379
                        },
                        {
                            "resolution": 480,
                            "size": 37000928
                        },
                        {
                            "resolution": 720,
                            "size": 53832099
                        },
                        {
                            "resolution": 1080,
                            "size": 103611349
                        }
                    ],
                    "creator": {
                        "defaultAvatar": false,
                        "province": 330000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/u8ZsKSHI2476w0cId2gDUg==/109951164204660758.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 330500,
                        "birthday": 860860800000,
                        "userId": 1735415103,
                        "userType": 204,
                        "nickname": "盼盼音乐Show",
                        "signature": "关注我每日更新热歌",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951164204660750,
                        "backgroundImgId": 109951162868126480,
                        "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": null,
                        "experts": {
                            "1": "音乐视频达人"
                        },
                        "djStatus": 0,
                        "vipType": 11,
                        "remarkName": null,
                        "avatarImgIdStr": "109951164204660758",
                        "backgroundImgIdStr": "109951162868126486"
                    },
                    "urlInfo": null,
                    "videoGroup": [{
                            "id": 58100,
                            "name": "现场",
                            "alg": null
                        },
                        {
                            "id": 11110,
                            "name": "林俊杰",
                            "alg": null
                        },
                        {
                            "id": 1100,
                            "name": "音乐现场",
                            "alg": null
                        },
                        {
                            "id": 5100,
                            "name": "音乐",
                            "alg": null
                        },
                        {
                            "id": 4101,
                            "name": "娱乐",
                            "alg": null
                        },
                        {
                            "id": 3101,
                            "name": "综艺",
                            "alg": null
                        }
                    ],
                    "previewUrl": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/preview_2781478238_vhGVaSxk.webp?wsSecret=0c1f12c53af85dbfc66194907db67dd4&wsTime=1659497102",
                    "previewDurationms": 4000,
                    "hasRelatedGameAd": false,
                    "markTypes": null,
                    "relateSong": [],
                    "relatedInfo": null,
                    "videoUserLiveInfo": null,
                    "vid": "DF0062BEF97CC90685C04E21B4DD7788",
                    "durationms": 191552,
                    "playTime": 2321473,
                    "praisedCount": 8282,
                    "praised": false,
                    "subscribed": false
                }
            }
        ]
        let videoList = this.data.videoList;
        // 将视频最新的数据更新原有视频列表数据中
        videoList.push(...newVideoList);
        this.setData({
            videoList
        })
    },

    goSearch() {
        wx.navigateTo({
            url: '../search/search'
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
    onShareAppMessage({
        from
    }) {
        if (from === 'button') {
            return {
                title: '来自button的转发',
                page: '/pages/video/video',
                imageUrl: '/static/images/personal/bgImg3.png'
            }
        } else {
            return {
                title: '来自menu的转发',
                page: '/pages/video/video',
                imageUrl: '/static/images/personal/bgImg3.png'
            }
        }
    }
})