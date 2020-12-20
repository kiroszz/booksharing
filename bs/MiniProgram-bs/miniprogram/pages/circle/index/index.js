// pages/circle/index/index.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#436EEE",
    secco: "#979797",
    temp: true,
    list1: [],
    list2: [],
    page: 1,
    page2: 1,
    pageSize: 8, //根据后台每页的数据设定
    hasMoreSeek: true, //是否有更多数据文字
    hasMoreLend: true, //是否有更多数据文字
    triggered: false,
  },


  showdetail: function (e) {
    console.log(e.currentTarget.dataset.text)
    getApp().globalData.circleDetail = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  // 点击寻书动态
  first_select: function (e) {
    getApp().globalData.circletype = "seek"
    var that = this
    that.data.page = 1
    that.data.list1 = []
    that.data.temp = true
    that.getSeekInfo()
    that.setData({
      temp: true,
      firco: "#436EEE",
      secco: "#979797",
    })
  },

  // 点击出书动态
  second_select: function (e) {
    getApp().globalData.circletype = "lend"
    var that = this
    that.data.page2 = 1
    that.data.list2 = []
    that.data.temp = false
    that.getSeekInfo()
    this.setData({
      temp: false,
      firco: "#979797",
      secco: "#436EEE",
    })

  },
  // 下拉刷新
  updateData: function () {
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
    }, 1000)
    //loading 提示框    
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    });
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();

    var that = this
    if (getApp().globalData.circletype == "seek") {
      that.data.page = 1
      that.data.list1 = []
      that.data.hasMoreSeek = true
      that.setData({
        hasMoreSeek: true
      })
    } else {
      that.data.page2 = 1
      that.data.list2 = []
      that.data.hasMoreLend = true
      that.setData({
        hasMoreLend: true
      })
    }

    that.getSeekInfo()
    //隐藏导航条加载动画
    wx.hideNavigationBarLoading();
    //停止下拉刷新
    wx.stopPullDownRefresh();
  },


  // 下拉刷新
  // 服务器请求动态
  getSeekInfo: function () {
    var that = this

    if (that.data.temp) { // 寻书动态
      if (!that.data.hasMoreSeek) {
        return;
      }
      wx.request({
        url: server + 'api/circle/circle_seek',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data: {
          page: that.data.page,
          pageSize: that.data.pageSize
        },
        success: function (res) { // 请求成功后操作
          console.log(res.data)
          var contentlist = res.data.data
          if (res.data.code != 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            });
            return;
          }
          var contentlistTem = that.data.list1

          if (that.data.page == 1) { // 第一页
            that.data.list1 = res.data.data
            console.log(that.data.list1)
            that.setData({
              list1: that.data.list1
            })

          } else if (contentlist.length < that.data.pageSize) {
            that.data.list1 = contentlistTem.concat(contentlist)
            that.setData({
              list1: that.data.list1,
            })
          } else {
            that.data.hasMoreSeek = true
            that.data.list1 = contentlistTem.concat(contentlist)
            that.setData({
              list1: that.data.list1,
            })
          }
          // 已经最后一页了
          if (contentlist.length < that.data.pageSize || res.data.isAll == 1) {
            that.data.hasMoreSeek = false
            that.setData({
              hasMoreSeek: false
            })
          }
          that.data.page = that.data.page + 1
        }
      })
    } else { // 出书动态
      if (!that.data.hasMoreLend) {
        return;
      }
      wx.request({
        url: server + 'api/circle/circle_lend',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data: {
          page: that.data.page2,
          pageSize: that.data.pageSize
        },
        success: function (res) { // 请求成功后操作
          console.log(res.data)
          var contentlist = res.data.data
          if (res.data.code != 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            });
            return;
          }
          var contentlistTem = that.data.list2

          if (that.data.page2 == 1) { // 第一页
            that.data.list2 = res.data.data
            console.log(that.data.list2)
            that.setData({
              list2: that.data.list2
            })
            if (contentlist.length < that.data.pageSize) {
              that.data.hasMoreLend = false
              that.setData({
                hasMoreLend: false
              })
            }
          } else if (contentlist.length < that.data.pageSize) {
            that.data.hasMoreLend = false
            that.data.list2 = contentlistTem.concat(contentlist)
            that.setData({
              list2: that.data.list2,
              hasMoreLend: false
            })
          } else {
            that.data.hasMoreLend = true
            that.data.list2 = contentlistTem.concat(contentlist)
            that.setData({
              list2: that.data.list2,
            })
          }
          that.data.page2 = that.data.page2 + 1
        }
      })
    }

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
    getApp().globalData.circletype = "seek"
    var that = this
    that.data.page = 1
    that.data.list1 = []
    that.getSeekInfo()
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

  // //刷新
  // onRefresh(){
  //   //在当前页面显示导航条加载动画
  //   wx.showNavigationBarLoading(); 
  //   this.getData();
  // },
  // //网络请求，获取数据
  // getData(){
  //   var that = this
  //   that.data.page = 1
  //   that.data.list1 = []
  //   that.getSeekInfo()
  //   //隐藏导航条加载动画
  //   wx.hideNavigationBarLoading();
  //   //停止下拉刷新
  //   wx.stopPullDownRefresh();
  // },
  //   /**
  //    * 页面相关事件处理函数--监听用户下拉动作
  //    */
  //   onPullDownRefresh: function () {
  //     //调用刷新时将执行的方法
  //     this.onRefresh();
  //   },

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