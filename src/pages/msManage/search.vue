<template>
  <div class="search">
    <div class="search_box">
      <Search class="searchComp"
        v-model.trim="searchVal"
        :deleteVal='deleteVal'
      />
      <button class="cancle" @click="cancleBtn">取消</button>
    </div>
    <historySearch v-show='hasHistory'/>
    <ul class="matchTxt" v-show="matchTxt">
      <li v-for="(item, index) in list" :key="index"  
        v-html='item' @click="toArticle(index)"></li>
    </ul>
    <div class="search_nothing" v-show="unMatchTxt">
      <p>很抱歉，没有找到相关内容</p>
      <div class="search_bg"></div>
    </div>
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
import Search from '../../components/msManage/search/eggSearchInp'
import historySearch from '../../components/msManage/search/eggHistorySearch'
import {fuzzyQuery, changeColor} from '../../utils/msManage'
export default {
  components: { Search, historySearch },
  data() {
    return {
      searchVal: '',
      list: [],
      hasHistory: false,
      matchTxt: true,
      unMatchTxt: false
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
      let list = ['幕思服务政策','幕思服务','政策']
      let matchList  = fuzzyQuery(list, this.searchVal)
      //传递给下个页面？？？
      this.setTitle(fuzzyQuery(list, this.searchVal))
      this.showMatchList(matchList)
      this.showErrorTips(matchList)
      this.list = changeColor(matchList, this.searchVal)
    }
  },
  methods: {
    ...mapMutations(['setTitle']),
    //点击跳转
    toArticle(index) {
      this.$router.push({
        path: '/articleDetails',
        query: {title: this.titleList}
      })
    },
    //返回首页
    cancleBtn() {
      this.$router.go(-1)
    },
    //清空输入框
    deleteVal(val) {
      this.searchVal = val
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


