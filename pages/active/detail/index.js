// pages/active/detail/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stock: 0,
    isLike: false,
    showDialog: false,
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
  //展示活动详情
  goodInfoShow: function(e) {
    var that = this
    app.ajax.post('/active/getOne', {
      id: that.data.id
    }, function(res) {
      var activeItem = res.data
      that.setData({
        active: activeItem,
        stock: activeItem.stock,
        id:activeItem.id
      })
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
    var arr = wx.getStorageSync('love') || [];
    if (this.data.isLike) {
      arr.push(this.data.active)
      try {
        wx.setStorageSync('love', arr)
        wx.showToast({
          title: '收藏成功！',
          icon: 'success',
          duration: 2000
        });
        console.log(arr)
        this.setData({
          showDialog: false
        })
        return;
      } catch (e) {
        console.log(e)
      }
    } else {
      if (arr.length > 0) {
        for (var j in arr) {
          if (arr[j].id == this.data.id) {
            arr.pop()
            try {
              wx.setStorageSync('love', arr)
            } catch (e) {
              console.log(e)
            }
            //关闭窗口
            wx.showToast({
              title: '取消收藏成功！',
              icon: 'success',
              duration: 2000
            });
            console.log(arr)
            this.setData({
              showDialog: false
            })
            // 返回（在if内使用return，跳出循环节约运算，节约性能） 
            return;
          }
        }
      }
    }
  },
  toAdd() {
    wx.navigateTo({
      url: '/pages/active/add/index',
    })
  },
  // 跳到我的发布
  toCar() {
    wx.navigateTo({
      url: '/pages/my/publish/index',
    })
  },
  // 立即报名
  immeBuy: function(e) {
    var that = this
    var name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '活动报名',
      content: '确定报名吗？',
      success(res) {
        if (res.confirm) {
          app.ajax.post('/stock/add', {
            name: name
          }, function(res) {
            that.goodInfoShow()
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '报名取消',
          })
        }
      }
    })
  },
})