<template>
  <div class="customer">
    123
    <Footer/>
  </div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '../../components/Footer'
import mango from '../../js'

export default {
  components:{
    Footer
  },
  data(){
    return{

    }
  },
  created(){
    this.checkLogin()
  },
  mounted() {

  },
  methods:{
    checkLogin() {
      let ajaxData = localStorage.getItem('ajaxData')
      // console.log(Date.parse(new Date()) - timeLong)
      if (!ajaxData) {
        this.$router.push({path: './Login'})
        return
      } else {
        let timeLong = JSON.parse(ajaxData).timestamp
        timeLong = Date.parse(new Date()) - JSON.parse(ajaxData).timestamp
        timeLong = timeLong/(60 * 60 * 24 * 1000)
        if (timeLong > 10) {
          this.$router.push({path: './Login'})
          return
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
