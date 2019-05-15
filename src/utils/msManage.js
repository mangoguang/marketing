//匹配关键字（title）
function fuzzyQuery(list, keyWord) {
  if(!list.length) {
    return
  }
  let arr = [];
  if(keyWord === '' || null) {
    arr = []
  }else {
    for (let i = 0; i < list.length; i++) {
      if (list[i].title.match(keyWord) != null) {
        arr.push(list[i]);
      }
    }
  }
  return arr;
}

export {fuzzyQuery}

//匹配的关键字高亮	    //使用map改变原数组:resultsList
function changeColor(resultsList, keyword){
  resultsList.map((item, index) => {
    if (keyword && keyword.length > 0) {
      let replaceReg = new RegExp(keyword, 'g')
      let replaceString ='<span style="color: #ff2d55">' + keyword + '</span>'
      resultsList[index].title = item.title.replace(replaceReg,replaceString)}
    })
    return resultsList
}

export { changeColor }

function setLocalStorage(obj, parmasName) {
  let storage = window.localStorage;
  let objStr = JSON.stringify(obj);
  storage.setItem(parmasName, objStr);
}

export { setLocalStorage }

function getLocalStorage(parmasName) {
  let storage = window.localStorage;
  return JSON.parse(storage.getItem(parmasName))
}

export { getLocalStorage }

//跳转页面带参数
function skipNewPage(route, url, parmas) {
  route.push({
    path: url,
    query: parmas
  })
}

export {skipNewPage}

//移除数组中指定的一项
function removeItem(arr, item) {
  let newArr = []
  let index = 0
  for(let i in arr) {
    if(arr[i] != item) {
      newArr.push(arr[i])
      newArr[index ++] = arr[i]
    }
  }
  return newArr
}

export {removeItem}

function addItem(arr, item) {
  let newArr = []
  let index = 0
  for(let i in arr) {
    if(arr[i] != item) {
      newArr.push(arr[i])
      newArr[index ++] = arr[i]
    }
  }
  if(newArr.length == arr.length) {
    newArr = [...newArr, item]
  }
  return newArr
}

export {addItem}

//base64解码
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export {b64DecodeUnicode}

//正则匹配html中的img，把img中alt换成style样式 //alt
function changeImgStyle(html){
  var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
  var match = match.replace(/title=\"(.*)\"/gi, 'style="width: 100%;height:auto"');
  return match;
  });
  return newContent;
}

export {changeImgStyle}

//正则匹配html中的img，把img中alt换成style样式 //title
function changeGalleryStyle(html){
  var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
  var match = match.replace(/title=\"(.*)\"/gi, 'style="width: 100%;height:auto;"');
  return match;
  });
  return newContent;
}

export {changeGalleryStyle}

//正则匹配html中的vedio，把img中alt换成style样式 //alt
function changeVedioStyle(html){
  var newContent= html.replace(/<embed[^>]*>/gi,function(match,capture){
  // var match = match.replace(/width=\"(.*)\"/gi, 'wmode="transparent"  loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" style="width: 100%;height:auto"');
  //var match = match.replace(/width=\"(.*)\"/gi, 'autoplay=false autostart=false play=false wmode="transparent"  loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" style="width: 100%;height:auto"');
  var src=match.split(' ')[1].split('=')[1];
  var match=`<video src=${src} style="width: 100%;height:auto" controls></video>`
  return match;
  });
  //console.log(newContent);
  return newContent;
}

export {changeVedioStyle}

//超出缓存5天的自动清除 （1000*60*60*24）
function compareTime(type) {
  if(getLocalStorage(type)) {
    let arrIndex = []
    let localStorageTime = getLocalStorage(type)['currentTime']
    let list = getLocalStorage(type)['list']
    let curTime = new Date().getTime()
    //判断缓存时间有没有过期
    localStorageTime.forEach((item, index) => {
      if((curTime - item)/86400000 > 5) {
        arrIndex = [...arrIndex, index]
      }
    });
    //过期的清除
    let obj = {
      list: list.slice(0, arrIndex[0]),
      currentTime: localStorageTime.slice(0, arrIndex[0])
    }
    judgeObj(obj, type)
  }
}

//判断有没有不超过5天的缓存
function judgeObj(obj, type) {
  if(!obj.list.length) {
    window.localStorage.removeItem(type)
  }else {
    setLocalStorage(obj,type)
  }
}
//增加水印
function waterMark(selector,num){
  let ajaxData=JSON.parse(localStorage.getItem('ajaxData'));
  let str=ajaxData.account;
  let width=document.body.clientWidth;
  let height=document.body.offsetHeight;
  let canvas=document.createElement('canvas');
  let img=new Image();
  img.src="./static/images/logo.png";
  //document.querySelector('.article').appendChild(canvas);
  //document.querySelector(selector).appendChild(img);
  img.onload=function(){
    canvas.width=200;
    canvas.height=200;
    //canvas.style="position:absolute;top:0;left:0;"
    let ctx=canvas.getContext('2d');
    //console.log(ctx);
    //ctx.fillStyle="yellow";
    //ctx.fillRect(0,0,200,200);
    ctx.font="14px Vedana";
    ctx.fillStyle='#ccc';
    ctx.globalAlpha=0.4;
    ctx.save();
    ctx.translate(-120,50);
    ctx.rotate(-45* Math.PI/180);
    ctx.drawImage(img,0,185,14,15);
    ctx.fillText(str,15,200);
    ctx.restore();
    ctx.translate(-18,80);
    ctx.rotate(-45* Math.PI/180);
    ctx.drawImage(img,100,85,14,15);
    ctx.fillText(str,115,100);
    ctx.save();
    if(num==1){
      document.querySelector(selector).style.backgroundImage=`url(${canvas.toDataURL('image/png')})`;
      document.querySelector(selector).style.backgroundPosition='left top';
      document.querySelector(selector).style.backgroundRepeat='repeat';
    }else{
      let selectors=document.querySelectorAll(selector);
      for(let i=0;i<selectors.length;i++){
        selectors[i].style.backgroundImage=`url(${canvas.toDataURL('image/png')})`;
        selectors[i].style.backgroundPosition='left top';
        selectors[i].style.backgroundRepeat='repeat';
      }
    }
   
  }
}
export {waterMark}
