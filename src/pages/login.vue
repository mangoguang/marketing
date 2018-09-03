<!-- <keep-alive> -->
<template>
  <div class="home">
    <div class="banner"></div>
    <div class="box">
      <h1>Hi,欢迎使用慕思经销商平台</h1>
      <form>
        <label for="account">账号</label>
        <input id="account" type="text">
        <label for="password">密码</label>
        <input id="password" type="text">
        <div>
          <input type="checkbox" id="remember" name="remember" value='remember'/><label for="remember">记住密码</label>
        </div>
        <button type="button">登录</button>
      </form>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
// import echarts from 'echarts'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../js/variable'
// import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
// Vue.use(Vuex)
// import MyChart from '../components/mycharts'
export default {
  name: 'login',
  components: {
    // MyChart
  },
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  mounted(){
    mango.test()
    // console.log(11223344, this.$refs.main)
    // this.setHomeArr([1, 2, 3, 4])
    // this.setHomeTit('首页标题')
    // this.setHomeText('123木头人')
  },
  computed: {
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  background: #fff;
}
.banner{
  width: 100vw;
  height: 53.3vw;
  background: url(../assets/imgs/banner.jpeg) no-repeat;
  background-size: 100%;
}
</style>
 