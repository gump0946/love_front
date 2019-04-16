// pages/index/detail/index.js
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
    that.setData({
      id: options.id
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
              })
            }
          })
        }
      }
    })
  },

  articleInfoShow: function(e) {
    var that = this
    app.ajax.post('/article/getOne', {
      id: that.data.id
    }, function(res) {
      that.setData({
        article: res.data
      })
    })
  },

  formSubmit: function(e) {
    var that = this;
    var mess = e.detail.value.liuyantext; //获取表单所有name=liuyantext的值 
    if(mess == null){
      wx.showToast({
        title: '留言不能为空',
      })
      return
    }
    var nickName = e.detail.value.nickname; //获取表单所有name=nickName的值 
    var avatarUrl = e.detail.value.headimg; //获取表单所有name=headimg的值 
    wx.showToast({
      title: '已留言',
      icon: 'success',
      time: '2000'
    })
    app.ajax.post('/message/save', {
      articleId: that.data.id,
      mess,
      nickName,
      avatarUrl
    }, function(res) {
      console.log(res.data)
      that.setData({
        re: res.data,
      })
      wx.hideToast();
      that.articleInfoShow()
      that.onFresh()
    })
  },

  onShow: function() {
    this.onFresh()
    this.articleInfoShow()
  },

  onFresh: function() {
    wx.showNavigationBarLoading();
    var that = this
    app.ajax.post('/message/get', {
      articleId: that.data.id
    }, function(res) {
      that.setData({
        liuyanlist: res.data,
        //res代表success函数的事件对，data是固定的，liuyanlist是数组
      })
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },
})