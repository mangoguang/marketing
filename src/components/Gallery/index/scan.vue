<template>
  <div class="m-scan">
    <span class="scan"
          @click="bindScan">
      <img src="../../../assets/imgs/scan.png"
           alt="">
      <p>扫一扫</p>
    </span>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  methods: {
    bindScan() {
      var _this = this
      var FNScanner = api.require('FNScanner')
      FNScanner.openScanner(
        {
          autorotation: true
        },
        function(ret, err) {
          if (ret) {
            if (ret.eventType == 'success') {
              _this.$router.push({
                path: ret.content.split('#')[1]
              })
              // _this.$router.push({
              //   path: '/gSearch',
              //   query: { type: 'gallery', searchVal: ret.content }
              // })
            }
          } else {
            // alert(JSON.stringify(err))
            Toast('扫码失败')
          }
        }
      )
      // var FNScanner = api.require('FNScanner');
      // FNScanner.open({
      //   autorotation: true,
      //   verticalLineColor: '##94f8fa',
      //   isAlbum: true,
      //   hintText:'将二维码放入取景框内即可自动扫描'
      // }, function(ret, err) {
      //   if (ret) {
      //       console.log(JSON.stringify(ret));
      //   } else {
      //       console.log(JSON.stringify(err));
      //   }
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
.m-scan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .scan {
    text-align: center;
    margin-right: 4vw;
    img {
      width: 6.13vw;
      height: 6.13vw;
    }
    p {
      color: #5ac8fa;
      font-size: 2.4vw;
      line-height: 0.5;
    }
  }
}
</style>


