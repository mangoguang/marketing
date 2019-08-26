<template>
  <li>
    <span>{{list.name}}</span>
    <img src="../../../assets/imgs/chooseShop.png" alt v-show="list.status">
  </li>
</template>
<script>
export default {
  props: ['list']
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #e1e1e1;
  line-height: 11.86vw;
  align-items: center;
  margin-left: 4.26vw;
  padding-right: 4.4vw;
  img {
    width: 2.66vw;
    height: 2.66vw;
  }
}
</style>
