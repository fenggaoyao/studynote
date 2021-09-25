<template>
  <div class="home">
    <h3>我要调用另一个webpack构建的包里的内容</h3>
    <a class="btn" @click="doAlert">alert</a>
    <a class="btn" @click="doConfirm">confirm</a>
    <a class="btn" @click="doNotify">notify</a>
    <a class="btn" @click="doToast">toast</a>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  methods: {
    doAlert() {
      import("federationRemote/dialog").then((dialog) => {
        dialog.Alert("我知道那些夏天,就像青春一样回不来");
      });
    },
    doConfirm() {
      import("federationRemote/dialog").then((dialog) => {
        dialog.Confirm("让我困在城市里，纪念你");
      });
    },
    doNotify() {
      import("federationRemote/dialog").then((dialog) => {
        dialog.Notify("我也不会再对谁满怀期待");
      });
    },
    doToast() {
      import("federationRemote/dialog").then((dialog) => {
        dialog.Toast("所以你好，再见");
      });
    },
  },
};
</script>
