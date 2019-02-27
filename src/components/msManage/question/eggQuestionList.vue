<template>
  <ul>
    <li v-for="(item, index) in questionData" :key="index" @click="toQuestionDetails(index)">
      <span>{{item.title}}</span>
      <img src="../../../assets/imgs/rightside.png" alt="">
    </li>
  </ul>
</template>

<script>
export default {
  props: ['questionData'],
  data() {
    return {

    }
  },
  methods: {
    //跳转到问题详情
    toQuestionDetails(index) {
      let id = this.questionData[index].questionId
      this.$router.push({
        path: '/questionDetail',
        query: {questionId: id}})
    }
  }
}
</script>

<style lang="scss" scoped>
 ul{
    width: 100vw;
    padding-left: 4.26vw;
    background: #f7f7f7;
    border-top:1px solid #e1e1e1; 
    box-sizing: border-box;
    li {
      border-bottom: 1px solid #e1e1e1;
      width: 100%;
      line-height: 10.81vw;
      color: #363636;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 4vw;
      box-sizing: border-box;
      img {
        width: 1.6vw;
        height: 2.6vw;
      }
    }
  }
</style>

