export default {
    name:'mixin',
    data(){
        return {

        }
    },
    created(){

    },
    methods:{
        getCurDate(date){
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let day=date.getDate();
            return [`${year}年${month}月${day}日`,`${year}-${month<10?`0${month}`:month}-${day}`]
       }
    }

}