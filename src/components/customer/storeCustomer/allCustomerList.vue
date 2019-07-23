<template>
    <div class="box" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}" ref="allCustomer">
        <ul class="top" :style="{top:top}">
            <li>客户信息</li>
            <li>性别</li>
            <li>手机号码</li>
        </ul>
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore4" :auto-fill="false">
           <ul class="content-Item" v-for="(item,index) in list" :key="index" @click="linkTo(item.accntId,item.status)">
                <li>{{item.username}}</li>
                <li v-if="item.sex==='Mr.'">男</li>
                <li v-else-if="item.sex==='Ms.'">女</li>
                <li v-else>未知</li>
                <li>{{item.phone}}</li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import { IndexModel } from '../../../utils'
const indexModel = new IndexModel()
import mango from "../../../js";
export default {
    props:['type','id'],
    data(){
        return {
          top:'',
          paddingTop:'',
          paddingBottom:''
        }
    },
    computed:{
        ...mapState({
            headerStatus:state => state.storeHeader.headerStatus,
            subHeaderStatus:state => state.storeHeader.subHeaderStatus,
            params:state => state.allCustomer.params,
            list:state => state.allCustomer.list,
            allLoaded:state => state.allCustomer.allLoaded,
            scroll:state => state.allCustomer.scroll
        })
    },
    watch:{
        subHeaderStatus(){
            if(this.subHeaderStatus[3].status){
                this.listenScroll()
                this.initData()
            }
        },
        scroll(){
            if(this.scroll===0){
                this.$refs.allCustomer.scrollTop=this.scroll
            }
        }
    },
    created(){
        this.initData()
    },
    mounted(){
        this.isIphone();
    },
    methods:{
        ...mapMutations('storeHeader',['setHeaderStatus','setSubHeaderStatus']),
        ...mapMutations('allCustomer',['setAllCustomerNum','setAllCustomerParams','setAllCustomerList',
         'setAllCustomerAllLoaded','setAllCustomerScroll','setAllCustomerPage','initAllCustomerList']),
        isIphone(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
                if(this.type==='per'){
                    this.top="56.461vw";
                    this.paddingTop="60.78vw"
                    this.paddingBottom='11.73vw'
                }else{
                    this.top="59.326vw";
                    this.paddingTop="63.986vw"
                    this.paddingBottom='21.07vw'
                }
              
            }else{
                if(this.type==='per'){
                    this.top="50.461vw";
                    this.paddingTop="60.78vw"
                    this.paddingBottom='0'
                }else{
                    this.top="53.326vw";
                    this.paddingTop="63.986vw"
                    this.paddingBottom="16.53vw"
                }
                
            }  
        },
        initData(){
            this.setAllCustomerScroll(0)
            this.setAllCustomerAllLoaded(false)
            let obj={
                type:'',   //New:意向客户，Approved:成交客户，Closed:战败客户
                key:'',    //搜索关键字，电话或名字、微信
                page: 1,  //页数
                limit: 30,    //每页条数
                userId:this.id?this.id:''
            }
            this.setAllCustomerParams(obj)
            this.getList(obj,'init')
        },
        listenScroll(){
            this.$refs.allCustomer.addEventListener('scroll',this.handleScroll,true)
            this.$refs.allCustomer.scrollTop=this.scroll
        },
        handleScroll(e){
            let top = e.target.scrollTop
            this.setAllCustomerScroll(top)
        },
        loadBottom(){
            this.setAllCustomerPage()
            this.getList(this.params)
            this.$refs.loadmore4.onBottomLoaded()
        },
        getList(obj,str){
            indexModel.getCusotmerList2(obj).then((res) => {
                if(res.status===1){
                    if(obj.page===res.data.pages){
                        this.setAllCustomerAllLoaded(true)
                        //mango.tip("没有更多数据了")
                    }else{
                        this.setAllCustomerAllLoaded(false)
                    }
                    str==='init'?this.initAllCustomerList(res.data.records):this.setAllCustomerList(res.data.records);
                    this.setAllCustomerNum(res.data.total)
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getList(obj,str)
                }
            })
        },
        linkTo(id,status){
            if(status==='Approved'){
                this.$router.push({path:'/enquiryInfo',query:{id:id}})
            }else{
                this.$router.push({path:'/customerInfo',query:{id:id}})
            }
        }
       
    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/common.scss';
.box{
  height:100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  .top{
      @include flex-center;
      justify-content: space-between;
      color:$fontCol;
      font-size:4.533vw;
      background: #EFEFF4;
      height:10.66vw;
      padding:0 4.266vw;
      position: fixed;
      left:0;
      right:0;
      z-index: 10;
      :first-child{
            flex:0.35;
            
        }
        :nth-child(2){
            flex:0.2;
            text-align: center;
        }
        :last-child{
            flex:0.45;
            text-align: right;

        }
      
  }
  .content-Item{
        @include flex-center;
        color:$fontCol;
        font-size:4.533vw;
        padding:0 4.266vw;
        background: #fff;
        min-height: 17.33vw;
        margin-bottom:1.33vw;
        :first-child{
            flex:0.35;
            white-space: nowrap;
        }
        :nth-child(2){
            flex:0.2;
            color:#909090;
            text-align: center;
        }
        :last-child{
            flex:0.45;
            text-align: right;
        }
        
        
    }
}

</style>

