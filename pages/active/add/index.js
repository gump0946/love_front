// pages/active/add/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catagoryList: ['老人走失', '志愿活动'],
    catagory: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that =this
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  catagoryPicker(e) {
    this.setData({
      catagory: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      name: e.detail
    })
  },
  getDescription(e) {
    this.setData({
      description: e.detail
    })
  },
  //选择照片
  chooseImage: function(params) {
    wx.chooseImage({
      count: 1, // 最多1张
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 存储临时地址
        this.setData({
          imgList: res.tempFilePaths,
        })
      }
    })
  },
  // 删除某张图片
  clearImg: function(params) {
    let imgList = this.data.imgList
    let id = params.currentTarget.dataset.id // 图片索引
    imgList.splice(id, 1) // 删除
    this.setData({
      imgList: imgList
    })
  },
  //发布
  submit: function() {
    console.log(app.globalData.userInfo.nickName)
    var that = this
    if (that.data.name) {
      if (that.data.description) {
        wx.uploadFile({
          url: 'http://127.0.0.1:66/active/save',
          filePath: that.data.imgList[0],
          name: 'file',
          formData: {
            nickname: app.globalData.userInfo.nickName,
            name:that.data.name,
            description:that.data.description,
            catagory:that.data.catagoryList[that.data.catagory]
          },
          success: function (res) {
            console.log(res)
            wx.showToast({
              title: '发布成功',
            })
            wx.navigateBack({
              
            })
          }
        })
      }
    }
  }
})