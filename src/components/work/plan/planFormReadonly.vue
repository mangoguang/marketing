<template>
    <div class="planForm">
        <ul>
            <li>
               <yan-input v-bind="info.planName" v-model="plan.planName" readonly/> 
            </li>
            <li>
               <yan-input v-bind="info.customerName"  v-model="plan.customerName" readonly :showIcon="false"/> 
            </li>
            <li>
                <yan-info v-bind="info.goodsName" v-model="plan.goodsName" readonly/>
            </li>
            <li>
               <yan-input v-bind="info.address" v-model="plan.address" readonly/> 
            </li>
            <li>
               <yan-input v-bind="info.startTime" :value="format(plan.startTime)" readonly :showIcon="false"/> 
            </li>
            <li>
               <yan-input v-bind="info.endTime" :value="format(plan.endTime)" readonly :showIcon="false"/> 
            </li>
            <li>
                <yan-textarea v-bind="info.remark" v-model="plan.remark" :readonly="true"/>
            </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
import {DatetimePicker} from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)
import yanInput from "../../yanInput"
import yanInfo from "../../yanInfo"
import yanTextarea from "../../yanTextarea"
import { mapState,mapMutations } from 'vuex'
import plan from '../../../utils/plan'  
export default {
    name:'planFormReadonly',
    data(){
        return {
            
        }
    },
    mixins:[plan],
    components:{
        yanInput,
        yanTextarea,
        yanInfo
    },
    computed:{
        ...mapState({
            info:state => state.plan.info,
            plan:state => state.plan.plan
        })
    },
    methods:{
      
    }
}
</script>
<style lang="scss" scoped>
li{
    .inputBox{
        background: #fff;
        padding-left:4.266vw;
        border-bottom:1px solid #E1E1E1;
    }
    .foldInput{
        background: #fff;
        border-bottom:1px solid #E1E1E1;
    }
}

</style>
