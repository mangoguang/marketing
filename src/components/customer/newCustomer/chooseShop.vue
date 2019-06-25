<template>
  <div class="shop">
    <div class="shopList" :class="isOn&&status?'on':''">
      <div class="shopLi">
        <label @click="changeStatus">
          <span>{{picked.name}}</span>
          <img src="../../../assets/imgs/open.png" alt="" class="down">
        </label>
      </div>
      <div v-for="item in shopList" :key="item.crmId" class="shopLi">
        <label>
          <span>{{item.name}}</span>
          <img src="../../../assets/imgs/picked.png" alt="" v-show="check===item.crmId" class="get">
          <input type="radio" :value="item.crmId" v-model="check" @change="updateShop">
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['status'],
  data(){
   return {
    shopList:[],
    check:'',
    isOn:false
   }
  },
  computed:{
    picked(){
      let obj;
      this.shopList.map((item,index) => {
        if(item.crmId===this.check){
          obj=item;
        }
      })
      return obj;
    }
  },
  created(){
    let shop=localStorage.getItem('shops');
    this.shopList=JSON.parse(shop);
    this.check=this.shopList[0].crmId;
  },
  methods: {
    updateShop(ev){
      this.isOn=false;
      this.$emit('change',ev.target.value)
    },
    changeStatus(){
      this.isOn=!this.isOn;
    }
   
  }
  
}
</script>
<style lang="scss" scoped>
.shop {
  margin-top:2.666vw;
 .shopLi{
   label{
     width:80vw;
     display: flex;
     align-items: center;
     justify-content: space-between;
     margin:0 auto;
     color:#999;
     padding:0 8vw;
     box-sizing: border-box;
     background: #eee;
     border-bottom: 1px solid #e1e1e1;
     font-size: 12px;
     span{
       flex:0 0 55vw;
       padding:6px 0;
     }
     .down{
       width:3.2vw;
     }
     .get{
       width:2.933vw;
     }
     input{
       display: none;
     }
   }
 }
 & > .shopList{
   height: 11.733vw;
   overflow-y: hidden;
   transition: height .5s linear;
   :first-child{
     label{
      border-radius:5.8665vw;
      span{
        height:11.733vw;
        line-height: 11.733vw;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        padding:0;
      }
    }
   }
   :last-child{
     label{
      border-bottom-left-radius:5.8665vw;
      border-bottom-right-radius: 5.8665vw;
      border-bottom:none;
    }
   }  
 }
 & > .on{
   height:auto;
   //overflow-y: auto;
   :first-child{
     label{
      border-bottom-left-radius:0;
      border-bottom-right-radius: 0;
     }
   }
 }
}
</style>
