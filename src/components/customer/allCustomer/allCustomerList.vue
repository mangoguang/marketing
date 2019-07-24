<template>
  <div class="allCustomer" ref="all">
    <TopBar :topBarTitle='topbar' style="margin-top:-13vw;"/>
    <ul>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore3" :auto-fill="false"> 
        <li
          v-for="(item, index) in allCustomerList.records"
          :key="`customerList${index}`"
          @click="getDetails(item.accntId,item.status)"
        >
         <div class="name">
           
            <span>{{item.username}}</span>
           
          </div>
          <span class="sex" v-if="item.sex==='Ms.'">女</span>
          <span class="sex" v-else-if="item.sex==='Mr.'">男</span>
          <span class="sex" v-else>未知</span>
          <span class="phone">{{item.phone}}</span>
        </li>
        <button @click="newCustomer" class="new"></button>
      </mt-loadmore>
    </ul>
  </div>
</template>

<script>
import {deepclone} from '../../../utils/customer'
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../../js";
import TopBar from '../topBar'
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import {btnList} from '../../../utils/gallery'
export default {
  name: "allCustomerList",
  props: ["changeResultTit"],
  components:{TopBar},
  data() {
    return {
      ajaxData: [],
      account: "",
      allCusList: [],
      addPullData: [],
      allPage: "",
      page: 3,
      limit: 10,
      baceLimit:30,
      key: true,
      allLoaded:false,
      address: '',
      topbar:{
        leftTitle: '客户信息',
        centerTitle: '性别',
        rightTitle: '手机号码'
      },
      parmas: {}
    };
  },
  computed: {
    ...mapState({
      allCustomerList: state => state.allCustomerList.allCustomerList,
      headerStatus: state => state.customerHeader.headerStatus,
      allScroll: state => state.customerScroll.allScroll,
      customerAjaxParams: state => state.customer.customerAjaxParams
    })
  },
  watch: {
    //根据头部状态获取数据
    headerStatus() {
      if (this.headerStatus[3].status) {
        this.listenScrollTop()
        this.loadData()
        
      }
    }
   
  },
  mounted() {
    this.listenScrollTop()
  },
  created() {
    //获取本地缓存信息
    this.parmas = deepclone(this.customerAjaxParams, this.parmas)
    this.parmas.type = ''
    this.loadData()
   
  },
  methods: {
    ...mapMutations([
      "setAllCustomerList",
       "setTabStatus",
       'setAllScroll',
       'setAllLength',
       'setBtn',
        'initShopList',
        'getShopVal'
       
       ]),
    handleScroll(e) {
      let top = e.target.scrollTop
      this.setAllScroll(top)
    },
    //监听滚动条高度
    listenScrollTop() {
      this.$refs.all.addEventListener('scroll', this.handleScroll,true)
      this.$refs.all.scrollTop = this.allScroll
    },
    //初始化数据
    initData() {
      this.baceLimit = 30
      this.setAllScroll(0);
      this.$refs.all.scrollTop = this.allScroll
    },
    //下拉刷新
    loadBottom() {
      this.$refs.loadmore3.onBottomLoaded();
      this.pullDownData()
     
    },
    //下拉加载数据
    pullDownData() {
      if (this.page < this.allPage) {
        this.allLoaded = true
        this.page ++;
        this.getData(this.page, this.limit);
      }else {
        this.allLoaded = true
        mango.tip('没有更多数据了')
      }
    },
     
    //加载数据
    loadData() {
      let tempage = (this.baceLimit - 30)/10
      this.page = 3 + tempage
      this.getData(1,this.baceLimit)
    },
    getData(page, limit) {
      this.key = false;
      this.parmas.page = page
      this.parmas.limit = limit
      mango.getAjax('/v3/app/customer/list', this.parmas).then(res => {
        if (res) {
          this.allLoaded = false
          this.allPage = Math.ceil(res.data.total / 10);
          if (page <= 3) {
            this.setAllCustomerList(res.data);
            this.AllCusList = this.AllCustomerList;
            this.$emit("changeResultTit",`全部客户 (${this.allCustomerList.total == null? "0": this.allCustomerList.total})`);
          } else {
            this.addPullData = res.data;
            this.allCusList.records = this.allCusList.records.concat(this.addPullData.records);
            this.setAllCustomerList(this.allCusList);
          }
        }
      })
      .catch(reject => {
        if(reject === 510) {
          this.getData(page, limit)
        }
      })
    },
    getDetails(id,status){
       if(status==='Approved'){
          this.$router.push({path:'/enquiryInfo',query:{id:id}})
      }else{
          this.$router.push({path:'/customerInfo',query:{id:id}})
      }
    },
    //门店vuex清空。恢复第一个.游客！
    newCustomer() {
      this.setBtn([])
      let shops = localStorage.getItem('shops')
      let shopsList = btnList(JSON.parse(shops),0)
      this.initShopList(shopsList)
      this.getShopVal()
      this.$router.push({path: './newCustomer'})
    }
  }
};
</script>


<style lang="scss" scoped>
.allCustomer {
  width: 100vw;
  height: 100vh;
  overflow: scroll; 
  box-sizing: border-box;
  padding-top: 34vw;
  background: #f8f8f8;
  -webkit-overflow-scrolling: touch;
  // margin-bottom: 20vw;
  ul {
   // border-top: 1px solid #e1e1e1;
    margin-top: -1vw;
    // border-bottom: 1px solid #e1e1e1;
    color: #999;
    font-size: 4.26vw;
    /* line-height: 11.73vw; */
    padding-bottom: 40vw;
    box-sizing: border-box;
    background: #f8f8f8;
    li {
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      // border-top: 1px solid #e1e1e1;
      align-items: center;
      min-height: 17.33vw;
      margin-top: 1vw;
      background: #fff;
      padding-left: 4.266vw;
      .name {
        color: #363636;
        flex:1;
        display: flex;
        align-items: center;
       span{
          width:30vw;
          display: inline-block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
       }
      }
      .sex{
         flex:1;
         text-align: center;
         flex-shrink: 0;
      }
      .phone {
        flex:1;
        color: #363636;
        text-align: right;
        flex-shrink: 0;
      }
      
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:last-child {
      border-bottom: 1px solid #e1e1e1;
      // margin-bottom: 3vw;
    }
    
  }
}
</style>

