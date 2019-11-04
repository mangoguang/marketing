<!-- <keep-alive> -->
<template>
  <div class="routerLink">
    <button type="button">{{text}} ></button>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default {
  name: 'routerLink',
  props: ['text'],
  data () {
    return {

    }
  },
  beforeMount() {

  },
  mounted() {

  },
  updated() {

  },
  watch: {
    data(val){
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .routerLink{
    text-align: right;
    // font-size: 16px;
    padding: 0 2vw 2vw 2vw;
    button{
      color: #5ac8fa;
       font-size: 16px;
    }
  }
</style>