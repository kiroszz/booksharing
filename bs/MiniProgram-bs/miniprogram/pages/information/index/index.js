// pages/information/index/index.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomlist: [],

  },

  //登录注册
  toLogin: function () {
    wx.navigateTo({
      url: '/pages/person/login/login',
    })
  },
  signup: function () {
    wx.navigateTo({
      url: '/pages/person/enroll/enroll'
    })
  },

  toChatroom: function (e) {
    console.log(e.currentTarget.dataset.text)
    if (e.currentTarget.dataset.text.toAvatar == getApp().globalData.userInfo.avatarUrl) {
      var chatperson = {
        "username": e.currentTarget.dataset.text.nickName,
        "user_id": e.currentTarget.dataset.text.fromUser,
        "avatar": e.currentTarget.dataset.text.avatar,
      }
    } else {
      var chatperson = {
        "username": e.currentTarget.dataset.text.nickName,
        "user_id": e.currentTarget.dataset.text.fromUser,
        "avatar": e.currentTarget.dataset.text.toAvatar,
      }
    }
    getApp().globalData.circleDetail = chatperson
    console.log(getApp().globalData.circleDetail)

    wx.navigateTo({
      url: '../room/room',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.openid = app.globalData.userInfo.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    this.setData({
      donelogin: getApp().globalData.userInfo.userName
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    var getInfoList = []
    var sendInfoList = []
    var room = []

    // 获取别人发送过来的信息
    db.collection("chatroom").where({
      toUser: app.globalData.userInfo.user_id
    }).get({
      success: function (res) {
        if (res.data != null) {
          getInfoList = res.data.reverse()
          // console.log(getInfoList)
        }

        // 获取发送给别人的信息
        db.collection("chatroom").where({
          fromUser: app.globalData.userInfo.user_id
        }).get({
          success: function (res) {
            if (res.data != null) {
              sendInfoList = res.data.reverse()
              for (j = 0; j < sendInfoList.length; j++) {
                sendInfoList[j].fromUser = sendInfoList[j].toUser
                sendInfoList[j].nickName = sendInfoList[j].toName
                sendInfoList[j].avatar = sendInfoList[j].toAvatar
              }
              // console.log(sendInfoList)
              room = getInfoList.concat(sendInfoList)
              room.sort(function (a, b) {
                return b.sendTime < a.sendTime ? -1 : 1
              })
              // console.log(room)
              for (let i = 0; i < room.length - 1; i++) {
                // console.log(room[i])
                for (var j = i + 1; j < room.length; j++) {
                  if (room[i]["fromUser"] == room[j]["fromUser"]) {
                    room.splice(j, 1);
                    j--;
                  }
                }
              }
              console.log(room);
              that.setData({
                roomlist: room
              })
            }
          }
        })
      }
    })










  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  //刷新
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    this.getData();
  },
  //网络请求，获取数据
  getData() {
    let that = this
    var getInfoList = []
    var sendInfoList = []
    var room = []
    that.onShow()
    //隐藏导航条加载动画
    wx.hideNavigationBarLoading();
    //停止下拉刷新
    wx.stopPullDownRefresh();

  },

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {
  //调用刷新时将执行的方法
  this.onRefresh();
},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})