<template>
  <div class="enquiryOrder">
    <ul >
      <vuu-pull ref="vuuPull" :options="pullOptions" v-on:loadBottom="loadBottom">
        <li
          v-for="(item, index) in orderList.records"
          :key="`list${index}`"
          @click="orderInfoIn(index)">
          <span>{{index + 1}}</span>
          <span>{{item.username}}</span>
          <span>需求{{item.demandTime}}</span>
          <span>{{item.orderStatus}}</span>
        </li>
      </vuu-pull>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../../js";
import vuuPull from "vuu-pull";
import dealOrderInfoDetails from '../../../store/modules/components/dealOrderInfoDetails';
Vue.use(vuuPull);

export default {
  name:'enquiryOrder',
  props: ['changeResultTit'],
  data() {
    return {
      account:'',
      ajaxData:[],
      pullOptions: {
        isBottomRefresh: true,
        isTopRefresh: false
      },
      dealCusList: [],
      addPullData: [],
      page: 3,
      limit: 10,
      allPage: "",
      key: true,
      baceLimit:30
    };
  },
  computed: {
    ...mapState({
      orderList: state => state.orderList.orderList,
      headerStatus: state => state.customerHeader.headerStatus,
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails
    })

  },
  watch: {
    //根据头部状态获取数据
    headerStatus() {
      if (this.headerStatus[1].status) {
        console.log('statuschange')
        this.getLimit()
        let tempage = (this.baceLimit - 30)/10
        this.page = 3 + tempage
        this.getOrderList(1,this.baceLimit)
      }
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    let account = localStorage.getItem("accountMsg");
    this.account = JSON.parse(account).name.trim();
    console.log('created')
    this.getOrderList(1,30)
    // this.setLimit(this.baceLimit)
    this.getLimit()
    let tempage = (this.baceLimit - 30)/10
    this.page = 3 + tempage
    this.getOrderList(1,this.baceLimit)
  },
  methods: {
    ...mapMutations(["setOrderList","setOrderInfoDetails"]),
    loadBottom() {
      if (this.key) {
        setTimeout(() => {
          if (this.page < this.allPage) {
            this.page ++;
            this.getOrderList(this.page, this.limit);

            if (this.$refs.vuuPull.closeLoadBottom) {
              this.$refs.vuuPull.closeLoadBottom();
            }
          } else {
            if (this.$refs.vuuPull.closeLoadBottom) {
              this.$refs.vuuPull.closeLoadBottom();
            }
          }
        }, 1500);
      }
    },
    getOrderList(page, limit) {  
      this.key = false
      mango.getAjax(this,"order",{
        account: this.account,
        page: page,
        limit: limit,
        key: ""
      },"v2")
        .then(res => {
          this.allPage = Math.ceil(res.data.total / 10);
          if (page <= 3) {
            this.key = true;
            this.setOrderList(res.data);
            this.dealCusList = this.orderList;
            this.$emit("changeResultTit",`全部客户 (${this.orderList.total == null? "0": this.orderList.total})`);
          } else {
             this.setLimit(this.baceLimit + 10)
            this.getLimit()
            console.log(12222,this.baceLimit)
            //上啦刷新加载数据
            this.key = true;
            this.addPullData = res.data;
            this.dealCusList.records = this.dealCusList.records.concat(this.addPullData.records);
            this.setOrderList(this.dealCusList);
            console.log(11,this.orderList)
          }
        });
    },
    setLimit(limit) {
      let string = `{"limit":" ${limit}"}`;
      localStorage.setItem("limit", string);
    },
    //获取本地数据
    getLimit() {
      let temp = localStorage.getItem("limit");
      this.baceLimit = parseInt(JSON.parse(temp).limit);
    },
    //点击进入详情页面
    orderInfoIn(index) {
      mango.getAjax(this,"orderById",{orderId: this.orderList.records[index].orderId},"v2")
        .then(res => {
          if (res) {
            this.setOrderInfoDetails(res.data);
          }
        });
      this.$router.push({ path: "/enquiryInfo" });
    }
  }
  //  activated() {
  //   // isUseCache为false时才重新刷新获取数据
  //   if(!this.$route.meta.isUseCache){   
  //     console.log('isUseCashe = false',123,this)  
  //       this.getLimit()
  //       let a = (this.baceLimit - 30)/10
  //       this.page = 3 + a
  //       this.getOrderList(1,this.baceLimit)   
      
  //     // this.$route.meta.isUseCache = false;  
  //   } 
  // },
};
</script>

<style lang="scss" scoped>
.enquiryOrder{
  padding-top: 23vw;
  background: #f8f8f8;
  ul {
    border-top: 1px solid #e1e1e1;
    padding-left: 4.266vw;
    color: #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    padding-bottom: 19vw;
    li {
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      border-top: 1px solid #e1e1e1;
      span:nth-child(1) {
        flex: 0.1;
      }
      span:nth-child(2) {
        color: #363636;
        flex: 0.2;
      }
      span:nth-child(3) {
        flex: 0.4;
      }
      span:nth-child(4) {
        flex: 0.4;
        color: #363636;
        text-align: right;
      }
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:last-child {
      border-bottom: 1px solid #e1e1e1;
    }
  }
}
</style>
