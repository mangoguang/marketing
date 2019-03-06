<template>
  <div class="question">
    <banner :title="title"/>
    <div class="search_box">
      <EggSearch :origin='origin' :type='"question"'/>
      <!-- <button>搜索</button> -->
    </div>
    <EggTreeList :getParmas='getParmas' :getStatus='getStatus'/>
    <div :class="questionList">
      <EggQuestionList />
    </div>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import banner from '../../components/banner'
import EggSearch from '../../components/msManage/search/eggSearchInp'
import EggTreeList from '../../components/msManage/service/eggTreeListComp'
import EggQuestionList from '../../components/msManage/question/eggQuestionList'
export default {
  components: { banner, EggSearch, EggTreeList, EggQuestionList },
  data() {
    return {
      title: '',
      questionList: 'questionList',
      origin: true
    }
  },
  computed: {
    ...mapState({
      list: state => state.treeList.list
    })
  },
  created() {
    this.initTitle()
    this.initTop()
    this.initParmas()
  },
  methods: {
    ...mapMutations(['setParmas']),
    //初始化标题
    initTitle() {
      this.title = this.$route.query.name
    },
    //初始化active状态
    initParmas() {
      if(this.$route.query.type === 1) {    //type从acticle传回来变成字符串1
        this.setParmas({})
      }
    },
    //获取分类列表的值
    getParmas(val) {
      console.log(val)
      this.setParmas(val)
    },
    //判断有没有二级参数，设置问题列表高度
    getStatus(val) {
      if(!val) {
        this.questionList = 'questionList1'
      }else {
        this.questionList = 'questionList'
      }
    },
     //初始化列表的高度	    写在请求后
    initTop() {
      if(this.list.length) {
        if(this.list[0].child) {
          this.questionList = 'questionList'
        }else if(!this.list[0].child) {
          this.questionList = 'questionList1'
        }
      }else {
        this.questionList = 'questionList0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  background: #fff;
  padding: 0 4.26vw;
  padding-top: 16vw;
  box-sizing: border-box;
  position: relative;
  .search_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // button {
    //   font-size: 3.466vw;
    //   color: #fff;
    //   border: 1px solid #006de4;
    //   width: 13.33vw;
    //   border-radius: 4vw;
    //   height: 8vw;
    //   background: #007aff;
    // }
  }
  .questionList {
    position: absolute;
    top: 54vw;
    left: 0;
  }
   .questionList1 {
    position: absolute;
    top: 40vw;
    left: 0;
  }
   .questionList0 {
    position: absolute;
    top: 28vw;
    left: 0;
  }
}
</style>