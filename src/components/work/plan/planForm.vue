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
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="startTimeValue"
            @confirm="startTimeConfirm"
            >
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="smallStartTimePicker"
            type="time"
            v-model="smallStartTimeValue"
            @confirm="smallStartTimeConfirm"
            hour-format = "{value} 时"
            minute-format = "{value} 分"
            >
        </mt-datetime-picker>
        <mt-datetime-picker
            :startDate="new Date()"
            ref="endTimePicker"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="endTimeValue"
            @confirm="endTimeConfirm"
            >
        </mt-datetime-picker>
         <mt-datetime-picker
            ref="smallEndTimePicker"
            type="time"
            v-model="smallEndTimeValue"
            @confirm="smallEndTimeConfirm"
            hour-format = "{value} 时"
            minute-format = "{value} 分"
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
            endTimeValue:new Date(),
            smallStartTimeValue:'00:00',
            smallEndTimeValue:'00:00'
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
    created(){
       
       
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
            let hour = new Date().getHours()
            let minute = new Date().getMinutes()
            let value = `${hour<10?`0${hour}`:hour}:${minute<10?`0${minute}`:minute}`
            this.smallStartTimeValue=value
            this.$refs.smallStartTimePicker.open()
            
            
        },
        smallStartTimeConfirm(){
            console.log(this.smallStartTimeValue)
            let year = new Date(this.startTimeValue).getFullYear()
            let month = new Date(this.startTimeValue).getMonth()+1
            let day = new Date(this.startTimeValue).getDate()
            let value = `${year}-${month<10?`0${month}`:month}-${day<10?`0${day}`:day} ${this.smallStartTimeValue}`
            this.$set(this.plan,'startTime',value)
        },
        endTimeConfirm(){
            console.log(this.endTimeValue)
            let hour = new Date().getHours()
            let minute = new Date().getMinutes()
            let value = `${hour<10?`0${hour}`:hour}:${minute<10?`0${minute}`:minute}`
            this.smallEndTimeValue=value
            this.$refs.smallEndTimePicker.open()
        },
        smallEndTimeConfirm(){
            console.log(this.smallEndTimeValue)
            let year = new Date(this.endTimeValue).getFullYear()
            let month = new Date(this.endTimeValue).getMonth()+1
            let day = new Date(this.endTimeValue).getDate()
            let value = `${year}-${month<10?`0${month}`:month}-${day<10?`0${day}`:day} ${this.smallEndTimeValue}`
            this.$set(this.plan,'endTime',value)
            
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
