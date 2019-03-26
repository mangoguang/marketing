<template>
  <div class="m-scan">
    <span class="scan" @touchend="openScan">
      <img src="../../../assets/imgs/scan.png" alt="">
      <p>扫一扫</p>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    openScan() {
      this.openscan()
    },
    openscan() {
      var FNScanner = api.require('FNScanner');
      FNScanner.open({
        autorotation: true,
        verticalLineColor: '##94f8fa',
        isAlbum: true,
        hintText:'将二维码放入取景框内即可自动扫描'
      }, function(ret, err) {
        if (ret) {
            console.log(JSON.stringify(ret));
        } else {
            console.log(JSON.stringify(err));
        }
      });
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
      width: 7.13vw;
      height: 7.13vw;
    }
    p {
      color: #5ac8fa;
      font-size: 2.4vw;
      line-height: 0.5;
    }
  }
 
}
</style>


