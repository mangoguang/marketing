<template>
 <mt-cell-swipe
        :right="[
          {
            content: '删除',
            style: { background: 'red', color: '#fff',textAlign:'center',lineHeight:'.4rem',fontSize:'.14rem' },
            handler: () => this.del()
          }
        ]">
          <router-link :to="path" slot="title">
            <div class="box">
                <span>{{title}}</span>
                <img src="../../assets/imgs/arrow.png" alt="">
            </div>
          </router-link>
  </mt-cell-swipe>
</template>
<script>
import Vue from 'vue'
import { CellSwipe } from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe);
export default {
  props:['path','id','i','title'],
  data () {
    return {
     
    }
  },
  created() {
    
  },
  
  methods: {
    del:function(){
      this.$store.commit('collect/setMessageBox',{
            showMessageBox:true,
            tip:'是否从收藏夹中移除？',
            btnNum:2,
            type:false
          }); 
          this.$store.commit('collect/clearSingleFaq',{
            id:this.id,
            index:this.i
          });
    }
  }
}
</script>

<style lang="scss" >
/* a{
  display: block;
  padding-left:4.26vw;
  height:.4rem;
  outline:none;
  .box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:100%;
    padding-right:4.26vw;
    color:#363636;
    font-size: .14rem;
    border-bottom:1px solid #E1E1E1;
    img{
      width:.06rem;
      height:.1rem;
    }
  }
} */
#faq{
  .mint-cell{
       min-height: .4rem;
  }
  .mint-cell-wrapper{
     padding: 0!important;
      padding-left:4.26vw!important;
     .mint-cell-title{
       flex:1;
       border-bottom:1px solid #E1E1E1;
        a{
          display: block;
          height:.4rem;
          outline:none;
          .box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height:100%;
            padding-right:4.26vw;
            color:#363636;
            font-size: .14rem;
            border-bottom:1px solid #E1E1E1;
            img{
              width:.06rem;
              height:.1rem;
            }
          }
      }
     }
    
  }
  
}

</style>
