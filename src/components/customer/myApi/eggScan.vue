<template>
  <div class="egg_scan" @click="openScan">
    点击扫一扫
  </div>
</template>

<script>
// import {isPc, openscan} from '../../utils/wx'
export default {
  data() {
    return {

    }
  },
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
.egg_scan {
  border: 1px solid #eee;
  font-size: 3.73vw;
  color: #666;
  width: 25vw;
  text-align: center;
  border-radius: 2vw;
  margin: 0 auto
}
</style>
