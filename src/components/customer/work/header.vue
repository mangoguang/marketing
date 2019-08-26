<template>
  <div class="workHeader paddingTop20" :style="{'padding-top':`${top}vw`}">
    <div :class="`${fix}`"></div>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'workHeader',
  props: ['title'],
  data() {
    return {
      fix:'',
      top:''
    }
  },
  mounted() {
    this.isIPhoneX()
  },
  methods: {
    isIPhoneX : function() {
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {
        // console.log('succcess')       
        if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
          this.fix = 'fix'
          this.top = '6'
        }else{
          
        } 
      } else {
        this.top = '20px';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .workHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 16vw;
    background: url('../../../static/images/work/bg.png') no-repeat;
    background-size: 100% 100%;
    z-index: 11;
    h2{
      font-size: 8vw;
      color: #fff;
      line-height: 10vw;
      padding-top: 6vw;
      padding-left: 4.8vw;
      font-weight:bold;
    }
  }
</style>

