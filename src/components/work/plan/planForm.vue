<template>
    <div class="planForm">
        <ul>
            <li>
               <yan-input v-bind="info.planName"/> 
            </li>
            <li>
               <yan-input v-bind="info.customerName"/> 
            </li>
            <li>
               <yan-input v-bind="info.goodsName"/> 
            </li>
            <li>
                <yan-info v-bind="info.goodsName"/>
            </li>
            <li>
               <yan-input v-bind="info.address"/> 
            </li>
            <li  @click="openStartTime">
               <yan-input v-bind="info.startTime"/> 
            </li>
            <li @click="openEndTime">
               <yan-input v-bind="info.endTime" /> 
            </li>
            <li>
                <yan-textarea v-bind="info.remark"/>
            </li>
        </ul>
        <mt-datetime-picker
            ref="startTimePicker"
            type="datetime"
            v-model="startTimeValue"
            @confirm="startTimeConfirm"
            >
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="endTimePicker"
            type="datetime"
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
export default {
    name:'planForm',
    data(){
        return {
            startTimeValue:'',
            endTimeValue:''
        }
    },
    components:{
        yanInput,
        yanTextarea,
        yanInfo
    },
    computed:{
        ...mapState({
            info:state => state.plan.info
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
        },
        endTimeConfirm(){
            console.log(this.endTimeValue)
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
