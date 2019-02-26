<template>
    <ul id="list">
      <li v-for='(items,index) in dataList' :key='index' @click="go(items.articleId)">
        <yan-cell-swipe :id="items.articleId">
            <template v-slot:lititle>
              {{items.title}}
            </template>
            <template v-slot:button><button type="button" v-if="items.top" @click="stick(index,$event)">置顶</button></template>
            <template v-slot:time>
              {{items.time}}
            </template> 
            <!-- <img :src="require(`${items.imgUrl}`)" alt=""  slot:img> -->
             <template v-slot:img>
             <!-- <img src="../../assets/imgs/example.png" alt="" > -->
              <img :src="items.imgUrl" alt=""> 
            </template> 
            
        </yan-cell-swipe>
      </li>
    </ul>
    
</template>

<script>
//使用时，绑定属性dataList
//<yan-list-swipe :dataList="data"></yan-list-swipe>
import yanCellSwipe from "./yanCellSwipe"
export default {
  props:['dataList'],
  data(){
    return {
     
    }
  },
  components:{
    yanCellSwipe
  },
  methods:{
    stick:function(index,e){
      e.stopPropagation();
      alert("置顶"+index);
    },
    go:function(id){
      /* this.$router.push({path:`/artcileDetails/${id}`}) */ 
       this.$router.push({name:"/articleDetails",params:{articleId:id}});
    }
    
  }
}
</script>

<style lang="scss" scoped>
ul{
 padding-bottom:.02rem;
  li{
  margin-bottom: .05rem;
  box-shadow:0 .01rem .03rem 0 rgba(136, 136, 136, 0.2);
  img{
    width:.8rem;
    height:.8rem;
    margin:.1rem 0;
  }
}
}
</style>

