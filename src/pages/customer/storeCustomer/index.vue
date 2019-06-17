<template>
    <div>
        <Header />
        <store v-show="headerStatus[0].status"/>
        <customerList v-show="headerStatus[1].status&&subHeaderStatus[0].status"/>
        <approvedList v-show="headerStatus[1].status&&subHeaderStatus[1].status"/>
        <closedList v-show="headerStatus[1].status&&subHeaderStatus[2].status"/>
        <RightContainer type="store"/>
        <RightTimeSelect v-show='rightTimeSelect'/>
        <Footer />
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import Footer from "../../../components/Footer";
import Header from "../../../components/customer/storeCustomer/header"
import RightContainer from "../../../components/customer/rightContainer";
import RightTimeSelect from "../../../components/customer/rightTimeSelect";
import store from "../../../components/customer/storeCustomer/store"
import customerList from "../../../components/customer/storeCustomer/customerList"
import approvedList from "../../../components/customer/storeCustomer/approvedList"
import closedList from "../../../components/customer/storeCustomer/closedList"
import mango from "../../../js";
import {checkLogin} from '../../../utils/token/toLogin'
export default {
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
            rightTimeSelect: state => state.rightContainer.rightTimeSelect
        })
    },
    components: {
        Header,
        Footer,
        RightContainer,
        RightTimeSelect,
        store,
        customerList,
        approvedList,
        closedList
    },
    created(){

    },
    mounted(){

    },
    methods:{
        ...mapMutations('storeApproved',['setApprovedNum']),
        ...mapMutations('storeClosed',['setClosedNum'])

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
