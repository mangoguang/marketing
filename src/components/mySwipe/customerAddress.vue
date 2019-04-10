<template>
  <div class="yan-swipe-left" :style="swipe" data-type="0">
    <div class="yan-box" >
      <div class="yan-box-left">
        <div class="yan-box-value" @touchstart='start' @touchmove="move" @touchend="end">
          <slot></slot>
        </div>
        <div class="yan-edit"><div class="yan-edit-btn" @click="edit(index)">编辑</div></div>
      </div>
    </div>
    <div class="yan-del" ref="yanDel" @click="del(index)">删除</div>
  </div>
</template>

<script>
export default {
  props:['index','id'],
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
      this.restSlide();
      e=e||event;
      e.preventDefault();
      if(e.touches.length == 1){
        this.startX=e.touches[0].clientX;
      }
    },
    move(e){
      e=e||event;
      e.preventDefault();
      let parentElement=e.currentTarget.parentElement.parentElement.parentElement;
      let wd=this.$refs.yanDel.offsetWidth;
      if(e.touches.length == 1){
        this.moveX=e.touches[0].clientX;
        this.distance=this.moveX-this.startX;
        if(this.distance<0){
            parentElement.dataset.type=1;
            this.swipe="translateX("+this.distance*5+"px)";
            if(this.distance>=wd){
              parentElement.dataset.type=1;
              this.swipe="transform:translateX(-"+wd+"px)";
             
            }
        }
        if(this.distance>0||this.distance==0){
          this.swipe="transform:translateX(0px)";
          parentElement.dataset.type=0;
        }
        

      }
    },
    end(e){
      e=e||event;
      e.preventDefault();
      let parentElement=e.currentTarget.parentElement.parentElement.parentElement;
      let wd=this.$refs.yanDel.offsetWidth;
      if(e.changedTouches.length == 1){
        this.endX=e.changedTouches[0].clientX;
        this.distance=this.endX-this.startX;
        if((-this.distance*5)<(wd/2)){
          this.swipe="transform:translateX(0px)";
          parentElement.dataset.type=0;
        }else{
          parentElement.dataset.type=1;
          this.swipe="transform:translateX(-"+wd+"px)";
         
        }
      }
    },
    restSlide(){
      let listItems=document.querySelectorAll('.yan-swipe-left');
      // 复位
      for (let i=0;i<listItems.length;i++) {
        listItems[i].style="transform:translateX(0px)";
      }
    },
    edit(index){
      this.$emit('edit',index);
    },
    del(index){
      this.$emit('del',index);
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
    .yan-box-left{
      width:100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom:1px solid#E1E1E1;
      padding:2.666vw 0;
      .yan-box-value{
        padding-right: 16.8vw;
        flex:1;
      }
     
      .yan-edit{
        padding-right:4.266vw;
        .yan-edit-btn{
          width:13.33vw;
          height:6.666vw;
          font-size:3.2vw;
          color:#999;
          border:1px solid #ccc;
          outline:none;
          background: #fff;
          border-radius:2.666vw;
          text-align: center;
          line-height: 6.666vw;
          overflow: hidden;
        }
      }
    }
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
