// pages/active/detail/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stock:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.goodInfoShow()
  },
  onShow(){
    this.goodInfoShow()
  },
  //展示活动详情
  goodInfoShow: function(e) {
    var that = this
    app.ajax.post('/active/getOne', {
      id: that.data.id
    }, function(res) {
      var activeItem = res.data
      that.setData({
        active: activeItem,
        stock:activeItem.stock
      })
    })
  },
  editActive(){
    const active = JSON.stringify(this.data.active)
    wx.navigateTo({
      url: 'edit/index?active=' + active + '&id=' + this.data.id,
    })
  }
})