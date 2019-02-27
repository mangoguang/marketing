<template>
  <div class="question">
    <banner :title="title"/>
    <div class="search_box">
      <EggSearch class="search"
        v-model.trim="searchVal"
        :deleteVal='deleteVal'/>
      <button @click="searchBtn">搜索</button>
    </div>
    <EggTreeList :list='list' :getParmas='getParmas' :getStatus='getStatus'/>
    <ul :class="questionList">
      <li v-for="i in 5">
        1
      </li>
    </ul>
  </div>
</template>

<script>
import banner from '../../components/banner'
import EggSearch from '../../components/msManage/search/eggSearchInp'
import EggTreeList from '../../components/msManage/service/eggTreeListComp'
export default {
  components: { banner, EggSearch, EggTreeList },
  data() {
    return {
      title: '',
      searchVal: '',
      questionList: 'questionList',
      list: [
        {
          name: '分类一',  //  分类名称
          questionCategoryId: 'salesBefore' //  问题分类id
        },
        {
          name: '分类二',  //  分类名称
          questionCategoryId: 'salesBefore'  //  问题分类id
        },
        {
          name: '分类三',  //  分类名称
          questionCategoryId: 'salesBefore'  //  问题分类id
        },
        {
          name: '分类四',  //  分类名称
          questionCategoryId: 'salesBefore' //  问题分类id
        },
        {
          name: '分类五',  //  分类名称
          questionCategoryId: 'salesBefore'  //  问题分类id
        },
        {
          name: '分类六',  //  分类名称
          questionCategoryId: 'salesBefore'  //  问题分类id
        }
      ]
    }
  },
  watch: {
    searchVal() {

    }
  },
  created() {
    this.initTitle()
    // this.getList()
    this.initTop()
  },
  methods: {
    //初始化标题
    initTitle() {
      this.title = this.$route.query.name
    },
    //获取分类列表
    getList() {
      let id = this.$route.query.category1id
      //axios
    },
    //清空输入框
    deleteVal(val) {
      this.searchVal = val
    },
    //点击搜索
    searchBtn() {
      console.log(this.searchVal)
    },
    //获取分类列表的值
    getParmas(val) {
      console.log(val)
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
    .search {
      width: 74.13vw;
    }
    button {
      font-size: 3.466vw;
      color: #fff;
      border: 1px solid #006de4;
      width: 13.33vw;
      border-radius: 4vw;
      height: 8vw;
      background: #007aff;
    }
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
  ul{
    width: 100vw;
    padding-left: 4.26vw;
    li {
      border-bottom: 1px solid #e1e1e1;
      width: 100%;
      line-height: 10.81vw;
      color: #363636;
    }
  }
}
</style>