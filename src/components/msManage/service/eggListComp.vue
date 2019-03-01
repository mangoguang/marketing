<template>
  <div class="listComp">
    <ul>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> 
      <li v-for="(item, index) in list" :key="index" @click="toArticle(index)">
        <div class="list_left">
          <h1>{{item.title}}</h1>
          <div class="list_bottom">
            <span v-if="item.top" class="top">置顶</span>
            <span class="time">{{item.time}}</span>
          </div>
        </div>
        <div class="list_right">
          <!-- <img :src="itemUrl" alt=""> -->
        </div>
      </li>
    </mt-loadmore>
    </ul>
  </div>
</template>

<script>
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
import {mapState} from 'vuex'
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import Vue from 'vue'
export default {
  props: ['id'],
  data() {
    return {
      allLoaded:false,
      list: []
    }
  },
  computed: {
    ...mapState({
      parmas: state => state.treeList.parmas
    })
  },
  watch: {
    //二级才会触发
    parmas() {
      let obj = this.getCategoriesId()
      // this.getArticlesList(obj)
    }
  },
  mounted() {
    let obj = this.getCategoriesId()
    console.log(22222,obj)
    //obj传给getArticlesList
    // this.getArticlesList(obj)
    this.getArticlesList()
  },
  methods: {
    //获取文章列表
    getArticlesList() {
      indexModel.getArticles().then(res => {
        this.list = res.data
      })
    },
    //获取一二三级id参数
    getCategoriesId(){
      const scategory1Id = this.$route.query.category1id
      let obj = {}
      if(this.parmas.name1 && !this.parmas.name2) {
        let category2Id = this.parmas.name1
        obj = {
          'scategory1Id': scategory1Id,
          'category2Id': category2Id}
      }else if(this.parmas.name1 && this.parmas.name2) {
        let category2Id = this.parmas.name1
        let category3Id = this.parmas.name2
        obj = {
          'scategory1Id': scategory1Id,
          'category2Id': category2Id,
          'category3Id': category3Id}
      }else {
        obj = {'scategory1Id': scategory1Id}
      }
      return obj
    },
    //跳转到文章详情	
    toArticle(index) {
      this.$router.push({
        path: '/articleDetails',
        query: {
          articleId: this.list[index].articleId,
          name: this.$route.query.name}})
    },
     //下拉刷新
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      this.pullDownData()
    },
    //下拉加载数据
    pullDownData(startTime, endTime) {
      // if (this.page < this.allPage) {
      //   this.allLoaded = true
      //   this.page ++;
      //   this.getData(this.page, this.limit, startTime, endTime);
      // }else {
      //   mango.tip('没有更多数据了')
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.listComp {
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
        background:linear-gradient(30deg,rgba(60,182,238,1) 0%,rgba(125,226,255,1) 100%);
    }
  }
  
}
</style>

