<template>
  <div class="dealCustomer">
    <h1>全部客户<span>({{this.dealCustomerList.total == null? '0' :this.dealCustomerList.total}})</span></h1>
    <ul  
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0.1">
      <li  v-for="(item, index) in this.dealCustomerList.records"
        :key="`customerList${index}`" @click="getDetails(index)">
        <span>{{index + 1}}</span>
        <span>{{item.username}}</span>
        <span>{{item.sex == 0 ? '女' : '男'}}</span>
        <span>{{item.phone}}</span>
        <span>{{getLevel(item.level)}}</span>
      </li>
    </ul>
    <!-- <div>
      <mt-spinner type="fading-circle"></mt-spinner><span>加载中...</span>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import mango from '../../../js'
import { InfiniteScroll,Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);
Vue.use(InfiniteScroll);

export default {
  name:'dealCustomerList',
  data(){
    return{
      dealCustomerList1:[
        {name:'张三',sex:'男',phone:15999999999,level:'高'},
        {name:'李四',sex:'男',phone:15999999999,level:'低'},
        {name:'张三',sex:'男',phone:15999999999,level:'高'},
        {name:'李四',sex:'男',phone:15999999999,level:'低'},
        {name:'张三',sex:'男',phone:15999999999,level:'高'},
        {name:'李四',sex:'男',phone:15999999999,level:'低'},
        {name:'张三',sex:'男',phone:15999999999,level:'高'}
      ],
      loading:''
   

    }
  },
  computed: {
    ...mapState({
      // citySelect: state => state.select.citySelect,
      dealCustomerList: state => state.dealCustomerList.dealCustomerList
    })
  },
  watch:{
    dealCustomerList() {
      console.log(123,this.dealCustomerList.records[0])
    }
  },
  methods:{
    ...mapMutations([
      'setDealCustomerList',
      'setDealOrderInfoDetails'
    ]),
    loadMore() {
      this.loading = true;
      setTimeout(() => {
      //   mango.getAjax(this, 'order', {
      //   account:this.account,
      //   page: 1,  //页数
      //   limit: '20',  //每页条数
      //   key: ""     //搜索关键字，电话或名字
      // }, 'v2')
      // .then((res) => {
      //   if (res) {
      //    console.log('成交客户数据',res.data)
      //     this.setDealCustomerList(res.data)
      //   }
      // })
      // let last = this.list[this.list.length - 1];
      // for (let i = 1; i <= 10; i++) {
      //   this.list.push(last + i);
      // }
      this.loading = false;
      }, 3500);
    },
    //获得个人评价等级
    getLevel(level) { 
      if(level == 1) {
        return '高'
      }else if (level == 2) {
        return '中'
      }else if (level == 3) {
        return '低'
      }else {
        return null
      }
    },
    //详细订单信息
    getDetails(index) {
        mango.getAjax(this, 'customerinfo', {
        // customerId: '1062588207926919170',
        customerId:this.dealCustomerList.records[index].customerId 
      }, 'v2')
      .then((res) => {
        if (res) {
        //  console.log(11111111111,res)
        this.setDealOrderInfoDetails(res.data)        
        }
      })
      this.$router.push({path:'/dealDetails'})
    }
  },
  created(){
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  }
}
</script>


<style lang="scss" scoped>
.dealCustomer{
  padding-top: 26vw;
  background: #f8f8f8;
  h1{
    font-size: 4vw;
    color: #666;
    line-height: 3em;
    padding-left: 4.26vw;
    span{
      padding-left: 2vw;
    }
  }
  ul{
    border-top:1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    padding-left: 4.266vw;
    color:  #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    margin-bottom: 20vw;
    li{
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      border-top: 1px solid #e1e1e1;
      span:nth-child(2){
        color: #363636;
        flex: 0.3;
      }
      span:nth-child(5){
        color: #363636;
        flex: 0.05
      }
      span:nth-child(3){
        flex:0.2
      }
      span:nth-child(4){
        flex:0.5
      }
      span:nth-child(1){
        flex:0.1
      }
    }
    li:nth-child(1){
      border-top: none;
    }
  }
}
</style>

