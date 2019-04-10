<template>
  <li :class="`customerLi ${icon ? 'icon' : ''}`">
    <span>{{leftText}}
      <strong style="color: #fb222b">{{ start }}</strong>
    </span>
    <slot></slot>
    <!-- <span>{{mindText}}</span> -->
    <span></span>
  </li>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import mango from '../../js'
export default {
  name:'customerDemand',
  props: ['leftText', 'icon', 'start'],
  data(){
    return{

    }
  },
  created(){
  },
  methods: {
    getCustomerInfo() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
  .customerLi{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 5vw;
    background: #fff;
    span{
      color: $fontCol;
      line-height: 3em;
    }
    strong {
      font-weight: normal;
    }
    span:first-child{
      margin-right: 5vw;
    }
    input{
      flex: 1;
      font-size: $fontSize;
    }
  }
  .icon{
    position: relative;
    span:last-child{
      position: absolute;
      top: 50%;
      right: 5vw;
      margin-top: -2.5vw;
      width: 5vw;
      height: 5vw;
      background: url(../../assets/imgs/rightside.png) no-repeat;
      background-size: auto 60%;
      background-position: right 0 center;
    }
  }
</style>
