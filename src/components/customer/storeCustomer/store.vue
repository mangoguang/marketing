<template>
    <div class="box" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}" ref="store">
        <ul class="top" :style="{top:top}">
            <li>客户信息</li>
            <li>性别</li>
            <li>创建人</li>
        </ul>
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore1" :auto-fill="false">
                <ul class="content-Item" v-for="(item,index) in list" :key="index" @click="linkTo(item.accntId)">
                    <li>{{item.username}}</li>
                    <li v-if="item.sex==='Mr.'">男</li>
                    <li v-else-if="item.sex==='Ms.'">女</li>
                    <li v-else>未知</li>
                    <li>{{item.createBy}}</li>
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
const indexModel=new IndexModel()
export default {
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
            list:state => state.store.list,
            params:state => state.store.params,
            allLoaded:state => state.store.allLoaded,
            scroll:state => state.store.scroll           
        })
       
    },
    watch:{
        headerStatus(){
            if(this.headerStatus[0].status){
                 this.listenScroll();
                 this.setStoreScroll(0)
                 this.setAllLoaded(false)
                 let obj={
                     key:'',
                     page:1,
                     limit:30
                 }
                 this.getList(obj,'init')
            }
        },
        scroll(){
            if(this.scroll===0){
                this.$refs.store.scrollTop=this.scroll;
            }
        }
    },
    created(){
        this.getList(this.params,'init');
    },
    mounted(){
        this.isIphone();
        this.listenScroll();

    },
    methods:{
        ...mapMutations('storeHeader',['setHeaderStatus','setSubHeaderStatus']),
        ...mapMutations('store',['setStoreParmas','setStoreNum','setStoreList','setAllLoaded','setStoreScroll','setPage','initStoreList']),
        isIphone(){
            let top=document.querySelector('header').offsetHeight;
            let phone=this.phoneSize()
            if(phone==='iphonex'){
                this.top='39.33vw';
                this.paddingTop="43.99vw";
                this.paddingBottom='21.07vw'
            }else{
                this.top='33.33vw';
                this.paddingTop="43.99vw";
                this.paddingBottom='24.53vw'
            }  
        },
        listenScroll(){
            this.$refs.store.addEventListener('scroll',this.handleScroll,true)
            this.$refs.store.scrollTop=this.scroll;
        },
        handleScroll(e){
            let top=e.target.scrollTop;
            this.setStoreScroll(top)
        },
        loadBottom(){
            this.setPage();
            this.getList(this.params);
            this.$refs.loadmore1.onBottomLoaded();
        },
        getList(obj,str){
            indexModel.getStoreCustomer(obj).then((res) => {
                if(res.status===1){
                    if(res.data.pages===this.params.page){
                        this.setAllLoaded(true)
                    }else{
                        this.setAllLoaded(false)
                    }
                    str==='init'?this.initStoreList(res.data.records):this.setStoreList(res.data.records);
                    this.setStoreNum(res.data.total)
                }
            }).catch((reject) => {
                if(reject===510){
                    this.getList(obj,str)
                }
            })
        },
        async getStatus(id){
            let status;
            await indexModel.getCustomerDetails(id).then((res) => {
                if(res.status===1&&res.data.orderList.length<=0){
                    status=false
                }else{
                    status=true
                }
            }).catch((reject) => {
                this.getStatus(id)
            })
            return status; 
        },
        async linkTo(id){
            let status=await this.getStatus(id);
            if(status){
                this.$router.push({path:'/enquiryInfo',query:{id:id,edit:'no'}})
            }else{
                this.$router.push({path:'/customerInfo',query:{id:id,edit:'no'}})
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
            flex:0.4;
            
        }
        :nth-child(2){
            flex:0.2;
            text-align: center;
        }
        :last-child{
            flex:0.4;
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
            flex:0.4;
            white-space: nowrap;
        }
        :nth-child(2){
            flex:0.2;
            color:#909090;
            text-align: center;
        }
        :last-child{
            flex:0.4;
            text-align: right;
        }
        
        
    }
}

</style>

