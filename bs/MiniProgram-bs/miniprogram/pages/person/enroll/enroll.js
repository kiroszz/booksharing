// pages/person/enroll/enroll.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phonenumber: "",
    wechatID: "",
    password: "",
    classroom: "",
    passworddack: "",
    isUserInfo: false,

  }, // 注册
  regist: function (e) {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == "") {
      wx.showModal({
        title: '提示',
        content: '请输入用户名!',
        showCancel: false,
        success(res) {
        }
      })
    } else if (that.data.phonenumber == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号!',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号长度有误，请重新输入!',
        showCancel: false,
        success(res) {}
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号!',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码！!',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.passworddack == "") {
      wx.showModal({
        title: '提示',
        content: '请输入确认密码!',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.passworddack != that.data.password) {
      wx.showModal({
        title: '提示',
        content: '两次密码输入不一致!',
        showCancel: false,
        success(res) {}
      })
    } else {
      wx.showLoading({
        title: '注册中',
      })
      //发起网络请求
      wx.request({
        url: server + 'api/user/regist',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data: {
          "openid": getApp().globalData.userInfo.openid,
          "username": that.data.username,
          "phone": that.data.phonenumber,
          "wechatID": that.data.wechatID,
          "classroom": that.data.classroom,
          "password": that.data.password,
          "passworddack": that.data.passworddack,
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
          getApp().globalData.userInfo = res.data.data.userInfo // 写入全局变量
          // getApp().setCache('token', res.data.data.token) // 写入缓存
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }

      })
      
      console.log("regist success")
      that.next() // 跳转到首页
    }

  },

  // 跳转上一页面
  signin: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  next:function(){
    console.log(getApp().globalData.userInfo)
    
    wx.reLaunch({
      url: '/pages/load/load',
    })
  },

  // 获取wxml输入的信息
  usernameInput: function (e) {
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