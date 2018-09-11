<!-- <keep-alive> -->
<template>
  <div class="audioTechnica">
    这是铁三角页面
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
export default {
  name: 'audioTechnica',
  components: {
    Bar, Pie, chartsTit, RouterLink
  },
  data () {
    return {
      ajaxData: {}
    }
  },
  created() {

  },
  mounted(){

  },
  computed: {

  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.audioTechnica{

}
</style>
 