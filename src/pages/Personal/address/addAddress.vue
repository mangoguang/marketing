<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff"></mybanner>
      <ul class="list">
        <li>
          <area-select v-bind="formInfo.areaInfo" v-model="form.area" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.addressInfo" v-model="form.address" :showIcon="inputIcon" class="li_border"/>
        </li>
        <li>
          <house-select v-bind="formInfo.houseInfo" v-model="form.house" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <elevator-select v-bind="formInfo.elevatorInfo" v-model="form.elevator" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.remarkInfo" v-model="form.remark"/>
      <btn text='保存' style="position:absolute;bottom:6.4vw;left:0;right:0" @click.native='jump'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import yanInput from '../../../components/yanInput'
import yanTextarea from '../../../components/yanTextarea'
import areaSelect from '../../../components/mySelect/areaSelect'
import houseSelect from '../../../components/mySelect/houseSelect'
import elevatorSelect from '../../../components/mySelect/elevatorSelect'
import { Picker, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Picker.name, Picker);
export default {
  data () {
    return {
      form:{
        address:'',
        remark:'',
        area:'',
        house:'',
        elevator:''
      },
      selectIcon:true,
      inputIcon:false
    
    }
  },
  components:{
     mybanner,
     Btn,
     yanInput,
     yanTextarea,
     areaSelect,
     houseSelect,
     elevatorSelect
  },
  computed:{
    ...mapState('addAddress',[
      'title',
      'formInfo'
    ])
  },
  created(){
   
  },
  
  mounted(){

  },
  methods:{
   jump(){
     this.$router.push({path:'/address'})
   }
      
  }
};
</script>

<style lang="scss" scoped>
 .addAdress{
   width:100vw;
   min-height: 100vh;
   position: relative;
   box-sizing: border-box;
  padding-top:16.466vw;
  .list{
    width:100vw;
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
    li{
      padding-left:4.266vw;
      .li_border{
        border-bottom: 1px solid #e1e1e1;
        padding-left:none;
      }
    }
  }

 }
</style>
