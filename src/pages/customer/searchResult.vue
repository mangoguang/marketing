<template>
  <div class="searchResult">
    <mybanner :title='text'/>
    <ul class="customerList" v-if="headerStatus[0].status" >
      <li
      class="customerContent"
      v-for="(item, index) in myCustomerList.records"
      :key="`customerList${index}`"
      @click="toCustomerInfo(item.id)">
        {{item.name}}
        <ul>
          <li>
            <div :class="`urgence${item.urgency}`"></div>
            <strong>{{item.username}}<i :class="`important${item.important}`"></i></strong>
            <span>{{item.followTime}}</span>
          </li>
          <li>{{item.intention}}</li>
          <li>{{item.probability}}</li>
        </ul>
      </li>
    </ul>
    <ul v-if="headerStatus[1].status" class="orderList">
      <li
        :class='{active : compareTime[index]}'
        v-for="(item, index) in orderList.records"
        :key="`list${index}`"
        @click="orderInfoIn(index)">
        <span>{{index + 1}}</span>
        <span :class='{active : compareTime[index]}'>{{item.username}}</span>
        <span>{{item.demandTime}}</span>
        <span :class='{active : compareTime[index]}'>{{item.orderStatus}}</span>
        </li>
    </ul>
    <ul v-if="headerStatus[2].status" class="dealList">
      <li
        v-for="(item, index) in dealList.records"
        :key="`customerList${index}`"
        @click="getDetails(index)"
      >
        <span>{{index + 1}}</span>
        <span>{{item.username}}</span>
        <!-- <span>{{item.sex == 0 ? '未知' : item.sex == 1? '男' : '女'}}</span> -->
        <span>{{item.phone}}</span>
        <span>{{item.recordTime}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mybanner from '../../components/banner';
import mango from '../../js'

export default {
  name:'searchResult',
  components:{mybanner},
  data() {
    return {
      text:'查询结果',
      searchData:'',
      account:'',
      ajaxData:[],
      orderList:[],
      dealList:[],
      myCustomerList:[],
      type:'',
      compareTime: []
    };
  },
  created() {
    //获取本地数据
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let account = localStorage.getItem('accountMsg')
    this.account = JSON.parse(account).name.trim()
  },
  computed: {
    ...mapState({
      headerStatus: state => state.customerHeader.headerStatus,
      customerAjaxParams: state => state.customer.customerAjaxParams,
      customerList: state => state.customer.customerList,
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails
    })
  },
  methods:{
    ...mapMutations([
      "setOrderInfoDetails",
      "setDealOrderInfoDetails",
      "setTabStatus",
      'setCustomerAjaxParams',
      'setOrderTotalPrice',
      'setOrderDiscountPrice'
    ]),
    //需求日期是否到期
    isExpire(len) {
      if(this.orderList.records) {
        let temp = this.orderList.records
        let today = new Date()
        for(var i = 0; i < len; i++) {
          if(temp[i]){
            let isActive = mango.compareTimeStamp(temp[i].demandTime,today)  //t1<t2,true/actived
            if(temp[i].orderStatus === '已关闭'){
            }else {
              this.$set(this.compareTime,i,isActive)
            }
          }
        }
      }
    },
    //订单查询搜索
    getCustomerList(key) {
      mango.getAjax(this, 'order',{
        account: this.account,
        page: 1,  
        limit: 50,  
        key: key //搜索关键字，电话或名字
      },'v2').then((res) => {
        if (res) {
          this.orderList = res.data
          let len = this.orderList.records.length
          this.isExpire(len)
        }
      }) 
    },
    //成交客户搜索
    getDealCustomerList(key) {
      mango.getAjax(this, 'makedeal',{
        account: this.account,
        page: 1,  
        limit: 50,  
        key: key //搜索关键字，电话或名字
      },'v2').then((res) => {
        if (res) {
          this.dealList = res.data
        }
      }) 
    },
    //判断type
    judgeType() {
      if(this.headerStatus[1].status) {
        this.type = 2
      }else {
        this.type = 1
      }
    },
    //我的客户搜索
    getMyCustomerList(myKey) {
       let [temp, tempObj] = [this.customerAjaxParams, {}]
      // 对象深拷贝
      for (let key in temp) {
        tempObj[key] = temp[key]
      }
      console.log(myKey, typeof(myKey))
      tempObj.key = myKey
      tempObj.account = this.account
      this.setCustomerAjaxParams(tempObj)
      console.log(123,this.customerAjaxParams)
      mango.getAjax(this, 'customer', this.customerAjaxParams, 'v2').then((res) => {
        if (res) {
          this.myCustomerList = res.data
        }
      })
    },
    //我的客户搜索
    toCustomerInfo(id) {
      this.$router.push(`/customerInfo/${id}`)
    },
    // 计算总额和折扣金额
    calcPrice(list) {
      if(list.orderItemList) {
        let itemList = list.orderItemList
        let priceArr = []
        let total = 0
        let discount = 0
        itemList.forEach((item, index) => {
          total += item.price * item.quantity
        });
        discount = total - list.totalAmount
        this.setOrderTotalPrice(total)
        this.setOrderDiscountPrice(discount)
      }
    },
    //订单查询搜索
    orderInfoIn(index) {
      mango.getAjax(this,"orderById",{orderId: this.orderList.records[index].orderId},"v2")
        .then(res => {
          if (res) {
            this.setOrderInfoDetails(res.data);
            this.calcPrice(this.orderInfoDetails)
          }
        });
      this.$router.push({ path: "/enquiryInfo" });
    },
    //成交客户搜索
    getDetails(index) {
      this.setTabStatus(mango.btnList(['订单信息', '需求信息'], 0))
      mango.getAjax(this,"customerinfo",{
        customerId: this.dealList.records[index].customerId,
        account: this.account
        },"v2")
        .then(res => {
          if (res) {
            this.setDealOrderInfoDetails(res.data);
          }
        });
      this.$router.push({ path: "/dealDetails" ,
        query: {
          username: this.dealList.records[index].username,
          sex:this.dealList.records[index].sex,
          phone:this.dealList.records[index].phone
        }
      });
    },
    //缓存本地数据
    setSearchData(searchData) {
      let string = `{"searchData":" ${searchData}"}`;
      localStorage.setItem("searchData", string);
    },
    //获取本地数据
    getSearchData() {
      let key = localStorage.getItem("searchData");
      let theKey = JSON.parse(key);
      this.key = this.trim(theKey.searchData)
    },
    trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },
  activated() {
    // isUseCache为false时才重新刷新获取数据
    if(!this.$route.meta.isUseCache){   
      // console.log('isUseCashe = false')  
      this.searchData = this.$route.query
      if(this.searchData){
        let key = this.trim(this.searchData.key)
        this.setSearchData(key) //缓存数据
        this.getSearchData()
        this.myCustomerList = []
        this.dealList = []
        this.orderList = [] // 清空原有数据
        if(key) {
          this.getDealCustomerList(key)
          this.getCustomerList(key); // 这是我们获取数据的函数
          this.getMyCustomerList(key)
        }
      }      
      this.$route.meta.isUseCache = false;  
    } 
  },
  beforeRouteLeave (to, from, next) { 
    // console.log('isUseCashe = true')         
    if (to.name == 'searchResult') {
      to.meta.isUseCache = true; 
    }        
    next();
  }
};
</script>

<style lang="scss" scoped>
@import '../../main.scss';
.searchResult{
  padding-top: 16vw;
  background: #f8f8f8;
  min-height: 100vh; 
  .active{
    color:#ee0505!important
  }
  .customerList{
    padding-top: 1.6vw;
  }
}

</style>
