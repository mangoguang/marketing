<template>
    <div class="yan-follow">
      <div class="yan-follow-th">
        <span>跟进时间</span>
        <span>跟进方式</span>
        <span>下次跟进时间</span>
      </div>
      <div class="yan-follow-box">
        <div class="yan-follow-item" :class="openIndex===index?'yan-item-on':''" v-for="(item,index) in recordList" :key="index">
          <div class="yan-follow-th">
            <span>{{item.followDate}}</span>
            <span >{{item.source}}</span>
            <div>
             <span>{{item.nextDate}}</span>
             <img src="../../assets/imgs/arrowDown.png" alt="" class="arrow" :class="openIndex===index&&isOn?'yan-arrow-on':''" @click="open(index)">
            </div>
          </div>
          <div class="collapse">
            <ul class="list">
              <li>
                <yan-input label="跟进方式" readonly :value="item.source" />
              </li>
              <li>
                <yan-input label="跟进时间" readonly :value="item.followDate"/>
              </li>
              <li>
                <yan-input label="跟进时长" readonly value="未收集" v-if="item.residentTime===''"/>
                <yan-input label="跟进时长" readonly :value="item.residentTime" v-else/>
              </li>
            </ul>
            <yan-textarea label="跟进情况" readonly value="未收集" v-if="item.situation===''"/>
            <yan-textarea label="跟进情况" readonly :value="turnStr(item.situation)" v-else/>
            <yanInput label="下次跟进" readonly class="next" :value="item.nextDate"/>
            <yan-textarea label="下一步计划" readonly value="未收集" v-if="item.plan===''"/>
             <yan-textarea label="下一步计划" readonly :value="turnStr(item.plan)" v-else/>
            <p class="title" v-if="item.imgUrl.length>0">附件图片</p>
            <div class="img-box" v-if="item.imgUrl.length>0">
               <ul class="img-list" >
                <li v-for="(itemUrl,uIndex) in JSON.parse(item.imgUrl)" :key="uIndex" >
                  <img :src="itemUrl.url" alt="">
                </li>
              </ul>
              <span>{{JSON.parse(item.imgUrl).length}}/5</span>
            </div>
          </div>
        </div>
        <div class="yan-follow-item" v-if="recordList.length<=0">
          <div class="yan-follow-th" style="justify-content:center">
            暂无记录
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import yanInput from '../yanInput'
import yanTextarea from '../yanTextarea'
import upload from '../upload/filesUpload'
import mango from '../../js'
export default {
  props:['recordList'],
  data () {
    return {
      isOn:false,
      openIndex:''
    }
  },
  components:{
     yanInput,
     yanTextarea,
     upload
  },
  computed:{
   
   
  },
  created(){
   
  },
  
  mounted(){
    
    
  },
  methods:{
    turnStr(str){
      let string = str.replace(/\\n/g,"\r\n")//mango.textDecode(str)
      return string
    },
    open(i){
      if(this.openIndex===i&&this.isOn){
        this.openIndex='';
        this.isOn=false;
      }else{
        this.openIndex=i;
        this.isOn=true;
      }
     
    }
      
  }
};
</script>

<style lang="scss" scoped>
@mixin layout{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
 .yan-follow{
   font-size: 4vw;
   color:#363636;
  .yan-follow-th{
    @include layout;
    width:100vw;
    padding:0 4.266vw;
    box-sizing: border-box;
    background: #EFEFF4;
    height: 9.333vw;
    border-bottom:1px solid #B5B5B5;
    :first-child{
      width:24vw;
    }
    :last-child{
      width:30.666vw;
    }
  }
  .yan-follow-box{
    .yan-follow-item{
      height:8vw;
      overflow: hidden;
      transition: height .5s linear;
      .yan-follow-th{
        background: #fff;
        height:8vw;
        border-top:2px solid transparent;
        border-bottom:1px solid #ccc;
        div{
          width:30.666vw;
          @include layout;
          .arrow{
            width:3.2vw;
            transition: transform .5s linear;
            transform: rotate(0deg);
          }
          .yan-arrow-on{
            transform: rotate(-180deg);
          }
        }
      }
      .collapse{
         .list{
           padding-left:4.266vw;
           background: #fff;
           border-bottom: 1px solid #ccc;
           li{
             border-bottom: 1px solid #ccc;
          
             
           }
           :last-child{
             border:none;
           }
         }
         .next{
           padding-left: 4.266vw;
           background: #fff;
           border-top:1px solid #ccc;
           border-bottom:1px solid #ccc;
         }
         .title{
           padding:0 4.266vw;
         }
         .img-box{
           padding:0 4.266vw;
           position: relative;
           span{
             position: absolute;
             bottom:0;
             right:4.266vw;
             color:#909090;
             font-size: 2.4vw;
           }
         }
         .img-list{
           display: flex;
           flex-direction: row;
           align-items: center;
           flex-wrap: wrap;
           margin-bottom: 5vw;
           li{
              width:20vw;
              height:20vw;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              border-radius: 1.066vw;
              border:1px solid #ccc;
              margin-top:2.666vw;
              margin-right: 1.333vw;
             margin-bottom: 1.333vw;
              img{
                width:100%;
                height:auto;
              }
           }
         }
      }
    }
    .yan-item-on{
      height:auto;
      overflow:auto;
      .yan-follow-th{
        border-top:2px solid #B5B5B5;
      }
    }
  }

 }
</style>
