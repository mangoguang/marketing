<template>
  <div class="search">
    <div class="search_box">
      <button class="cancle" @click="cancleBtn"></button>
      <Search class="searchComp" 
        v-model.trim="searchVal"
        :deleteVal='deleteVal'
        @keypress.native="search"
      />
    </div>
    <div class="matchTxt" v-show="matchTxt">
      <div class="nav_function">
        <sort-list  class="sortList" :changeStatus='changeStatus' :reset='reset'/>
        <div class="changeStyle" @click="changStyle">
          <img src="../../assets/imgs/waterfall.png" alt="瀑布流" v-if="type">
          <img src="../../assets/imgs/listStyle.png" alt="列表" v-else>
        </div>
        <m-filter @click.native="changeSortListStatus"/>
      </div>
      <div class="productList">
        <!-- 列表 -->
        <div class="m-list" v-show="!type">
          <div v-for="(item, index) in list" :key='index'> 
            <router-link :to='{name:"productDetails",query: {id: item.id}}'>
              <m-list :list='item'/>
            </router-link>
          </div>
        </div>
        <!-- 瀑布流 -->
        <div class="list" v-show="type">
          <div class="item" v-for="(item, index) in list" :key='index'>
            <router-link :to='{name:"productDetails",query: {id: item.id}}'>
              <w-list :list='item'/>
            </router-link>
          </div>  
        </div>
      </div>
  </div>
    <!-- 没有匹配到相关内容 -->
    <div class="search_nothing" v-show="!unMatchTxt">
      <p>未找到相关产品</p>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import { mapMutations, mapState } from 'vuex'
import {fliterItem} from '../../utils/gallery'
import Search from '../../components/msManage/search/eggSearchInp'
import SortList from '../../components/Gallery/productList/sortList';
import MFilter from '../../components/Gallery/productList/filter';
import MList from '../../components/Gallery/productList/listStyle';
import WList from '../../components/Gallery/productList/waterfallList';
export default {
  components: { Search, SortList, MFilter, MList, WList },
  data() {
    return {
      searchVal: '',
      matchTxt: false,
      unMatchTxt: true,
      type: true,
      changeStatus: false,
      key: true,
      list: [],
      ajaxData: {}
    }
  },
  watch: {
    searchVal() {
      if(this.searchVal === '') {
        this.matchTxt = false
        this.unMatchTxt = true
      }
    },
    downListVal() {
      if(this.matchTxt) {
        let st = fliterItem(this.downListVal)
        let obj = {
          key: this.searchVal,
          account: this.ajaxData.account,
          st: st
        }
        this.searchKey(obj)
      }
    },
    filterVal() {
      if(this.matchTxt) {
        let obj = {
          account: this.ajaxData.account,
          brand: this.filterVal[0],
          key: this.searchVal,
          rp: this.getPrice()
        }
        this.searchKey(obj)
      }
    },
    price() {
      if(this.matchTxt) {
        let rp = this.getPrice()
        let obj = {
          rp: rp,
          account: this.ajaxData.account,
          key: this.searchVal,
          brand: this.filterVal[0]
        }
        this.searchKey(obj)
      }
    }
  },
  computed: {
    ...mapState({
      downListVal: state => state.productNavList.downListVal,
      filterVal: state => state.productNavList.filterVal,
      price: state => state.productNavList.price
    })
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  methods: {
    ...mapMutations(['resetFilterList']),
    //键盘搜索事件
    search(event) {
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        let obj = {
          key: this.searchVal,
          account: this.ajaxData.account
        }
        this.searchKey(obj)
      }
    },
    //搜索请求
    searchKey(obj) {
      indexModel.fliterList(obj).then(res => {
        if(res.status == 1 && res.data.list.length) {
          this.list = res.data.list
          this.matchTxt = true
          this.unMatchTxt = true
        }else {
          this.matchTxt = false
          this.unMatchTxt = false
          this.list = []
        }
      })
    },
    //清空输入框
    deleteVal(val) {
      this.searchVal = val
      this.list = []
    },
    //返回首页
    cancleBtn() {
      this.$router.go(-1)
    },
    //改变下啦列表的状态
    changeSortListStatus() {
      this.changeStatus = true
    },
    //下啦列表收起后再改变状态
    reset(val) {
      this.changeStatus = val
    },
    //切换展示模式
    changStyle() {
      this.changeStatus = true
      if(this.key) {
        this.key = false
        setTimeout(() => {
          this.type = !this.type
          this.key = true
        }, 200);
      }
    },
    //获取价格参数
    getPrice() {
      if(this.price.price2 === '') {
        return this.price.price1 + ''
      }else {
        return this.price.price1 + '-' + this.price.price2
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
  overflow: hidden;
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
  .nav_function {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 10.6vw;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.3);
    margin-bottom: 2vw;
    .sortList {
      flex: 0.94;
    }
    .changeStyle {
        // padding-top: 1vw;
      img {
        width: 3.46vw;
        height: 3.46vw;
      }
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
    // padding-left: 4vw;
    border-top: 1px solid #ccc;
   
  }
  a {
    color: #666
  }
  .m-list {
    margin-top: 0;
    background:linear-gradient(0deg,rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%);
  }
  .list {
    background:linear-gradient(0deg,rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%);
    margin: 3vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 0;
    //  column-count: 2;
    //   column-gap: 0;
    // .item {
    //   box-sizing: border-box;
    //   break-inside: avoid;
    //   padding: 10px;
    // }
  }
  .productList {
    height: 100vh;
    overflow: scroll;
    padding-bottom: 30vw;
    box-sizing: border-box;
  }
}
</style>



