<template>
  <div class="search" :style="marginTop">
    <div class="search_box" :style='paddingTop'>
      <button class="cancle" @click="cancleBtn"></button>
      <Search class="searchComp" 
        v-model.trim="searchVal"
        :deleteVal='deleteVal'
        @keypress.native="search"
      />
    </div>
    <div class="matchTxt" v-show="matchTxt">
      <!-- <div class="nav_function">
        <sort-list  class="sortList" :changeStatus='changeStatus' :reset='reset'/>
        <div class="changeStyle" @click="changStyle">
          <img src="../../assets/imgs/waterfall.png" alt="瀑布流" v-if="type">
          <img src="../../assets/imgs/listStyle.png" alt="列表" v-else>
        </div>
        <m-filter @click.native="changeSortListStatus" :time='time'/>
      </div> -->
      <div class="productList" ref="searchLoadMore">
        <!-- 列表 -->
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="searchLoad" :auto-fill="false"> 
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
        </mt-loadmore>
      </div>
  </div>
    <!-- 没有匹配到相关内容 -->
    <div class="search_nothing" v-show="!unMatchTxt">
      <p>未找到相关产品</p>
    </div>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import Vue from 'vue'
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import { mapMutations, mapState } from 'vuex'
import {fliterItem} from '../../utils/gallery'
import mango from '../../js'
import Search from '../../components/msManage/search/eggSearchInp'
import SortList from '../../components/Gallery/productList/sortList';
import MFilter from '../../components/Gallery/productList/filter';
import MList from '../../components/Gallery/productList/listStyle';
import WList from '../../components/Gallery/productList/waterfallList';
export default {
  components: { Search, SortList, MFilter, MList, WList },
  data() {
    return {
      marginTop: '',
      paddingTop: '',
      searchVal: '',
      matchTxt: false,
      unMatchTxt: true,
      type: true,
      changeStatus: false,
      key: true,
      list: [],
      searchTurn: true,
      obj:{
        brand: '',
        key: '',
        st: 0,
        rp: '',
        account: '',
        category: '',
        page: 1,
        limit: 10
      },
      time: 0,
      allLoaded: false
    }
  },
  //判断是初始还是后退
  beforeRouteEnter (to, from, next) {
    if(from.path === '/gallery' || from.path === '/productList') {
      next(vm => {
        vm.$set(vm.obj, 'account', vm._localAjax().account)
        vm.setSearchParmas(vm.obj)
      })
    }else {
      next(vm => {
        let limit = (vm.searchParmas.page)* 10
        vm.setParmas('page', 1)
        vm.setParmas('limit', limit)
        vm.searchVal = vm.searchParmas.key
        vm.searchKey(vm.searchParmas)
        vm.listenScrollTop()
      })
    }
  },
  watch: {
    searchVal() {
      if(this.searchVal === '') {
        this.matchTxt = false
        this.unMatchTxt = true
      }
    }
    // downListVal() {
    //   if(this.matchTxt && this.searchTurn) {
    //     let st = fliterItem(this.downListVal)
    //     this.setParmas('st', st)
    //   }
    // },
    // filterVal() {
    //   if(this.matchTxt && this.searchTurn) {
    //     this.setParmas('brand', this.filterVal[0])
    //   }
    // },
    // price() {
    //   if(this.matchTxt && this.searchTurn) {
    //     let rp = this.getPrice()
    //     this.setParmas('rp', rp)
    //   }
    // }
  },
  computed: {
    ...mapState({
      downListVal: state => state.productNavList.downListVal,
      filterVal: state => state.productNavList.filterVal,
      price: state => state.productNavList.price,
      searchParmas: state => state.searchParmas.searchParmas,
      initParmas: state => state.searchParmas.initParmas,
      searchScroll: state => state.searchScroll.searchScroll
    })
  },
  created() {
    this.isIPhoneX()
  },
  methods: {
    ...mapMutations([
      'setSearchParmas', 
      'setDownList', 
      'setDownListVal',
      'resetFilterList',
      'setSearchScroll'
    ]),
     //获取滚动条高度
    recordScrollPosition(e) {
      this.setSearchScroll(e.target.scrollTop)
    },
    //监听滚动条高度
    listenScrollTop() {
      this.$refs.searchLoadMore.addEventListener('scroll',this.recordScrollPosition,true);
      this.$nextTick(() => {
        this.$refs.searchLoadMore.scrollTop = this.searchScroll; 
      })
    },
    //键盘搜索事件
    search(event) {
      if (event.keyCode == 13 && this.searchVal) { //如果按的是enter键 13是enter 
        this.time += 1
        this.list = []
        this.setSearchScroll(0)
        this.initSearch(event.target.value)
      }
    },
    //每次重新搜索都初始化参数
    initSearch(val) {
      this.searchTurn = false
      this.$set(this.obj, 'brand', '')
      this.$set(this.obj, 'st', '')
      this.$set(this.obj, 'rp', '')
      this.$set(this.obj, 'category', '')
      this.$set(this.obj, 'page', 1)
      this.$set(this.obj, 'limit', 10)
      this.$set(this.obj, 'key', val)
      this.setDownList(this.$store.state.productNavList.list)
      this.setDownListVal()
      this.setSearchParmas(this.obj)
      this.searchKey(this.searchParmas)
    },
    //设置参数
    setParmas(key, value) {
      this.obj = this.searchParmas
      this.$set(this.obj, key, value)
      this.setSearchParmas(this.obj)
      // this.searchKey(this.obj)
    },
    //搜索请求
    searchKey(obj) {
      indexModel.fliterList(obj).then(res => {
        if(res.status == 1 && res.data.list.length) {
          this.list = this.list.concat(res.data.list)
          this.matchTxt = true
          this.unMatchTxt = true
          this.allLoaded = false
          this.listenScrollTop()
        }else {
          this.matchTxt = false
          this.unMatchTxt = false
          this.list = []
        }
        this.searchTurn = true
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
    },
    //下拉刷新
    loadBottom() {
      this.$refs.searchLoad.onBottomLoaded();
      this.pullDownData()
    },
     //下拉加载数据
    pullDownData() {
      this.allLoaded = true
      let len = (this.list.length)/10 + 1
      if(Math.floor(len) < len) {
        this.allLoaded = true
      }else {
        this.setParmas('page', len)
        this.setParmas('limit', 10)
        this.searchKey(this.obj)
      }
    },
     //判断是否iphoneX
    isIPhoneX() {
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.marginTop = {marginTop: '-5.86vw'};
        this.paddingTop = {paddingTop: '5vw'}
      }else if(phone === 'iphone') {
        this.marginTop = "";
      }else {
        this.marginTop = "";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: 100vh;
  width:100vw;
  // background: #f7f7f7;
  box-sizing: border-box;
  overflow: hidden;
  .search_box {
    // padding: 3vw 4vw;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .searchComp {
      width: 78.66vw;
      // margin-left: 2vw;
      box-sizing: border-box;
    }
    .cancle {
      background: url(../../assets/imgs/back.png) no-repeat center;
      background-size: contain;
      width: 2.66vw;
      height: 4.8vw;
      padding-right: 10vw;
      box-sizing: border-box;
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
    // margin-top: 4vw;
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
    padding-bottom: 30vw; ///有头部30vw
    box-sizing: border-box;
    margin-top: 2vw;
    -webkit-overflow-scrolling: touch
  }
}
</style>



