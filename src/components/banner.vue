<!-- <keep-alive> -->
<template>
  <div class="banner">
    <div class="icon-back" @click='cilck'></div>
    <p>{{title}}</p>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
export default {
  name: 'routerLink',
  props:['title','turnPath'],
  data () {
    return {

    }
  },
  methods:{
    cilck:function(){
      this.$router.push({path:this.turnPath}) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.banner{
  z-index: 99;
  height: 11.466vw;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  border-bottom: 1px solid #aaa;
  background: #f8f8f8;
  .icon-back{
    background: url(../assets/imgs/back.png) no-repeat center;
    background-size: 100%;
    width: 2.66vw;
    height:4.66vw;
    margin-left: 4.266vw;
  }
  p{
    width: 100%;
    text-align: center;
    padding-right: 3.46vw;
    font-size: 5.06vw;
    letter-spacing: -1px;
    color: #363636;
  }
}
</style>