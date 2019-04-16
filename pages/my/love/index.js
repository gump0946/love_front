// pages/my/love/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActive()
  },

  onShow:function(){
    this.getActive()
  },

  //展示我的活动
  getActive() {
    var that = this
    var arr = wx.getStorageSync('love')
    that.setData({
      activeList:arr
    })
  },
  //活动详情
  getDetial: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    //跳转商品详情
    wx.navigateTo({ url: 'detail/index?id=' + id })
  },
})