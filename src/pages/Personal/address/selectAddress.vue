<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;"></mybanner>
      <div class="address-box">
        <my-select :options="addressList" name="1" @change="updateVal" @edit="edit" v-if='hasRecord'>
          <template slot-scope="props">
              <span v-if="props.info.elevator">{{props.info.apartmentType}}&nbsp;&nbsp;&nbsp;&nbsp;有电梯</span>
              <span v-else>{{props.info.apartmentType}}&nbsp;&nbsp;&nbsp;&nbsp;无电梯</span>
              <p>{{props.info.province}}{{props.info.city}}{{props.info.district}}{{props.info.address}}</p>
          </template>
        </my-select>
        <div class="noRecord"  v-else>
          <p>暂无地址</p>
          <p>请添加地址哦~</p>
          <img src="../../../assets/imgs/arrow-down.png" alt="">
        </div>
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
import { IndexModel } from '../../../utils'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      fromPath:'',
      type: ''
    }
  },
  components:{
     mybanner,
     Btn,
     mySelect
  },
  computed:{
    ...mapState('selectAddress',[
      'title',
      'hasRecord',
      'path'
    ]),
   ...mapState({
     addressList:state => state.addressList
   })
  }, 
  created(){
   this.getAddressList();
   if(this.$route.query.type) {
     this.type = this.$route.query.type
   }
  },
  
  mounted(){
    
  },
  methods:{
   ...mapMutations(['updateAddress','setAddressId']),
   ...mapMutations('selectAddress',['updateHasRecord','updatePath']),
   jump(){
     this.$router.push({name:'addAddress',params:{customerId:this.$route.params.customerId}});
   },
   //获取选择项
   updateVal(id){
     if(this.type === 'intention') {
       this.setAddressId(id)
       this.$router.go(-1)
     }else {
       setTimeout(() => {
        this.setAddressId(id);
        //this.$router.replace({path:this.$route.query.redirect,query:{addressId:id}})
        this.$router.go(-1);
      },100)
     }
    //  console.log(222,id);
   },
   //获取编辑的id
   edit(id){
    //  console.log(id);
     let customerId=this.$route.params.customerId;
    //  console.log('customerId',customerId);
     let addressId=id;
     //let redirect=this.$route.query.redirect;
     if(this.type === 'intention') {
       this.$router.push({name:'addAddress',params:{customerId:customerId},query:{addressId:addressId}});
     }else {
        this.$router.push({name:'addAddress',params:{customerId:customerId},query:{addressId:addressId}});
     }
   },
   //获取地址
   getAddressList(){
      let id=this.$route.params.customerId;
      indexModel.getAddressList(id).then(res => {
        // console.log(res);
         if(res.code===0){
           if(res.data.length>0){
             this.updateAddress(res.data);
             this.updateHasRecord(true);
           }else{
             this.updateHasRecord(false);
           }
         }
      }).catch((reject) => {
        if (reject === 510) {
          this.getAddressList()
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    
    next();
  },
  beforeRouteLeave(to,from,next){
    if(to.name==="updateintention"){
      to.meta.isUseCache=true;
      next();
    }
    next();
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
      word-break: break-all;
      text-align: justify;
    }
    .noRecord{
      text-align: center;
      font-size:2.933vw;
      color:#909090;
      line-height: 6.4vw;
      padding-top:14.133vw;
      img{
        width:4vw;
        margin-top:4vw;
      }
    }
   }
 }
</style>
