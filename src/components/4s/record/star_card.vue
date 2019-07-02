<!--  -->
<template>
  <div class="level_wrapper">
    <div class="level_icon">
      <img  v-for="(item,index) in level" :key="item + '_' + index"
            src="../../../assets/imgs/4s/star.png" alt="">
      <img  v-for="(item,index) in (5 - level)" :key="item + index"
              src="../../../assets/imgs/4s/star_white.png" alt="">
      </div>
      <div class="level_text">{{getNumText(level)}}星{{text}}</div>
    </div>
</template>

<script>
export default {
  props: ['starLevel','text'],
  data () {
    return {
      level: ''
    };
  },
  created() {
    this.level = this.starLevel || 1
  },
  methods:{
    getNumText(num) {
      switch (num) {
        case 1:
          return '一'
          break;
        case 2:
          return '二'
          break;
        case 3:
          return '三'
          break;
        case 4:
          return '四'
          break;
        case 5:
          return '五'
          break;
        default:
          break;
      }
    }
  } 
}
</script>
<style lang='scss' scoped>
  .level_wrapper {
      width: 25.06vw;
      height: 10.8vw;
      background: url('../../../assets/imgs/4s/star_wrapper.png') no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      padding: 0 2vw;
      box-sizing: border-box;
      .level_icon {
        height: 4vw;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 2vw;
        box-sizing: border-box;
        img{
          width: 3.2vw;
          height: 3.2vw;
        }
      }
    }
    .level_text {
      line-height: 4vw;
      color: #57452c;
      font-size: 3.2vw;
      text-align: right;
      padding-right: 0.5vw;
    }
</style>