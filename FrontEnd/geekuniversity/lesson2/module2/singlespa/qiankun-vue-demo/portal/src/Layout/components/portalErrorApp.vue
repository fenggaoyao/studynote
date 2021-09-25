<template>
  <section class="portal-wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="404">
        <img class="pic-404__child left" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="@/assets/404_images/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">子应用加载错误</div>
        <div class="bullshit__info">请检查主应用中singleSpa.js里的appInfos的路径是否错误，实在不行请联系csj</div>
        <!-- <div class="bullshit__return-home">返回首页</div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'portalErrorApp'
}
</script>

<style scoped>
.portal-wscn-http404-container {
  flex-grow: 1;
  padding: 22px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.65);
  border-radius: 6px;
}
</style>
