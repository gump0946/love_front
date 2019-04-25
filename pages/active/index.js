// pages/good/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['老人走失', '志愿活动'],
    currentTab: 0,
    indicatorDots: true, //设置是否显示面板指示点
    autoplay: true, //设置是否自动切换
    interval: 3000, //设置自动切换时间间隔,3s
    duration: 1000, //  设置滑动动画时长1s
    isHideLoadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.activeShow();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },

  onShow: function() {
    var that = this;
    that.activeShow();
  },

  // 导航切换监听
  navbarTap: function(e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.activeShow()
  },
  //活动展示
  activeShow: function() {
    var that = this
    app.ajax.post('/active/get', {
      catagory: that.data.navbar[that.data.currentTab]
    }, function(res) {
      that.setData({
        activesHotItems: res.data
      })
    })
    app.ajax.req('/picture/get1', {}, function(res) {
      that.setData({
        imgUrls: res.data
      })
    })
  },
  //活动详情
  showDetail: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    //跳转商品详情
    wx.navigateTo({
      url: 'detail/index?id=' + id
    })
  },
  //增加活动
  addActive: function() {
    wx.navigateTo({
      url: '/pages/active/add/index',
    })
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      this.onLoad()
    }, 2000)
  },
  onReachBottom: function() {
    this.setData({
      isHideLoadMore: false
    })
    setTimeout(() => {
      this.onLoad()
    }, 1500)
    this.setData({
      isHideLoadMore: true
    })
  },
  onSearch:function(e) {
    var that = this
    console.log(e.detail)
    app.ajax.post('/good/getByName', {
      name: e.detail,
    }, function(res) {
      that.setData({
        activesHotItems:res.data
      })
    })
  }
})