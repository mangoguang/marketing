<template>
  <div class="inputBox" @click="jump">
      <label>
          <span>{{label}}<span class="yan-red" v-show="required">*</span></span>
          <!-- <input  type="text" :value="value" readonly  :placeholder="placeholder" @input="$emit('input',$event.target.value)"> -->
           <textarea  rows="1" cols="1" :value="value" readonly  :placeholder="placeholder" @input="$emit('input',$event.target.value)"></textarea>
      </label>
      <div class="icon-right" v-if="showIcon">
        <img src="../../assets/imgs/rightside.png" alt="">
      </div>
   </div>
</template>

<script>
export default {
  props:['value','label','placeholder','showIcon','required','path','id','url'],
  data(){
    return{

    }
  },
  methods:{
    jump(){
      if(this.showIcon){
        this.$router.push({name:'selectAddress',params:{customerId:this.id},query:{redirect:this.url}})
      }else{
        return;
      }
     
    }
  }
 
}
</script>

<style lang="scss" scoped>
.inputBox{
  font-size: 4vw;
  color:#363636;
  max-height:12vw;
  line-height: 12vw;
  padding-right:4.266vw;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  label{
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    span{
      display: inline-block;
      width:22.4vw;
    }
    .yan-red{
      display: inline;
      color:#FB222B;
    }
    
  }
  input:-moz-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-moz-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-ms-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-webkit-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input{
    color:#363636;
    font-size: 4vw;
    flex: 1;
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
      flex: 1;
      outline: none;
      resize: none;
      border:none;
      height:12vw;
      line-height: 12vw;
      overflow: scroll;
    }
  .icon-right{
    margin-left:2.133vw;
    //padding-right:4.266vw;
    img{
      width: 1.86vw;
      height: 3.06vw;
    }
  }
}
</style>
