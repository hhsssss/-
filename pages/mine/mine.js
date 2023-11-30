// pages/me/me.js
const db=wx.cloud.database()
let nn=""
Page({
  data: {
    xm:'昵称',
    img:'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/一般_用户.png',
    imgUrls:[
      'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/一般_用户.png',
      'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/my/我的评论.png',
      'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/my/我的收藏.png',
      'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/my/反馈.png',
      'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/my/设置.png'
    ],
    photo: '',
    person:0//用户是否存在
  },

  name(e){
    console.log("name",e.detail.value)
      this.setData({
        nn:e.detail.value
      })
  },
  upload(){
    console.log("点击了上传头像 ")
    let that=this
    //拍摄或从手机相册中选择图片或视频
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log("头像",res.tempFiles[0].tempFilePath)
        //将本地资源上传至云存储空间
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'photo.png',//头像的名字--存储的时候的名字
          filePath: res.tempFiles[0].tempFilePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("云存储的头像路径",res.fileID)
          that.setData({
            img:res.fileID
          })
          console.log("云存储的头像路径url",that.data.img)

        }).catch(error => {
          // handle error
        })
      }
    })
  },
  //存储并登录
  save(){

    if(this.data.person==0){
 //新用户
 console.log("baocun")
 console.log(this.data.person)
 let openid=wx.getStorageSync("openid")
 db.collection("userlist").add({
   data:{
     name:this.data.nn,
     photo:this.data.img
   }

 }).then(res=>{
   wx.showToast({
     title: '信息保存成功',
   })
 })
    }else{
//老毕登改名

 let openid=wx.getStorageSync("openid")
 db.collection("userlist").where({
_openid:openid
 })
 .update({
   data:{
     name:this.data.nn,
     photo:this.data.img
   }

 }).then(res=>{
   wx.showToast({
     title: '信息更新成功',
   })
   console.log(this.data.nn)
   console.log(res)
   console.log(res.data.name)
 })
    }
   
    
  },



  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    wx.cloud.callFunction({
      name:"getopenid"
    })
    .then(res => {
      // console.log("获取id成功",res.result.openid)
      // wx.setStorageSync('openid', res.result.openid)
      this.setData({openid:res.result.openid})
      // console.log("5646516565"+this.data.openid)
      //在用户表中查询当前的openid是否有头像，有则显示
    db.collection("userlist").where({
    _openid:this.data.openid
    }).get().then(res=>{
    console.log("获取的用户信息",res)
    console.log("用户是否存在",res.data.length)
    this.setData({
      person:res.data.length,
      img:res.data[res.data.length-1].photo,
      name:res.data[res.data.length-1].name,
    })
      console.log("获取的用户头像",this.data.img)
      console.log('awdasd'+this.data.person)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    wx.cloud.callFunction({
      name:"getopenid"
    })
    .then(res => {
      // console.log("获取id成功",res.result.openid)
      // wx.setStorageSync('openid', res.result.openid)
      this.setData({openid:res.result.openid})
      // console.log("5646516565"+this.data.openid)
      //在用户表中查询当前的openid是否有头像，有则显示
    db.collection("userlist").where({
    _openid:this.data.openid
    }).get().then(res=>{
    console.log("获取的用户信息",res)
    console.log("用户是否存在",res.data.length)
    this.setData({
      person:res.data.length,
      img:res.data[res.data.length-1].photo,
      name:res.data[res.data.length-1].name,
    })
      console.log("获取的用户头像",this.data.img)
      console.log('awdasd'+this.data.person)
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
