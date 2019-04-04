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

     
  }
}
</script>

<style lang="scss" scoped>

.work{
  background: #f8f8f8;
}
</style>
