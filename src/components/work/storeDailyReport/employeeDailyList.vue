<template>
    <div ref="perDailyList" class="perDailyList" :style="{marginTop:_localAjax().typename!=='Store Manager'?'19.12vw':'30.82vw'}">
      <div class="timeBox" :style="{top:`${top}vw`}">
          <timeSelect @getPickerDate="getPickerDate"/>
      </div>
      <ul v-for="(item,index) in list" :key="index" @click="getDaily(item)">
          <li is="employeeLi" :icon="item.dailyOk">
            <div slot="headPortrait" class="headPortrait">
                <img :src="img" alt="">
            </div>
            <div class="detail">
                <div>
                    <h1>{{item.userName}}&nbsp;<span v-if="_localAjax().typename!=='Store Manager'">店长</span></h1>
                    <p>{{item.shopName}}</p>
                </div>
                <div v-if="item.dailyOk" >
                     <b class="yes">已提交</b>
                     <br/>
                     <i>{{item.createTime.split(' ')[1].substr(0,5)}}</i>
                </div>
                <div v-else>
                     <b >未提交</b>  
                </div>
            </div>
          </li>
      </ul>
    </div>
</template>
<script>
import mango from '../../../js'
import timeSelect from './timeSelect'
import employeeLi from '../employee/employeeLi'
import mixin from '../../../utils/mixin'
import { IndexModel } from '../../../utils'
const indexModel = new IndexModel()
export default {
    name:'employeeDailyList',
    mixins:[mixin],
    data(){
        return {
           img:'./static/images/avatar.png',
           date:'',
           status:'',
           list:[],
           top:'',
           scroll:0
        }
    },
    components:{
        timeSelect,
        employeeLi
    },
    created(){
        this.isIphoneX()
        this.date=this.getCurDate(new Date())[1]
        this.getStaffDailyList({date:this.date})
    },
    mounted(){
        this.listen()
    },
    methods:{
       getPickerDate(date){
           this.date=date
           this.getStaffDailyList({date:this.date})  
       },
       getStaffDailyList(obj){
           indexModel.getStaffDailyList(obj).then((res) => {
               console.log(res);
               if(res.status===1){
                
                this.list=res.data
                
                 if(this.scroll>0){
                     this.$refs.perDailyList.scrollTop = 0;
                     this.scroll=0
                 }
               }
           }).catch((reject) => {
               if(reject===510){
                   this.getStaffDailyList(obj)
               }
           })
       },
       getDaily(obj){
           console.log('isDailyOk',obj.dailyOk);
           obj.dailyOk?this.go(obj.userId,obj.userName,obj.createTime):mango.tip('未提交日报')
       },
       go(id,name,date){
           let time=date.split(' ')[0]
           //this.$router.push({path:`/employeeDailyReport/${id}/${name}/${time}`})
           this.$router.push({name:'employeeDailyReport',params:{id:id,username:name,date:time}})
       },
       isIphoneX(){
           let phone = this.phoneSize()
           if(phone==='iphonex'){
               if(this._localAjax().typename!=='Store Manager'){
                    this.top='22.35'
               }else{
                   this.top='34.08'
               }
               
           }else{
                if(this._localAjax().typename!=='Store Manager'){
                    this.top='16.35' 
               }else{
                   this.top='28.08'
               }
               
           }
       },
       handleScroll(e){
            this.scroll = e.target.scrollTop
            console.log(this.scroll)
       },
       listen(){
           this.$refs.perDailyList.addEventListener('scroll',this.handleScroll,true)
           this.$refs.perDailyList.scrollTop = this.scroll
       }
        
    }
}
</script>
<style lang="scss" scoped>
$fontSize14:3.733vw;
$fontSize16:4.266vw;
$fontSize18:4.8vw;
$color:#363636;
$lightColor:#909090;
$green:#59DC6F;
$red:#FF2D55;
.perDailyList{
    margin-top:30.82vw;
    padding-top:16vw;
    height:100vh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .employeeLi{
        box-shadow: 0 1px 3px rgba(136, 136, 136, 0.2);
    }
    .timeBox{
        position: fixed;
        top:10.66vw;
        left:0;
        right:0;
        z-index: 100;
        background: #f8f8f8;
    }
    .headPortrait{
        width:14.66vw;
        height:14.66vw;
        margin-right: 4.266vw;
        img{
            width:100%;
        }
    }
    .detail{
        display:flex;
        align-items: center;
        justify-content: space-between;
        h1{
            color:$color;
            font-size: $fontSize18;
            font-weight: bold;
            width:52vw;
            span{
                font-size: $fontSize14;
                color:#909090;
            }
        }
        p{
            font-size: $fontSize14;
            color:$lightColor;
            width:52vw;
            overflow-x: scroll;
            -webkit-overflow-scrolling:touch; 
            white-space: nowrap;
        }
        div:last-child{
            text-align: center;
            b{
                color:$red;
                font-size:$fontSize16 
            }
            b.yes{
                color: $green;
            }
            i{
                font-style: normal;
                color:#999;
                font-size: $fontSize14
            }
        }
        
       
    }
}
</style>
