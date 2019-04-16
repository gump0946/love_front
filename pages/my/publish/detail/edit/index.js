// pages/my/publish/detail/edit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catagoryList: ['老人走失', '志愿活动'],
    catagory: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      active: JSON.parse(options.active),
      id:options.id,
    })
    var that=this
    that.setData({
      name: that.data.active.name,
      description: that.data.active.detail
    })
    console.log(this.data.description)
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
  //发布
  submit: function() {
    console.log(app.globalData.userInfo.nickName)
    var that = this
    app.ajax.post('/active/update', {
      id:that.data.id,
      name: that.data.name,
      description: that.data.description,
      catagory: that.data.catagoryList[that.data.catagory]
    },function(res){
      wx.showToast({
        title: '修改成功',
      })
      wx.navigateBack({
        
      })
    })
  }

})