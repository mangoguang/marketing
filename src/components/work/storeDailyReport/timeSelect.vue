<template>
    <div class="timePicker">
        <div class="time">{{date}}</div>
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
import mixin from '../../../utils/mixin'
export default {
    name:'',
    props:['list'],
    mixins:[mixin],
    data(){
        return {
            pickerVisible:new Date(),
            img:'./static/images/date.png',
            date:''
        }
    },
    created(){
      this.date=this.getCurDate(new Date())[0]
    },
    methods:{
       openPicker(){
           this.$refs.date.open();
       },
       handleConfirm(){
            //console.log(this.pickerVisible);
            let year=new Date(this.pickerVisible).getFullYear();
            let month=new Date(this.pickerVisible).getMonth()+1;
            let day=new Date(this.pickerVisible).getDate();
            this.date=`${year}年${month}月${day}日`
            this.$emit('getPickerDate',`${year}-${month<10?`0${month}`:month}-${day}`)
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
