<template>
  <div class="listComp"  ref='myScroll'>
    <ul>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="load" :auto-fill="false"> 
      <li v-for="(item, index) in msManageList" :key="index" @click.prevent="toArticle(index)" >
        <div class="list_left">
          <h1>{{item.title}}</h1>
          <div class="list_bottom">
            <span v-if="item.top" class="top">置顶</span>
            <span class="time">{{item.createTime}}</span>
          </div>
        </div>
        <div class="list_right">
          <!-- <img :src="baseUrl + item.image" alt="" class="img"> -->
        </div>
      </li>
    </mt-loadmore>
    </ul>
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
      ajaxData: {},
      baseUrl: '',
      page: 1,
      limit: 10,
      typeId: ''
    }
  },
  computed: {
    ...mapState({
      parmas: state => state.treeList.parmas,
      listScroll: state => state.loadmore.listScroll,
      msManageList: state => state.loadmore.msManageList,
      listId: state => state.loadmore.listId
    })
  },
  watch: {
    parmas() {
      this.list = []
      let obj = this.getCategoriesId(1, 10)
      obj = this.setType(obj)
      this.getArticlesList(obj)
    }
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
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
    ...mapMutations(['setListScroll','setMsManageList']),
    //获取滚动条高度
    recordScrollPosition(e) {
      this.listTop = e.target.scrollTop
      this.setListScroll(e.target.scrollTop)
      // console.log(this.listScroll)
    },
    //监听滚动条高度
    listenScrollTop() {
      this.$refs.myScroll.addEventListener('scroll',this.recordScrollPosition,false);
      this.$refs.myScroll.scrollTop = this.listScroll; 
    },
    //初始化数据
    initData() {
      this.setListScroll(0);
      this.$refs.myScroll.scrollTop = this.listScroll
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
    //获取文章列表
    getArticlesList(obj) {
      indexModel.getArticles(obj).then(res => {
        if(res.data.length) {
          this.allLoaded = false
          this.list = this.list.concat(res.data)
          this.setMsManageList(this.list)
          this.baseUrl = res.baseUrl
          this.listenScrollTop()
        }else {
          this.allLoaded = true
        }
      })
    },
    //获取一二三级id参数
    getCategoriesId(page, limit){
      const categoryId = this.$route.query.id
      const account = this.ajaxData.account
      let obj = {}
      if(this.parmas.name1 && !this.parmas.name2) {
        let subCateId = this.parmas.name1
        obj = {
          'categoryId': categoryId,
          'subCateId': subCateId,
          'account': account,
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
          'account':account,
          'page': page,
          'limit':limit
          }
      }else {
        obj = {
          'categoryId': categoryId,
          'account':account,
          'page': page,
          'limit':limit
        }
      }
      return obj
    },
    //跳转到文章详情	
    toArticle(index) {
      this.$router.push({
        path: '/articleDetails',
        query: {
          articleId: this.list[index].id,
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
      this.page ++;
      let obj = this.getCategoriesId(this.page, this.limit)
      this.getArticlesList(obj);
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
//   -webkit-backface-visibility: hidden;    
// -webkit-transform: translate3d(0,0,0);
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
      // background:linear-gradient(30deg,rgba(60,182,238,1) 0%,rgba(125,226,255,1) 100%);
       .img {
        width: 21.33vw;
        height: 21.33vw;
      }
    }
  }

}
</style>

