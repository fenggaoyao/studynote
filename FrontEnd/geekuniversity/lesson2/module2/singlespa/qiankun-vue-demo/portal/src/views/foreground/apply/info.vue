<template>
  <div>info
    <button @click="$router.push({name: gobackRouteName})">返回</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'StudentInfo',
  data() {
    return {
      gobackRouteName: 'ApplyList'
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (from.name !== 'ApplyList') vm.gobackRouteName = from.name
    })
  },
}
</script>
