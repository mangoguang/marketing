<template>
    <div class="planForm">
        <ul>
            <li>
               <yan-input v-bind="info.planName" v-model="plan.planName" :required="true"/> 
            </li>
            <li @click="searchCustomer">
               <yan-input v-bind="info.customerName"  v-model="plan.customerName" readonly :showIcon="true"/> 
            </li>
            <li @click="searchIntention">
               <yan-input v-bind="info.goodsName" v-model="plan.goodsName" readonly :showIcon="true"/> 
            </li>
            <li>
               <yan-input v-bind="info.address" v-model="plan.address"/> 
            </li>
            <li  @click="openStartTime">
               <yan-input v-bind="info.startTime" :value="format(plan.startTime)" :required="true" readonly :showIcon="true"/> 
            </li>
            <li @click="openEndTime">
               <yan-input v-bind="info.endTime" :value="format(plan.endTime)" readonly :showIcon="true"/> 
            </li>
            <li>
                <yan-textarea v-bind="info.remark" v-model="plan.remark"/>
            </li>
        </ul>
        <mt-datetime-picker
            :startDate="new Date()"
            ref="startTimePicker"
            type="datetime"
            year-format="{value}"
            month-format="{value}"
            date-format="{value}"
            hour-format="{value}"
            minute-format="{value}"
            v-model="startTimeValue"
            @confirm="startTimeConfirm"
            >
        </mt-datetime-picker>
        <mt-datetime-picker
            :startDate="new Date()"
            ref="endTimePicker"
            type="datetime"
            year-format="{value}"
            month-format="{value}"
            date-format="{value}"
            hour-format="{value}"
            minute-format="{value}"
            v-model="endTimeValue"
            @confirm="endTimeConfirm"
            >
        </mt-datetime-picker>
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
import mango from '../../../js'
export default {
    name:'planForm',
    data(){
        return {
            startTimeValue:new Date(),
            endTimeValue:new Date()

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
        openStartTime(){
            this.$refs.startTimePicker.open()
        },
        openEndTime(){
            this.$refs.endTimePicker.open()
        },
        startTimeConfirm(){
            console.log(this.startTimeValue)
            console.log(this.getDate(this.startTimeValue))
            this.$set(this.plan,'startTime',this.getDate(this.startTimeValue))
        },
        endTimeConfirm(){
            console.log(this.endTimeValue)
            console.log(this.getDate(this.endTimeValue))
            this.$set(this.plan,'endTime',this.getDate(this.endTimeValue))
        },
        searchCustomer(){
            this.$router.push({path:'/searchCustomer'})
        },
        searchIntention(){
            if(!this.plan.customerId){
                mango.tip('请先选择客户')
                return;
            }
            this.$router.push({path:'/searchIntention'})
        }
        
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
