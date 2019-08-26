<template>
  <div class="index" :style="{overflow:`${myStyle.formOverFlow}`}">
    <ul>
      <li>模块列表</li>
    </ul>
    <Footer/>
  </div>
</template>


<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '../components/Footer'

export default {
  components:{
    Footer
  },
  props:['myStyle'],
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

.index{
  
}
</style>
