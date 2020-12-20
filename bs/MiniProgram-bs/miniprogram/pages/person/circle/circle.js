// pages/person/circle/circle.js
var server = getApp().globalData.server
Page({


  /**
   * 页面的初始数据
   */
  data: {
    circleList: []
  },

  // 跳转到详情页面
  showdetail: function (e) {
    console.log("e.currentTarget.dataset.text", e.currentTarget.dataset.text)
    getApp().globalData.circletype = e.currentTarget.dataset.text.circleType
    getApp().globalData.circleDetail = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '/pages/circle/detail/detail'
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
    var that = this
    wx.request({
      url: server + 'api/circle/mine',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data: {
        user_id: getApp().globalData.userInfo.user_id
      },
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        that.data.circleList = res.data.data
        console.log(that.data.circleList)
        that.setData({
          circleList: that.data.circleList
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

  //下拉刷新
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    this.getData();
  },
  //网络请求，获取数据
  getData() {
    var that = this
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