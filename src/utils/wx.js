//判断当前设备是pc还是移动
const wx = api.require('wx');

function isPc() {
  var str = window.navigator.userAgent;
  if(str.toLowerCase().indexOf("mobile") == -1){
    return false
  }else{
    return true
  }
}
export {isPc}

//打开扫一扫
function openscan() {
  var FNScanner = api.require('FNScanner');
  FNScanner.open({
    autorotation: true
  }, function(ret, err) {
    if (ret) {
        console.log(JSON.stringify(ret));
    } else {
        console.log(JSON.stringify(err));
    }
  });
}
export {openscan}

function shareInfo() {

}

function ShareImage() {
  type = 'image'
};
function ShareArticle() {
  type = 'text'
};
function ShareMusic() {
  type = 'music'
};
function ShareVedio() {
  type = 'vedio'
};

function qqShare(type) {
  if(type === 'image') {
    qqshareImage()
  }else if(type === 'text'){
    qqsharetext()
  }else if(type ==='music') {
    qqshareMusic()
  }else if(type === 'vedio') {
    qqshareVedio()
  }
};
export {qqShare}

function weiboShare(type) {
  if(type === 'image') {
    weiboShareVedio()
  }else if(type === 'text'){
    weiboShareText()
  }else if(type ==='music') {
    weiboShareVedio()
  }else if(type === 'vedio') {
    weiboShareVedio()
  }
};
export {weiboShare}

function weixinShare(type) {
  if(type === 'image') {
    shareImage('session')
  }else if(type === 'text'){
    shareText('session')
  }else if(type ==='music') {
    shareMusic('session')
  }else if(type === 'vedio') {
    shareVideo('session')
  }
};
export {weixinShare}

function timeLineShare(type) {
  if(type === 'image') {
    shareImage('timeline')
  }else if(type === 'text'){
    shareText('timeline')
  }else if(type ==='music') {
    shareMusic('timeline')
  }else if(type === 'vedio') {
    shareVideo('timeline')
  }
};
export {timeLineShare}

function weiboShareText() {
  //当contentType为text或image时，多媒体内容可以为空;
  var sinaWeiBo = api.require('sinaWeiBo');
  sinaWeiBo.sendRequest({
      contentType: 'text',
      text: '这是测试用的文本',
      imageUrl: 'fs://a.png'
  }, function(ret, err) {
      if (ret.status) {
          api.alert({
              title: '发表微博',
              msg: '发表成功',
              buttons: ['确定']
          });
      } else {
          api.alert({
              title: '发表微博',
              msg: '发表失败',
              buttons: ['确定']
          });
      }
  });
};

function weiboShareVedio() {
  //当contentType为music,video或webpage时，内容地址不能为流媒体地址;
  var sinaWeiBo = api.require('sinaWeiBo');
  sinaWeiBo.sendRequest({
      contentType: 'video',
      text: '这里是测试的内容',
      imageUrl: 'fs://a.png',
      media: {
          title: '多媒体标题',
          description: '多媒体描述',
          thumbUrl: 'fs://b.png',
          videoUrl: 'http://v.ku6.com/show/ZgeIWrUgvfSuDN_fl_qNsQ...html'
      }
  }, function(ret, err) {
      if (ret.status) {
          api.alert({
              title: '发表微博',
              msg: '发表成功',
              buttons: ['确定']
          });
      } else {
          api.alert({
              title: '发表失败',
              msg: err.msg,
              buttons: ['确定']
          });
      }
  });
};
function qqsharetext() {
  var qq = api.require('qq');
  qq.shareText({
      text: 'testtext'
  });
};
function qqshareImage() {
  var qq = api.require('qq');
  qq.shareImage({
      title: 'test',
      description: 'testd',
      imgPath: 'widget://res/1.png'
  });
};

function qqshareMusic() {
  var qq = api.require('qq');
  qq.shareMusic({
      url: 'http://7xq864.com1.z0.glb.clouddn.com/apicloud/591bde468d4e44b21cc225b7b6e1129a.mp3',
      title: '桔子香水',
      description: '任贤齐',
      imgUrl: 'http://upload.wabei.cn/2011/0807/20110807025817844.jpg'
  });
};
function qqshareVedio() {
  var qq = api.require('qq');
  qq.shareVideo({
      url: 'http://7xq864.com1.z0.glb.clouddn.com/apicloud/903ca10851a482ccd1383b62abb3ec5c.mp4',
      title: '视频',
      description: '王力宏',
      imgUrl: 'widget://res/filterMe.png'
  });
};
function shareText(Vscene) {
  wx.shareText({
      apiKey: '',
      scene: Vscene,
      text: '我分享的文本'
  }, function(ret, err) {
      if (ret.status) {
          alert(JSON.stringify(ret))
      } else {
          alert(JSON.stringify(err))
      }
  });
}
function shareImage(Vscene) {
  wx.shareImage({
      apiKey: '',
      scene: Vscene,
      thumb: 'http://docs.apicloud.com/test/m.mp3',
      contentUrl: "http://www.baidu.com"
  }, function(ret, err) {
      if (ret.status) {
          alert(JSON.stringify(ret))
      } else {
          alert(JSON.stringify(err))
      }
  });
}
function shareMusic(Vscene) {
  wx.shareMusic({
      apiKey: '',
      scene: Vscene,
      title: '分享音乐',
      description: '分享音乐的描述',
      thumb: 'widget://res/iconfont-touxiang.png',
      musicDataUrl: "http://docs.apicloud.com/test/m.mp3",
      contentUrl: 'http://www.baidu.com'
  }, function(ret, err) {
      if (ret.status) {
          alert(JSON.stringify(ret))
      } else {
          alert(JSON.stringify(err))
      }
  });
}
function shareVideo(Vscene) {
  wx.shareVideo({
      apiKey: '',
      scene: Vscene,
      title: '分享视频',
      description: '分享视频的描述',
      thumb: 'widget://res/iconfont-touxiang.png',
      contentUrl: 'http://www.youku.com/'
  }, function(ret, err) {
      if (ret.status) {
          alert(JSON.stringify(ret))
      } else {
          alert(JSON.stringify(err))
      }
  });
}