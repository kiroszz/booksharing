// pages/person/login/login.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    phone: "",
    password: "",
    isUserInfo: false,
  },
  phoneInput: function (e) {
    this.data.phone = e.detail.value
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
  },


  signup: function () {
    wx.navigateTo({
      url: '/pages/person/enroll/enroll'
    })
  },

  login: function () {
    var that = this
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入用户名！',
        success: function (res) {}
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入密码！',
        success: function (res) {}
      })
    } else {

      //发起网络请求
      wx.request({
        url: server + 'api/user/login',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data: {
          "phone": that.data.phone,
          "password": that.data.password,
        },
        success: function (res) {
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
          console.log(res.data)
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
          wx.reLaunch({
            url: "/pages/load/load"
          })
        }
      })
    }
  },

  // 微信授权
  bindGetUserInfo(e) {
    var that = this
    if (e.detail.userInfo == undefined) {

    } else {
      console.log(e.detail.userInfo)
      wx.login({
        success: function (res) {
          // 发送请求，获取用户信息
          wx.request({
            url: server + 'api/user/load', // 请求URL
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST', // 请求方式
            data: {
              'avatarUrl': e.detail.userInfo.avatarUrl,
              'code': res.code,
              'nickName': e.detail.userInfo.nickName,
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
              getApp().globalData.userInfo = res.data.data.userInfo; // 写入全局变量
              getApp().setCache('token', res.data.data.token); // 写入缓存
              that.data.isUserInfo = true
              that.setData({
                isUserInfo: true
              })
            }
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          // 查看是否授权
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    that.data.isUserInfo = true
                    that.setData({
                      isUserInfo: true
                    })
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
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