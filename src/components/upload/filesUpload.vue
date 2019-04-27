<template>
    <div class="uploadBox">
      <ul class="upload_list" ref='upload_list'>
        <li v-for="(imgs,index) in picVal" :key="index" @click="preview">
          <img :src="imgs.url" alt="">
        </li>
      </ul>
      <div class="upload" v-if="picVal.length<picLen" @click.stop="openAction">
          <img src="../../assets/imgs/upload.png" alt="">
          <span>添加图片</span>
          <input type="file" ref="upload" name="" id=""  accept="image/*" @change="upload">
      </div>
      <span class="count">{{picVal.length}}/{{picLen}}</span>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
import Vue from 'vue'
import { Actionsheet, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Actionsheet.name, Actionsheet);
export default {
  props:['path','picLen','clear'],
  data () {
    let that=this;
    return {
      actions:[
      {
        name:'拍摄',
        method:that.getCamera
      },
      {
        name:'从手机相册选择',
        method:that.getPhoto
      }
      ],
      sheetVisible:false,
      picVal:[],
      FilesList:[],
      isClear:false
    }
  },
  watch:{
    $route(to,from){
      if(from.name==='imgPreview'){
        this.picVal=this.$store.state.picVal;
        consolelog("进来路由了",this.picVal);
      }
    },
    isClear:function(newVal,oldValue){
      console.log(newVal);
      if(newVal){
          this.picVal=[];
          this.FilesList=[];
      }
    }
  },
  mounted(){
   this.picVal=this.$store.state.picVal;
  },
  methods:{
    ...mapMutations(['delFiles','delPicVal','setFiles','setPicVal']),
    openAction(){
      this.sheetVisible=true;
    },
    upload(e){
      var _this=this;
      let files = e.target.files;
      files=Array.prototype.slice.call(files);
      if (!files.length) return;
      if(files.length+this.picVal.length>this.picLen){
        Toast({
          message: `只能上传${this.picLen}张图片`,
          position: 'middle',
          duration: 2000
        })
        _this.$refs.upload.value='';
        return;
      }
      if(files.length+this.picVal.length>=4){
        this.$refs.upload_list.style='width:100%;justify-content: space-between;'
      }
      let imgSize=3*1024*1024;
     files.map((item,index) => {
        if(/^image/.test(item.type)){
            if(item.size>imgSize){
              Toast({
                message: `每张图片不能超过3M`,
                position: 'middle',
                duration: 2000
              })
              return;
            }else{
              let reader=new FileReader();
              reader.readAsDataURL(item);
              reader.onloadend=function(){
               _this.picVal.push({name:item.name,url:this.result});
               _this.FilesList.push(item);
              }
            }
          }
      });
      this.setFiles(this.FilesList);
      this.setPicVal(this.picVal);
    },
    getCamera(){
      this.$refs.upload.setAttribute("capture",'camera');
      this.$refs.upload.removeAttribute("multiple");
      this.$refs.upload.click();
    },
    getPhoto(){
      this.$refs.upload.removeAttribute("capture");
      this.$refs.upload.setAttribute("multiple",'multiple');
      this.$refs.upload.click();
    },
    cancel(){
      this.showMessageBox=false;
    },
    valid(){
      let phone=navigator.userAgent.toLowerCases();
      if(phone.match(/iPhone\sOS/i)){
        this.$refs.upload.removeAttribute("capture");
      }
    },
    isUpload(){
      return this.picVal;
    },
    preview(){
     // this.$router.push({path:'/previewImg',query:{picVal:JSON.stringify(this.picVal)}});
     this.$router.push({path:'/previewImg'});
    }
  }
};
</script>

<style lang="scss" scoped>
  .uploadBox{
    padding:2.666vw 4.266vw;
    padding-top:0;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap:wrap;
    position: relative;
    .upload_list{
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap:wrap; 
      justify-content: space-between;
      li{
        width:20vw;
        height:20vw;
        border-radius: 1.066vw;
        border:1px solid #e1e1e1;
        overflow: hidden;
        margin-right:1.333vw;
        display: flex;
        align-items: center;
        justify-content:center;
        margin-top:2.666vw;
        img{
          width:100%;
          height: auto;
        }
      }
    }
    .upload{
      position:relative;
      width:20vw;
      height:20vw;
      border-radius: 1.066vw;
      border:1px dashed #e1e1e1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top:2.666vw;
      img{
        width: 5.333vw;
        margin-bottom: 2.133vw;
      }
      span{
        color:#909090;
        font-size: 2.4vw;
      }
      input{
        display: none;
         //opacity: 0;
        /*position: absolute;
        top:0;
        right:0;
        left:0;
        bottom:0;  */ 
      } 
    }
    /* input{
        display: none;
       position: absolute;
         top:0;
        right:0;
        left:0;
        bottom:0;  
      } */
    .count{
      position: absolute;
      bottom:2.666vw;
      right:4.533vw;
      color:#909090;
      font-size: 2.4vw;
    }
  }
  

</style>
