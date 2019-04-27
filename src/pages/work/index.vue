<template>
  <div class="work">
    <WorkHeader :title="'工作'" />
    <WorkModules />
    <Footer/>
    <Daily />
    <div @click="changeToken" style="text-align: center;line-height: 10vw;">测试</div>
  </div>
</template>


<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import WorkHeader from '../../components/work/header'
import Footer from '../../components/Footer'
import WorkModules from '../../components/work/workModules/'
import Daily from '../../components/work/daily/'
import { IndexModel } from "../../utils/"
const indexModel = new IndexModel()

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
    
  },
  methods:{
    changeToken() {
      let token = JSON.parse(localStorage.getItem('token'))
      token.access_token = '111'
      localStorage.setItem('token', JSON.stringify(token))
    }
  }
}
</script>

<style lang="scss" scoped>

.work{
  // box-sizing: border-box;
  // height: 100vh;
  background: #f8f8f8;
}
</style>
