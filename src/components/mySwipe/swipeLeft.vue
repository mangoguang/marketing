<template>
  <div class="yan-swipe-left">
    <slot></slot>
    <div class="yan-del">{{text}}</div>
  </div>
</template>

<script>
export default {
  props:['text'],
  data(){
    return{

    }
  }

}
</script>

<style lang="scss" scoped>
.yan-swipe-left{
  width:100vw;
  padding-left:4.266vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: row;
  .yan-del{
    width:18.666vw;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background:#FF3338;
    font-size:3.2vw;
    color:#fff;
    text-align: center;
  }
}

</style>
