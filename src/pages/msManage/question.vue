<template>
  <div class="question">
    <banner :title="title"/>
    <div class="search_box">
      <EggSearch :style="{'paddingTop':`${paddingTop}vw`}"
        :origin='origin' 
        :type='"question"' />
      <!-- <button>搜索</button> -->
    </div>
    <div>
       <EggTreeList :style="{'top':`${top}vw`}"
        :getParmas='getParmas' 
        :getStatus='getStatus' />
    </div>
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
      origin: true,
      paddingTop: '',
      top: ''
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
    this.isIPhoneX()
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
      // console.log(val)
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
    },
    isIPhoneX (){
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.paddingTop = '20'
        this.top = '36'
      }else if(phone === 'iphone') {
        this.paddingTop = '14'
        this.top = '30'
      }else {
        this.paddingTop = '14'
        this.top = '30'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  background: #fff;
  padding: 0 4.26vw;
  // padding-top: 16vw;
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  overflow: hidden;
  .search_box {
    // padding-top: 16vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 90;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    width: 100vw;
    box-sizing: border-box;
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
    top: 58vw;
    left: 0;
  }
   .questionList1 {
    position: absolute;
    top: 41vw;
    left: 0;
  }
   .questionList0 {
    position: absolute;
    top: 32vw;
    left: 0;
  }
  .list {
    // margin-top: -5vw;
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>