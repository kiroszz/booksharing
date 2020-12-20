// pages/book/edit/edit.js

var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname: "",
    content: "",
    photo:"",
    type:"free",
    delete:true,
    addphotoPath: "/images/icon/addphoto.png",
    items: [{
        name: 'free',
        value: '免费',
        checked: 'true'
      },
      {
        name: 'bargaining',
        value: '议价'
      }
    ],
    array: ['教材', '小说', '课外学习', '其他'],
    index: 0,
    category:""

  },
  
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.data.category = this.data.array[e.detail.value]
    // console.log(this.data.category)
  },
  // 获取wxml输入信息
  bindBookname: function (e) {
    console.log(e.detail.value)
    this.data.bookname = e.detail.value
  },
  bindContent: function (e) {
    this.data.content = e.detail.value
  },
  switchChange: function (e) {
    this.data.addcircle = e.detail.value
  },
  typeChange: function (e) {
    this.data.type = e.detail.value
  },
  // 添加图片
  addphoto: function () {
    // 选择一张图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0]
        this.data.addphotoPath = tempFilePath
        this.data.delete = true
        console.log(this.data.addphotoPath)


        this.setData({
          addphotoPath: tempFilePath,
          delete:true
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.data.bookname = getApp().globalData.bookDetail.bookname
    this.data.content = getApp().globalData.bookDetail.content
    this.data.addphotoPath = getApp().globalData.bookDetail.photo
    this.data.type = getApp().globalData.bookDetail.type
    this.data.category = getApp().globalData.bookDetail.category

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
    this.setData({
      data:getApp().globalData.bookDetail,
      index:this.data.array.indexOf(getApp().globalData.bookDetail.category),
      addphotoPath:getApp().globalData.bookDetail.photo
    })
    
  },
  updateBook:function(){
    var that = this
    that.updateAsync()
  },

    //修改书籍
    async updateAsync() {
      var that = this
      wx.showLoading({
        title: '修改中',
      })
      
      // 获取图片url
      if (that.data.addphotoPath != "/images/icon/addphoto.png") {
        if (that.data.addphotoPath != getApp().globalData.bookDetail.photo){
          that.data.photo = await that.uploadFile(that.data.addphotoPath);
        }
        console.log("this.data.photo:" + that.data.photo)
      }
  
      // 与服务器交互
      wx.request({
        url: server + 'api/book/update',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data: {
          "id": getApp().globalData.bookDetail.id,
          "user_id": getApp().globalData.userInfo.user_id,
          "openid": getApp().globalData.userInfo.openid,
          "username": getApp().globalData.userInfo.userName,
          "avatarUrl": getApp().globalData.userInfo.avatarUrl,
          "classroom": getApp().globalData.userInfo.classroom,
          "bookname": that.data.bookname,
          "type": that.data.type,
          "category": that.data.category,
          "content": that.data.content,
          "photo": that.data.photo,
          "addcircle": that.data.addcircle,
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
          wx.reLaunch({
            url: '/pages/book/index/index'
          })
        }
      })
    },
    // 删除图片
    deletephoto: function () {
      console.log("******")
      this.data.addphotoPath = "/images/icon/addphoto.png"
      this.data.delete = false
      this.setData({
        addphotoPath: "/images/icon/addphoto.png",
        delete:false
      })
    },

  //上传图片
  uploadFile(filePath) {

    return new Promise(function(resolvs, reject) {
      var photoname = (new Date()).valueOf() + '.png'
      wx.cloud.uploadFile({
        cloudPath: photoname, // 文件名
        filePath: filePath, // 文件路径
        success: res => {
          // get resource ID
          console.log("res.fileID:"+res.fileID)
          resolvs("https://626f-booksharing-riolf-1301887879.tcb.qcloud.la/" + photoname)
        },
        fail: err => {
          console.log("err: " + err)
          // handle error
        }
      })
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