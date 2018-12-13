<template>
  <button class="bigBtn">{{text}}</button>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import mango from '../../js'
export default {
  name:'bitBtn',
  props: ['text']
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
  .bigBtn{
    width: 80vw;
    height: 13.6vw;
    background: #040404;
    font-size: 18px;
    color: #fff;
    margin: 5vw auto;
  }
</style>
