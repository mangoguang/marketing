<template>
  <div>
    <div class="topList">
      <ul>
        <li v-if="list.length >= 1">
          <div class="left">
            <div class="num">
              <img src="../../assets/imgs/topone.png" class="rank" alt />
            </div>
            <!-- <div class="picture">
              <img src alt />
            </div> -->
            <div class="name">{{toplist[0].name.split('/')[0]}}</div>
          </div>
          <div class="price">{{(toplist[0].totalMoney.split('.')[0]/10000).toFixed(2)}}</div>
        </li>
        <li  v-if="list.length >= 2">
          <div class="left">
            <div class="num">
              <img src="../../assets/imgs/toptwo.png" class="rank" alt />
            </div>
            <!-- <div class="picture">
              <img src alt />
            </div> -->
            <div class="name">{{toplist[1].name.split('/')[0]}}</div>
          </div>
          <div class="price">{{(toplist[1].totalMoney.split('.')[0]/10000).toFixed(2)}}</div>
        </li>
        <li  v-if="list.length >= 3">
          <div class="left">
            <div class="num">
              <img src="../../assets/imgs/topthree.png" class="rank" alt />
            </div>
            <!-- <div class="picture">
              <img src alt />
            </div> -->
            <div class="name">{{toplist[2].name.split('/')[0]}}</div>
          </div>
          <div class="price">{{(toplist[2].totalMoney.split('.')[0]/10000).toFixed(2)}}</div>
        </li>
        <li v-if="index>=3" v-for="(item,index) in toplist" :key="index" >
          <div class="left">
            <div class="num">{{index+1}}</div>
            <!-- <div class="picture">
              <img src alt />
            </div> -->
            <div class="name">{{item.name.split('/')[0]}}</div>
          </div>
          <div class="price">{{(item.totalMoney.split('.')[0]/10000).toFixed(2)}}</div>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props:['list'],
    data() {
        return {
            toplist:[]
        }
    },
    watch: {
        list() {
            if(this.list.length == 0) {
                this.toplist = []
            }
            this.toplist = this.list
            // console.log(this.toplist);
            
        }
    },
};
</script>

<style lang="scss" scoped>
.topList {
  width: 100vw;
  ul {
    padding: 0 16px;
    li {
      .left {
        display: flex;
        align-items: center;
        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 23px;
          height: 23px;
          .rank {
            width: 23px;
            height: 23px;
          }
        }
        .name {
            margin-left: 10px;
        }
        .picture {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          margin: 0 9px;
        }
      }
      display: flex;
      justify-content: space-between;
      height: 59px;
      line-height: 59px;
      border-top: 1px solid #0066d4;
      font-size: 16px;
      color: #fff;
      &:last-child {
        border-bottom: 1px solid #0066d4;
      }
    }
  }
}
</style>