<template>
    <div class="timePicker">
        <div class="time">2019年3月15日</div>
        <img :src="img" alt="" @click="openPicker">
        <mt-datetime-picker
        ref='date'
        v-model="pickerVisible"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
         @confirm="handleConfirm"
        >
        </mt-datetime-picker>
    </div>
</template>
<script>
import Vue from 'vue'
import { DatetimePicker } from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)
import mango from '../../../js'
export default {
    name:'',
    props:['list'],
    data(){
        return {
            pickerVisible:new Date(),
            img:'./static/images/date.png'
        }
    },
    created(){
      
    },
    methods:{
       openPicker(){
           this.$refs.date.open();
       },
       handleConfirm(){
            console.log(this.pickerVisible);
            let year=new Date(this.pickerVisible).getFullYear();
            let month=new Date(this.pickerVisible).getMonth()+1;
            let day=new Date(this.pickerVisible).getDate();
           
            this.$emit('getPickerDate',``)
       }
        
    }
}
</script>
<style lang="scss" scoped>
.timePicker{
    background: #fff;
    margin:4.266vw 4.266vw;
    height:10.66vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 2.66vw;
    border-radius: 1.6vw;
    .time{
        font-size: 3.73vw;
        color:#363636;
        font-weight: bold;
    }
    img{
        width:4.8vw;
    }
}
</style>
