<template>
  <div class="shop">
    <div>
      <label for="">
          <span>{{picked.name}}</span>
          <img src="../../../assets/imgs/open.png" alt="">
      </label>
      <div v-for="item in shopList" :key="item.crmId" class="list">
        <label>
          <span>{{item.name}}</span>
          <img src="../../../assets/imgs/picked.png" alt="" v-show="check===item.crmId">
          <input type="radio" :value="item.crmId" v-model="check">
        </label>
      </div>
    </div>
      <!-- <input 
        type="radio" 
        name="radioComp"
        :id="textVal.id" 
        :value="textVal.name" 
        @change="updataInp"
        v-on:input="$emit('input', $event.target.value)"
        :checked="textVal.id == 1"
        > -->
     
   
  </div>
</template>
<script>
export default {
  props: [],
  data(){
   return {
    shopList:[],
    check:''
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
    updataInp(el) {
      this.$emit('change', el.target.value)
    }
  }
  
}
</script>
<style lang="scss" scoped>
.shop {
 .list{

 }
}
</style>
