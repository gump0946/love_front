// pages/my/publish/index.js
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
    var that = this
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
    this.getActive()
  },
  onShow: function () {
    this.getActive()
  },
  //展示我的活动
  getActive() {
    var that = this
    app.ajax.post('/active/getByNickname', {
      nickName: app.globalData.userInfo.nickName
    }, function(res) {
      that.setData({
        activeList:res.data
      })
    })
  },
  getDetial:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/index?id=' + id,
    })
  }
})