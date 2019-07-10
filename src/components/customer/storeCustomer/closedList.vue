<template>
    <div class="box" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}" ref="closed">
        <ul class="top" :style="{top:top}">
             <li>客户信息</li>
            <li>电话</li>
            <li>战败时间</li>
        </ul>
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore4" :auto-fill="false">
           <ul class="content" v-for="(item,index) in list" :key="index" @click="linkTo(item.accntId)">
                <li>
                    <i :class="`important${item.level}`"></i>
                    <span>{{item.username}}</span>
                    <b :class="`urgency${item.urgency}`"></b>
                </li>
                <li>{{item.goodsName}}</li>
                <li>{{item.closeTime.split(' ')[0]}}</li>
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
            closedNum:state => state.storeClosed.closedNum,
            params:state => state.storeClosed.params,
            list:state => state.storeClosed.list,
            allLoaded:state => state.storeClosed.allLoaded,
            scroll:state => state.storeClosed.scroll
        })
    },
    watch:{
        subHeaderStatus(){
            if(this.subHeaderStatus[2].status){
                this.listenScroll()
                this.initData()
            }
        },
        scroll(){
            if(this.scroll===0){
                this.$refs.closed.scrollTop=this.scroll
            }
        }
    },
    created(){
        /* let temp;
        if(this.id){
            temp = Object.assign(this.params,{userId:this.id})
        }else{
            temp = this.params
        }
        this.getList(temp) */
        this.initData()
    },
    mounted(){
        this.isIphone();
    },
    methods:{
        ...mapMutations('storeHeader',['setHeaderStatus','setSubHeaderStatus']),
         ...mapMutations('storeClosed',['setClosedNum','setClosedParams','setClosedList','setClosedAllLoaded',
         'setClosedScroll','setClosedPage','initClosedList']),
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
            this.setClosedScroll(0)
            this.setClosedAllLoaded(false)
            let obj={
                type:'Closed',   //New:意向客户，Approved:成交客户，Closed:战败客户
                key:'',    //搜索关键字，电话或名字、微信
                sd:'',          //跟进日期
                ed:'',
                page: 1,  //页数
                limit: 30,    //每页条数
                userId:this.id?this.id:''
            }
            this.setClosedParams(obj)
            this.getList(obj,'init')
        },
        listenScroll(){
            this.$refs.closed.addEventListener('scroll',this.handleScroll,true)
            this.$refs.closed.scrollTop=this.scroll
        },
        handleScroll(e){
            let top = e.target.scrollTop
            this.setClosedScroll(top)
        },
        loadBottom(){
            this.setClosedPage()
            this.getList(this.params)
            this.$refs.loadmore4.onBottomLoaded()
        },
        getList(obj,str){
            indexModel.getCusotmerList(obj).then((res) => {
                if(res.status===1){
                    obj.page===res.data.pages?this.setClosedAllLoaded(true):this.setClosedAllLoaded(false);
                    str==='init'?this.initClosedList(res.data.records):this.setClosedList(res.data.records);
                    this.setClosedNum(res.data.total)
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getList(obj,str)
                }
            })
        },
        linkTo(id){
            this.$router.push({path:"/customerInfo",query:{id:id}})
        }
       
    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/public.scss';

</style>

