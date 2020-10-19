var Smartsu = (function (vue) {
  'use strict';

  var script = vue.defineComponent({
    name: "SButton",
    setup: function () {
      return {};
    },
  });

  const _withId = /*#__PURE__*/ vue.withScopeId("data-v-2ae182da");

  vue.pushScopeId("data-v-2ae182da");
  const _hoisted_1 = /*#__PURE__*/ vue.createTextVNode("默认按钮");
  const _hoisted_2 = /*#__PURE__*/ vue.createTextVNode("主要按钮");
  const _hoisted_3 = /*#__PURE__*/ vue.createTextVNode("成功按钮");
  const _hoisted_4 = /*#__PURE__*/ vue.createTextVNode("信息按钮");
  const _hoisted_5 = /*#__PURE__*/ vue.createTextVNode("警告按钮");
  const _hoisted_6 = /*#__PURE__*/ vue.createTextVNode("危险按钮");
  const _hoisted_7 = /*#__PURE__*/ vue.createTextVNode("朴素按钮");
  const _hoisted_8 = /*#__PURE__*/ vue.createTextVNode("主要按钮");
  const _hoisted_9 = /*#__PURE__*/ vue.createTextVNode("成功按钮");
  const _hoisted_10 = /*#__PURE__*/ vue.createTextVNode("信息按钮");
  const _hoisted_11 = /*#__PURE__*/ vue.createTextVNode("警告按钮");
  const _hoisted_12 = /*#__PURE__*/ vue.createTextVNode("危险按钮");
  const _hoisted_13 = /*#__PURE__*/ vue.createTextVNode("圆角按钮");
  const _hoisted_14 = /*#__PURE__*/ vue.createTextVNode("主要按钮");
  const _hoisted_15 = /*#__PURE__*/ vue.createTextVNode("成功按钮");
  const _hoisted_16 = /*#__PURE__*/ vue.createTextVNode("信息按钮");
  const _hoisted_17 = /*#__PURE__*/ vue.createTextVNode("警告按钮");
  const _hoisted_18 = /*#__PURE__*/ vue.createTextVNode("危险按钮");
  vue.popScopeId();

  const render = /*#__PURE__*/ _withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_button = vue.resolveComponent("el-button");
    const _component_el_row = vue.resolveComponent("el-row");

    return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
      vue.createVNode(_component_el_row, null, {
        default: _withId(() => [
          vue.createVNode(_component_el_button, null, {
            default: _withId(() => [
              _hoisted_1
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "primary"
          }, {
            default: _withId(() => [
              _hoisted_2
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "success"
          }, {
            default: _withId(() => [
              _hoisted_3
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "info"
          }, {
            default: _withId(() => [
              _hoisted_4
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "warning"
          }, {
            default: _withId(() => [
              _hoisted_5
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "danger"
          }, {
            default: _withId(() => [
              _hoisted_6
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      vue.createVNode(_component_el_row, null, {
        default: _withId(() => [
          vue.createVNode(_component_el_button, {
            plain: ""
          }, {
            default: _withId(() => [
              _hoisted_7
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "primary",
            plain: ""
          }, {
            default: _withId(() => [
              _hoisted_8
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "success",
            plain: ""
          }, {
            default: _withId(() => [
              _hoisted_9
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "info",
            plain: ""
          }, {
            default: _withId(() => [
              _hoisted_10
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "warning",
            plain: ""
          }, {
            default: _withId(() => [
              _hoisted_11
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "danger",
            plain: ""
          }, {
            default: _withId(() => [
              _hoisted_12
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      vue.createVNode(_component_el_row, null, {
        default: _withId(() => [
          vue.createVNode(_component_el_button, {
            round: ""
          }, {
            default: _withId(() => [
              _hoisted_13
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "primary",
            round: ""
          }, {
            default: _withId(() => [
              _hoisted_14
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "success",
            round: ""
          }, {
            default: _withId(() => [
              _hoisted_15
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "info",
            round: ""
          }, {
            default: _withId(() => [
              _hoisted_16
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "warning",
            round: ""
          }, {
            default: _withId(() => [
              _hoisted_17
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, {
            type: "danger",
            round: ""
          }, {
            default: _withId(() => [
              _hoisted_18
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      vue.createVNode(_component_el_row, null, {
        default: _withId(() => [
          vue.createVNode(_component_el_button, {
            icon: "el-icon-search",
            circle: ""
          }),
          vue.createVNode(_component_el_button, {
            type: "primary",
            icon: "el-icon-edit",
            circle: ""
          }),
          vue.createVNode(_component_el_button, {
            type: "success",
            icon: "el-icon-check",
            circle: ""
          }),
          vue.createVNode(_component_el_button, {
            type: "info",
            icon: "el-icon-message",
            circle: ""
          }),
          vue.createVNode(_component_el_button, {
            type: "warning",
            icon: "el-icon-star-off",
            circle: ""
          }),
          vue.createVNode(_component_el_button, {
            type: "danger",
            icon: "el-icon-delete",
            circle: ""
          })
        ]),
        _: 1
      })
    ], 64 /* STABLE_FRAGMENT */ ))
  });

  script.render = render;
  script.__scopeId = "data-v-2ae182da";
  script.__file = "packages/shared/src/button.vue";

  var install = function (app) {
    app.component(script.name, script);
  };
  var index = {
    install: install,
    Button: script,
  };

  var install$1 = function (app) {
    index.install(app);
  };
  var Button = index.Button;
  var SmartSu = {
    install: install$1,
    Button: Button,
  };

  return SmartSu;

}(Vue));