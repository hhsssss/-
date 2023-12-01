Page({
  data: {
    comments: []
  },
  onLoad: function () {
    let openid = wx.getStorageSync("openid")
    const tables = ['13dao', '6hkc', 'Cfwkc', 'Fnrf', 'adsk', 'cqxm', 'czwmg', 'dbsgjzg', 'dsxwc', 'dzzxkc', 'fjxz', 'fxsc', 'g8d', 'gssl', 'hlhlyfs', 'jdmdxalyp', 'kjnrm', 'lcjsgsj', 'ljzjf', 'lwwlsf', 'mglzyyrf', 'mgy', 'mxbc', 'mzct', 'qwmg', 's1s2', 'sgbd', 'shtssz', 'sljc', 'sxsgm', 'sxxc', 'tsbz', 'twftszb', 'xcdp', 'xdsk', 'zjxgyzm', 'zzfwxc'];
    const promises = tables.map(table => {
      return new Promise((resolve, reject) => {
        wx.cloud.database().collection(table).get({
          success: res => {
            const comments = [];
            res.data.forEach(item => {
              if (item.pinglun && item.pinglun.some(c => c.openid === openid)) {
                comments.push(...item.pinglun.filter(c => c.openid === openid).map(c => {
                  return {
                    table: table,
                    dish: item.name,
                    content: c.content
                  };
                }));
              }
            });
            resolve(comments);
          },
          fail: err => {
            reject(err);
          }
        });
      });
    });

    Promise.all(promises)
      .then(comments => {
        const formattedComments = comments.flat().map(comment => {
          return {
            table: comment.table,
            dish: comment.dish,
            content: comment.content
          };
        });
        this.setData({
          comments: formattedComments
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
});
