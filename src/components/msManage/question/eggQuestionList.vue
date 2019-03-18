<template>
  <ul>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="load" :auto-fill="false"> 
    <li v-for="(item, index) in list" :key="index" @click.prevent="toQuestionDetails(index)">
      <span>{{item.title}}</span>
      <img src="../../../assets/imgs/rightside.png" alt="">
    </li>
    </mt-loadmore>
  </ul>
</template>

<script>
import Vue from 'vue'
import {IndexModel} from '../../../utils/index'
import mango from '../../../js'
const indexModel = new IndexModel()
import { mapState } from 'vuex';
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      page: 1,
      limit: 10
    }
  },
  computed: {
    ...mapState({
      parmas: state => state.treeList.parmas
    })
  },
  watch: {
    parmas() {
      this.list = []
      this.getQuestionList(1,10)
    }
  },
  mounted() {
    if(this.$route.query.type === 1) {
      return
    }else {
      this.getQuestionList()
    }
  },
  methods: {
    //获取常见问题列表
    getQuestionList(page,limit) {
      let id = this.parmas.name1
      indexModel.questionList(id,page,limit).then(res => {
        if(res.data.length) {
          this.allLoaded = false
          // this.list = res.data
          this.list = this.list.concat(res.data)
        }else {
          this.allLoaded = true
          mango.tip('没有更多数据了')
        }
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
    },
    loadBottom() {
      this.$refs.load.onBottomLoaded();
      this.pullDownData()
    },
    //下拉加载数据
    pullDownData() {
      this.allLoaded = true
      this.page ++;
      this.getQuestionList(this.page, this.limit);
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

