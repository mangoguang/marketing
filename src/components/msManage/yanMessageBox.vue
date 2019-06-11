<template>
  <div class="yan-mask">
      <div class="message-box">
          <img src="../../assets/imgs/warn.png" alt="" class="warn" v-if="!type">
          <img src="../../assets/imgs/success.png" alt="" class="success" v-else>
          <p>
            <slot></slot>
          </p>
          <div class="btn-group" v-show="btnNum==2">
           <!--  <button type="button">确定</button>
            <button type="button">取消</button> -->
            <slot name="btn-group"></slot>
          </div>
          <div class="btn" v-show="btnNum!==2">
            <slot name="btn"></slot>
            <!-- <button type="button">确定</button> -->
          </div> 
      </div>
  </div>
</template>
<script>
export default {
  props:{
    type:{
      type:Boolean,
      default:true
      
    },
    btnNum:{
      type:Number,
      default:2
    }
  },
  data () {
    return {
     
    }
  },
  created() {
    
  },
  
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
.yan-mask{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 1000;
  background: rgba($color: #000000, $alpha: 0.5);
  .message-box{
    position: absolute;
    top:40%;
    left:50%;
    transform: translate(-50%,-50%);
    width:74.66vw;
    min-height: 38.66vw;
    background: #fff;
    border-radius: 1.33vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top:4.53vw;
    overflow: hidden;
    .warn{
      width:10.13vw;
      height:10.13vw;
    }
    .success{
      width:10.4vw;
      height:10.4vw;
    }
    p{
      padding:0 5.33vw;
      text-align: center;
      font-size: .14rem;
      color:#666;
      margin:4vw 0;
    }
    .btn-group{
      width:100%;
      height: 13.33vw;
      color:#363636;
      font-size: .18rem;
      border-top:1px solid #E1E1E1;
      display:flex;
      flex-direction: row;
      align-items: center;
      :first-child{
        flex:0 0 50%;
        height: 100%;
        border-right: 1px solid #E1E1E1;
        display: block;
        text-align: center;
        display:flex;
        justify-content: center;
        font-size: .18rem;
        color:#363636;
      }
      :last-child{
        flex:0 0 50%;
        height: 100%;
        display: block;
        text-align: center;
        display:flex;
        justify-content: center;
        color:#909090;
        font-size: .18rem;
      }
    }
    .btn{
      width:100%;
      height: 13.33vw;
      color:#363636;
      font-size: .18rem;
      border-top:1px solid #E1E1E1;
      display:flex;
      flex-direction: row;
      align-items: center;
      :first-child{
        flex:1;
        height: 100%;
        border-right: 1px solid #E1E1E1;
        display: block;
        text-align: center;
        display:flex;
        justify-content: center;
        font-size: .18rem;
        color:#363636;
      }
    }
  }
}
</style>
