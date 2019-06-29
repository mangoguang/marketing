<!--  -->
<template>
  <div class="itemDetails">
    <div class="header">
      <banner :title="'店面SI标准一阶段'" :left='true'/>
    </div>
    <div class="content">
      <select-list :list="list" @getActiveData="getActiveData"/>
      <swiperPic />
      <div class="score-slide">分数</div>
      <div class="reason">
        <p class="reason_title">扣分原因:</p>
        <p class="reason_content">店面海报旧，海报位置不合理，卫生差不够干净
          不合理不合理不合理不合理不合理不合理不合理
          不合理，故扣9分。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '../../../components/banner'
import selectList from '../../../components/4s/record/itemDetails/selectList'
import swiperPic from '../../../components/4s/record/itemDetails/swiperPic'
export default {
  components: {
    banner,
    selectList,
    swiperPic
  },
  data () {
    return {
      list: [
        {
          text: '店面面积',
          score: '1'
        },{
          text: '店面类型',
          score: '2'
        },{
          text: '装修时间/到期时间',
          score: '2'
        }
      ]
    };
  },
  methods: {
    //获取下啦选择框的值
    getActiveData(val) {
      console.log(val)
    }
  }
}
</script>
<style lang='scss' scoped>
.itemDetails {
  width: 100vw;
  background: #fff;
  // height: 100vh;
  // overflow: hidden;
  // min-height: 100vh;
  .header {
    width: 100vw;
    height: 18vw;
  }
  .score-slide {
    padding: 10.66vw 16vw;
  }
  .reason {
    padding: 5vw 16vw;
    .reason_title {
      color: #7c7c7c;
      font-weight: 500;
      font-size: 3.46vw;
    }
    .reason_content {
      color: #303030;
      font-weight: 500;
      font-size: 3.46vw;
    }
  }
}
</style>