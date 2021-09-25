<template>
  <div class="theme-select">
    <div class="item">
      <span>是否显示:</span>
      <el-switch
        v-model="live2dOpts['show']"
        active-text="显示"
        inactive-text="不显示"
        @change="showChange"
      />
    </div>
    <div class="item">
      <span>位置:</span>
      <el-radio @change="positionChange" v-model="live2dOpts['position']" label="left">左下角</el-radio>
      <el-radio @change="positionChange" v-model="live2dOpts['position']" label="right">右下角</el-radio>
    </div>
    <div class="item">
      <span>尺寸(宽):</span>
      <el-input-number @change="e => sizeChange('width', e)" size="small" v-model="live2dOpts['width']"></el-input-number>
    </div>
    <div class="item">
      <span>尺寸(高):</span>
      <el-input-number @change="e => sizeChange('height', e)" size="small" v-model="live2dOpts['height']"></el-input-number>
    </div>
    <ul>
      <li
        v-for="item in live2dList"
        :key="item.name"
        :class="{actived: item.name === live2d, hidden: item.hidden}"
        @click="changeLive2d(item.name, item.label, item.hidden || false)"
      >
        <img :src="item.src">
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changeLiveWH } from '@/utils'
import Cookies from 'js-cookie'
const live2d = [
  { name: 'chitose', label: '千岁千里' },
  { name: 'Epsilon2.1', label: 'epsilon' },
  { name: 'haru01', label: '白咲花01' },
  { name: 'haru02', label: '白咲花02' },
  { name: 'haruto', label: 'riko理子' },
  { name: 'hibiki', label: '御坂美琴' },
  { name: 'hijiki', label: '黑猫' },
  { name: 'izumi', label: '祖米' },
  { name: 'koharu', label: 'riko' },
  { name: 'miku', label: '超音女' },
  { name: 'nipsilon', label: '小女生' },
  { name: 'shizuku', label: '看书女' },
  { name: 'tororo', label: '白猫' },
  { name: 'wanko', label: '小奶狗' },
  { name: 'z16', label: '女护士' },
]
const live2dList = live2d.map(item => {
  const { name } = item
  item.src = require(`@/assets/images/live2d-img/${name}.png`)
  return item
})
export default {
  data() {
    return {
      live2dList
    }
  },
  computed: {
    ...mapGetters(['live2d', 'live2dOpts'])
  },
  methods: {
    changeLive2d(live2d, label, hidden) {
      if (live2d === this.live2d || hidden) return
      this.$store.dispatch('changeLive2d', live2d).then(() => {
        this.$toast.success(`切换${label}角色成功`)
      })
    },
    showChange(e) {
      this.$store.dispatch('changeLive2dOpts', { show: e }).then(() => {
        let text
        if (e) {
          text = '开启'
          let obj = Cookies.get('live2dOpts')? JSON.parse(Cookies.get('live2dOpts')) : { show: true, position: 'left', width: 120, height: 220 }
          changeLiveWH({ width: obj.width, height: obj.height })
        } else {
          text = '关闭'
          changeLiveWH('')
        }
        this.$toast.success(`已${text}动漫角色`)
      })
    },
    positionChange(e) {
      this.$store.dispatch('changeLive2dOpts', { position: e }).then(() => {
        changeLiveWH({ position: e })
      })
    },
    sizeChange(type, e) {
      let obj = {}
      obj[type] = e
      this.$store.dispatch('changeLive2dOpts', obj).then(() => {
        changeLiveWH(obj)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.theme-select {
  padding-top: 5px;
  .item {
    height: 50px;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #000;
      font-weight: 400;
      margin-right: 20px;
    }
  }
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  li {
    width: 110px;
    height: 110px;
    text-align: center;
    margin-bottom: 10px;
    &.hidden {
      img {
        filter: grayscale(100%);
        filter: gray;
        cursor: default;
      }
    }
    &.actived {
      img {
        padding: 1px;
      }
    }
    img {
      width: 110px;
      height: 80px;
      cursor: pointer;
      border-radius: 3px;
      object-fit: cover;
    }
    span {
      font-size: 14px;
      color: #555;
    }
  }
}
</style>
