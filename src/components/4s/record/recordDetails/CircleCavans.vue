<template>
  <canvas ref="circle"></canvas>
</template>
<script>
export default {
  props: {
    score: 0
  },
  mounted() {
    var canvas = this.$refs.circle
    canvas.width = this.toVw(180)
    canvas.height = this.toVw(180)
    var ctx = canvas.getContext('2d')
    this.drawRing(ctx, 0.75 * Math.PI, this.score)
  },
  watch: {
    score(val) {
      console.log(val)
      var canvas = this.$refs.circle
      canvas.width = this.toVw(180)
      canvas.height = this.toVw(180)
      var ctx = canvas.getContext('2d')
      this.drawRing(ctx, 0.75 * Math.PI, val)
    }
  },
  methods: {
    toVw(num) {
      let w = window.innerWidth
      return (num * w) / 375
    },
    draw(ctx) {
      let radius = this.toVw(60) // 圆环半径
      let lineWidth = this.toVw(13) // 圆环边的宽度
      let strokeStyle = '#ccc' //边的颜色
      let fillStyle = 'blue' //填充色
      let lineCap = 'round'
      ctx.beginPath()
      ctx.arc(
        this.toVw(90),
        this.toVw(90),
        radius,
        0.75 * Math.PI,
        2.25 * Math.PI,
        false
      ) // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2
      ctx.lineCap = 'round'
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = strokeStyle
      ctx.stroke() // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
    },
    drawRing(ctx, startAngle, percent) {
      let radius = this.toVw(60) // 圆环半径
      //let startAngle = startAngle || (3 * Math.PI) / 2 //弧起始角度
      // let percent = percent //弧占的比例
      this.draw(ctx) // 调用Circle的draw方法画圈圈
      // angle
      ctx.beginPath()

      var anglePerSec = ((2.25 - 0.75) * (percent / 100) + 0.75) * Math.PI
      // percent / 100 * Math.PI * 2 + startAngle //(100 / percent); // 蓝色的弧度
      ctx.arc(
        this.toVw(90),
        this.toVw(90),
        radius,
        startAngle,
        anglePerSec,
        false
      ) //这里的圆心坐标要和cirle的保持一致
      var radialGradient = ctx.createRadialGradient(
        0,
        0,
        this.toVw(200),
        0,
        this.toVw(200),
        0
      )
      if (this.score > 80) {
        radialGradient.addColorStop(0, '#0055E3')
        radialGradient.addColorStop(1, '#0FACF5')
      } else {
        radialGradient.addColorStop(0, '#FF6F5D')
        radialGradient.addColorStop(1, '#FFB90A')
      }

      ctx.strokeStyle = radialGradient
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.closePath()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>