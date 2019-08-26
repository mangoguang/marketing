//防抖函数
export const Debounce = (fn, t) => {
    let delay = t || 300;
    let timer;
    console.log(delay);
    return function () {
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
    
};
//解决输入框聚焦键盘调出按钮遮挡
export const resize = (status) => {
  let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
  if (isAndroid){//如果是安卓手机的浏览器
      //let win_h = $(window).height();//关键代码
      //let win_h = document.body.clientHeight;
      //$("body").height(win_h);//关键代码
      //document.body.style.height=win_h;
      window.addEventListener('resize', function () {
          // Document 对象的activeElement 属性返回文档中当前获得焦点的元素。
          let dom=document.querySelector(".btn");
          if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            // if($('.share-btn-box').is(':visible')){
            //   $('.share-btn-box').hide();
            // }else{
            //   $('.share-btn-box').show();
            // }
            // if(status){
            //   return false;
            // }else{
            //   return true;
            // }
            dom.style.diplay="none"
          }else{
            dom.style.diplay="block"
          }
      });
  }
}

