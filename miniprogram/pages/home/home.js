// pages/home/home.js
const db = require('../../utils/db')
const util = require('../../utils/util')

Page({
  data: {
    productList: [], // Products List
  },

  onLoad() {
    this.getProductList()
  },

  getProductList() {
    wx.showLoading({
      title: 'Still Loading...',
    })

    db.getProductList().then(result => {
      wx.hideLoading()

      const productList = result.data
      // 2 digits for price
      productList.forEach(product => product.price = util.priceFormat(product.price))

      if (productList.length) {
        this.setData({
          productList
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
})
