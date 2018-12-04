<template>
  <div class="dealCustomer">
    <ul>
      <li  v-for="(item, index) in dealCustomerList"
        :key="`customerList${index}`" @click="getDetails()">
        <span>{{index + 1}}</span>
        <span>{{item.name}}</span>
        <span>{{item.sex}}</span>
        <span>{{item.phone}}</span>
        <span>{{item.level}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'


export default {
  props: ['changeResultTit'],
  data(){
    return{
      dealCustomerList:[
        {name:'张三',sex:'男',phone:15999999999,level:'高'},
        {name:'李四',sex:'男',phone:15999999999,level:'低'},
        {name:'张三',sex:'男',phone:15999999999,level:'高'},
        {name:'李四',sex:'男',phone:15999999999,level:'低'},
        {name:'张三',sex:'男',phone:15999999999,level:'高'},
        {name:'李四',sex:'男',phone:15999999999,level:'低'},
        {name:'张三',sex:'男',phone:15999999999,level:'高'}
      ]
    }
  },
  mounted() {
    this.$emit('changeResultTit', `全部客户（7）`)
  },
  methods:{
    getDetails() {
      this.$router.push({path:'/dealDetails'})
    }
  }
}
</script>


<style lang="scss" scoped>
.dealCustomer{
  padding-top: 26vw;
  background: #f8f8f8;
  ul{
    border-top:1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    padding-left: 4.266vw;
    color:  #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    li{
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      border-top: 1px solid #e1e1e1;
      span:nth-child(2){
        color: #363636;
        flex: 0.3;
      }
      span:nth-child(5){
        color: #363636
      }
      span:nth-child(3){
        flex:0.1
      }
      span:nth-child(4){
        flex:0.4
      }
    }
    li:nth-child(1){
      border-top: none;
    }
  }
}
</style>

