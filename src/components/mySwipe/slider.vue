<template>
  <div class="yan-swipe-left">
    <div class="yan-box">
      <slot></slot>
    </div>
    <div class="yan-del">{{text}}</div>
  </div>
</template>

<script>
export default {
  props:['text'],
  data(){
    return{
      startX:0,
      endX:0,
      distance:0,
      moveX:0,
      swipe:''
    }
  },
  methods:{
    start(e){
      e=e||event;
      e.preventDefault();
      if(e.touches.length == 1){
        this.startX=e.touches[0].clientX;
      }
    },
    move(e){
      e=e||event;
      e.preventDefault();
      let wd=this.$refs.yanDel.offsetWidth;
      if(e.touches.length == 1){
        this.moveX=e.touches[0].clientX;
        this.distance=this.moveX-this.startX;
        if(this.distance<0){
            this.swipe="translateX("+this.distance*5+"px)";
            if(this.distance>=wd){
              this.swipe="transform:translateX(-"+wd+"px)";
            }
        }
        if(this.distance>0||this.distance==0){
          this.swipe="transform:translateX(0px)";

        }
        

      }
    },
    end(e){
      e=e||event;
      e.preventDefault();
      let wd=this.$refs.yanDel.offsetWidth;
      if(e.changedTouches.length == 1){
        this.endX=e.changedTouches[0].clientX;
        this.distance=this.endX-this.startX;
        if((-this.distance*5)<(wd/2)){
          this.swipe="transform:translateX(0px)";
        }else{
          this.swipe="transform:translateX(-"+wd+"px)";
         
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.yan-swipe-left{
  width:118.666vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  transition:transform .3s;
  .yan-box{
    width:100vw;
    padding-left:4.266vw;
    box-sizing: border-box;
  }
  .yan-del{
    width:18.666vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background:#FF3338;
    font-size:3.2vw;
    letter-spacing: 0.66vw;
    color:#fff;
    text-align: center;
    position: absolute;
    right:0;
    bottom:0;
    top:0;
  }
}
 

</style>
