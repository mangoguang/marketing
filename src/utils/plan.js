export default {
    methods:{
        getDate(date){
            let year=date.getFullYear()
            let month=date.getMonth()+1
            let day=date.getDate()
            let hour=date.getHours()
            let minute=date.getMinutes()
            let startTime=`${year}-${month<10?`0${month}`:month}-${day<10?`0${day}`:day} ${hour<10?`0${hour}`:hour}:${minute<10?`0${minute}`:minute}`
            return startTime
        },
        format(date){
            if(!date){
                return ''
            }
            let arr = date.split(' ')[0].split('-');
            let time = date.split(' ')[1]
            return `${arr[0]}年${parseInt(arr[1])}月${parseInt(arr[2])}日 ${time}`

        }
    }

}