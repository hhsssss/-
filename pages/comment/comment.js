// pages/comment/comment.js
//let id=''
let option=''
let content=''
let openid=''
let username=''

Page({   // 获取用户openid
  getOpenid() {
   wx.cloud.callFunction({
     name: 'getopenid',
     complete: res => {
       wx.setStorageSync('openid', res.result.openid) // 缓存用户openid  持久化
       this.setData({
         openid: res.result.openid
       })
     }
   })
 },

    getContent(event){
            content=event.detail.value
            console.log(content);
        },
        fabiao(){
          this.onLoad(option)
          if(content.length<4){
            wx.showToast({
              title: '评论太短了',
              icon:'none',
            })
            return
          }
            let pinglunItem ={}
            pinglunItem.content=content
            
            // wx.cloud.callFunction({
            //   name:"getopenid"
            // }).then(res=>{
            //   console.log(res.result.openid)
            //   console.log("fsa")
            //   //let openid=wx.getStorageSync("openid")
            //   this.setData({
            //   openid:res.result.openid
            //   })
            //   wx.cloud.database().collection(yxmm).where({_openid:res.result.openid}).get.then(re=>{
            //     console.log("dsdsfs")
            //     console.log(re)
            //   }).catch(err=>{
            //     console.log("dsdsfs")
            //     console.log('失败')
            //   })
            //   console.log("openid=",openid)
            // }).catch(res=>{
            //         console.log(res)
            //   })
              
            //  wx.cloud.callFunction({
            //    name:"getopenid"
            //  }).then(res=>{
            //  //console.log('发表成功',pinglun)
            //     console.log('发',res)
            //  }).catch(res=>{
            //      console.log("败",res)
            //  })

            wx.cloud.callFunction({
              name:"getopenid"
                }).then(res=>{
                //console.log('发表成功',pinglun)
                   console.log('发',res)
                   wx.cloud.database().collection("userlist").where({_openid:res.result.openid}).get({
                     success:(re)=>{
                       console.log(re.data[0].name)
                       username=re.data[0].name
                       console.log(username)
                     }
                   })
                })

                pinglunItem.name=username
            let pinglunarr=this.data.pinglun
            pinglunarr.push(pinglunItem)
            console.log("pinglun=",pinglunarr)
            wx.cloud.callFunction({
              name:"caozuo",
              data:{
                action:"fabiao",
                pinglun:pinglunarr,
                id:this.data.detail._id,
                shopName:this.data.shopName
              }
            }).then(res=>{
             // console.log('发表成功',pinglun)
             console.log(this.data.shopName)
                console.log('发表成功',res)
                // this.data.setData({
                //   pinglun:pinglunarr
                // })
                this.data.pinglun=pinglunarr
            }).catch(res=>{
                console.log("发表失败",res)
            })
            //this.onLoad()
              setTimeout(function() {
                //this.onLoad(option)
                console.log("hh")
              }, 2000)
            this.onLoad(option)
            console.log("hh")
        },

  /**
   * 页面的初始数据
   */
  data: {
      detail:'',
      shopName:'',
      pinglun : []
    
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    option=options
   console.log("评论区",options)
   const yxmm=options.title
   this.setData({
     shopName:yxmm
   })
  // id=options.id
   wx.cloud.database().collection(yxmm).doc(options.id)
   .get({
       success:(res)=>{
           console.log("原神",res)
           this.setData({
           
               detail:res.data,
               //pinglun:detail.pinglun,
               pinglun:res.data.pinglun
           })
           
           console.log("pinglun=",pinglun)
          //  if(res.data.pinglun){
             
          //    //pinglun:[...this.data.pinglun,...res.data.pinglun]
          //    //console.log("pinglun=",pinglun)
             
          //  }
       }
   })
   wx.cloud.callFunction({
    name:"getopenid"
  }).then(res=>{
    console.log(res.result.openid)
    console.log("fsa")
    this.setData({
      openid:res.result.openid
      })
    console.log("openid=",openid)
  }).catch(res=>{
          console.log(res)
    })
   wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
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
    this.onLoad(option)
    
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