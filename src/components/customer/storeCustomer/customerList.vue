<template>
    <div class="box" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}" ref="customer">
        <ul class="top" :style="{top:top}">
            <li>客户信息</li>
            <li>意向产品</li>
            <li>最近跟进</li>
        </ul>
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="customerAllLoaded" ref="loadmore2" :auto-fill="false">
            <ul class="content" v-for="(item,index) in customerList" :key="index" @click="linkTo(item.accntId)">
                <li>
                    <i :class="`important${item.level}`"></i>
                    <span>{{item.username}}</span>
                    <b :class="`urgency${item.urgency}`"></b>
                </li>
                <li>{{item.goodsName}}</li>
                <li>{{item.followDate}}</li>
            </ul>
        </mt-loadmore>
        <button type="button" class="new" v-if="type!=='per'" :style="{bottom:bottom}" @click="newCustomer"></button>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import mango from '../../../js'
import {btnList} from '../../../utils/gallery'
import { IndexModel } from '../../../utils' 
const indexModel = new IndexModel()
export default {
    props:['type','id'],
    data(){
        return {
            top:'',
            paddingTop:'',
            paddingBottom:'',
            bottom:''
        }
    },
    computed:{
        ...mapState({
            headerStatus:state => state.storeHeader.headerStatus,
            subHeaderStatus:state => state.storeHeader.subHeaderStatus,
            cusomerAjaxParams:state => state.storeCustomer.customerAjaxParams,
            customerList:state => state.storeCustomer.list,
            customerAllLoaded:state => state.storeCustomer.allLoaded,
            customerScroll:state => state.storeCustomer.scroll
        })
       
    },
    watch:{
        headerStatus(){
            if(this.headerStatus[1].status&&this.subHeaderStatus[0].status){
                this.initData()
            }
        },
        subHeaderStatus(){
            if(this.subHeaderStatus[0].status){
                this.listenScroll()
                this.initData()
            }
        },
        customerScroll(){
            if(this.customerScroll===0){
                this.$refs.customer.scrollTop=this.customerScroll;
            }
        }
    },
    created(){
        this.initData()
        /* let temp;
        if(this.id){
            temp = Object.assign(this.cusomerAjaxParams,{userId:this.id})
        }else{
            temp = this.cusomerAjaxParams
        }
        this.getCustomerList(temp) */
    },
    mounted(){
        this.isIphone();   
    },
    methods:{
        ...mapMutations('storeHeader',['setHeaderStatus','setSubHeaderStatus']),
        ...mapMutations(['setBtn','initShopList','getShopVal']),
        ...mapMutations('storeCustomer',['setStoreCustomerAjaxParams','setCustomerList','setCustomerAllLoaded','setCustomerScroll','setCustomerPage','initCustomerList']),
        isIphone(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
                if(this.type==='per'){
                    this.top="56.461vw";
                    this.paddingTop="60.78vw"
                    this.bottom="0"
                    this.paddingBottom='11.73vw'
                }else{
                    this.top="59.326vw";
                    this.paddingTop="63.986vw"
                    this.bottom="28vw"
                    this.paddingBottom='21.07vw'
                }
              
            }else{
                if(this.type==='per'){
                    this.top="50.461vw";
                    this.paddingTop="60.78vw"
                    this.bottom="0"
                    this.paddingBottom='0'
                }else{
                    this.top="53.326vw";
                    this.paddingTop="63.986vw"
                    this.bottom="32vw"
                    this.paddingBottom='16.53vw'
                }
                
            }  
        },
        initData(){
                this.setCustomerScroll(0)
                this.setCustomerAllLoaded(false)
                let obj={
                    type:'New',
                    key:'',
                    sort:'',
                    sd:'',
                    ed:'',
                    u:'',
                    l:'',
                    page: 1,
                    limit: 30,
                    userId:this.id?this.id:''
                }
                this.setStoreCustomerAjaxParams(obj)
                console.log('1111',obj)
                this.getCustomerList(obj,'init')
        },
        listenScroll(){
            this.$refs.customer.addEventListener('scroll',this.handleScroll,true)
            this.$refs.customer.scrollTop=this.customerScroll
        },
        handleScroll(e){
            let top = e.target.scrollTop
            this.setCustomerScroll(top)
        },
        loadBottom(){
            this.setCustomerPage()
            this.getCustomerList(this.cusomerAjaxParams)
            this.$refs.loadmore2.onBottomLoaded();
        },
        getCustomerList(obj,str){
            indexModel.getCusotmerList(obj).then((res) => {
                if(res.status===1){
                    if(obj.page===res.data.pages){
                        this.setCustomerAllLoaded(true)
                    }else{
                        this.setCustomerAllLoaded(false)
                    }
                    str==='init'?this.initCustomerList(res.data.records):this.setCustomerList(res.data.records)
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getCustomerList(obj,str)
                }
            })
        },
        linkTo(id){
            this.$router.push({path:"/customerInfo",query:{id:id}})
        },
        newCustomer() {
            this.setBtn([])
            let shops = localStorage.getItem('shops')
            let shopsList = btnList(JSON.parse(shops),0)
            this.initShopList(shopsList)
            this.getShopVal()
            this.$router.push({path: './newCustomer'})
        }
      
    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/public.scss';
.new{
    width:14.13vw;
    height:14.13vw;
    background: url('../../../assets/imgs/add.png') no-repeat center center;
    background-size:100% 100%;
    position: fixed;
    bottom:32vw;
    right:3.73vw;

}

</style>

