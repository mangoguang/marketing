<template>
  <div class="yan-select-list">
    <div class="yan-select" v-for="(item,index) in options" :key="index">
      <label class="yan-radio-label">
        <div class="yan-radio-icon">
          <input type="radio" :name="name" class="yan-radio" @change="updataVal" :value="item.addressId" :checked="id===item.addressId?true:false">
          <span></span>
        </div>
        <div class="yan-select-content">
          <slot :info="item"></slot>
        </div>
      </label>
      <div class="yan-edit" @click="edit(item.addressId)">编辑</div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex"

export default {
  props:['options','name'],
  data(){
    return{
     province:'',
     city:'',
     county:''
    }
  },
  computed:{
    ...mapState({
      id:state => state.addressId
    })
  },
  methods:{
    ...mapMutations(['setAddressId']),
    updataVal(ev){
      this.$emit('change',ev.target.value); 
    },
    edit(id){
      this.$emit('edit',id);
    }

  }

}
</script>

<style lang="scss" scoped>
.yan-select-list{
  width:100vw;
  .yan-select{
    margin:0 4.266vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #E1E1E1;
    padding:2.4vw 0;
    .yan-radio-label{
      display: flex;
      flex-direction: row;
      align-items: center;
      .yan-radio-icon{
        .yan-radio{
          display: none;
          & + span{
            display: block;
            width:5.866vw;
            height:5.866vw;
            background: url("../../assets/imgs/aselect.png") no-repeat;
            background-size: 100% 100%;
          }   
        }
      .yan-radio:checked{
            display: none;
            & + span{
              display: block;
              width:5.866vw;
              height:5.866vw;
              background: url("../../assets/imgs/aselected.png") no-repeat;
              background-size: 100% 100%;
            }
            
        } 
      }
     
      .yan-select-content{
        width:61.333vw;
        overflow: hidden;
        margin:0 6.133vw 0 4.8vw;
        
      }
    }
    .yan-edit{
      display: flex;
      align-items: center;
      justify-content: center;
      width:13.333vw;
      height:6.666vw;
      color:#999;
      font-size: 3.2vw;
      border:1px solid #ccc;
      border-radius: 2.666vw;
      letter-spacing: 0.66vw;
    }
  }
}

 

</style>
