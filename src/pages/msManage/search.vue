<template>
  <div class="search" :style='{paddingTop:padding,marginTop:marginTop}'>
    <div class="search_box">
      <Search class="searchComp" id="debounce"
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
      key: false,
      account: '',
      padding:'',
      marginTop:''
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
      //输入框为空的时候
      if(this.searchVal === '') {
        this.unMatchTxt = false
        this.matchTxt = false
      }
      //点击历史搜索关键字的时候搜索
      if(this.key) {
        this.getSearchVal(this.searchVal)
        this.key = false
      } 
      //出现历史搜索
        this.emptySearchVal(this.searchType)
    }
  },
  created() {
    this.searchType = this.$route.query.type
    this.compareTime(this.searchType)
    this.showHistory()
    this.account = this._localAjax().account
    this.isIPhoneX()
  },
  mounted() {
    this.monitorInpub()
  },
  methods: {
    //监听输入框变化
    monitorInpub() {
      let inputb = document.getElementById('debounce')
      let ajaxRequest = this.getRequest()
      let debounceAjax = this.debounce(ajaxRequest, 200)
      inputb.addEventListener('keyup', function (e) {
        if(e.target.value !== '') {
          debounceAjax(e.target.value)
        }
      })
    },
    getRequest() {
       if(this.searchType == 'question') {
         return  this.QuestionSearch
       }else {
         return  this.articleSearch
       }
    },
    //防抖函数
    debounce(fun, delay) {
      return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
          fun.call(that, _args)
        }, delay)
      }
    },
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
     let classify = this.$route.query.classify
     indexModel.getArticleSearch(keyword, this.account, classify).then(res => {
       if(res.data) {
          //关键字高亮
        let list = res.data.splice(0,200) //截取前200条
        // let matchList  = fuzzyQuery(list, this.searchVal)
        this.setTitle(list)
        this.showMatchList(list)
        this.showErrorTips(list)
        this.list = changeColor(list, this.searchVal)
       }
      }).catch(err => {
        console.log(err)
      })
   },
   //问题搜索
   QuestionSearch(keyword) {
     indexModel.getQuestionSearch(keyword, this.account).then(res => {
       if(res.data) {
        let list = res.data
        // let matchList  = fuzzyQuery(list, this.searchVal)
        this.setTitle(list)
        this.showMatchList(list)
        this.showErrorTips(list)
        //关键字高亮
        this.list = changeColor(list, this.searchVal)
       }
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
      }else if(this.searchType == 'msIndex' + this.$route.query.classify) {
        this.judgeHistory(this.searchType)
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
      let id = this.list[index].id
      if(id) {
        this.historyTxt = this.searchVal
        setTimeout(() => {
          if(this.searchType == 'msIndex' + this.$route.query.classify) {
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
      this.key = true
    }, 
    //清空输入框
    deleteVal(val) {
      this.unMatchTxt = false
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
    },
     //判断是否iphoneX
    isIPhoneX() {
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.padding = "5.86vw";
        this.marginTop ='-5.86vw'
      }else {
        this.padding = "";
        this.marginTop =''
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.search {
  background: #fff;
  width:100vw;
  overflow-x:hidden;
  .search_box {
    display: flex;
    justify-content: space-between;
    .searchComp {
      width: 75.47vw;
    }
    .cancle {
      width: 20vw;
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
    max-height: 100vh;
    overflow: scroll;
    li {
      border-bottom: 1px solid #e1e1e1;
    }
  }
  a {
    color: #666
  }
}
</style>


