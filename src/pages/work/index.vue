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
