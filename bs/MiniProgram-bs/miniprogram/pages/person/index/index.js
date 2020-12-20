// pages/person/person.js
Page({

  /**
   * Page initial data
   */
  data: {
  },

  toLogin: function () {
    wx.navigateTo({
      url: '/pages/person/login/login',
    })
  },
  lookcollect:function(){
    wx.navigateTo({
      url: '/pages/person/collect/collect',
    })
  },
  signup: function () {
    wx.navigateTo({
      url: '/pages/person/enroll/enroll'
    })
  },
  // 修改信息
  updatainfo:function(){
    wx.navigateTo({
      url: '/pages/person/update/update',
    })
  },

  // 去我的书籍页面
  mybook:function(){
    wx.navigateTo({
      url: '/pages/person/mybook/mybook',
    })
  },

  // 退出登录
  exitlogin:function(){
    getApp().globalData.userInfo = {}
    this.data.donelogin = false
    this.setData({
      donelogin:false
    })
  },

  // 查看自己发布的动态
  lookmine: function(){
    wx.navigateTo({
      url: '/pages/person/circle/circle',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {



  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    // console.log("test"+getApp().globalData.userInfo.userName)
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      donelogin:getApp().globalData.userInfo.userName
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})