// pages/book/select/select.js

var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifshowhistory: true,
    booklist: [],
    // 搜索框状态
    inputShowed: true,
    //显示结果view的状态
    viewShowed: false,
    // 搜索框值
    inputVal: "",
    //搜索渲染推荐数据
    catList: [],

    // 清除历史
    delectbool:false,

    btnWidth: 300, //删除按钮的宽度单位
    startX: "", //收支触摸开始滑动的位置
    msg: "",

  },

  showdetail: function (e) {
    console.log(e.currentTarget.dataset.text)
    getApp().globalData.bookDetail = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  //搜索
  selectbook: function () {
    var data = this.data.msg
    console.log("data", data)
    var that = this;
    if (data == '') {
      return;
    }
    // 获取缓存
    var select_log = [data]
    try {
      var value = wx.getStorageSync('select_log')
      if (value) {
        console.log(">>>>>>>>>>>", value)
        select_log = select_log.concat(value)
        console.log("select_log:", select_log)
        if (select_log.length > 5) {
          console.log(">>>>>>>>>>>")
          select_log.pop()
        }
      }
    } catch (e) { }
    // 缓存
    try {
      wx.setStorageSync('select_log', select_log)
    } catch (e) { }
    that.setData({
      ifshowhistory:false,
      select_log: select_log,
      delectbool:true
    })
    that.selectapi(data)
  },

  // 历史搜索
  stotageSelect: function (e) {
    console.log(e.currentTarget.dataset.text)
    this.setData({
      ifshowhistory:false,
      inputVal:e.currentTarget.dataset.text
    })
    this.selectapi(e.currentTarget.dataset.text)
    
  },

  // 删除历史缓存
  deleteLog:function(){
    try {
      wx.removeStorageSync('select_log')
    } catch (e) {
      console.log(">>>>>>>>>>>>",e)
      return
    }
    this.setData({
      select_log:[],
      delectbool:false,
    })
  },

  // 请求查找api
  selectapi(data) {
    var that = this
    wx.request({
      url: server + 'api/book/select_like',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data: {
        msg: data
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
          booklist: that.data.booklist
        })
      }
    })
  },

  // 隐藏搜索框样式
  hideInput: function () {
    this.setData({
      booklist: [],
      inputVal: "",
      inputShowed: false
    });
  },
  // 清除搜索框值
  clearInput: function () {
    this.setData({
      ifshowhistory:true,
      booklist: [],
      inputVal: "",
    });
  },
  // 键盘抬起事件2
  inputTyping: function (e) {
    console.log(e.detail.value)
    this.data.msg = e.detail.value
    this.setData({
      viewShowed: false,
      inputVal: e.detail.value
    });
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
    console.log("***************")
    wx.getStorage({
      key: 'select_log',
      success(res) {
        console.log("select_log:", res.data)
        that.setData({
          select_log: res.data,
          delectbool:true
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