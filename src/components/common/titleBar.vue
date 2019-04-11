<template>
 <div class="yan-title-bar">
   <div class="yan-title-left">
     <i class="bar"></i>
     <span>{{text}}</span>
   </div>
   <slot></slot>
 </div>
</template>

<script>
export default {
  props: ['text'],
  data() {
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
.yan-title-bar{
  width:100vw;
  padding:3.466vw 4.266vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .yan-title-left{
    display: flex;
    flex-direction: row;
    align-items: center;
    .bar{
      display: block;
      width:2px;
      height:4vw;
      background: #037CFF;
      border-radius: 1px;
      margin-right:2.133vw;
    }
    span{
      color:#363636;
      font-size: 4.266vw;
      font-weight: bold;
    }
  }
  button{
    background:none;
    outline: none;
    color:#007AFF;
    font-size: 3.733vw;
    font-weight:bold;
  }
}
</style>

