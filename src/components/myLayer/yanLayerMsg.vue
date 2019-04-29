<template>
  <div class="yan-layer-shade">
      <div class="yan-layer-box">
        <div class="yan-layer-content">
          <img src="../../assets/imgs/fail.png" alt="">
          <div class="yan-layer-list">
            <div class="yan-layer-item" v-for="(item,index) in info" :key="index">
              <span>{{item.title}}</span>
              <span>{{item.value}}</span>
            </div>
          </div>
          <div class="yan-btn-group">
              <div class="yan-btn" @click="update">
                <slot name="confirm"></slot>
              </div>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
export default {
  props:['info'],
  data(){
    return{

    }
  },
  methods:{
    update(){
      this.$emit('confirm');
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
    height:50.666vw;
    background: #fff;
    border-radius: 1.333vw;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    overflow: hidden;
    // overflow: scroll;
    .yan-layer-content{
      padding-top:2.666vw;
      position: relative;
      min-height:50.666vw;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom:13.333vw;
    }
    img{
      width:5.6vw;
      margin-bottom:2.666vw;
    }
    .yan-layer-list{
      width:63.2vw;
      .yan-layer-item{
        display: flex;
        flex-direction: row;
        font-size: 3.733vw;
        color:#363636;
      }
      .yan-layer-item:last-child{
        span:first-child {
          width: 20vw;
          display:block;
        }
        span:last-child{
          display: block;
          width:44.533vw;
          height: 12vw;
          overflow: scroll;
          word-break:break-all;
          white-space:pre-wrap
        }
      }
      .yan-layer-item:last-child{
        span:last-child{
          display: block;
          width:44.533vw;
          height:44.533vw;
          overflow: scroll;
        }
      }
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
