<template>
  <div :class="show?'foldInput on':'foldInput'">
      <div class="inputBox" >
        <label>
            <span>{{label}}<span class="yan-red" v-show="required">*</span></span>
            <p>{{value}}</p>
        </label>
        <div class="icon-right" @click="open">
          <img src="../assets/imgs/open.png" alt="">
        </div>
    </div>
    <p class="value">{{value}}</p>
  </div>
</template>

<script>
export default {
  props:['label','required','value'],
  data(){
    return{
      show:false
    }
  },
  watch:{
    value(newValue,oldValue){
      if(!newValue){
        this.show=false
      }
    }
  },
  methods:{
    open(){
      if(!this.value){
        this.show=false
      }else{
        if(this.show){
          this.show=false
        }else{
          this.show=true
        }

      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.foldInput{
  .value{
      margin:0 4.266vw;
      height:0;
      overflow:hidden;
      transition: height .5s;
  }
  .inputBox{
    border:none;
  }
}
.on{
  .value{
      height:auto;
  }
  .inputBox{
    border-bottom:1px solid #e1e1e1;
  }
}
.inputBox{
  font-size: 4vw;
  color:#363636;
  height:auto;
  line-height: 12vw;
  display:flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding:0 4.266vw;
  label{
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    align-self: flex-start;
    span{
      display: inline-block;
      width:22.4vw;
    }
    .yan-red{
      display: inline;
      color:#FB222B;
      font-size: 4vw;
    }
    p{
      width:60vw;
      word-break: all;
      text-align: justify;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    
    
  }

  .icon-right{
    margin-left:2.133vw;
    //padding-right:4.266vw;
    img{
      width: 3.2vw;
    }
  }
  
}
</style>
