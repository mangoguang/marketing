<!-- <keep-alive> -->
<template>
  <div class="home">
    <h1>{{homeTit}}</h1>
    <p>{{homeText}}</p>
    <router-link to="/child">Go to Child</router-link>
    <button @click="goToChild" type="button">Go to Child</button>
    <ul>
      <li v-for="(item, index) in homeArr" :key="index">{{item}}</li>
    </ul>
    <ul>
      <li v-for="(item, index) in homeArrFilter" :key="index">{{item}}</li>
    </ul>
    {{test}}
  </div>
</template>
<!-- </keep-alive> -->

<script>
// import echarts from 'echarts'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
export default {
  name: 'home',
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },

  computed: {
    test() {
      console.log(this.$store)
    },
    ...mapState({
      homeTit: state => state.home.homeTit,
      homeText: state => state.home.homeText,
      homeArr: state => state.home.homeArr
    }),
    ...mapGetters([
      'homeArrFilter'
    ])
  },
  methods:{
    ...mapMutations([
      'setHomeTit',
      'setHomeText',
      'setHomeArr'
    ]),
    goToChild() {
      this.$router.push({ path: '/child' })
    }
  },
  mounted(){
    console.log(mapState)
    this.setHomeArr([1, 2, 3])
    this.setHomeTit('首页标题')
    this.setHomeText('123木头人')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  width: 100vw;
  height: 100vh;
  background: #ff0000;
}
</style>
 