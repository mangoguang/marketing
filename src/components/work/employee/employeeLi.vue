<template>
  <li class="employeeLi">
    <div class="left">
      <div class="headPortrait"></div>
      <div class="content"><slot></slot></div>
    </div>
    <img src="../../../assets/imgs/rightside.png" alt="">
  </li>
</template>

<script>



export default {
  name: 'employeeLi',
  props: [],
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
    background: #fff;
    margin:0 4.266vw;
    padding:0 2.66vw;
    height:20vw;
    border-radius: 1.6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display: flex;
      flex-direction: row;
      align-items: center;
      .headPortrait{
        width:14.66vw;
        height:14.66vw;
        background: red;
        border-radius: 50%;
        margin-right:2.66vw;
      }
      .content{
        width:65.06vw;
        overflow: hidden;
      }
    }
    img{
      width:1.866vw;
    }
  }
</style>

