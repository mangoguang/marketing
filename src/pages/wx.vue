<template>
  <div class="wx"  v-bind:style="{ height: height + 'px' }">
    微信页面
  </div>
</template>

<script>
const wx = require('weixin-js-sdk')
import Vue from 'vue'
import vueResource from 'vue-resource'
const Url = location.href;
Vue.use(vueResource)

export default {
  name: 'login',
  data () {
    return {
      height: document.documentElement.clientHeight,
      stature: ''
    }
  },computed: {

  },
  methods:{
    getWx:function(){
      this.$http.jsonp('http://zs.derucci.net:8821/deruccimid/antifake/getweichatcfg', {
        jsonp: 'jsoncallback',
        params: {
          url: Url
        }
      }).then(function(data) {
        data = data.body;
        var str1 = data.timestamp;
        var str2 = data.nonceStr;
        var accesstoken = data.accesstoken;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
          appId: 'wx877a7e37b0de0a87', // 必填，公众号的唯一标识  
          timestamp: str1, // 必填，生成签名的时间戳  
          nonceStr: str2, // 必填，生成签名的随机串  
          signature: data.signature, // 必填，签名，见附录1  
          jsApiList: [
              'chooseImage',
              'checkJsApi',
              'getLocation',
              'scanQRCode',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'openLocation'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2  
        });
        wx.ready(function() {
          //获取地理位置
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
              console.log(res);
              console.log('success1');
            }
          });
        })
        
      })
    }
  },
  beforeMount: function() {
    this.getWx();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$bgc: #31c3b0;
$fc: #666;
$subfc: #525252;
.picbox{
  
}
</style>
