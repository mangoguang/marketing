<template>
  <div class="yan-layer-shade">
      <div class="yan-layer-box">
        <div class="yan-layer-content">
          <img src="../../assets/imgs/fail.png" alt="">
          <textarea :placeholder="placeholder" :readonly='readonly' :value="value" @input="$emit('input',$event.target.value)"></textarea>
          <div class="yan-btn-group">
              <div class="yan-btn" @click="update">
                <slot name="update"></slot>
              </div>
              <div class="yan-btn" @click="cancel">
                 <slot name="cancel"></slot>
              </div>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
export default {
  props:['placeholder','readonly','value'],
  data(){
    return{

    }
  },
  methods:{
    update(){
      this.$emit('update');
    },
    cancel(){
      this.$emit('cancel');
    }
  }
 
}
</script>

<style lang="scss" scoped>
.yan-layer-shade{
  position:fixed;
  top:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5);
  .yan-layer-box{
    position: absolute;
    top:40%;
    left:50%;
    width:74.666vw;
    height:49.333vw;
    background: #fff;
    border-radius: 1.333vw;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    .yan-layer-content{
      text-align: center;
      padding-top:1.333vw;
      position: relative;
      height:100%;
      box-sizing: border-box;
    }
    img{
      width:5.6vw;
    }
     textarea::-moz-placeholder{
      color:#999;
      font-size:3.733vw;
    }
     textarea:-moz-placeholder{
      color:#999;
      font-size:3.733vw;
    }
    textarea::-ms-input-placeholder{
      color:#999;
      font-size:3.733vw;
    }
    textarea::-webkit-input-placeholder{
      color:#999;
      font-size:3.733vw;
    }
    textarea{
      color:#363636;
      font-size:3.733vw;
      width:69.333vw;;
      height: 25.333vw;
      background: #EFEFF4;
      outline: none;
      resize: none;
      border:none;
      padding:2.666vw;
      box-sizing: border-box;
      border-radius:1.333vw;
    }
    .yan-btn-group{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-top:1px solid #E1E1E1;
      .yan-btn{
        flex:1;
        height:13.333vw;
        color:#363636;
        font-size: 4.8vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:center;
      }
      .yan-btn:last-child{
        color:#909090;
        border-left:1px solid #E1E1E1;
      }
    }
   
  }
}
</style>
