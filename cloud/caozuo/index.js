// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// // 云函数入口函数
// exports.main = async (event, context) => {
//   //const wxContext = cloud.getWXContext()
//   if(event.action =='fabiao'){
//     return await cloud.database().collection("Cfwsx").doc(event.id).update(
//       {data:
//         {pinglun:event.pinglun}
//       }
//     ).then(
//       res=>{
//         console.log("评论成功",res)
//         return res
//       }
//     )
//     .catch(
//       res=>{
//         console.log("评论失败",res)
//         return res

//       }
//     )
//   }
//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }





// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// //小技巧可以动态改变环境
// cloud.init({
//     env: cloud.DYNAMIC_CURRENT_ENV
// })

// 云函数入口函数
exports.main = async (event, context) => {
    if (event.action=='shoucang') {
        //异步操作
        return await cloud.database().collection(event.collectionName).doc(event.id)
        .update({
            data: {
                shoucang: event.shoucang

            }
        })
        .then(res => {
            console.log("改变收藏状态", res);
            return res
        })
        .catch(err => {
            console.log("改变收藏状态失败", err);
            return err
        })
    } else if(event.action=='dianzan'){
        //异步操作
        return await cloud.database().collection("event.shopName").doc(event.id)
        .update({
            data: {
                dianzan: event.dianzan
            }
        })
        .then(res => {
            console.log("改变点赞状态成功", res);
            return res
        })
        .catch(err => {
            console.log("改变点赞状态失败", err);
            return err
        })
    }else if(event.action=='fabiao'){
        //异步操作
        return await cloud.database().collection(event.shopName).doc(event.id)
        .update({
            data: {
                // 前面为数据库字段，后面为修改之后的值
                pinglun: event.pinglun,
                _openid:event.openid
            }
        })
        .then(res => {
            console.log("添加评论成功", res);
            return res
        })
        .catch(err => {
            console.log("添加评论失败", err);
            return err
        })
    }
}
