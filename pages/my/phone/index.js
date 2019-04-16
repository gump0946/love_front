// pages/my/phone/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          nickName: res.userInfo.nickName
        })
      }
    })
  },

  onChange: function(e) {
    var that = this
    that.setData({
      phone: e.detail
    })
  },

  getphonenumber: function(e) {
    var that = this
    if (that.data.phone != null) {
      app.ajax.post('/phone/save', {
        nickName: that.data.nickName,
        phone: that.data.phone
      }, function(res) {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          time: '3000'
        })
        wx.navigateBack({

        })
      })
    }
    wx.showToast({
      title: '请输入手机号',
    })
  }
})