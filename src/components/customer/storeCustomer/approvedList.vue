<template>
    <div class="box" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}" ref="approved">
        <ul class="top" :style="{top:top}">
            <li>客户信息</li>
            <li>电话</li>
            <li>最近跟进</li>
        </ul>
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore3" :auto-fill="false">
           <ul class="content-Item" v-for="(item,index) in list" :key="index" @click="linkTo(item.accntId)">
                <li>
                    <i :class="`important${item.level}`"></i>
                    <span>{{item.username}}</span>
                    <b :class="`urgency${item.urgency}`"></b>
                </li>
                <li>{{item.phone}}</li>
                <li>{{item.followDate}}</li>
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
            approvedNum:state => state.storeApproved.approvedNum,
            approvedParams:state => state.storeApproved.approvedParams,
            list:state => state.storeApproved.list,
            allLoaded:state => state.storeApproved.allLoaded,
            scroll:state => state.storeApproved.scroll
        })
       
    },
    watch:{
        subHeaderStatus(){
            if(this.subHeaderStatus[1].status){
                this.listenScroll()
                this.initData()
            }
        },
        scroll(){
            if(this.scroll===0){
                this.$refs.approved.scrollTop=this.scroll;
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
        ...mapMutations('storeApproved',['setApprovedNum','setApprovedParams',
        'setApprovedList','setApprovedScroll','setApprovedPage','setApprovedAllLoaded','initApprovedList']),
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
                    this.paddingBottom='16.53vw'
                }
                
            }  
        },
        listenScroll(){
            this.$refs.approved.addEventListener('scroll',this.handleScroll,true)
            this.$refs.approved.scrollTop=this.scroll
        },
        handleScroll(e){
            let top = e.target.scrollTop
            this.setApprovedScroll(top)
        },
        initData(){
            this.setApprovedScroll(0)
            this.setApprovedAllLoaded(false)
            let obj={
                type:'Approved',   //New:意向客户，Approved:成交客户，Closed:战败客户
                key:'',    //搜索关键字，电话或名字、微信
                sd:'',          //跟进日期
                ed:'',
                page: 1,  //页数
                limit: 30,   //每页条数
                userId:this.id?this.id:''
            }
            this.setApprovedParams(obj)
            this.getList(obj,'init')
        },
        loadBottom(){
            this.setApprovedPage()
            this.getList(this.approvedParams)
            this.$refs.loadmore3.onBottomLoaded();
        },
        getList(obj,str){
            indexModel.getCusotmerList2(obj).then((res) => {
                if(res.status===1){
                    obj.page===res.data.pages?this.setApprovedAllLoaded(true):this.setApprovedAllLoaded(false);
                    str==='init'?this.initApprovedList(res.data.records):this.setApprovedList(res.data.records);
                    this.setApprovedNum(res.data.total)
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getList(obj,str)
                }
            })
        },
        linkTo(id){
            //this.$router.push({path:"/enquiryInfo",query:{id:id}})
            if(this.$route.name==='employeeDetail'){
                this.$router.push({path:"/enquiryInfo",query:{id:id,edit:'no'}})
            }else{
                this.$router.push({path:"/enquiryInfo",query:{id:id}})
            }
        }
    }
  
}
</script>
<style lang="scss" scoped>
@import '../../../assets/public.scss';


</style>

