<template>
  <div class="prodectList">
    <div class="topBar">
      <button class="cancle" @click="backBtn"></button>
      <Search :origin="true" :type="'gallery'" class="search"/>
    </div>
    <p-topNav />
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
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import {mapState, mapMutations} from 'vuex'
import {fliterItem} from '../../utils/gallery'
import Search from "../../components/msManage/search/eggSearchInp";
import PTopNav from "../../components/Gallery/productList/pTopNav";
import SortList from '../../components/Gallery/productList/sortList';
import MFilter from '../../components/Gallery/productList/filter';
import MList from '../../components/Gallery/productList/listStyle';
import WList from '../../components/Gallery/productList/waterfallList';
export default {
  components: {
    Search,
    PTopNav,
    SortList,
    MFilter,
    MList,
    WList
  },
  data() {
    return{
      key: true,
      type: true,
      changeStatus: false,
      list: [],
      ajaxData: {},
      init: false,
      obj:{
        category: '',
        brand: '',
        key: '',
        st: 0,
        rp: '',
        account: ''
      }
    }
  },
  computed: {
    ...mapState({
      listVal: state => state.leftNavList.listVal,
      filterParmas: state => state.filterParmas.filterParmas,
      downListVal: state => state.productNavList.downListVal,
      filterVal: state => state.productNavList.filterVal,
      price: state => state.productNavList.price,
      productNavlistVal: state => state.productNavList.productNavlistVal
    })
  },
  watch: {
    downListVal() {
      if(this.init) {
        this.obj = this.filterParmas
        this.$set(this.obj, 'st', fliterItem(this.downListVal))
        this.changeParmas()
      }
    },
    filterVal() {
      if(this.init) {
        this.obj = this.filterParmas
        this.$set(this.obj, 'brand', this.filterVal[0])
        this.changeParmas()
      }
    },
    price() {
      if(this.init) {
        this.obj = this.filterParmas
        this.$set(this.obj, 'rp', this.getPrice())
        this.changeParmas()
      }
    },
    productNavlistVal() {
      if(this.init) {
        this.obj = this.filterParmas
        this.$set(this.obj, 'category', this.productNavlistVal)
        this.changeParmas()
      }
    }
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.$set(this.obj, 'account', this.ajaxData.account)
    this.initBrand()
    this.initGetData()
  },
  methods: {
    ...mapMutations(['setParmas', 'setDownList']),
    //初始请求数据
    initGetData() {
      if(typeof this.$route.query.index == 'number') {
        this.setDownList('')
        this.initParmas()
      }else {
        this.filterData(this.filterParmas)
      }
    },
    //请求数据
    filterData(obj) {
      indexModel.fliterList(obj).then(res => {
        if(res.data) {
          this.init = true
          this.list = res.data.list
        }
      })
    },
    //初始化参数
    initParmas() {
      this.obj.account = this.ajaxData.account
      this.obj.category = this.$route.query.categoryName
      this.initBrand()
      this.setParmas(this.obj)
      this.filterData(this.filterParmas)
    },
    //初始化品牌
    initBrand() {
      if(this.listVal === '慕思') {
        this.obj.brand = ''
      }else {
        this.obj.brand = this.listVal
      }
    },
    //
    getBrand() {
      this.obj = this.filterParmas

    },
    //改变参数
    changeParmas() {
      this.setParmas(this.obj)
      this.filterData(this.filterParmas)
    },
    //获取价格参数
    getPrice() {
      if(this.price.price2 === '') {
        return this.price.price1 + ''
      }else {
        return this.price.price1 + '-' + this.price.price2
      }
    },
    //改变下啦列表的状态
    changeSortListStatus() {
      this.changeStatus = true
    },
    //下啦列表收起后再改变状态
    reset(val) {
      this.changeStatus = val
    },
    backBtn() {
      this.$router.go(-1)
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
      console.log(this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
.prodectList {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background:linear-gradient(0deg,rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%);
  .topBar {
    background: #fff;
    padding: 2vw 4vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cancle {
      background: url(../../assets/imgs/back.png) no-repeat center;
      background-size: contain;
      width: 2.66vw;
      height: 4.8vw;
      padding-right: 6vw;
    }
    .search {
      width: 78.66vw;
      margin-left: 2vw;
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
  .m-list {
    background:linear-gradient(0deg,rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%);
  }
  .list {
    background:linear-gradient(0deg,rgba(248,248,248,1) 0%,rgba(255,255,255,1) 100%);
    margin: 3vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // margin-top: 0;
    // column-count: 2;
    // column-gap: 0;
    // .item {
    //   box-sizing: border-box;
    //   break-inside: avoid;
    //   padding: 10px;
    // }
  }
}
.changbg {
  background: rgba(0, 0, 0, 0.5);
}
 .productList {
    height: 100vh;
    overflow: scroll;
    padding-bottom: 46vw;
    box-sizing: border-box;
  }
</style>
