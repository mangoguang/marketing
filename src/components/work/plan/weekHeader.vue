<template>
    <div class="weekHeader">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
    </div>
</template>
<script>
export default {
    props:[],
    name:'weekHeader',
    data(){
        return {

        }
    },
    components:{

    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
.weekHeader{
   display: flex;
   flex-direction: row;
   align-items: center;
   span{
       display: inline-block;
       width:14.28%;
       text-align: center;
       color:#666;
       font-size: 4.8vw;
       padding-top:4.8vw;
   }
   span:first-child{
       color:#FF964B
   }
   span:last-child{
       color:#FF964B
   }
}
</style>
