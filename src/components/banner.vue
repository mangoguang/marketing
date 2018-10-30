<!-- <keep-alive> -->
<template>
  <div class="banner">
    <div class="icon-back" @click='cilck'>
      <div class="icon"></div>
    </div>
    <span>{{title}}</span>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
export default {
  name: 'routerLink',
  props:['title'],
  data () {
    return {

    }
  },
  methods:{
    cilck:function(){
      this.$router.back(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.banner{
  z-index: 99;
  height: 16.466vw;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  border-bottom: 1px solid #aaa;
  background: #f8f8f8;
  padding-top: 5vw;
  .icon-back{
    width: 8vw;
    height: 6.66vw;
    padding-left: 4.266vw;
    .icon{
      background: url(../assets/imgs/back.png) no-repeat center;
      background-size: 100%;
      width: 2.66vw;
      height:4.66vw;
     margin-top: 1vw;
    }
  }
  span{
    width: 100%;
    text-align: center;
    padding-right: 5.46vw;
    font-size: 5.06vw;
    letter-spacing: -1px;
    color: #363636;
  }
}
</style>