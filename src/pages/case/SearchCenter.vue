<template>
  <div class="search">
    <div class="search_box">
      <div class="back"
           @click="bindClearKeyword(),$router.back()"></div>
      <div class="search-box"
           v-if="params.goodsName">
        <div class="item"
             @click="bindClearKeyword">{{params.goodsName}}</div>
      </div>
      <div class="eggSearchInp"
           v-else>
        <div class="search_icon"></div>
        <input class="eggInp"
               ref="inpComp"
               type="search"
               v-model="searchVal"
               @input="bindSearch"
               @keyup.enter="bindSearchKey"
               placeholder="请输入搜索内容" />

        <button class="deleteVal"
                v-show="searchVal"
                @click="bindClear"></button>
      </div>

    </div>
    <div class="keyword"
         v-show="showKeyword">
      <div class="history"
           v-if="history.length>0">
        <div class="title">
          <h5>历史搜索</h5>
          <button @click="showToast=true">清除</button>
        </div>
        <ul>
          <li @click="bindHistory(index,item)"
              v-for="(item,index) in history"
              :key="index">{{item}}</li>
          <!-- <li class="active">助眠</li>
          <li>助眠</li> -->
        </ul>
      </div>
      <div class="hot">
        <h5>热门搜索</h5>
        <ul>
          <!-- <li class="active">助眠</li> -->
          <li @click="bindHistory(index,item)"
              v-for="(item,index) in namelist"
              :key="index">{{item}}</li>
          <!-- <li>助眠</li> -->
        </ul>
      </div>
    </div>
    <div class="search-cont"
         v-show="showSearch">
      <!-- 匹配到相关内容 -->
      <ul class="matchTxt"
          v-show="matchTxt">
        <li v-for="(item, index) in searchList"
            :key="index"
            v-html='item'
            @click="bindArticle(index,item)"></li>
      </ul>
      <!-- 没有匹配到相关内容 -->
      <ul class="matchTxt"
          v-show="!matchTxt">
        <li>未找到相关产品</li>
      </ul>
    </div>
    <div class="search-li"
         v-show="showList">
      <list listStyle="cell-box"
            v-for="(item,index) in dataList"
            @click.native="$router.push({path:'/detail',query:{id:item.id}})"
            :item="item"
            :key="index"></list>
      <ul class="matchTxt"
          v-show="dataList.length==0">
        <li>未找到相关产品</li>
      </ul>
    </div>
    <toast-comfirm class="toast"
                   title=""
                   v-if="showToast"
                   content="确定清空历史搜索？">

      <template v-slot:bottons>
        <div class="but">
          <div class="btns commit"
               @click="bindClearHistory">确定</div>
          <div class="btns"
               @click="showToast=false">取消</div>
        </div>
      </template>
    </toast-comfirm>
  </div>
</template>

<script>
import List from '@/components/case/List/Index'
import ToastComfirm from '@/components/case/ToastComfirm/Index'
import { goodCaseList, getNames, topNames } from '@/api/case'
import { mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  components: {
    List,
    ToastComfirm
  },
  data() {
    return {
      matchTxt: true,
      searchVal: '',
      list: [],
      showSearch: false,
      showList: false,
      dataList: [],
      namelist: [],
      params: {
        goodsName: '',
        orderType: 1,
        page: 1
      },
      history: JSON.parse(localStorage.getItem('keyword') || '[]'),
      historyIndex: -1,
      showKeyword: true,
      keyword: '',
      showToast: false
    }
  },
  computed: {
    searchList() {
      var arr = []
      this.list.map((item, index) => {
        arr[index] = item
        arr[index]
        let reg = new RegExp(this.searchVal, 'gi')
        arr[index] = arr[index].replace(
          reg,
          `<span style="color:#ff2d55">${this.searchVal}</span>`
        )
      })
      return arr
    }
  },
  created() {
    this._initData()
  },
  methods: {
    ...mapMutations(['setGoodCase']),
    async _initData() {
      let { namelist } = await topNames()
      if (namelist) {
        this.namelist = namelist
      } else {
        this.namelist = []
      }
    },
    bindSearch: _.debounce(async function() {
      this.showKeyword = false
      this.showSearch = true
      this.showList = false
      let { namelist } = await getNames({ keys: this.searchVal })
      if (namelist && namelist.length) {
        this.list = namelist
        //this.showList = true
        this.matchTxt = true
      } else {
        //this.showList = false
        this.matchTxt = false
      }
    }, 500),
    bindSearchKey() {
      this.showSearch = false
      this.showList = true
      this.params.goodsName = this.searchVal
      this._getLocalSearch(this.searchVal)
      this._getDataList(this.params)
    },
    bindClearKeyword() {
      this.params.goodsName = ''
      this.showKeyword = true
      this.showSearch = false
      this.showList = false
      this.searchVal = ''

      // this.historyIndex = -1
    },
    bindClearHistory() {
      this.showToast = false
      localStorage.setItem('keyword', '')
      this.history = []
    },
    bindHistory(index, item) {
      this.historyIndex = index
      this.showKeyword = false
      this.showSearch = false
      this.showList = true
      this.keyword = item
      this.params.goodsName = item
      this._getDataList(this.params)
      this._getLocalSearch(item)
    },
    _getLocalSearch(keyword) {
      let arr = JSON.parse(localStorage.getItem('keyword') || '[]')
      arr.unshift(keyword)
      arr = Array.from(new Set(arr))
      this.history = arr
      localStorage.setItem('keyword', JSON.stringify(arr))
    },
    async bindArticle(index, item) {
      let goodName = this.list[index]
      this.showSearch = false
      this.showList = true
      this._getLocalSearch(this.list[index])
      //this.setGoodCase({ goodId })
      //this.$router.back()
      this.params.goodsName = goodName
      this._getDataList(this.params)
    },
    bindClear() {
      this.showKeyword = true
      this.showList = false
      this.matchTxt = true
      this.showSearch = false
      this.searchVal = ''
      this.list = []
      this.dataList = []
    },
    async _getDataList(params) {
      let { page } = await goodCaseList(params)
      if (page.totalPage == params.page) {
        this.allLoaded = true
      }
      if (params.page == 1) {
        this.dataList = page.list
      } else {
        this.dataList = this.dataList.concat(page.list)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.keyword {
  padding: 20px 17px;
  background-color: #fff;
  .history {
    .title {
      display: flex;
      justify-content: space-between;
      button {
        color: #007aff;
        font-size: 12px;
      }
    }
  }
  h5 {
    font-size: 13px;
    color: #363636;
    padding-bottom: 11px;
  }
  ul {
    font-size: 14px;
    color: #363636;
    display: flex;
    flex-flow: wrap;
    li {
      max-width: 100px;
      height: 30px;
      line-height: 30px;
      background-color: #f8f8f8;
      padding: 0 15px;
      border-radius: 2px;
      margin-right: 10px;
      margin-bottom: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .active {
      background-color: #b2d7ff;
      color: #007aff;
    }
  }
}
.search-li {
  display: flex;
  flex-flow: wrap;
  padding: 0 10px;
  margin-top: 12px;
  width: 100%;
  .cell-box {
    margin-right: 10px;
    margin-bottom: 12px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
.search {
  background: #f7f7f7;
  width: 100vw;
  overflow-x: hidden;
  .search_box {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 20px;
    background-color: #fff;
    .search-box {
      flex: 1;
      height: 30px;
      background-color: #f7f7f7;
      border-radius: 15px;
      width: 295px;
      margin: 8px 40px;
      display: flex;
      align-items: center;
      .item {
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        border-radius: 12.5px;
        padding-left: 7px;
        padding-right: 30px;
        margin: 0 3px;
        background: #fff url(~@/assets/imgs/case/iconfont-cha@2x.png) right 7px
          center no-repeat;
        background-size: 8px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .back {
      height: 30px;
      width: 30px;
      background: url(~@/assets/imgs/back.png) left center no-repeat;
      background-size: 10px 18px;
      position: absolute;
      bottom: 8px;
      left: 16px;
    }
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
      background: linear-gradient(
        0deg,
        rgba(63, 186, 230, 1) 0%,
        rgba(172, 208, 218, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      position: absolute;
      top: 40.06vw;
      left: 0;
    }
    .search_bg {
      background: url(~@/assets/imgs/search_nothing.png) no-repeat center;
      width: 100%;
      height: 129.6vw;
      background-size: 100% 100%;
      margin-top: 16vw;
    }
  }
  .matchTxt {
    background-color: #f7f7f7;
    width: 100vw;
    line-height: 10.4vw;
    color: #666;
    font-size: 3.73vw;
    padding-left: 4vw;
    padding-right: 4vw;

    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    li {
      border-bottom: 1px solid #e1e1e1;
      font-size: 14px;
      line-height: 1.2;
      padding-top: 10px;
      padding-bottom: 10px;
      span {
        color: #ff2d55;
      }
    }
  }
  a {
    color: #666;
  }
}
.eggSearchInp {
  width: 295px;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  padding-bottom: 8px;
  padding-top: 8px;
  input {
    caret-color: #000;
  }
  .search_icon {
    background: url(~@/assets/imgs/egg_search.png) no-repeat center center;
    background-size: 100% 100%;
    width: 4.26vw;
    height: 4.26vw;
    position: absolute;
    left: 3vw;
    top: 50%;
    transform: translateY(-50%);
  }
  .eggInp {
    width: 100%;
    height: 8vw;
    // line-height: 8vw;
    background: #f7f7f7;
    border-radius: 4vw;
    font-size: 3.46vw;
    padding: 0 9.33vw;
    box-sizing: border-box;
    &::-webkit-input-placeholder {
      line-height: normal;
    }
  }
  .deleteVal {
    background: url(~@/assets/imgs/egg_delete.png) no-repeat center;
    background-size: contain;
    width: 4.26vw;
    height: 4.26vw;
    position: absolute;
    right: 2vw;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
}
</style>


