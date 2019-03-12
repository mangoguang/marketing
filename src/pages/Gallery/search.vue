<template>
  <div class="search">
    <div class="search_box">
      <button class="cancle" @click="cancleBtn"></button>
      <Search class="searchComp"
        v-model.trim="searchVal"
        :deleteVal='deleteVal'
      />
    </div>
    <!-- 历史记录 -->
    <historySearch class="historySearch"
      v-show='hasHistory' 
      :historyTxt='historyTxt'
      :isEmpty='isEmpty'
      :clickHistoryTxt='clickHistoryTxt'
      :searchType='searchType'/>
      <!-- 匹配到相关内容 -->
    <ul class="matchTxt" v-show="matchTxt">
      <li v-for="(item, index) in list" :key="index"  
        v-html='item.title' @click="toArticle(index)"></li>
    </ul>
    <!-- 没有匹配到相关内容 -->
    <div class="search_nothing" v-show="unMatchTxt">
      <p>未找到相关产品</p>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import { mapMutations, mapState } from 'vuex'
import Search from '../../components/msManage/search/eggSearchInp'
import historySearch from '../../components/msManage/search/eggHistorySearch'
import {fuzzyQuery, changeColor, setLocalStorage, getLocalStorage, skipNewPage} from '../../utils/msManage'
import { clearTimeout } from 'timers';
export default {
  components: { Search, historySearch },
  data() {
    return {
      searchVal: '',
      list: [],
      hasHistory: false,
      matchTxt: true,
      unMatchTxt: false,
      historyTxt: '',
      searchType: '',
      ajaxData:{},
      key: true
    }
  },
  computed: {
    ...mapState({
      titleList: state => state.searchBox.titleList
    })
  },
  watch: {
    //匹配关键字且关键字高亮
    searchVal() {
      this.hasHistory = false
      //防抖函数，设置input并不实时监听请求。
      if(this.key) {
        this.key = false
        if(this.searchVal !== '') {
        // this.articleSearch(this.searchVal)
        let list = [{
          title: '幕思',id: '1'
        },{
          title: '幕思政策',id: '2'
        },{
          title: '幕思服务政策',id: '3'
        }]
        setTimeout(() => {
          this.key = true
          let matchList  = fuzzyQuery(list, this.searchVal)
          this.setTitle(matchList)
          this.showMatchList(matchList)
          this.showErrorTips(matchList)
          this.list = changeColor(matchList, this.searchVal)
        }, 200);
      }else {
        this.key = true
        this.unMatchTxt = false
        this.matchTxt = false
      }
      //出现历史搜索
      this.emptySearchVal(this.searchType)
      }
    }
  },
  created() {
    this.searchType = this.$route.query.type
    this.compareTime(this.searchType)
    this.judgeHistory(this.searchType)
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  methods: {
    ...mapMutations(['setTitle']),
   //文章搜索
  //  articleSearch(keyword) {
  //    let account = this.ajaxData.account
  //    indexModel.getArticleSearch(keyword, account).then(res => {
  //       //关键字高亮
  //       let list = res.data
  //       //1.========可以不需要fuzzyQuery=====
  //       // let matchList  = fuzzyQuery(list, this.searchVal)
  //       this.setTitle(list)
  //       this.showMatchList(list)
  //       this.showErrorTips(list)
  //       this.list = changeColor(list, this.searchVal)
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //  },
    //超出缓存5天的自动清除 （1000*60*60*24）
    compareTime(type) {
      if(getLocalStorage(type)) {
        let arrIndex = []
        let localStorageTime = getLocalStorage(type)['currentTime']
        let list = getLocalStorage(type)['list']
        let curTime = new Date().getTime()
        //判断缓存时间有没有过期
        localStorageTime.forEach((item, index) => {
          if((curTime - item)/86400000 > 5) {
            arrIndex = [...arrIndex, index]
          }
        });
        //过期的清除
        let obj = {
          list: list.slice(0, arrIndex[0]),
          currentTime: localStorageTime.slice(0, arrIndex[0])
        }
        this.judgeObj(obj, type)
      }
    },
    //判断有没有历史记录
    judgeHistory(type) {
      let historyTitle = getLocalStorage(type)
        if(historyTitle) {
          this.hasHistory = true
      }
    },
    //点击跳转
    toArticle(index) {
      // let articleId = this.titleList[index].articleId
      let id = this.list[index].id
      if(id) {
        this.historyTxt = this.searchVal
        setTimeout(() => {
          skipNewPage(this.$router, '/productDetails', {'articleId': id, type: 'gallery'})
          this.historyTxt = ''
        }, 100);
      }
    },
    //点击历史搜索内容
    clickHistoryTxt(val) {
      this.searchVal = val
    }, 
    //清空输入框
    deleteVal(val) {
      this.searchVal = val
    },
    //清空历史搜索
    isEmpty(val) {
      this.hasHistory = val
    },
    //返回首页
    cancleBtn() {
      this.$router.go(-1)
    },
    //出现匹配列表
    showMatchList(list) {
      if(list.length) {
        this.matchTxt = true
        this.unMatchTxt = false
      }else {
        this.matchTxt = false
      }
    },
    //没有匹配列表
    showErrorTips(list) {
      if(!list.length && this.searchVal.length) {
        this.unMatchTxt = true
      }else {
        this.unMatchTxt = false
      }
    },
    //输入框清空时出现历史搜索
    emptySearchVal(type) {
      if(getLocalStorage(type)) {
        let list = getLocalStorage(type)['list']
        if(!this.searchVal.length && list.length) {
          this.hasHistory = true
          this.matchTxt = false
        }
      }
    },
    //判断有没有不超过5天的缓存
    judgeObj(obj, type) {
      if(!obj.list.length) {
        window.localStorage.removeItem(type)
      }else {
        setLocalStorage(obj,type)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: 100vh;
  background: #f7f7f7;
  box-sizing: border-box;
  .search_box {
    padding: 2vw 4vw;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .searchComp {
      width: 78.66vw;
      margin-left: 2vw;
    }
    .cancle {
      background: url(../../assets/imgs/back.png) no-repeat center;
      background-size: contain;
      width: 2.66vw;
      height: 4.8vw;
      padding-right: 6vw;
    }
  }
  .search_nothing {
    p {
      color: #666;
      font-size: 3.73vw;
      border-bottom: 1px solid #e1e1e1;
      margin-left: 4vw;
      line-height: 10vw;
    }
  }
  .historySearch {
    background: #fff;
  }
  .matchTxt {
    width: 100%;
    line-height: 10.4vw;
    color: #666;
    font-size: 3.73vw;
    padding-left: 4vw;
    border-top: 1px solid #ccc;
    li {
      border-bottom: 1px solid #e1e1e1;
    }
  }
  a {
    color: #666
  }
}
</style>



