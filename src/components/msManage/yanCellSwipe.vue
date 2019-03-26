<template>
  <mt-cell-swipe
  :right="[
    {
      content: '删除',
      style: { background: '#FF3338', color: '#fff',width:'.9rem',textAlign:'center',lineHeight:'1rem',fontSize:'.16rem'},
      handler:()=>this.delete()
    }
  ]" >
  <div class="list-swipe" slot="title">
    <div>
      <h1><slot name="lititle"></slot></h1>
      <p>
       <!-- <button type="button" v-if="items.top">置顶</button> -->
      <slot name="button"></slot> 
      <span> <slot name="time"></slot></span>  
      </p>
    </div>
    <!-- <img src="../../assets/imgs/example.png" alt="" class="img"> -->
    <slot name="img" class='img'></slot>
  </div>
  </mt-cell-swipe>
</template>
<script>
import Vue from 'vue'
import { CellSwipe } from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe);
import {IndexModel} from "../../utils"
const indexModel=new IndexModel()
export default {
  props:['articleId','artIndex'],
  data () {
    return {
    }
  },
  created() {
    let ajaxData=localStorage.getItem("ajaxData");
    this.account=JSON.parse(ajaxData).account;
  },
  methods: {
    delete:function(){
        if(this.$route.path=='/collectList'){
        this.$store.commit('collect/setMessageBox',{
          showMessageBox:true,
          tip:'是否从收藏夹中移除？',
          btnNum:2,
          type:false
        }); 
        this.$store.commit('collect/clearSingleArt',{
          articleId:this.articleId,
          index:this.artIndex
        });
      }
     
    }
  }
}
</script>

<style lang="scss">
#list{
  .mint-cell:last-child{
    background:none;
  }
.mint-cell-wrapper{
  padding: 0 .17rem !important;
  box-shadow: 15px 15px 10px rgba(136, 136, 136, 0.2);
  background: #fff;
  .mint-cell-title{
    flex: 1;
    span{
      .list-swipe{
        display: flex;
        align-items:center;
        justify-content: space-between;
        div{
          flex:1;
          padding-right:10px;
          box-sizing: border-box;
          h1{
            font-size:.18rem;
            color:#363636;
            font-weight: bold;
            margin-bottom: .15rem;
          }
          span{
            color:#909090;
            font-size: .14rem;

          }
          button{
            color:#FF2D55;
            font-size: .14rem;
            padding:0;
            margin-right:.1rem;
          }
        }
        .img{
          width:.8rem;
          height:.8rem;
          margin:.1rem 0;
        }
      }
    }
  }
}
}


 
</style>
