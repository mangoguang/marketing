<template>
    <ul class="tabUI" :style="{top:top}">
        <li :class="item.status?'on':''" v-for="(item,index) in list" :key="index" @click="changeTab(index)">
            <span>{{item.title}}<b></b></span>
        </li>
    </ul>
</template>
<script>
export default {
    name:'tabUI',
    props:['list'],
    data(){
        return {
            top:''
        }
    },
    created(){
        this.isIphoneX()
    },
    methods:{
        isIphoneX(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
                this.top='22.466vw'
            }else{
                this.top='16.466'
            }
        },
        changeTab(i){
            this.$emit('getIndex',i)
        }
        
    }
}
</script>
<style lang="scss" scoped>
 .tabUI{
     position: fixed;
     top:16.466vw;
     left:0;
     right:0;
     background: #fff;
     height:11.73vw;
     display: flex;
     flex-direction: row;
     justify-content: center;
     z-index: 10;
     align-items: flex-end;
     border-bottom:1px solid #E1E1E1;
     li{
        margin-right:4vw;
        position: relative;
         span{
            font-size: 4.266vw;
            color:#999;
         }
        b{
            position: absolute;
            bottom:0;
            right:0;
            left:0;
            height:2px;
            background: #fff;
            border-radius: 1px;
        }   
     }
     li:last-child{
         margin:0;
     }
     li.on{
         span{
            color:#363636;
            font-weight: bold;
         }
         b{
            background: #000;
         }
     }
 }
</style>
