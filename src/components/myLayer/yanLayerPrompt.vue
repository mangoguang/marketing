<template>
  <div class="yan-layer-shade">
      <div class="yan-layer-box">
        <div class="yan-layer-content">
          <img src="../../assets/imgs/fail.png" alt="" v-show="type==='2'">
          <img src="../../assets/imgs/getOrder.png" alt=""  v-show="type==='1'">
          <div class="order">
            <label>
              <input type="radio" v-model="type" value="1" />
              <span></span>
              已成单
            </label>
            <label>
              <input type="radio" v-model="type" value="2" />
              <span></span>
              未成单
            </label>
          </div>
          <textarea :placeholder="placeholder"  maxlength="200" :readonly='readonly' :disabled="type==='1'?true:false"  :value="value" @input="$emit('input',$event.target.value)"></textarea>
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
  props:['readonly','value'],
  data(){
    return{
      type:'1'
    }
  },
  computed:{
    placeholder:function(){
      if(this.type==='1'){
        return "已成单"
      }else{
        return "请输入战败原因"
      }
    }
  },
  methods:{
    update(){
      this.$emit('update',this.type);
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
    height:62.666vw;
    overflow: hidden;
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
    .order{
        display: flex;
        flex-direction: row;
        justify-content:space-around;
        align-items: center;
        margin-bottom: 3.2vw;
      label{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 3.733vw;
        color:#363636;
      }
      input{
        display: none;
        & + span{
          display: inline-block;
          width:5.866vw;
          height: 5.866vw;
          background:url("../../assets/imgs/aselect.png") no-repeat center center;
          background-size: 100% 100%;
          margin-right:2.933vw;
        }
      }
      input:checked{
        display: none;
        & + span{
          display: inline-block;
          width:5.866vw;
          height: 5.866vw;
          background:url("../../assets/imgs/aselected.png") no-repeat center center;
          background-size: 100% 100%;
          margin-right:2.933vw;
        }
      }
     
      
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
      overflow:scroll;
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
