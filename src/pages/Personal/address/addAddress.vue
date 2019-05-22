<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff"></mybanner>
      <ul class="list">
        <li>
          <area-select v-bind="formInfo.areaInfo" v-model="area" readonly @update="updateArea" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <!-- <yan-input v-bind="formInfo.addressInfo" v-model.trim="form.address" :showIcon="inputIcon" class="li_border" :maxlength='200'/>-->
          <yan-one-input v-bind="formInfo.addressInfo" v-model.trim="form.address" :showIcon="inputIcon" class="li_border" :maxlength='200'/> 
        </li>
        <li>
          <house-select v-bind="formInfo.apartmentType" v-model="apartmentType" @update="updateApartmentType" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <elevator-select v-bind="formInfo.elevatorInfo" v-model="elevator" @update="updateElevator" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.remarkInfo" v-model="form.remark" :maxlength='200'/>
      <btn text='保存' @click.native='jump'/>
      
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import yanInput from '../../../components/yanInput'
import yanOneInput from '../../../components/yanOneInput'
import yanTextarea from '../../../components/yanTextarea'
import areaSelect from '../../../components/mySelect/areaSelect'
import houseSelect from '../../../components/mySelect/houseSelect'
import elevatorSelect from '../../../components/mySelect/elevatorSelect'
import { Picker, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Picker.name, Picker);
import mango from "../../../js"
import { resize } from '../../../utils/public'
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
      inputIcon:false,
      status:true
    
    }
  },
  components:{
     mybanner,
     Btn,
     yanInput,
     yanTextarea,
     areaSelect,
     houseSelect,
     elevatorSelect,
     yanOneInput
  },
  computed:{
    ...mapState('addAddress',[
      'title',
      'formInfo'
    ])
  },
  created(){
   this.$set(this.form,'customerId',this.$route.params.customerId);
   if(this.$route.query.addressId){
      this.form.id=this.$route.query.addressId;
      this.updateTitle('编辑地址');
      this.getAddress(this.form.id);
   }else{
     this.updateTitle('新建地址');
   }
  
  },
  
  mounted(){

    //this.status=resize(this.status);
  },
  methods:{
    ...mapMutations('addAddress',['updateTitle']),
    getAddress(id){
      indexModel.getAddress(id).then(res => {
        if(res.code===0){
          this.form.address=res.data.address;
          this.form.remark=res.data.remark;
          this.form.apartmentType=res.data.apartmentType;
          this.form.elevator=res.data.elevator==='Y'?'Y':'';
          this.form.country=res.data.country;
          this.form.province=res.data.province;
          this.form.city=res.data.city;
          this.form.district=res.data.district;
          this.elevator=res.data.elevator==='Y'?'是':'否';
          this.area=`${res.data.provinceName}${res.data.cityName}${res.data.districtName}`;
          this.apartmentType=res.data.apartmentTypeName;
        }else{
          mango.tip(res.msg);
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getAddress(id)
        }
      })
    },
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
       console.log(':::', this.form);
        indexModel.updateAddress(this.form).then(res => {
          if(res.code===0){
            mango.tip(res.msg);
            this.$router.back(-1);
            //this.$router.push({name:'address',params:{customerId:this.$route.params.customerId}})
          }else{
            mango.tip('更新失败');
          }
        }).catch((reject) => {
          if (reject === 510) {
            this.updateAddress()
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
     if(this.form.address.length>200){
       this.form.address=this.form.address.substring(0,200);
       mango.tip('地址不能超过200字');
       return false;
     }
     if(this.form.remark.length>200){
       this.form.remark=this.form.remark.substring(0,200);
       mango.tip('备注不能超过200字');
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
