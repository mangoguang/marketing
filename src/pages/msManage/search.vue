<template>
  <div class="search">
    <div class="search_box">
      <Search class="searchComp"
        v-model.trim="searchVal"
        :deleteVal='deleteVal'
      />
      <button class="cancle" @click="cancleBtn">取消</button>
    </div>
    <!-- 历史记录 -->
    <historySearch v-show='hasHistory' 
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
      <p>很抱歉，没有找到相关内容</p>
      <div class="search_bg"></div>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import Vuex, { mapMutations, mapState } from 'vuex'
import Search from '../../components/msManage/search/eggSearchInp'
import historySearch from '../../components/msManage/search/eggHistorySearch'
import {fuzzyQuery, changeColor, setLocalStorage, getLocalStorage, skipNewPage} from '../../utils/msManage'
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
      ajaxData: {},
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
      //传递给标题下个页面
      if(this.key) {
        this.key = false
        setTimeout(() => {
          if(this.searchVal !== '') {
            this.getSearchVal(this.searchVal)
          }else {
            this.unMatchTxt = false
            this.matchTxt = false
          }
          this.key = true
        }, 200);
        //出现历史搜索
        this.emptySearchVal(this.searchType)
      }
    }
  },
  created() {
    this.searchType = this.$route.query.type
    this.compareTime(this.searchType)
    this.showHistory()
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  methods: {
    //文章搜索接口
    getSearchVal(keyword) {
      if(this.searchType == 'question') {
        this.QuestionSearch(keyword)
      }else {
        this.articleSearch(keyword)
      }
   },
   //文章搜索
   articleSearch(keyword) {
     let account = this.ajaxData.account
     indexModel.getArticleSearch(keyword, account).then(res => {
        //关键字高亮
        let list = res.data
        //1.========可以不需要fuzzyQuery=====
        // let matchList  = fuzzyQuery(list, this.searchVal)
        this.setTitle(list)
        this.showMatchList(list)
        this.showErrorTips(list)
        this.list = changeColor(list, this.searchVal)
      }).catch(err => {
        console.log(err)
      })
   },
   //问题搜索
   QuestionSearch(keyword) {
     let account = this.ajaxData.account
     indexModel.getQuestionSearch(keyword, account).then(res => {
        let list = res.data
        // let matchList  = fuzzyQuery(list, this.searchVal)
        this.setTitle(list)
        this.showMatchList(list)
        this.showErrorTips(list)
        //关键字高亮
        this.list = changeColor(list, this.searchVal)
      }).catch(err => {
        console.log(err)
      })
   },
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
    ...mapMutations(['setTitle']),
    //获取缓存，历史搜索显示
    showHistory() {
      if(this.searchType == 'question') {
        this.judgeHistory('question')
      }else if(this.searchType == 'msIndex') {
        this.judgeHistory('msIndex')
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
          if(this.searchType == 'msIndex') {
            skipNewPage(this.$router, '/articleDetails', {'articleId': id, type: 'article'})
          }else {
            skipNewPage(this.$router, '/questionDetail', {'id': id, type: 'question'})
          }
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
  .search_box {
    display: flex;
    justify-content: space-between;
    .searchComp {
      width: 75.47vw;
    }
    .cancle {
      width: 16vw;
      font-size: 4.26vw;
      color: #007aff;
    }
  }
  .search_nothing {
    border-top: 1px solid #ccc;
    position: relative;
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
      top: 40.06vw;
      left: 0;
    }
    .search_bg {
      background: url(../../assets/imgs/search_nothing.png) no-repeat center;
      width: 100%;
      height: 129.6vw;
      background-size: 100% 100%;
      margin-top: 16vw;
    }
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


