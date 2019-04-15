<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff"></mybanner>
      <ul class="list">
        <li>
          <area-select v-bind="formInfo.areaInfo" v-model="area" readonly @update="updateArea" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.addressInfo" v-model="form.address" :showIcon="inputIcon" class="li_border"/>
        </li>
        <li>
          <house-select v-bind="formInfo.apartmentType" v-model="apartmentType" @update="updateApartmentType" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <elevator-select v-bind="formInfo.elevatorInfo" v-model="elevator" @update="updateElevator" :showIcon="selectIcon"/>
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
import mango from "../../../js"
import { IndexModel } from '../../../utils' 
const indexModel = new IndexModel()
export default {
  data () {
    return {
      form:{
        address:'',
        remark:'',
        apartmentType:'',
        elevator:'',
        customerId:'',
        id:'',
        country:'CN',
        province:'',
        city:'',
        district:''
      },
      elevator:'',
      area:'',
      apartmentType:'',
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
   this.$set(this.form,'customerId',this.$route.params.customerId);
  },
  
  mounted(){

  },
  methods:{
    ...mapMutations('addAddress',['updateTitle']),
   jump(){
    this.updateAddress();
   },
   updateArea(cityname,citycode){
     this.area=cityname;
     this.$set(this.form,'province',citycode.split("-")[0]);
     this.$set(this.form,'city',citycode.split("-")[1]);
     this.$set(this.form,'district',citycode.split("-")[2]);
   },
   updateElevator(name,value){
     this.elevator=name;
     this.$set(this.form,'elevator',value);
   },
   updateApartmentType(name,value){
     this.apartmentType=name;
     this.$set(this.form,'apartmentType',value);
   },
   updateAddress(){
     if(this.valid()){
        indexModel.updateAddress(this.form).then(res => {
          if(res.code===0){
            mango.tip(res.msg);
            this.$router.push({name:'address',params:{customerId:this.$route.params.customerId}})
          }
        })
     }
    
   },
   valid(){
     if(this.customerId==''){
       mango.tip('客户id为空');
       return false;
     }
     if(this.form.province==''||this.form.city==''||this.form.district==''){
       mango.tip('请选择地区');
       return false;
     }
     if(this.form.address==''){
       mango.tip('请填写详细地址');
       return false;
     }
     if(this.form.apartmentType==''){
       mango.tip('请选择户型');
       return false;
     }
     if(this.elevator==''){
       mango.tip('请选择有无电梯');
       return false;
     }
     return true;
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
