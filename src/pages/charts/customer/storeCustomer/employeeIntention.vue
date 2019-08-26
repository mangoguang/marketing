<template>
    <div>
        <intentionHeader :id="id"/>
        <customerList v-show="subHeaderStatus[0].status" type="per" :id="id"/>
        <approvedList v-show="subHeaderStatus[1].status"  type="per" :id="id"/>
        <closedList v-show="subHeaderStatus[2].status"  type="per" :id="id"/>
        <allCustomerList v-show="subHeaderStatus[3].status" type="per" :id="id"/>
        <RightContainer type="store" @getPramas="getPramas"/>
        <RightTimeSelect v-show='rightTimeSelect' @getTime="getTime"/>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import Footer from "../../../components/Footer";
import intentionHeader from "../../../components/customer/storeCustomer/intentionHeader"
import RightContainer from "../../../components/customer/rightContainer";
import RightTimeSelect from "../../../components/customer/rightTimeSelect";
import store from "../../../components/customer/storeCustomer/store"
import customerList from "../../../components/customer/storeCustomer/customerList"
import approvedList from "../../../components/customer/storeCustomer/approvedList"
import closedList from "../../../components/customer/storeCustomer/closedList"
import allCustomerList from "../../../components/customer/storeCustomer/allCustomerList"
import mango from "../../../js";
import {checkLogin} from '../../../utils/token/toLogin'
import { IndexModel } from "../../../utils"
const indexModel = new IndexModel()
export default {
    props:['id'],
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            headerStatus:state => state.storeHeader.headerStatus,
            subHeaderStatus:state => state.storeHeader.subHeaderStatus,
            filterList:state => state.storeHeader.filterList,
            sort:state => state.storeHeader.sort,
            approvedNum:state => state.storeApproved.approvedNum,
            closedNum:state => state.storeClosed.closedNum,
            rightTimeSelect: state => state.rightContainer.rightTimeSelect,
            cusomerAjaxParams:state => state.storeCustomer.customerAjaxParams
        })
    },
    components: {
        intentionHeader,
        Footer,
        RightContainer,
        RightTimeSelect,
        store,
        customerList,
        approvedList,
        closedList,
        allCustomerList
    },
    created(){
        checkLogin()
        this.checkLogin()
        /* let array = this.subHeaderStatus;
        let arr = array.map((item,index) => {
            index!==0?this.showFilter=false:'';
            if(index==0){
                item.status=true
            }else{
                item.status=false
            }
            return item;
        })
        this.setSubHeaderStatus(arr); */
    },
    
    mounted(){

    },
    methods:{
        ...mapMutations('storeHeader',['setSubHeaderStatus']),
        ...mapMutations('storeApproved',['setApprovedNum']),
        ...mapMutations('storeClosed',['setClosedNum']),
        ...mapMutations('storeApproved',['setApprovedNum','setApprovedParams',
        'setApprovedList','setApprovedScroll','setApprovedPage','setApprovedAllLoaded','initApprovedList']),
        ...mapMutations('storeClosed',['setClosedNum','setClosedParams','setClosedList','setClosedAllLoaded',
         'setClosedScroll','setClosedPage','initClosedList']),
        ...mapMutations('storeCustomer',['setNewNum','initCustomerList','setStoreCustomerAjaxParams','setCustomerList','setCustomerAllLoaded',
        'setCustomerScroll','setCustomerPage']),
        ...mapMutations('allCustomer',['setAllCustomerNum','setAllCustomerParams','setAllCustomerList',
         'setAllCustomerAllLoaded','setAllCustomerScroll','setAllCustomerPage','initAllCustomerList']),
        getPramas(n,obj){
            this.setCustomerScroll(0)
            this.setCustomerAllLoaded(false)
            let temp;
            if(n===1){
                temp={
                    type:'New',   
                    key:'',
                    sort:'',
                    sd:obj.sd,
                    ed:obj.ed,
                    u:obj.u,
                    l:obj.l,
                    page:1,
                    limit:30,
                    userId:this.id
                }
            }else{
                temp=Object.assign({userId:this.id?this.id:''},this.cusomerAjaxParams)
            }
            
            this.setStoreCustomerAjaxParams(temp)
            this.getCustomerList(temp);
        },
        getCustomerList(obj){
            indexModel.getCusotmerList(obj).then((res) => {
                if(res.status===1){
                    if(obj.type==='New'){
                        obj.page===res.data.pages?this.setCustomerAllLoaded(true):this.setCustomerAllLoaded(false)
                        this.initCustomerList(res.data.records)
                        this.setNewNum(res.data.total)
                    }else if(obj.type==='Approved'){
                        obj.page===res.data.pages?this.setApprovedAllLoaded(true):this.setApprovedAllLoaded(false)
                        this.initApprovedList(res.data.records)
                        this.setApprovedNum(res.data.total)
                    }else if(obj.type==='Closed'){
                        obj.page===res.data.pages?this.setClosedAllLoaded(true):this.setClosedAllLoaded(false)
                        this.initClosedList(res.data.records)
                        this.setClosedNum(res.data.total)
                    }else{
                        obj.page===res.data.pages?this.setAllCustomerAllLoaded(true):this.setAllCustomerAllLoaded(false)
                        this.initAllCustomerList(res.data.records)
                        this.setAllCustomerNum(res.data.total)
                    }
                    
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getCustomerList(obj)
                }
            })
        },
        getTime(obj,val){
            console.log('333',obj)
            let temp;
            if(val===1){
                this.setApprovedScroll(0)
                this.setApprovedAllLoaded(false)
                temp={
                    type:'Approved',   
                    key:'',
                    sd:obj.startTime,
                    ed:obj.endTime,
                    page:1,
                    limit:30,
                    userId:this.id
                }
                 this.setApprovedParams(temp)
                 this.getCustomerList(temp)
             }else{
                 this.setClosedScroll(0)
                 this.setClosedAllLoaded(false)
                 temp={
                    type:'Closed',   
                    key:'',
                    sd:obj.startTime,
                    ed:obj.endTime,
                    page:1,
                    limit:30,
                    userId:this.id
                }
                this.setClosedParams(temp)
                this.getCustomerList(temp)
             }
           
        },
         checkLogin() {
            let ajaxData = localStorage.getItem("ajaxData");
            // console.log(Date.parse(new Date()) - timeLong)
            if (!ajaxData) {
                this.$router.replace({ path: "./Login" })
                return
            } else {
                let timeLong = JSON.parse(ajaxData).timestamp;
                timeLong = Date.parse(new Date()) - JSON.parse(ajaxData).timestamp;
                timeLong = timeLong / (60 * 60 * 24 * 1000);
                if (timeLong > 10) {
                this.$router.replace({ path: "./Login" });
                return;
                }
            }
        }

    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/common.scss';
    .filter{
        position: fixed;
        bottom:0;
        right:0;
    }
</style>
