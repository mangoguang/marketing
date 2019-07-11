<template>
  <div class="article paddingTop">
    <banner title="公告详情"/>
    <div class="titleBar">
      <div class="title">{{articleDetails.titleName}}</div>
      <!-- <span>{{ articleDetails.createTime }}</span> -->
      <div style="color:#909090;font-size:14px">
        <span v-if="articleDetails.createTime">{{articleDetails.createTime.split(' ')[0].split('-').join('.')}}</span>
        &nbsp;&nbsp;<span v-if="articleDetails.throughput>=10000">{{(parseFloat(articleDetails.throughput)/10000).toFixed(2)+"万"}}</span>
        <img src="../../assets/imgs/visit.png" alt="" class="img" v-if="articleDetails.throughput>=10000">
      </div>
    </div>
    <div class="content" v-html="myhtml" @click.stop="showImage">
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import {removeItem, addItem, b64DecodeUnicode, changeImgStyle, changeVedioStyle,waterMark} from '../../utils/msManage'
import Banner from '../../components/banner'
import CollectBtn from '../../components/msManage/eggCollectBtn'
export default {
  components: {Banner},
  props:['id'],
  data() {
    return {
      myhtml: '',
      articleDetails: '',
      top: '',
      imgSrc:[]
    }
  },
  created() {
    this.getNoticeDetail(this.id)
    this.isIPhoneX()
  },
  mounted() {
    // var a = document.getElementsByTagName("html")
    // console.log(a)
    // waterMark('.article',1);
   
    
  },
  methods: {
    browser() {
      let flag;
      let sUserAgent = navigator.userAgent.toLowerCase();
      let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      let bIsMidp = sUserAgent.match(/midp/i) == "midp";
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      let bIsAndroid = sUserAgent.match(/android/i) == "android";
      let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)){
        //alert('pc')
        flag=false
      }else{
        //alert('phone')
        flag=true
      }
      return flag
    },
    showImage(e){
      console.log(e.target.nodeName.toLowerCase());
      if(e.target.nodeName.toLowerCase()==='img'){
          console.log(e.target.src);
          if(this.imgSrc.length>0){
            let index=this.imgSrc.indexOf(e.target.src)
            if(index>-1){
              console.log(index);
              let that = this
               this.browser();
            /*   if(this.browser()){ */
               /*  var UIPhotoViewer=api.require('UIPhotoViewer');
                alert(UIPhotoViewer);
                UIPhotoViewer.open({
                    images: that.imgSrc,
                    bgColor: '#000',
                    activeIndex:index
                }, function(ret, err) {
                    if (ret) {
                        alert(JSON.stringify(ret));
                    } else {
                        alert(JSON.stringify(err));
                    }
                }); */
              /* } */
              
            }else{
              this.activeImg=0;
            }
          }
      }
    },
    //获取文章详情
    getNoticeDetail(id) {
      indexModel.getNoticedDetail({id:id}).then(res => {
        this.articleDetails = res.data
        if(res.data.detail) {
          let temp = res.data.detail
          this.myhtml = changeImgStyle(b64DecodeUnicode(temp))
          this.myhtml = changeVedioStyle(this.myhtml)
          let imgReg=/<img.*?(?:>|\/>)/gi;
          let srcReg=/src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          let arr=this.myhtml.match(imgReg);
          if(arr){
            for(let i=0;i<arr.length;i++){
              this.imgSrc.push(arr[i].match(srcReg)[1]);
            }
          }
          
        }
      }).catch((reject) => {
        if(reject === 510){
          this.getNoticeDetail(id)
        }
      })
    },
    isIPhoneX (){
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.top = '11vw'
      }else if(phone === 'iphone') {
        this.top = '6vw'
      }else {
        this.top = '6vw'
      }
    }
   
   
   
    
    
  }
}
</script>

<style lang="scss" scoped>
.article {
  // padding: 4.26vw;
  text-align: center;
  padding-top: 20vw;
  position: relative;
  box-sizing: border-box;
  
  // width: 100vw;
  // overflow: hidden;

 
  .titleBar {
    .title {
      color: #353535;
      font-size: 5.33vw;
      width: 80vw;
      text-align: center;
      margin: 0 auto;
      font-weight: bold;
      margin-bottom:1.4vw;
      
    }
    span {
      color: #909090;
      font-size: 3.73vw;
    }
    .img{
          vertical-align: -3px;
          width:4.533vw;
      }
  }
  .content {
    text-align: left;
    word-wrap: break-word !important;
    width: 100vw;
    overflow: hidden;
    padding: 4.26vw;
    box-sizing: border-box;
    h2,p {
      color: #363636;
      font-size: 3.73vw;
    }
  }
    
}
</style>
