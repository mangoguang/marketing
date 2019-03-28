// const phoneSize = () => {
//   var u = navigator.userAgent;
//   var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//   if (isIOS) {
//     if (
//       (screen.height == 812 && screen.width == 375) ||
//       (screen.height == 896 && screen.width == 414)
//     ) {
//       console.log('iphonex')
//     } else {
//       console.log('iphone')
//     }
//   }else {
//       console.log('android')
//     }
// }

// export default{
//   phoneSize
// }
exports.install = function (Vue, options) {
  Vue.prototype.phoneSize =  () => {//全局函数1
    let u = navigator.userAgent;
    let phone;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
      if (
        (screen.height == 812 && screen.width == 375) ||
        (screen.height == 896 && screen.width == 414)
      ) {
        phone = 'iphonex'
      } else {
        phone = 'iphone'
      }
    }else {
        phone = 'android'
      }
      return phone
   };
   Vue.prototype.text2 = function (name){//全局函数2
      console.log(name)
   };
   Vue.prototype._parmas = {
     id: 1,
     name:'xiaowei'
   }
};