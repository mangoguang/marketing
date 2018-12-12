<template>
  <div class="searchResult">
    <mybanner :title='text'/>
    <ul v-if="headerStatus[1].status" class="orderList">
      <li
          v-for="(item, index) in orderList.records"
          :key="`list${index}`"
          @click="orderInfoIn(index)">
          <span>{{index + 1}}</span>
          <span>{{item.username}}</span>
          <span>需求{{item.demandTime}}</span>
          <span>{{item.orderStatus}}</span>
        </li>
    </ul>
    <ul v-if="headerStatus[2].status" class="dealList">
      <li
        v-for="(item, index) in dealList"
        :key="`customerList${index}`"
        @click="getDetails(index)"
      >
        <span>{{index + 1}}</span>
        <span>{{item.username}}</span>
        <span>{{item.sex == 0 ? '女' : '男'}}</span>
        <span>{{item.phone}}</span>
        <span>{{getLevel(item.level)}}</span>
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
      dealList:[]
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
      dealCustomerList: state => state.dealCustomerList.dealCustomerList
    })
  },
  methods:{
    ...mapMutations(['setDealCustomerList',"setOrderInfoDetails","setDealOrderInfoDetails","setTabStatus"]),
    getCustomerList(key) {
      mango.getAjax(this, 'order',{
        account: this.account,
        page: 1,  
        limit: 20,  
        key: key //搜索关键字，电话或名字
      },'v2').then((res) => {
        if (res) {
          if(this.headerStatus[1].status){
            this.orderList = res.data
          }else if (this.headerStatus[2].status) {
            let result  = mango.getUniqueData(res.data.records)
            this.setDealCustomerList(result);
            this.dealList = result
          }
        }
      }) 
    },
    getLevel(level) {
      if (level == 1) {
        return "高";
      } else if (level == 2) {
        return "中";
      } else if (level == 3) {
        return "低";
      } else {
        return null;
      }
    },
    //订单查询搜索
    orderInfoIn(index) {
      mango.getAjax(this,"orderById",{orderId: this.orderList.records[index].orderId},"v2")
        .then(res => {
          if (res) {
            this.setOrderInfoDetails(res.data);
          }
        });
      this.$router.push({ path: "/enquiryInfo" });
    },
    //成交客户搜索
    getDetails(index) {
      this.setTabStatus(mango.btnList(['订单信息', '跟踪记录', '个人评级'], 0))
      mango.getAjax(this,"customerinfo",{customerId: this.dealList[index].customerId},"v2")
        .then(res => {
          if (res) {
            this.setDealOrderInfoDetails(res.data);
          }
        });
      this.$router.push({ path: "/dealDetails" ,
        query: {
          username: this.dealCustomerList[index].username,
          sex:this.dealCustomerList[index].sex,
          phone:this.dealCustomerList[index].phone
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
        this.dealList = []
        this.orderList = [] // 清空原有数据
        if(key) {
          this.getCustomerList(key); // 这是我们获取数据的函数
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
.searchResult{
  padding-top: 16vw;
  background: #f8f8f8;
  min-height: 100vh;
  .orderList{
    padding-left: 4.266vw;
    color: #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    border-bottom: 1px solid #e1e1e1;
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
  }
   .dealList{
    border-bottom: 1px solid #e1e1e1;
    // border-bottom: 1px solid #e1e1e1;
    padding-left: 4.266vw;
    color: #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    li {
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      border-top: 1px solid #e1e1e1;
      span:nth-child(2) {
        color: #363636;
        flex: 0.3;
      }
      span:nth-child(5) {
        color: #363636;
        flex: 0.05;
      }
      span:nth-child(3) {
        flex: 0.2;
      }
      span:nth-child(4) {
        flex: 0.5;
      }
      span:nth-child(1) {
        flex: 0.15;
      }
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:last-child {
      border-bottom: none
    }
  }
}
</style>
