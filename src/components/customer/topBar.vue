<template>
  <div class="topBar">
    <span>{{topBarTitle.leftTitle}}</span>
    <span>{{topBarTitle.centerTitle}}</span>
    <span>{{topBarTitle.rightTitle}}</span>
  </div>
</template>

<script>
export default {
  props:['topBarTitle']
}
</script>

<style lang="scss" scoped>
  .topBar{
    z-index: 99;
    position: fixed;
    height: 10.81vw;
    background: #efeff4;
    display: flex;
    justify-content: space-between;
    color: #363636;
    font-size: 3.73vw;
    width: 100%;
    box-sizing: border-box;
    padding: 0 4.27vw;
    align-items: center;
    margin-top: -12.6vw;
  }
</style>
