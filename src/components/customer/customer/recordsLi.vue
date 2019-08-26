<template>
  <li :class="`recordsLi`">
    <p>{{1}}</p>
    <div class="product">
        <p>{{'BCK-093床架'}}</p>
        <span>{{'2018-11-17'}}</span>
    </div>
    <span class="details">详情</span>
    <div class="right-icon">
        <img src="../../../assets/imgs/rightside.png" alt="">
    </div>
  </li>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import mango from '../../js'
export default {
  name:'recordsLi',
  props: ['leftText', 'icon'],
  data(){
    return{

    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
  methods: {
    getCustomerInfo() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
    li{
      background: #fff;
      margin-top: 2vw;
      height: 17.33vw;
      display: flex;
      align-items: center;
      padding: 0 4.66vw;
      p{
        color: #999;
        font-size: 4.53vw;
        flex: 0.1;
      }
      span{
        color: #909090;
        font-size: 3.73vw;
      }
      .product{
        display: flex;
        flex-direction: column;
        flex: 0.9;
        p{
          color: #363636;
        }
      }
      .right-icon{
        padding-left:2vw;
        img{
          width: 1.86vw;
          height: 3.06vw;
        }
        
        
      }
    }
</style>
