<template>
    <div>
        <Header />
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
        RightTimeSelect
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
