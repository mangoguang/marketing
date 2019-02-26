<template>
  <router-link :to="path">
    <div class="box">
        <span>
          <slot></slot>
        </span>
        <img src="../../assets/imgs/arrow.png" alt="">
    </div>
  </router-link>
</template>
<script>
//在需要用到按钮的地方引入并注册，import yanCellArrow from "@/components/yanCellArrow"
// 示例：<yan-cell-arrow v-for="(item,index) in list" :key="index">{{item}}</yan-cell-arrow>
export default {
  props:['path'],
  data () {
    return {
     
    }
  },
  created() {
    
  },
  
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
a{
  display: block;
  padding-left:4.26vw;
  height:.4rem;
  outline:none;
  .box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:100%;
    padding-right:4.26vw;
    color:#363636;
    font-size: .14rem;
    border-bottom:1px solid #E1E1E1;
    img{
      width:.06rem;
      height:.1rem;
    }
  }
}
</style>
