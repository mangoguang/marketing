<template>
  <x-cell v-clickoutside:touchstart="swipeMove"
          @click.native="swipeMove()"
          @touchstart.native="startDrag"
          @touchmove.native="onDrag"
          @touchend.native="endDrag"
          class="mint-cell-swipe"
          :title="title"
          :icon="icon"
          :label="label"
          :to="to"
          :is-link="isLink"
          ref="cell"
          :value="value">
    <template slot="content">
      <list />
    </template>
    <div slot="right"
         class="mint-cell-swipe-buttongroup"
         ref="right">
      <a class="mint-cell-swipe-button"
         v-for="(btn,index) in right"
         :style="btn.style"
         :key="btn+index"
         v-html="btn.content"
         @click.prevent.stop="showDel=!showDel"
         v-show="showDel"></a>
      <div class="mint-cell-comfirm"
           @click.prevent.stop="showDel=!showDel, swipeMove()"
           v-show="!showDel">确认<br>删除</div>
    </div>
    <div slot="left"
         class="mint-cell-swipe-buttongroup"
         ref="left">
      <a class="mint-cell-swipe-button"
         v-for="(btn,index) in left"
         :style="btn.style"
         :key="btn+index"
         @click.prevent.stop="btn.handler && btn.handler(), swipeMove()"
         v-html="btn.content"></a>
    </div>
    <slot></slot>
    <span v-if="$slots.title"
          slot="title">
      <slot name="title"></slot>
    </span>
    <span v-if="$slots.icon"
          slot="icon">
      <slot name="icon"></slot>
    </span>
  </x-cell>
</template>

<script>
import { once } from 'mint-ui/src/utils/dom'
import XCell from './Cell'
import List from '@/components/case/List/Index'
import Clickoutside from 'mint-ui/src/utils/clickoutside'

/**
 *
 * @example
 * <mt-cell-swipe
 *   :left=[
 *     {
 *       content: 'text',
 *       style: {color: 'white', backgroundColor: 'red'},
 *       handler(e) => console.log(123)
 *     }
 *   ]
 *   :right=[{ content: 'allowed HTML' }]>
 *   swipe me
 * </mt-cell-swipe>
 */
export default {
  name: 'mt-cell-swipe',

  components: { XCell, List },

  directives: { Clickoutside },

  props: {
    to: String,
    left: Array,
    right: Array,
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },

  data() {
    return {
      start: { x: 0, y: 0 },
      showDel: true
    }
  },

  mounted() {
    this.wrap = this.$refs.cell.$el.querySelector('.mint-cell-wrapper')
    this.leftElm = this.$refs.left
    this.rightElm = this.$refs.right
    this.leftWrapElm = this.leftElm.parentNode
    this.rightWrapElm = this.rightElm.parentNode
    this.leftWidth = this.leftElm.getBoundingClientRect().width
    this.rightWidth = this.rightElm.getBoundingClientRect().width

    this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1)
    this.rightDefaultTransform = this.translate3d(this.rightWidth)

    this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform
    this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform
  },

  methods: {
    resetSwipeStatus() {
      this.swiping = false
      this.opened = true
      this.offsetLeft = 0
    },

    translate3d(offset) {
      return `translate3d(${offset}px, 0, 0)`
    },

    setAnimations(val) {
      this.wrap.style.transitionDuration = val
      this.rightWrapElm.style.transitionDuration = val
      this.leftWrapElm.style.transitionDuration = val
    },

    swipeMove(offset = 0) {
      this.showDel = true
      this.wrap.style.webkitTransform = this.translate3d(offset)
      this.rightWrapElm.style.webkitTransform = this.translate3d(
        this.rightWidth + offset
      )
      this.leftWrapElm.style.webkitTransform = this.translate3d(
        -this.leftWidth + offset
      )
      offset && (this.swiping = true)
    },

    swipeLeaveTransition(direction) {
      setTimeout(() => {
        this.swipeLeave = true

        // left
        if (direction > 0 && -this.offsetLeft > this.rightWidth * 0.4) {
          this.swipeMove(-this.rightWidth)
          this.resetSwipeStatus()
          return
          // right
        } else if (direction < 0 && this.offsetLeft > this.leftWidth * 0.4) {
          this.swipeMove(this.leftWidth)
          this.resetSwipeStatus()
          return
        }

        this.swipeMove(0)
        once(this.wrap, 'webkitTransitionEnd', _ => {
          this.wrap.style.webkitTransform = ''
          this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform
          this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform
          this.swipeLeave = false
          this.swiping = false
        })
      }, 0)
    },

    startDrag(evt) {
      evt = evt.changedTouches ? evt.changedTouches[0] : evt
      this.dragging = true
      this.start.x = evt.pageX
      this.start.y = evt.pageY
      this.direction = ''
    },

    onDrag(evt) {
      if (this.opened) {
        if (!this.swiping) {
          this.swipeMove(0)
          this.setAnimations('')
        }
        this.opened = false
        return
      }
      if (!this.dragging) return

      let swiping
      const e = evt.changedTouches ? evt.changedTouches[0] : evt
      const offsetTop = e.pageY - this.start.y
      const offsetLeft = (this.offsetLeft = e.pageX - this.start.x)

      const y = Math.abs(offsetTop)
      const x = Math.abs(offsetLeft)

      this.setAnimations('0ms')

      if (this.direction === '') {
        this.direction = x > y ? 'horizonal' : 'vertical'
      }

      if (this.direction === 'horizonal') {
        evt.preventDefault()
        evt.stopPropagation()

        swiping = !(x < 5 || (x >= 5 && y >= x * 1.73))
        if (!swiping) return

        if (
          (offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
          (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
          (offsetLeft > 0 && !this.leftWidth) ||
          (offsetLeft < 0 && !this.rightWidth)
        ) {
        } else {
          this.swipeMove(offsetLeft)
        }
      }
    },

    endDrag() {
      this.direction = ''
      this.setAnimations('')
      if (!this.swiping) return
      this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1)
    }
  }
}
</script>

<style lang="scss">
%del {
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  color: #fff;
}
.mint-cell-swipe-button {
  padding: 0;
  @extend %del;
}
.mint-cell-comfirm {
  height: 100%;
  @extend %del;
  background: #ff335e;
}
</style>
