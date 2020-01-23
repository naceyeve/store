// pages/detail/detail.js
const db = require('../../utils/db')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.getProductDetail(options.id)
  },

  getProductDetail(id){
    wx.showLoading({
      title: 'Loading...',
    })

    db.getProductDetail(id).then(result => {

      wx.hideLoading()
      const data = result.result
      data.price = util.priceFormat(data.price)

      if (data) {
        this.setData({
          product: data
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    

    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    })
  },

  buy(){
    wx.showLoading({
      title: 'Purchasing...',
    })
    const productToBuy = Object.assign({
      count: 1
    }, this.data.product)

    productToBuy.productId = productToBuy._id


    db.addToOrder({
      list: [productToBuy]
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  addToCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.addToCart(this.data.product).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },
  onTapReviewEntry() {
    if (this.data.product.reviewCount) {
      const product = this.data.product
      wx.navigateTo({
        url: `/pages/review/review?productId=${product._id}&price=${product.price}&name=${product.name}&image=${product.image}`,
      })
    }
 
  },

})