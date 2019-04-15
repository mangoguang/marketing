import mango from '../js'
exports.install = (Vue, options) => {
  Vue.prototype.phoneSize =  () => {
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
   Vue.prototype._localAjax = () => {
      let ajaxData = localStorage.getItem('ajaxData')
      return JSON.parse(ajaxData)
   };
   Vue.prototype.getType = (type) => {
     mango.getAjax('/v2/app/reference', {
       type: type
     }).then(res => {
        Vue.prototype._type = res.data
     })
   }
};