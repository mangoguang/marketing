<!-- status参数为真时表示已评分 -->
<template>
  <div class="bigCategory">
    <BigCategoryBox
    v-for="(item, index) in bigCategoryList"
    @click.native="toCheck"
    :key="`bigCategoryBox${index}`"
    :status="item.status"
    :text="item.text"
    />
  </div>
</template>

<script>
import BigCategoryBox from './bigCategoryBox'
export default {
  props: [],
  components: {BigCategoryBox},
  data () {
    return {
      bigCategoryList: [
        {
          text: '店面SI标准一阶段',
          status: true
        }, {
          text: '员工形象',
          status: true
        }, {
          text: '店面环境',
          status: false
        }, {
          text: '数据管理',
          status: false
        }
      ]
    }
  },
  methods: {
   toCheck() {
     this.$router.push({path: '/check'})
   } 
  }
}
</script>
<style lang='scss' scoped>
.bigCategory {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  // padding: 0 2vw;
  margin-top: 6vw;
}
</style>