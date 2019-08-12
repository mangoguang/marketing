<template>
  <div class="dealCustomer" ref="deal">
    <TopBar :topBarTitle='topbar' style="margin-top:-13vw;"/>
    <ul>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> 
        <li
          v-for="(item, index) in dealCustomerList.records"
          :key="`customerList${index}`"
          @click="getDetails(index)"
        >
         <div class="name">
            <i :class="`important${item.level}`"></i>
              <!-- <span
              :class="{active : compareTime[index]}"
            >{{`*${item.username ? item.username.slice(1, 10) : ''}`}}</span> -->
            <span>{{item.username}}</span>
            <strong :class="`urgency${item.urgency}`"></strong>
          </div>
          <!-- <span class="name">{{`*${item.username.slice(1, 5)}`}}</span> -->
          <!-- <span class="phone">{{`******${item.phone.slice(6, 11)}`}}</span> -->
          <span class="phone" v-if="item.phone!=='0'">{{item.phone}}</span>
          <span class="phone" v-else>未收集</span>
          <!-- <span class="date">{{item.followDate}}</span> -->
          <span class="date">{{item.closeTime.split(" ")[0]}}</span>
        </li>
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
export default {
  name: "dealCustomerList",
  props: ["changeResultTit"],
  components:{TopBar},
  data() {
    return {
      ajaxData: [],
      account: "",
      dealCusList: [],
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
        centerTitle: '电话',
        rightTitle: '流失时间'
      },
      parmas: {}
    };
  },
  computed: {
    ...mapState({
      dealCustomerList: state => state.dealCustomerList.dealCustomerList,
      headerStatus: state => state.customerHeader.headerStatus,
      isSelectStatus: state => state.rightContainer.isSelectStatus,
      dealScroll: state => state.customerScroll.dealScroll,
      dealLength: state => state.dealCustomerList.dealLength,
      dealTime: state => state.rightContainer.dealTime,
      customerAjaxParams: state => state.customer.customerAjaxParams
    })
  },
  watch: {
    //根据头部状态获取数据
    headerStatus() {
      if (this.headerStatus[2].status) {
        // this.setHeader(this.dealLength)
        this.listenScrollTop()
        if(this.dealScroll === 0) {
          if(this.isSelectStatus) {
            this.loadSelectData(this.dealTime)
            // this.getSelectTimeData()
          } else {
            this.loadData()
          }
        }
      }
    },
    dealTime() {
      // this.initScrollTop()
      // this.getSelectTimeData()
      this.setIsSelectStatus(true)
      //每次改变初始化
      this.initData()
      this.loadSelectData(this.dealTime)
      if(this.dealTime.startTime === '') {
        this.setIsSelectStatus(false)
        this.loadData()
      }
    }
  },
  mounted() {
    this.listenScrollTop()
    // if (this.headerStatus[2].status) {
    //   this.getSelectTimeData()
    //   this.setHeader(this.dealLength)
    // }
  },
  created() {
    //获取本地缓存信息
    this.parmas = deepclone(this.customerAjaxParams, this.parmas)
    this.parmas.type = 'Closed'
    if(!this.isSelectStatus) {
      this.loadData()
    } else {
      this.loadSelectData(this.dealTime)
    }
  },
  methods: {
    ...mapMutations([
      "setDealCustomerList",
       "setDealOrderInfoDetails",
       "setTabStatus",
       'setDealScroll',
       'setDealLength',
       'setIsSelectStatus',
       'setCustomerTabStatus'
       ]),
    //初始化高度
    // initScrollTop() {
    //   this.setDealScroll(0)
    //   this.$refs.deal.scrollTop = this.dealScroll 
    // },
    //获取滚动条
    handleScroll(e) {
      let top = e.target.scrollTop
      this.setDealScroll(top)
    },
    //监听滚动条高度
    listenScrollTop() {
      this.$refs.deal.addEventListener('scroll', this.handleScroll,true)
      this.$refs.deal.scrollTop = this.dealScroll
    },
    //初始化数据
    initData() {
      this.baceLimit = 30
      this.setDealScroll(0);
      this.$refs.deal.scrollTop = this.dealScroll
      localStorage.removeItem('selectDealLimit')
      localStorage.removeItem('dealLimit');  
      this.getSelectLimit()
    },
    //下拉刷新
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      if(!this.isSelectStatus) {
        this.pullDownData()
      }else {
        this.pullDownData(this.dealTime.startTime,this.dealTime.endTime)
      }
    },
    //下拉加载数据
    pullDownData(startTime, endTime) {
      if (this.page < this.allPage) {
        this.allLoaded = true
        this.page ++;
        this.getData(this.page, this.limit, startTime, endTime);
      }else {
        this.allLoaded = true
        mango.tip('没有更多数据了')
      }
    },
     //加载筛选数据
    loadSelectData(time) {
      if(time.startTime) {
        this.getSelectLimit()
        let tempage = (this.baceLimit - 30)/10
        this.page = 3 + tempage
        this.getData(1,this.baceLimit, time.startTime, time.endTime)
      }
    },
    //加载数据
    loadData() {
      this.getLimit()
      let tempage = (this.baceLimit - 30)/10
      this.page = 3 + tempage
      this.getData(1,this.baceLimit)
    },
    //获取时间来获得数据
    getSelectTimeData() {
      let temp = this.dealTime
      this.getData(temp.startTime, temp.endTime);
    },
    //判断是否订单筛选时间来获取不同的缓存limit
    getDiffLimit() {
      if(!this.isSelectStatus) {
        this.setLimit(this.baceLimit + 10)
        this.getLimit()
      } else {
        this.setSelectLimit(this.baceLimit + 10)
        this.getSelectLimit()
      }
    },
    getData(page, limit, startTime, endTime) {
      this.key = false;
      this.parmas.page = page
      this.parmas.limit = limit
      this.parmas.sd = startTime
      this.parmas.ed = endTime
      this.parmas.sort = ''
      this.parmas.u = ''
      this.parmas.l = ''
      mango.getAjax('/v3/app/customer/list', this.parmas).then(res => {
        if (res) {
          this.allLoaded = false
          this.allPage = Math.ceil(res.data.total / 10);
          if (page <= 3) {
            this.setDealCustomerList(res.data);
            this.dealCusList = this.dealCustomerList;
            this.$emit("changeResultTit",`全部客户 (${this.dealCustomerList.total == null? "0": this.dealCustomerList.total})`);
          } else {
            //筛选和非筛选时候缓存的limit
            this.getDiffLimit()
            //上啦刷新加载数据
            this.addPullData = res.data;
            this.dealCusList.records = this.dealCusList.records.concat(this.addPullData.records);
            this.setDealCustomerList(this.dealCusList);
          }
          // this.setCustomerList(res.data)
        }
      })
      .catch(reject => {
        if(reject === 510) {
          this.getData(page, limit, startTime, endTime)
        }
      })

      // mango.getAjax(this,"makedeal",{
      //       account: this.account,
      //       page: page,
      //       limit: limit,
      //       // type:1,
      //       startTime,
      //       endTime,
      //       key: ""
      // },"v2")
      //   .then(res => {
      //     this.allLoaded = false
      //     this.allPage = Math.ceil(res.data.total / 10);
      //     if (page <= 3) {
      //       this.setDealCustomerList(res.data);
      //       this.dealCusList = this.dealCustomerList;
      //       this.$emit("changeResultTit",`全部客户 (${this.dealCustomerList.total == null? "0": this.dealCustomerList.total})`);
      //     } else {
      //       //筛选和非筛选时候缓存的limit
      //       this.getDiffLimit()
      //       //上啦刷新加载数据
      //       this.addPullData = res.data;
      //       this.dealCusList.records = this.dealCusList.records.concat(this.addPullData.records);
      //       this.setDealCustomerList(this.dealCusList);
      //     }
          //初始进来
          // this.allLoaded = false
          // this.allPage = Math.ceil(res.data.total / 10);
          // this.key = true;
          // console.log(res.data)
          // // let result  = mango.getUniqueData(res.data.records)
          // this.setDealCustomerList(res.data.records);
          // // this.dealCusList = this.dealCustomerList.records;
          // // this.setDealLength(res.data.total)
          // this.setHeader(res.data.total)
        // });
    },
    // setHeader(length) {
    //   this.$emit("changeResultTit",`全部客户 (${length == 0? "0": length})`);
    // },
    setLimit(limit) {
      let string = `{"dealLimit":" ${limit}"}`;
      localStorage.setItem("dealLimit", string);
    },
     //获取本地数据
    getLimit() {
      let temp = localStorage.getItem("dealLimit");
      if(temp) {
        this.baceLimit = parseInt(JSON.parse(temp).dealLimit);
      }else {
        this.setLimit(this.baceLimit)
      }
    },
    setSelectLimit(selectLimit) {
      let string = `{"selectDealLimit":" ${selectLimit}"}`;
      localStorage.setItem("selectDealLimit", string);
    },
    //缓存筛选的limit
    getSelectLimit() {
      let temp = localStorage.getItem("selectDealLimit");
      if(temp) {
        this.baceLimit = parseInt(JSON.parse(temp).selectDealLimit);
      }else {
        this.setSelectLimit(this.baceLimit)
      }
    },
    //详细订单信息
    getDetails(index) {
      let id = this.dealCustomerList.records[index].accntId
      this.setCustomerTabStatus(mango.btnList(['客户信息', '意向信息'], 0))
      // this.$router.push({path: "/dealDetails"})
      this.$router.push({path:'/customerInfo',query: {id: id,status:4}})
      // mango.getAjax(this,"customerinfo",{
      //   customerId: id,
      //   account: this.ajaxData.account
      //   },"v2")
      //   .then(res => {
      //     if (res) {
      //       this.setDealOrderInfoDetails(res.data);
      //       // console.log(res.data.orderList[0].address)
      //       this.address = res.data.orderList[0].address
      //       this.$router.push({ path: "/dealDetails" ,
      //       query: {
      //         username: this.dealCustomerList.records[index].username,
      //         address:this.address,
      //         phone:this.dealCustomerList.records[index].phone
      //       }
      //     });
      //     }
      //   });
    }
  }
};
</script>


<style lang="scss" scoped>
.dealCustomer {
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
    line-height: 11.73vw;
    padding-bottom: 40vw;
    box-sizing: border-box;
    background: #f8f8f8;
    li {
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      // border-top: 1px solid #e1e1e1;
      align-items: center;
      height: 17.33vw;
      margin-top: 1vw;
      background: #fff;
      padding-left: 4.266vw;
      .name {
        color: #363636;
        flex: 0.5;
        display: flex;
        align-items: center;
        strong {
          height: 4vw;
          width: 3.73vw;
          margin-top: -7vw;
          margin-left: 1vw;
        }
        .urgencyfalse {
          // background: url(../../assets/imgs/jinji1.png) no-repeat;
          background-size: 100% 100%;
          // background-position: center;
        }
        .urgencytrue {
          background: url(../../../assets/imgs/jinji.png) no-repeat;
          background-size: 100% 100%;
          // background-position: center;
        }
      }
      .phone {
        flex: 0.5;
      }
      .date {
        flex: 0.4;
        color: #363636;
        text-align: right;
      }
      // span:nth-child(4) {
      //   flex: 0.5;
      // }
      // span:nth-child(1) {
      //   flex: 0.15;
      // }
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:last-child {
      border-bottom: 1px solid #e1e1e1;
      // margin-bottom: 3vw;
    }
    i{
      width: 10.6vw;
      height: 4vw;
      margin-right: -3vw;
    }
    .importantA{
      background: url(../../../assets/imgs/A.png) no-repeat;
      background-size: auto 100%;
      // background-position: center;
    }
    .importantB{
      background: url(../../../assets/imgs/B.png) no-repeat;
      background-size: auto 100%;
      // background-position: center;
    }
    .importantC{
      background: url(../../../assets/imgs/C.png) no-repeat;
      background-size: auto 100%;
      // background-position: center;
    }
    .importantD{
      background: url(../../../assets/imgs/D.png) no-repeat;
      background-size: auto 100%;
      // background-position: center;
    }
  }
}
</style>

