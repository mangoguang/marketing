<!-- <keep-alive> -->
<template>
  <div class="child">
    <h1>子组件测试git ssh</h1>
    <ul>
      <li v-for="(item, index) in childArr" :key="index">{{item}}</li>
    </ul>
    <ul>
      <li v-for="item in childArrFilter">{{item}}</li>
    </ul>
    <ul>
      <li v-for="item in childArrAddTen">{{item}}</li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
// import echarts from 'echarts'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
export default {
  name: 'child',
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    childArr() {
      console.log(888, this.$store.state)
      return this.$store.state.child.childArr
    },
    ...mapGetters([
      'childArrFilter',
      'childArrAddTen'
    ])
    // childArrFilter() {
    //   return this.$store.getters.childArrFilter
    // }
  },
  methods:{
    setChildArr(arr) {
      this.$store.commit('childArr', arr)
    }
  },
  mounted(){
    this.setChildArr([1, 2, 3, 4, 5])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child{
  width: 100vw;
  height: 100vh;
  background: #ff0000;
}
</style>
 