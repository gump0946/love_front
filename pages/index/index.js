//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    articleList: [],
    indicatorDots: true, //设置是否显示面板指示点
    autoplay: true, //设置是否自动切换
    interval: 3000, //设置自动切换时间间隔,3s
    duration: 1000, //  设置滑动动画时长1s
  },

  onShow: function() {
    this.getList(),
      this.activeShow()
  },

  //活动展示
  activeShow: function() {
    var that = this
    app.ajax.req('/active/getAll', {
      
    }, function(res) {
      that.setData({
        activesHotItems: res.data
      })
    })
    app.ajax.req('/picture/get2', {}, function (res) {
      console.log(res.data)
      that.setData({
        imgUrls: res.data
      })
    })
  },

  getList: function(e) {
    var that = this
    app.ajax.req('/article/get', {}, function(res) {
      console.log(res.data)
      that.setData({
        articleList: res.data
      })
    })
  },

  getMap(){
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  },

  getDetial: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/detail/index?id=' + id
    })
  },
  showDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/detail1/index?id=' + id
    })
  }
})