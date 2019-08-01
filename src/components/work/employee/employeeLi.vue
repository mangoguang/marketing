<template>
  <li class="employeeLi">
    <div class="left">
      <slot name="headPortrait"></slot>
      <div class="con"><slot></slot></div>
    </div>
    <img src="../../../assets/imgs/rightside.png" alt="" v-if="icon">
  </li>
</template>

<script>

export default {
  name: 'employeeLi',
  props: ['icon'],
  data() {
    return{
    
    }
  },
  mounted(){

  },
  created(){

  },
  methods:{
    
   
   
  }
  
}
</script>

<style lang="scss" scoped>
  .employeeLi{
    //width:91.466vw;
    //box-sizing: border-box;
    background: #fff;
    margin:0 4.266vw;
    padding:0 2.66vw;
    min-height:20vw;
    border-radius: 1.6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:2.66vw;
    .left{
      flex:1;
      display: flex;
      flex-direction: row;
      align-items: center;
      .con{
         flex:1;
      }
    }
    img{
      width:1.866vw;
    }
  }
</style>

