<template>
  <div class="yan-searchList">
     <label class="yan-label" v-for="(item,index) in options" :key="index">
       <slot :info="item"></slot>
       <input type="radio" :name='name' :value="item.id" @change="updateVal" class="yan-radio">
       <span></span>
     </label>
  </div>
</template>
<script>
export default {
  props:['options','name'],
  data(){
    return{

    }
  },
  methods:{
    updateVal(ev){
      this.$emit('change',ev.target.value);
    }
  }
 
}
</script>

<style lang="scss" scoped>
.yan-searchList{
  width:100vw;
  .yan-label{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right:4.266vw;
    border-bottom: 1px solid #e1e1e1;
    min-height: 12vw;
    margin-left:4.266vw;
    .yan-radio{
      display:none;
      & + span{
        display:none;
        width:2.933vw;
        height:2.933vw;
        background:none;
        background-size: 100% 100%;
      }
    }
  .yan-radio:checked{
      & + span{
        display:block;
        width:2.933vw;
        height:2.933vw;
        background:url("../../assets/imgs/get.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  
}
</style>
