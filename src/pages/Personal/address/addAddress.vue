<template>
    <div class="addAdress">
      <mybanner :title="title" style="border:none;background:#fff"></mybanner>
      <ul class="list">
        <li><yanInput v-bind="addressInfo" v-model="form.address" :showIcon="false" class="li_border"/></li>
        <li>6666</li>
      </ul>
      <div class="remark">
        <p>备注信息</p>
        <textarea name="" id="" placeholder="填写备注信息" v-model="form.remark"></textarea>
      </div>
      <btn text='保存' style="position:absolute;bottom:6.4vw;left:0;right:0" @click.native='jump'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import yanInput from '../../../components/yanInput'
import { Picker, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Picker.name, Picker);
export default {
  data () {
    return {
      form:{
        address:'',
        remark:''
      }
    
    }
  },
  components:{
     mybanner,
     Btn,
     yanInput
  },
  computed:{
    ...mapState('addAddress',[
      'title',
      'addressInfo'
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

<style lang="scss">
 .addAdress{
   width:100vw;
   min-height: 100vh;
   position: relative;
   box-sizing: border-box;
  padding-top:16.466vw;
  .list{
    width:100vw;
    border-bottom: 1px solid #e1e1e1;
    li{
      padding-left:4.266vw;
      .li_border{
        border-bottom: 1px solid #e1e1e1;
        padding-left:none;
      }
    }
  }
  .remark{
    p{
      color:#363636;
      font-size:4vw;
      padding-left: 4.266vw;
      margin-top:4vw;
      margin-bottom:2.666vw;
    }
    textarea::-moz-placeholder{
      color:#999;
      font-size:4vw;
    }
     textarea:-moz-placeholder{
      color:#999;
      font-size:4vw;
    }
    textarea::-ms-input-placeholder{
      color:#999;
      font-size:4vw;
    }
    textarea::-webkit-input-placeholder{
      color:#999;
      font-size:4vw;
    }
    textarea{
      color:#363636;
      font-size:4vw;
      width:100vw;
      min-height: 23.733vw;
      background: #fff;
      outline: none;
      resize: none;
      border:1px solid #e1e1e1;
      border-left:none;
      border-right: none;
      padding:4.266vw;
      box-sizing: border-box;
    }
  }
 }
</style>
