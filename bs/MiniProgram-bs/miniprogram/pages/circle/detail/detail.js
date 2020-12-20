// pages/circle/detail/detail.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected:false,
    colectlist:[]
  },

  // 聊天
  toChatroom:function(){
    var datalist = []
    try {
      var value = wx.getStorageSync('chatPerson')
      if (value) {
        datalist = value
      }
    } catch (e) {
      // Do something when catch error
    }
     var datadict = {
      "nickName":getApp().globalData.circleDetail.username,
      "fromUser": getApp().globalData.circleDetail.user_id,
      "avatar": getApp().globalData.circleDetail.avatar
     }
     datalist.push(datadict)
     for (let i = 0; i < datalist.length - 1; i++) {
      // console.log(datalist[i])
      for (var j = i + 1; j < datalist.length; j++) {
        if (datalist[i]["fromUser"] == datalist[j]["fromUser"]) {
          datalist.splice(j, 1);
          j--;
        }
      }
    }
    try{
      wx.setStorageSync('chatPerson', datalist)
    }catch (e) { }
    // console.log(datalist)
    
    wx.navigateTo({
      url: "/pages/information/room/room",
    })
  },

 // 取消收藏
 collectDelete:function(){
  wx.showLoading({
    title: '取消收藏中',
  })
  // 与服务器交互
  wx.request({
    url: server + 'api/book/collect_delete',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST', // 请求方式
    data: {
      "user_id": getApp().globalData.userInfo.user_id,
      "book_id": getApp().globalData.circleDetail.id,
    },
    success: function (res) { // 请求成功后操作
      console.log(res.data)
      if (res.data.code != 200) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        });
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        return;
      }
    }
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 2000)
  this.setData({
    isCollected:false
  })
},

  // 收藏书籍
  collect:function(){
    var that=this;
    console.log(getApp().globalData.circleDetail.id)
    wx.showLoading({
      title: '收藏中',
    })
    // 与服务器交互
    wx.request({
      url: server + 'api/book/collect_add',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data: {
        "user_id": getApp().globalData.userInfo.user_id,
        "book_id": getApp().globalData.circleDetail.id,
      },
      success: function (res) { // 请求成功后操作
        // console.log(res.data);
        if (res.data.code == 200) {
          that.setData({
            isCollected:true
          })
        }
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          return;
        }
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  // 删除动态
  deleteCircle:function(){
    wx.showLoading({
      title: '删除中',
    })
    wx.request({
      url: server + 'api/circle/delete',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data:{
        id:getApp().globalData.circleDetail.id,
        type:getApp().globalData.circletype
      },
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          return;
        }
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        wx.switchTab({
          url: "/pages/circle/index/index",
        })
      }
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
    console.log("getApp().globalData.circleDetail",getApp().globalData.circleDetail);
    this.setData({
      data:getApp().globalData.circleDetail,
      user_id:getApp().globalData.userInfo.user_id
    })

    var that = this
    wx.request({
      url: server + 'api/book/collect_list',
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
        that.data.colectlist = res.data.data
        console.log(that.data.colectlist)
        that.setData({
          colectlist:that.data.colectlist
        })
        for(var i in that.data.colectlist){
          if(that.data.colectlist[i].id==getApp().globalData.circleDetail.id){
            that.setData({
              isCollected:true
            })
          }
        }
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