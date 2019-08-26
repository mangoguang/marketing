<template>
 <div>
  <div class="yan-select-list">
    <span class="label">{{label}}</span>
    <div class="yan-select-box">
      <label v-for="(item,index) in options" :key="index">
        <input type="radio" :name="name" :value="item" :checked="checked===item" @change="updataVal" class="yan-radio">
        <span>{{item}}</span>
      </label>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  props:['options','name','label','checked'],
  data(){
    return{
     
    }
  },
  mounted(){
    let radiosList=document.getElementsByName(`${this.name}`);
    //console.log(radiosList);
    radiosList.forEach((item,index) => {
      //console.log(item);
      if(item.value===this.checked){
        item.checked=true;
        //this.isChecked=true;
      }else{
        item.checked=false;
        //this.isChecked=false;
      }
    });
  },
  methods:{
    updataVal(ev){
      this.$emit('update',ev.target.value);
    }

  }

}
</script>

<style lang="scss" scoped>
.yan-select-list{
  width:100vw;
  padding:0 4.266vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  .label{
    font-size: 4vw;
    color:#363636;
  }
  .yan-select-box{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex:1;
    margin-left:9.333vw;
    label{
      display: block;
      text-align: center;
      span{
        display: block;
        width:15vw;
        height:10.666vw;
        line-height: 10.666vw;
        font-size:3.733vw;
        overflow: hidden;
        border-radius: 1.6vw;
      }
     .yan-radio{
       display: none;
       & + span{
         color:#666;
         background: #fff;
       }
     }
     .yan-radio:checked{
       & + span{
         color:#007AFF;
         background: #B2D7FF;
       }
     }
    }
  }
}

 

</style>
