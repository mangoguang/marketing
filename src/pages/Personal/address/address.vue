<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;"></mybanner>
      <div class="list">
        <div class="noRecord" v-if='!hasRecord'>
          <p>暂无地址</p>
          <p>请添加地址哦~</p>
          <img src="../../../assets/imgs/arrow-down.png" alt="">
        </div>
       <customer-address v-for="(item,index) in addressList" :key="index" :index='index' :id="item.addressId" @edit="edit" @del="del" v-else>
          <div class="address_li">
            <h1 v-if="item.elevator">{{item.apartmentType}}&nbsp;&nbsp;&nbsp;&nbsp;有电梯</h1>
            <h1 v-else>{{item.apartmentType}}&nbsp;&nbsp;&nbsp;&nbsp;无电梯</h1>
            <p>{{item.province}}{{item.city}}{{item.district}}{{item.address}}</p>
          </div>
        </customer-address> 
      </div>
      <btn text='添加新地址' style="position:absolute;bottom:6.4vw;left:0;right:0" @click.native='jump'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import customerAddress from '../../../components/mySwipe/customerAddress'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import mango from '../../../js'
import { IndexModel } from '../../../utils' 
const indexModel = new IndexModel()
export default {
  data () {
    return {
      hasRecord:true
    }
  },
  components:{
     mybanner,
     Btn,
     customerAddress
  },
  computed:{
    ...mapState('address',[
      'title',
      'addressList'
    ])
  }, 
  created(){
   this.getAddressList();
  },
  
  mounted(){
   
  },
  methods:{
   ...mapMutations('address',['updateAddress','delAddress']),
   jump(){
     this.$router.push({name:'addAddress',params:{customerId:this.$route.params.customerId}});
   },
   edit(index,id){
     console.log(id);
     this.$router.push({name:'addAddress',params:{customerId:this.$route.params.customerId},query:{addressId:id}});

   },
   del(index,id){
     console.log(id);
     let obj={
       addressId:id,
       customerId:this.$route.params.customerId,
       status:'N'
     }
     indexModel.updateAddressStatus(obj).then(res => {
       if(res.code===0){
          mango.tip(res.msg);
          this.delAddress(index);
          let listItems=document.querySelectorAll('.yan-swipe-left');
          for (let i=0;i<listItems.length;i++) {
            listItems[i].style="transform:translateX(0px)";
          }
       }else{
         mango.tip(res.msg);
       }
     });
    },
    getAddressList(){
      let id=this.$route.params.customerId;
      indexModel.getAddressList(id).then(res => {
        console.log(res);
        if(res.code===0){
          if(res.data.length>0){
            this.updateAddress(res.data);
            this.hasRecord=true;
          }else{
            this.hasRecord=false;
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
 .address{
  width:100vw;
  min-height:100vh;
  padding-bottom: 25.866vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
   .list{
    margin-top:16.466vw;
    width:100vw;
    overflow-x: hidden;
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
    .address_li{
       h1{
          color:#363636;
          font-size: 4vw;
          margin-bottom:2.666vw;
        }
        p{
          font-size: 3.2vw;
          color:#363636;
        }
    }
   }
 }
</style>
