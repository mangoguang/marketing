<template>
  <ul ref="questionScroll">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="load" :auto-fill="false"> 
    <li v-for="(item, index) in artList" :key="index" @click.prevent="toQuestionDetails(index)">
      <span>{{item.title}}</span>
      <img src="../../../assets/imgs/rightside.png" alt="">
    </li>
    </mt-loadmore>
  </ul>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Vue from 'vue'
import {IndexModel} from '../../../utils/index'
import mango from '../../../js'
const indexModel = new IndexModel()
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      page: 1,
      limit: 20,
      key: false
    }
  },
  computed: {
    ...mapState({
      parmas: state => state.treeList.parmas,
      listScroll: state => state.loadmore.listScroll,
      msManageList: state => state.loadmore.msManageList,
      artList: state => state.loadmore.artList,
      listAllScroll: state => state.loadmore.listAllScroll
    })
  },
  watch: {
    parmas() {
      if(this.key) {
        let temp = this.hasList(this.parmas.name1)
        if(temp === this.msManageList.length) {
          this.getInitList([])
          this.getQuestionList(1, 20)
        }else {
          this.getList(this.parmas.name1)
          this.allLoaded = false
          this.$nextTick(() => {
            this.listenScrollTop()
          })
        }
      }else {
        this.initGetData()
        this.key = true
      }
    }
  },
  mounted() {
    if(this.$route.query.type === 1) {
      this.initData()
      return
    }else {
      this.key = true
      this.listenScrollTop()
    }
  },
  methods: {
    ...mapMutations([
      'setListScroll',
      'getList',
      'setMsManageList',
      'getInitList',
      'getScroll',
      'setListAllScroll'
    ]),
    //获取滚动条高度
    recordScrollPosition(e) {
      let obj = {
        id: this.parmas.name1,
        scroll: e.target.scrollTop
      }
      this.setListAllScroll(obj)
    },
    //监听滚动条高度
    listenScrollTop() {
      this.$refs.questionScroll.addEventListener('scroll',this.recordScrollPosition,false);
      this.getScroll(this.parmas.name1)
      console.log('scrpll',this.listScroll)
      this.$nextTick(() => {
        this.$refs.questionScroll.scrollTop = this.listScroll; 
      })
    },
    //初始化数据
    initData() {
      this.setListScroll(0);
      this.$refs.questionScroll.scrollTop = this.listScroll
    },
    //初始请求
    initGetData() {
      let id = this.parmas.name1
      indexModel.questionList(id,1,20).then(res => {
        this.saveList(res.data)
        this.getInitList(res.data)
        this.listenScrollTop()
        if(res.data && res.data.length < 20) {
          this.allLoaded = true
        }
      })
    },
    //获取常见问题列表
    getQuestionList(page,limit) {
      let id = this.parmas.name1
      indexModel.questionList(id,page,limit).then(res => {
        if(res.data) {
          if(res.data.length) {
            this.allLoaded = false
            this.list = this.artList.concat(res.data)
            this.saveList(this.list)
            this.getList(this.parmas.name1)
            this.listenScrollTop()
          }else {
            this.saveList()
            this.getList(this.parmas.name1)
            this.allLoaded = true
          }
        }
      })
    },
    //跳转到问题详情
    toQuestionDetails(index) {
      let id = this.artList[index].id
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
      let len = (this.artList.length)/20 + 1
      if(Math.floor(len) < len) {
        this.allLoaded = true
      }else {
        this.page = len
        this.getQuestionList(this.page, this.limit);
      }
    },
      //判断vuex是否已存储list
    hasList(id) {
      let len = 0
      this.msManageList.forEach(item => {
        if(item[0].id == id) {
          len -= 1 
        }else {
          len += 1
        }
      });
      return len
    },
     //数据存到vuex
    saveList(list) {
      let data = [
        {id: this.parmas.name1},
        {list: list}
      ]
      this.setMsManageList(data)
    }
  }
}
</script>

<style lang="scss" scoped>
 ul{
  padding-left: 4.26vw;
  background: #f7f7f7;
  border-top:1px solid #e1e1e1; 
  border-bottom:1px solid #e1e1e1; 
  width: 100vw;
  height: 100vh;
  overflow: scroll; 
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 40vw;
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

