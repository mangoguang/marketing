<template>
    <div class="employee">
      <search-input ref='search' v-model.trim="key" placeholder="请输入员工名称" @input="search" :style="{top:`${top}vw`}"></search-input>
      <ul>
        <li is="employeeLi" :icon="true">
           <div class="headPortrait" slot="headPortrait">
             <img :src="img" alt="">
           </div>
            <div class="detail">
              <div>
                  <h1>666</h1>
                  <p><img src="../../../assets/imgs/phone2.png" alt=""><b>15962448853</b></p>
              </div>
              <span>店长</span>
            </div>
        </li>
      </ul>
      <div class="noData" >{{status}}</div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast,Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import searchInput from '../../search/searchInput'
import employeeLi from '../employee/employeeLi'
import { mapState, mapMutations } from 'vuex'
import mango from '../../../js'
import { IndexModel } from '../../../utils'
import { Debounce } from '../../../utils/public'
const indexModel=new IndexModel()
export default {
  props:['id'],
  data () {
    return {
      key:'',
      top:'',
      status:'',
      img:'./static/images/avatar.png'
    }
  },
  components:{
     searchInput,
     employeeLi
  },
  computed:{
    ...mapState({
      list:state => state.storeEmployeeList.list
    })
  }, 
  created(){
    this.getData({username:''})
  },
  
  mounted(){
      this.isIPhoneX();
  },
  methods:{
    ...mapMutations('storeEmployeeList',['setList']),
   isIPhoneX(){
      let phone=this.phoneSize()
      if(phone==="iphonex"){
        this.top='34.466'
      }else{
        this.top='28.466'
       
      }
    },
   search(){
    var that=this;
      Debounce(function(){
       that.getData({username:that.key})
      },500)()
    
   },
   getData(obj){
     indexModel.getEmployeeList(obj).then((res) => {
       console.log(res);
       if(res.status==1){
         if(res.data.length>0){
            this.setList(res.data)
            
            this.status=''
         }else{
           this.status='暂无记录'
         }
        
       }else{
         toast(res.msg)
       }
     }).catch((reject) => {
       if(reject === 510){
         this.getData(obj)
       }
     })
   }
  }
};
</script>

<style lang="scss" scoped>
 .employee{
  width:100vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  padding-top:42.653vw;
  .searchBox{
    position: fixed;
    left:0;
    right:0;
    z-index: 100;
  }
  .employeeLi{
    box-shadow: 0 1px 3px rgba(136, 136, 136, 0.2);
  }
   .headPortrait{
        width:14.66vw;
        height:14.66vw;
        margin-right: 4.266vw;
        img{
            width:100%;
        }
    }
  .detail{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
      font-size:4.8vw;
      color:#363636;
      font-weight: bold;
      display: flex;
      align-items: flex-end;
    }
    
    p{
      font-size:3.733vw;
      color:#363636;
      img{
        width:3.466vw;
        vertical-align: middle;
      }
      b{
        color:#909090;
        padding-left:2px;
        font-weight: normal;
      }
    }
    span{
      padding-right:2.133vw;
      color:#363636;
      font-size: 4.266vw;
      font-weight: 600;
    }
  }
  .noData{
    height:10vw;
    line-height: 10vw;
    color:#363636;
    font-size: 14px;
    text-align:center;
  }
 }
</style>
