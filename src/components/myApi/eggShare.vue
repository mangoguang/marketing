<template>
  <div class="egg_share">
    <div class="share" @click="showList">...</div>
    <ul class="share_box" v-show="isShare">
      <li v-for="(item, index) in list" :key="index"
        @click="share(index)">
        {{item.type}}
      </li>
    </ul>
  </div>
</template>

<script>
// import {qqShare, weiboShare, weixinShare, timeLineShare} from '../../utils/wx'
export default {
  data() {
    return {
      isShare: false,
      list: [{
        type: 'QQ',
        vence: ''
      },{
        type: '微博',
        vence: ''
      },{
        type: '微信',
        vence: 'session'
      },{
        type: '朋友圈',
        vence: 'timeline'
      }]
    }
  },
  methods: {
    showList() {
      this.isShare = true
    },
    share(index) {
      if(this.list[index].type === 'QQ') {
        this.qqShare('text')
        this.isShare = false
      }else if(this.list[index].type == '微博') {
        weiboShare('text')
        this.isShare = false
      }else if(this.list[index].type == '微信') {
        weixinShare('text')
        this.isShare = false
      }else if(this.list[index].type == '朋友圈') {
        timeLineShare('text')
        this.isShare = false
      }
    },
    qqShare(type) {
      if(type === 'image') {
        // qqshareImage()
      }else if(type === 'text'){
        this.qqsharetext()
      }else if(type ==='music') {
        // qqshareMusic()
      }else if(type === 'vedio') {
        // qqshareVedio()
      }
    },
    qqsharetext() {
      var qq = api.require('qq');
      qq.shareText({
          text: 'testtext'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.egg_share {
  .share {
    color: #999;
    border: 1px solid #eee;
    width: 5vw;
    text-align: center;
  }
  .share_box {
    display: flex;
    width: 100vw;
    justify-content: space-around;
    li {
      border-radius:50%;
      border: 1px solid #666; 
      width: 20vw;
      text-align: center;
      line-height: 20vw;
      color: #666;
    }
  }
}
</style>
