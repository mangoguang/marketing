<!--  -->
<template>
  <div class="itemDetails">
    <div class="header">
      <banner :title="'店面SI标准一阶段'" :left='true'/>
    </div>
    <div class="content">
      <select-list :list="list"/>
      12313123131231312313
    </div>
  </div>
</template>

<script>
import banner from '../../../components/banner'
import selectList from '../../../components/4s/record/itemDetails/selectList'
export default {
  components: {
    banner,
    selectList
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
  }
}
</script>
<style lang='scss' scoped>
.itemDetails {
  width: 100vw;
  background: #fff;
  // min-height: 100vh;
  .header {
    width: 100vw;
    height: 18vw;
  }
}
</style>