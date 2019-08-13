<!--  -->
<template>
  <ul class="checkContent"
      :class="status ? 'open' : 'close'">
    <li v-for="(item, index) in standardList"
        @click="toCheckDetail(item,index)"
        :key="`checkContent${index}`"
        :class="{done: item.status}">{{item.name}}</li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  props: ['standardList', 'status', 'paprentIndex'],
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      submitScoreData: state => state.eggRecordDetails.submitScoreData
    })
  },
  methods: {
    ...mapMutations(['setSubmitScoreData', 'setCategoryListIndex', 'setStandardListIndex']),
    toCheckDetail (item, index) {

      let standardListObj = { standardId: item.id }
      let submitScoreData = this.submitScoreData.categoryList[this.paprentIndex].standardList
      let includeIndex = -1 //已经填写过打分获取下标值
      let chaildIndex = -1 //将要提交打分的下标值
      submitScoreData.map((items, index) => {
        if (item && items.standardId == item.id) {
          includeIndex = index
        }
      })
      if (includeIndex == -1) {
        submitScoreData.push(standardListObj)  //设置当前选中分类细项id
        chaildIndex = submitScoreData.indexOf(standardListObj)
      } else {
        chaildIndex = includeIndex
      }

      this.setSubmitScoreData(this.submitScoreData) //提交分类id，打分细项id
      this.setCategoryListIndex(this.paprentIndex) //记录三级分类索引
      this.setStandardListIndex(chaildIndex) //记录分类细项列表索引


      this.$router.push({ path: '/checkDetail', query: { name: item.name, standardListIndex: index, isGrade: this.$route.query.isGrade } })
    }
  }
}
</script>
<style lang='scss' scoped>
.checkContent {
  li {
    position: relative;
    color: #2d2d2d;
    padding: 0 4vw;
    font-size: 16px;
    line-height: 3em;
    background: #fff;
  }
  li::after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #f8f8f8;
    transform: scaleY(0.5);
  }
  li.done {
    background: url(../../../assets/imgs/4s/starCheck/yes_blue.png) no-repeat,
      #fff;
    background-size: 4.2vw auto;
    background-position: right 4vw top 50%;
  }
}
.close {
  display: none;
}
</style>