<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;"></mybanner>
      <div class="address-box">
        <my-select :options="options" name="1" @change="updateVal" @edit="edit" >
          <template slot-scope="props">
              <span>{{props.info.room}}&nbsp;&nbsp;&nbsp;&nbsp;{{props.info.elevator}}</span>
              <p>{{props.info.address}}</p>
          </template>
        </my-select>
      </div>
      <btn text='添加新地址' style="position:absolute;bottom:6.4vw;left:0;right:0" @click.native='jump'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import mySelect from '../../../components/mySelect/select'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      options:[
        {
          id:1,
          room:"三居室1",
          elevator:'电梯房1',
          address:'广东省东莞市厚街镇双岗上环工业区艾慕工业园'
          
        },
        {
          id:2,
          room:"三居室2",
          elevator:'电梯房2',
          address:'广东省东莞市厚街镇双岗上环工业区艾慕工业园'
        },
        {
          id:3,
          room:"三居室3",
          elevator:'电梯房3',
          address:'广东省东莞市厚街镇双岗上环工业区艾慕工业园'
        }
      ]
    }
  },
  components:{
     mybanner,
     Btn,
     mySelect
  },
  computed:{
    ...mapState('selectAddress',[
      'title'
    ])
  }, 
  created(){
   
  },
  
  mounted(){
    
  },
  methods:{
   ...mapMutations('selectAddress',['updateAddress']),
   jump(){
     this.$router.push({path:'/addAddress'});
   },
   //获取选择项
   updateVal(option){
     console.log(option);
   },
   //获取编辑的id
   edit(id){
     console.log(id);
   }
  }
};
</script>

<style lang="scss">
 .address{
  width:100vw;
  min-height:100vh;
  padding-bottom: 25.866vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
   .address-box{
    padding-top:16.466vw;
    span{
      color:#363636;
      font-size: 4vw;
    }
    p{
      color:#363636;
      font-size: 3.2vw;
    }
   }
 }
</style>
