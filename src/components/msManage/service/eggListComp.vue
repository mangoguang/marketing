<template>
  <div class="listComp"  ref='myScroll'>
    <ul>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="load" :auto-fill="false"> 
      <li v-for="(item, index) in artList" :key="index" @click.prevent="toArticle(index)" >
        <div class="list_left">
          <h1>{{item.title}}</h1>
          <div class="list_bottom">
            <span v-if="item.top" class="top">置顶</span>
            <span class="time">{{item.createTime}}</span>
          </div>
        </div>
        <div class="list_right">
          <img :src="baseUrl + item.image" alt="" class="img">
        </div>
      </li>
    </mt-loadmore>
    </ul>
    <div class="search_nothing" v-show="noData">
      <p>很抱歉，没有找到相关内容</p>
      <div class="search_bg"></div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {IndexModel} from '../../../utils/index'
import mango from '../../../js'
const indexModel = new IndexModel()
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import Vue from 'vue'
export default {
  props: ['id'],
  data() {
    return {
      allLoaded:false,
      list: [],
      page: 1,
      limit: 5,
      typeId: '',
      key: false,
      noData: false,
      account: ''
    }
  },
  computed: {
    ...mapState({
      parmas: state => state.treeList.parmas,
      listScroll: state => state.loadmore.listScroll,
      msManageList: state => state.loadmore.msManageList,
      artList: state => state.loadmore.artList,
      listAllScroll: state => state.loadmore.listAllScroll,
      baseUrl: state => state.treeList.baseUrl
    })
  },
  watch: {
    parmas() {
      this.hasData()
      if(this.key) {
        let temp = 0
        let parmas = this.getId()
        // if(this.parmas.name1 && !this.parmas.name2) {
        //   temp = this.hasList(this.parmas.name1)
        // }else if(this.parmas.name1 && this.parmas.name2){
        //   temp = this.hasList(this.parmas.name2)
        // }
         temp = this.hasList(parmas)
        if(temp === this.msManageList.length) {
          this.getInitList([])
          let obj = this.getCategoriesId(1, 10)
          obj = this.setType(obj)
          this.getArticlesList(obj)
        }else {
          this.getList(parmas)
          this.allLoaded = false
        }
        this.listenScrollTop()
      }else {
        this.initGetData()
        this.key = true
      }
    }
  },
  created() {
    this.account = this._localAjax().account
  },
  mounted() {
    if(this.$route.query.type === 1) {
      this.initData()
      return
    }else {
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
      'setListAllScroll',
      'initSrcoll',
      'setBaseUrl'
    ]),
    //获取滚动条高度
    recordScrollPosition(e) {
      let id = this.getId()
      if(e.target.scrollTop === 0) {
        return
      }
      let obj = {
        id: id,
        scroll: e.target.scrollTop
      }
      this.setListAllScroll(obj)
    },
    //监听滚动条高度
    listenScrollTop() {
      let id = this.getId()
      this.$refs.myScroll.addEventListener('scroll',this.recordScrollPosition,false);
      this.getScroll(id)
      // console.log('scrpll',this.listScroll)
      this.$nextTick(() => {
        this.$refs.myScroll.scrollTop = this.listScroll; 
      })
    },
    //判断二级分类有没有数据
    hasData() {
      let id = this.getId()
      let list
      this.msManageList.forEach(item => {
        if(item[0].id === id) {
          list = item[1].list
        }
      })
      if(list && list.length) {
        this.noData = false
      }else {
        this.noData = true
      }
    },
    //初始化数据
    initData() {
      this.setListScroll(0);
      this.$refs.myScroll.scrollTop = this.listScroll
      this.initSrcoll([])
    },
    //区分金管家服务和学院
    setType(obj) {
      this.typeId = this.$route.query.id
      if(this.typeId) {
        if(this.typeId === '1') {
          this.$set(obj, 'classify', 1)
        }else if(this.typeId === '2') {
          this.$set(obj, 'classify', 2)
        }
        return obj
      }
    },
    //初始请求
    initGetData() {
      let obj = this.getCategoriesId(1, 10)
      obj = this.setType(obj)
      indexModel.getArticles(obj).then(res => {
        this.setBaseUrl(res.baseUrl)
        this.saveList(res.data)
        this.getInitList(res.data)
        this.listenScrollTop()
        if(res.data && res.data.length < 10) {
          this.allLoaded = true
        }
        this.hasData()
      })
    },
    //获取文章列表
    getArticlesList(obj) {
      let parmas = this.getId()
      indexModel.getArticles(obj).then(res => {
        if(res.data) {
          if(res.data.length) {
            this.setBaseUrl(res.baseUrl)
            this.allLoaded = false
            this.list = this.artList.concat(res.data)
            this.saveList(this.list)
            this.getList(parmas)
            this.listenScrollTop()
          }else {
            // this.saveList()
            this.getList(parmas)
            this.allLoaded = true
          }
        }
      })
    },
    //获取一二三级id参数
    getCategoriesId(page, limit){
      const categoryId = this.$route.query.id
      let obj = {}
      if(this.parmas.name1 && !this.parmas.name2) {
        let subCateId = this.parmas.name1
        obj = {
          'categoryId': categoryId,
          'subCateId': subCateId,
          'account': this.account,
          'page': page,
          'limit':limit
          }
      }else if(this.parmas.name1 && this.parmas.name2) {
        let subCateId = this.parmas.name1
        let subCate2Id = this.parmas.name2
        obj = {
          'categoryId': categoryId,
          'subCateId': subCateId,
          'subCate2Id': subCate2Id,
          'account':this.account,
          'page': page,
          'limit':limit
          }
      }else {
        obj = {
          'categoryId': categoryId,
          'account':this.account,
          'page': page,
          'limit':limit
        }
      }
      return obj
    },
    //获取id
    getId() {
      if(this.parmas.name2) {
        return this.parmas.name2
      }else{
        return this.parmas.name1
      }
    },
    //数据存到vuex
    saveList(list) {
      let id = this.getId()
      let data = [
        {id: id},
        {list: list}
      ]
      this.setMsManageList(data)
      this.hasData()
    },
    //判断vuex是否已存储list
    hasList(id) {
      let temp1 = 0
      this.msManageList.forEach(item => {
        if(item[0].id == id) {
          temp1 -= 1 
        }else {
          temp1 += 1
        }
      });
      return temp1
    },
    //跳转到文章详情	
    toArticle(index) {
      this.$router.push({
        path: '/articleDetails',
        query: {
          articleId: this.artList[index].id,
          name: this.$route.query.name}})
    },
     //下拉刷新
    loadBottom() {
      this.$refs.load.onBottomLoaded();
      this.pullDownData()
    },
    //下拉加载数据
    pullDownData() {
      this.allLoaded = true
      let len = (this.artList.length)/10 + 1
      if(Math.floor(len) < len) {
        this.allLoaded = true
      }else {
        this.page = len
        let obj = this.getCategoriesId(this.page, this.limit)
        this.getArticlesList(obj);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.listComp {
  width: 100vw;
  height: 100vh;
  overflow: scroll; 
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 44vw;
  li {
    width: 100vw;
    height: 26.66vw;
    box-shadow:0px 2px 6px 0px rgba(136,136,136,0.2);
    padding: 4.4vw;
    box-sizing: border-box;
    margin-bottom: 2.4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list_left {
      flex: 0.8;
      height: 20.66vw;
      display: flex;
      flex-direction: column;
      align-content: space-between;
      h1 {
        color: #363636;
        font-size: 5.4vw;
        font-weight: bold;
        flex: 0.8;
        line-height: 1.5em;
      }
      .list_bottom {
        flex: 0.2;
        font-size: 3.73vw;
        .top {
          color: #ff2d55;
        }
        .time {
          color: #909090;
        }
      }
    }
    .list_right {
      flex: 0.25;
      width: 21.33vw;
      height: 21.33vw;
      border:1px solid rgba(225,225,225,1);
       .img {
        width: 21.33vw;
        height: 21.33vw;
      }
    }
  }
 .search_nothing {
    // border-top: 1px solid #ccc;
    position: relative;
    box-sizing: border-box;
    p {
      width: 100%;
      font-size: 4.8vw;
      color: #42596c;
      font-weight: bold;
      background:linear-gradient(0deg,rgba(63,186,230,1) 0%, rgba(172,208,218,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      text-align: center;
      position: absolute;
      top: 20.06vw;
      left: 0;
    }
    .search_bg {
      background: url(../../../assets/imgs/search_nothing.png) no-repeat center;
      width: 100%;
      height: 129.6vw;
      background-size: 100% 100%;
      box-sizing: border-box;
    }
  }
}
</style>

