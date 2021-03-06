// miniprogram/pages/me/me.js
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo : null,
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo : userInfo
      })
    }).catch(err => {
      console.log('Not Authenticated yet');
    })
  },

  onTapLogin(event){
    this.setData({
      userInfo : event.detail.userInfo
    
    })
  },
  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  },

  onTapService() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  }
})