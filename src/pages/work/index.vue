<template>
  <div class="work">
    <WorkHeader :title="'工作'" />
    <WorkModules />
    <Footer/>
    <Daily />
  </div>
</template>


<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import WorkHeader from '../../components/work/header'
import Footer from '../../components/Footer'
import WorkModules from '../../components/work/workModules/'
import Daily from '../../components/work/daily/'
import { IndexModel } from "../../utils/";
const indexModel = new IndexModel();

export default {
  name: 'work',
  components:{
    WorkHeader,
    Footer,
    WorkModules,
    Daily
  },
  props:[],
  data(){
    return{

    }
  },
  mounted() {
    // indexModel.getCusotmerList({
    //   type: 'New',  //New:意向客户，Approved：成交客户，Closed：战败客户
    //   key: '',  //搜索关键字，电话或名字
    //   sort: 'u',  //u：紧急排序，l：意向分类排序
    //   sd: '2018-03-12',  //跟进日期
    //   ed: '2018-03-26',
    //   u: 1,  //1：紧急，0不紧急
    //   l: 'B',  //
    //   page: 1,  //页数
    //   limit: 10  //每页条数
    // }).then((res) => {
    //   console.log('succ111', res)
    // })
    // `{
    //           "account": "${res.account}",
    //           "tenantId": "${res.tenantId}",
    //           "token": "${res.token}",
    //           "uuid": "${res.uuid}",
    //           "timestamp": "${Date.parse(new Date())}",
    //           "name": "${res.username}",
    //           "phone": "${res.mobile}",
    //           "sex": "${res.sex}",
    //           "type":"${res.type}"
    //         }`
    // indexModel.getUserInfo().then(res => {
    //   console.log('获取用户个人信息', res)
    //   if (res.data) {
        
    //   }
    // })
  },
  methods:{

     
  }
}
</script>

<style lang="scss" scoped>

.work{
  height: 100vh;
  background: #f8f8f8;
}
</style>
