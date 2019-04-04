<template>
    <div class="previewBox">
      <mybanner :title="title" style="border:none;background:#fff">
        <img src="../../assets/imgs/trash.png" alt="" class="trash">
      </mybanner>
      <ul class="preview" ref="preview" :style="swipe">
        <li v-for="(imgs,index) in picVal" :key="index" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)">
          <img :src="imgs.url" alt="">
        </li>
      </ul>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../components/banner'
import { Actionsheet, Toast } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
export default {
  data () {
    let that=this;
    return {
      title:"",
      actions:[
      {
        name:'要删除这张图片吗',
        method:that.question
      },
      {
        name:'删除',
        method:that.del
      }
      ],
      sheetVisible:false,
      picVal:[],
      index:1,
      startX:0,
      disX:0,
      endX:0,
      moveX:0,
      len:0,
      swipe:'',
      deviceW:''
    }
  },
  components:{
     mybanner
  },
  created(){
    this.picVal=this.$route.params.picVal;
    this.len=this.picVal.length;
    this.title=this.index+"/"+this.len;
    //console.log(this.picVal);
  },
  watch:{
    
  },
  mounted(){
   this.deviceW=document.body.clientWidth;
  },
  methods:{
    openAction(){
      this.sheetVisible=true;
    },
    question(){
      this.sheetVisible=true;
      return;
    },
    del(){
      
    },
    start(e,index){
      e=e||event;
      e.preventDefault();
      //var touch = event.targetTouches[0];
      if(e.touches.length == 1) {
        this.startX = e.touches[0].clientX;
        console.log('startX: ',this.startX);
      }
    },
    move(e,index){
      e=e||event;
      e.preventDefault();
      if(e.touches.length == 1){
        this.moveX = e.touches[0].clientX;
        this.disX=this.moveX-this.startX;
        console.log('move: ',this.moveX);
        /* var dis;
        if(this.disX<0||this.disX==0){
          if(this.index>1){
            this.swipe=`transform: translateX(${this.deviceW*this.index}px)`;
          }else{
            this.swipe=`transform: translateX(0px)`;
          }
          
        }else{
          if(this.index>1){
            this.swipe=`transform: translateX(${-this.deviceW*this.index}px)`;
          }else{
            this.swipe=`transform: translateX(0px)`;
          }
        } */
      
       
      }
    },
    end(e,index){
      e=e||event;
      e.preventDefault();
       if(e.changedTouches.length == 1) {
        this.endX = e.changedTouches[0].clientX;
        
         console.log('endX: ',this.endX);
         let disX = this.endX-this.startX;
        // if(disX<0||this.disX==0){
        //     if(this.index<this.picVal.length+1){
        //       this.index=this.index++;
        //       var len=this.picVal.length;
        //       this.title=this.index+"/"+len;
        //       this.swipe=`transform: translateX(${this.deviceW*this.index}px)`;
        //     }else{
        //       this.swipe=`transform: translateX(${this.deviceW*this.index}px)`;
        //     }
            
          
        // }
        // if(disX>0){//右滑
        //   if(this.index>1){
        //     this.index=this.index--;
        //     var len=this.picVal.length;
        //     this.title=this.index+"/"+len;
        //     this.swipe=`transform: translateX(${-this.deviceW*this.index}px)`;
        //   }else{
        //     this.swipe=`transform: translateX(0px)`;
        //   }
        // } 
       } 
       
    }

    
  }
};
</script>

<style lang="scss" scoped>
 .previewBox{
   width:100vw;
   height:100vh;
   overflow: hidden;
   .banner span{
     padding-right:0;
   }
   .swipe{
     transform: translateX(0);
   }
   .trash{
      width:5.066vw;
      margin-right:4.266vw;
   }
   .preview{
     width:300%;
     height:100vh;
     display: flex;
     flex-direction: row;
     align-items: center;
     li{
      width:100vw;
      height:100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img{
        width:100vw;
      }
     }
   }
 }
</style>
