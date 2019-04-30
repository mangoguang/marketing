<template>
  <li :class="`customerLi ${icon ? 'icon' : ''}`">
    <span class='customerli-text'>{{leftText}}
      <strong style="color: #fb222b">{{ start }}</strong>
    </span>
    <slot></slot>  <!-- input或者span-->
    <span></span>  <!-- 图标-->
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
    
  }
}
</script>

<style lang="scss" scoped>
  .customerLi{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 5vw;
    background: #fff;
    box-sizing: border-box;
    overflow-x: hidden;
    width: 100vw;
    span {
      display: table-cell;
      vertical-align: middle;
    }
    .customerli-text {
      padding-right: 6vw;
      // width:16vw;
    }
    span:nth-child(2) {
      width: 60vw;
      overflow-x: scroll;
      overflow-y: scroll;
      height:3em;
      line-height:3em;
    }
    span{
      color: #363636;
      line-height: 3em;
    }
    strong {
      font-weight: normal;
      margin-right: -1vw;
      box-sizing: border-box;
      display: inline-block;
    }
    input{
      // border: 1px solid red;
      font-size: 3.73vw;
    }
  }
  .customerLi2{
    height: 18vw;
    span{
      height: 18vw!important;
      line-height: 9vw!important;
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
