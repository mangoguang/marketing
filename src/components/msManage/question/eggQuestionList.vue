<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" @touchend="toQuestionDetails(index)">
      <span>{{item.title}}</span>
      <img src="../../../assets/imgs/rightside.png" alt="">
    </li>
  </ul>
</template>

<script>
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
import { mapState } from 'vuex';
export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapState({
      parmas: state => state.treeList.parmas
    })
  },
  watch: {
    parmas() {
      this.getQuestionList()
    }
  },
  created() {
    this.getQuestionList()
  },
  methods: {
    //获取常见问题列表
    getQuestionList() {
      let id = this.parmas.name1
      indexModel.questionList(id).then(res => {
        this.list = res.data
      })
    },
    //跳转到问题详情
    toQuestionDetails(index) {
      let id = this.list[index].id
      this.$router.push({
        path: '/questionDetail',
        query: {
          id: id
        }})
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
    border-bottom:1px solid #e1e1e1; 
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
    li:last-child {
      border: none
    }
  }
</style>

