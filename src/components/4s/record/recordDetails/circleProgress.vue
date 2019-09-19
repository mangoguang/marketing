<!--  -->
<template>
  <div class="wrapper">
    <div class="circleProgress">
      <div class="clip"
           :class="score>=50? 'auto' : ''">
        <div class="left"
             :class="score>=50? '' : 'width-none'"
             :style="{borderColor: activeColor}"></div>
        <div class="right"
             :style="RightStyle"></div>
      </div>
      <div class="bottom"></div>
      <div class="num_box">
        <p>
          <span class="num"
                :class="{num1:index!=0&&score!=100,fail:score<80}"
                v-for="(item,index) in scoreArr"
                :key="index">{{item}}</span>
          <!-- <span class="num1"
              :style="{color: textColor}">{{scoreArr[1]}}</span> -->
        </p>
        <p class="num_star"
           :class="score>=80?'on_star':'un_star'">{{score>=80?'合格':'不合格'}} </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['score', 'star'],
  data() {
    return {
      textColor: ''
    }
  },

  computed: {
    scoreArr() {
      return (this.score + '').split('')
    },
    RightStyle() {
      return {
        transform: 'rotate(' + 3.3 * this.score + 'deg)',
        borderColor: this.score >= 80 ? '#007aff' : '#F88675'
      }
    },
    activeColor() {
      return this.score >= 80 ? '#007aff' : '#F88675'
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
div {
  box-sizing: border-box;
}
.wrapper {
  height: 114px;
  margin-top: 7.33vw;
  overflow: hidden;
}
.circleProgress {
  width: 30.4vw;
  height: 30.4vw;
  position: relative;
  background-color: #dbdbdb;
  border-radius: 50%;
  margin: 0 auto;
}
.num_box {
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  background: #f8f8f8;
  border-radius: 50%;
  width: 25.4vw;
  height: 25.4vw;
  transform: translate(-50%, -50%);
  text-align: center;
  .num {
    color: #007aff;
    font-size: 13.3vw;
    font-family: 'din';
  }
  .num1 {
    color: #007aff;
    font-size: 9.06vw;
  }
  .fail {
    color: #000;
  }
}

.un_star {
  color: #f88b6f;
}
.on_star {
  color: #007aff;
}
.num_star {
  font-size: 3.2vw;
  margin-top: -6vw;
  opacity: 0.8;
}

.clip {
  width: 30.4vw;
  height: 30.4vw;
  position: absolute;
  border: 5vw solid #dbdbdb;
  border-radius: 50%;
  clip: rect(0, 15.2vw, 30.4vw, 0);
}
.left {
  width: 30.4vw;
  height: 30.4vw;
  position: absolute;
  border: 5vw solid #007aff;
  border-radius: 50%;
  clip: rect(0 15.2vw 30.4vw 0px);
  top: -5vw;
  left: -5vw;
}
.right {
  width: 30.4vw;
  height: 30.4vw;
  position: absolute;
  border: 5vw solid #007aff;
  border-radius: 50%;
  clip: rect(0 30.4vw 30.4vw 15.2vw);
  top: -5vw;
  left: -5vw;
}
.width-none {
  width: 0;
  height: 0;
  border: none;
}
.auto {
  clip: auto;
}
.bottom {
  width: 15.2vw;
  height: 15.2vw;
  background: #f8f8f8;
  position: absolute;
  bottom: -7.6vw;
  left: 7.6vw;
  z-index: 0;
  border-radius: 50%;
  box-sizing: border-box;
}
.borderColor {
  color: '#F88675';
}
</style>