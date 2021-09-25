<template>
    <div class="component-card" @click="click" draggable="true" @dragstart="dragstart" effectAllowed="copy" dropEffect="copy">
        <s v-if="icon" :class="icon"></s>
        <span>{{title}}</span>
    </div>
</template>

<script>
export default {
  name: "xp-component-card",
  props: {
    icon: {
      type: String,
      default: "",
      require: true
    },
    name: {
      type: String,
      default: "",
      require: true
    },
    title: {
      type: String,
      default: "",
      require: true
    },
    path: {
      type: String,
      default: "",
      require: true
    }
  },
  methods: {
    click(e) {
      //eventHub.$emit('create-component', {name: this.name, path: this.path});
    },
    dragstart(e) {
      if (e.currentTarget === e.target) {
        e.dataTransfer.setData("mod-name", this.name);
        e.dataTransfer.setData("mod-path", this.path);
      }
    }
  }
};
</script>

<style lang="less-loader">
.component-card {
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px #e0e0e0 solid;
  margin: 2px 5px;
  border-radius: 4px;
  text-align: center;

  s {
    display: block;
    width: 36px;
    height: 29px;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .i-text {
    background-image: url(../../../images/icon-text.png);
  }
  .i-image {
    background-image: url(../../../images/icon-image.png);
  }
  .i-block {
    background-image: url(../../../images/icon-block.png);
  }
  .i-grid {
    background-image: url(../../../images/icon-grid.png);
  }
  .i-tab {
    background-image: url(../../../images/icon-tab.png);
  }
  .i-iscroll {
    background-image: url(../../../images/icon-iscroll.png);
  }
  .i-buttongroup {
    background-image: url(../../../images/icon-buttongroup.png);
  }
  .i-qrcode {
    background-image: url(../../../images/icon-qrcode.png);
  }
  .i-audio {
    background-image: url(../../../images/icon-audio.png);
  }
}
.component-card:hover {
  background-color: #f0f0f0;
  border: 1px #20a0ff solid;
}
</style>
