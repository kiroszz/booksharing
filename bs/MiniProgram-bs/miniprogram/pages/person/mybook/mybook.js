// pages/person/mybook/mybook.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#436EEE",
    secco: "#979797",
    temp: true,
    booklist:[],
    showtab: 0, //顶部选项卡索引
    tabnav: {
     tabnum: 5,
     tabitem: [
     {
      "id": 0,
      "text": "全部"
     },
     {
      "id": 1,
      "text": "教材"
     },
     {
      "id": 2,
      "text": "课外学习"
     },
     {
      "id": 3,
      "text": "小说"
     },
     {
      "id": 4,
      "text": "其他"
     },
     ]
    },
    productList: [],
  },
  setTab: function (e) {
    var that = this
    const edata = e.currentTarget.dataset;
    var categ = that.data.tabnav.tabitem[edata.tabindex]
    console.log(categ)
    that.setData({
     showtab: edata.tabindex,
    })
    if (categ.id == 0){
      wx.request({
        url: server + 'api/book/all_list',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET', // 请求方式
        success: function (res) { // 请求成功后操作
          console.log(res.data)
          if (res.data.code != 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            });
            return;
          }
          that.data.mybooks = res.data.data
          console.log(that.data.mybooks)
          that.setData({
            booklist:that.data.mybooks
          })
        }
      })
    }
    if (categ.id >=1 && categ.id <5){
      wx.request({
        url: server + 'api/book/select',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data:{
          category:categ.text
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
          that.data.booklist = res.data.data
          console.log(that.data.booklist)
          that.setData({
            booklist:that.data.booklist
          })
        }
      })
    }
    },
  // 添加书籍
  addbook:function(){
    wx.navigateTo({
      url: '/pages/book/addbook/addbook'
    })
  },

  showdetail: function (e) {
    console.log(e.currentTarget.dataset.text)
    getApp().globalData.bookDetail = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '/pages/book/detail/detail'
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
      url: server + 'api/book/person_list',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data:{
        user_id:getApp().globalData.userInfo.user_id
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
        that.data.mybooks = res.data.data
        console.log(that.data.mybooks)
        that.setData({
          mybooks:that.data.mybooks
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