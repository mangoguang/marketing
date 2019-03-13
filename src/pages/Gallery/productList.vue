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
    <!-- 列表 -->
    <div class="m-list" v-show="!type">
      <div v-for="(item, index) in list" :key='index'> 
        <router-link to='/productDetails'>
          <m-list :list='item'/>
        </router-link>
      </div>
    </div>
    <!-- 瀑布流 -->
    <div class="list" v-show="type">
      <div class="item" v-for="(item, index) in list" :key='index'>
        <router-link to='/productDetails'>
          <w-list :list='item'/>
        </router-link>
      </div>  
    </div>
  </div>
</template>

<script>
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
      list: [{
        brand: '床',
        imgUrl: './static/images/bed1.jpg',
        title: '3D BCD1-046 克莱夫特克莱夫特克莱夫特克莱夫特',
        type: [{
          name: '热销'
        },{
          name: '人气'
        }],
        price: 22800,
        like: true,
        num: 1600
      },{
        brand: '床',
        imgUrl: './static/images/bed2.jpg',
        title: '歌蒂亚 BCG1-016 爱巢',
        type: [{
          name: '热销'
        }],
        price: 15800,
        like: false,
        num: 1628
      },{
        brand: '床',
        imgUrl: './static/images/bed3.jpg',
        title: '歌蒂亚 BCG1-016 天使之翼',
        type: [{
          name: '热销'
        },{
          name: '新品'
        }],
        price: 18800,
        like: false,
        num: 1628
      },{
        brand: '床',
        imgUrl: './static/images/bed4.jpg',
        title: 'V6 BCG1-016 路虎',
        type: [{
          name: '人气'
        }],
        price: 25800,
        like: true,
        num: 2200
      },{
        brand: '床',
        imgUrl: './static/images/bed4.jpg',
        title: 'V6 BCG1-016 路虎',
        type: [{
          name: '人气'
        }],
        price: 25800,
        like: true,
        num: 2200
      },{
        brand: '床',
        imgUrl: './static/images/bed4.jpg',
        title: 'V6 BCG1-016 爱巢',
        type: [{
          name: '人气'
        }],
        price: 25800,
        like: true,
        num: 2200
      }]
    }
  },
  methods: {
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
</style>
