<template>
    <div id="previewBox">
      <mybanner :title="title" style="border:none;background:#fff">
        <img src="../../assets/imgs/trash.png" alt="" class="trash" @click="openAction" v-show="picVal.length>0">
      </mybanner>
      <ul class="preview" ref="preview">
        <li v-for="(imgs,index) in picVal" :key="index" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)">
          <img :src="imgs.url" alt="">
        </li>
      </ul>
      <mt-actionsheet :actions="actions" v-model="sheetVisible" id="ss"></mt-actionsheet>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../components/banner'
import { Actionsheet, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Actionsheet.name, Actionsheet);
export default {
  data () {
    let that=this;
    return {
      title:"",
      actions:[
      {
        name:"要删除这张图片吗",
        method:that.question
      },
      {
        name:"删除",
        method:that.del
      }
      ],
      sheetVisible:false,
      picVal:[],
      index:1,
      startX:0,//记录触碰到屏幕的手指信息
      //record:0,//记录每次触摸时上一次的偏移距离
      len:0,
      swipe:0,
      //maxRight:50,//设定一个最大向右滑动的距离
      //maxLeft:0,//求得最大向左滑动的距离
     // maxLeftBounce:0,//向左反弹值
      //maxRightBounce:0,//向右反弹值
      deviceW:0,
      path:''
    }
  },
  components:{
     mybanner
  },
  created(){
    this.picVal=JSON.parse(this.$route.query.picVal);
    this.path=this.$route.params.path;
    this.len=this.picVal.length;
    this.title=this.index+"/"+this.len;
  },
  
  mounted(){
    this.deviceW=document.body.clientWidth;
    //this.maxLeft=-50;
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
      if(this.picVal.length>0){
        var list=this.picVal;
        list.splice(this.index-1,1);
        this.picVal=list;
        if(this.index>1){
          this.index--;
          this.swipe=this.swipe-this.deviceW;
        }
        this.len=this.picVal.length;
        if(this.len>0){
          this.title=this.index+"/"+this.len;
        }else{
          this.$router.back(-1);
          this.title=0+"/"+this.len;
        }
        this.$refs.preview.style.transition='transform .5s';
        this.$refs.preview.style.transform='translateX(-'+this.swipe+'px)';
        this.sheetVisible=false;
      }
    },
    start(e,index){
      e=e||event;
      e.preventDefault();
      if(e.changedTouches.length == 1) {
        this.startX = e.changedTouches[0].clientX;
        //console.log('startX: ',this.startX);
      }
    },
    move(e,index){
      e=e||event;
      e.preventDefault();
      if(e.changedTouches.length == 1){
        this.$refs.preview.style.transition='none';
        var dy = e.changedTouches[0].clientX-this.startX;
        var allDis=this.record+dy;
       /*  if(dy<0){
          this.$refs.preview.style.transform='translateX(-'+(this.swipe+50)+'px)';
        }
        if(dy>0){
           this.$refs.preview.style.transform='translateX(-'+(this.swipe-50)+'px)';
        }
        this.$refs.preview.style.transform='translateX(-'+this.swipe+'px)';
 */
        }
      
      
    },
    end(e,index){
      e=e||event;
      e.preventDefault();
       if(e.changedTouches.length == 1) {
        var dy = e.changedTouches[0].clientX-this.startX;
        //this.record=this.record+dy;
        if(dy<0&&Math.abs(dy)>50){
          if(this.index<this.picVal.length){
            this.swipe=this.swipe+this.deviceW;
            this.index++;
          }
          
          this.title=this.index+"/"+this.len;
          this.$refs.preview.style.transition='transform .5s';
          this.$refs.preview.style.transform='translateX(-'+this.swipe+'px)';
         
        }
        if(dy>0&&Math.abs(dy)>50){
          if(this.index>1){
            this.swipe=this.swipe-this.deviceW;
            this.index--;
          }
          
          this.title=this.index+"/"+this.len;
          this.$refs.preview.style.transition='transform .5s';
          this.$refs.preview.style.transform='translateX(-'+this.swipe+'px)';
         
        }
       
       } 
      }
  },
  destroyed(){
    if(this.picVal.length>0){
      var array=this.picVal;
      window.picVal=array;
    }
      
      
  }
    

};
</script>

<style lang="scss">
 #previewBox{
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
   #ss{
     .mint-actionsheet-list{
       
        .mint-actionsheet-listitem:first-child{
          color:#909090;
            
        }
        .mint-actionsheet-listitem:last-child{
          color:#DB6971;
        }
       
      
       
     }
   }
 }
</style>
