// pages/person/update/update.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phonenumber: "",
    wechatID: "",
    classroom: "",

  },
  // 获取wxml输入的信息
  usernameInput: function (e) {
    console.log(e.detail.value)
    this.data.username = e.detail.value
  },
  phoneInput: function (e) {
    this.data.phonenumber = e.detail.value
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  passwordInpuAckt: function (e) {
    this.data.passworddack = e.detail.value
  },
  wechatIDInput: function (e) {
    this.data.wechatID = e.detail.value
  },
  classroomInput: function (e) {
    this.data.classroom = e.detail.value
  },
  // 修改信息
  confirm: function(){
    var that = this
    console.log("********")
    wx.showLoading({
      title: '修改中',
    })
    //发起网络请求
    wx.request({
      url: server + 'api/user/update',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data: {
        "user_id": getApp().globalData.userInfo.user_id,
        "username": that.data.username,
        "phone": that.data.phonenumber,
        "wechatID": that.data.wechatID,
        "classroom": that.data.classroom,
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        console.log(res.data.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        getApp().globalData.userInfo = res.data.data // 写入全局变量
        // getApp().setCache('token', res.data.data.token) // 写入缓存
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        });
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        });
      }
    })
    console.log("update success")
    wx.reLaunch({
      url:"/pages/load/load"
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.data.username = getApp().globalData.userInfo.username
    this.data.phonenumber = getApp().globalData.userInfo.phone
    this.data.wechatID = getApp().globalData.userInfo.wechatID
    this.data.classroom = getApp().globalData.userInfo.classroom
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      data: getApp().globalData.userInfo
    }
    )
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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