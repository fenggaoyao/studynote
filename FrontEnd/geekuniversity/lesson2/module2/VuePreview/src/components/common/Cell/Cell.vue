<template>
    <div class="compo-cell" :style="cssText">
        <slot></slot>
    </div>
</template>

<script>
import Utils from 'utils';

const config = [
    {
        name: 'cid',
        title: 'cid',
        type: String,
        default: false,
        require: false,
        component: 'none'
    },
    {
        name: 'flex',
        title: 'flex',
        type: Number,
        default: 1,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'height',
        title: '高度',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'textAlign',
        title: '对齐',
        type: String,
        default: '',
        require: false,
        component: 'InputAlign'
    },
    {
        name: 'padding',
        title: '内边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        component: 'split'
    },
    {
        name: 'border',
        title: '边框',
        type: String,
        default: '0px #cccccc solid',
        require: false,
        component: 'InputBorder'
    },
    {
        name: 'borderRadius',
        title: '圆角',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        component: 'split'
    },
    {
        name: 'background',
        title: '背景',
        type: String,
        default: 'none',
        require: false,
        component: 'InputBackground'
    }
];

export default {
    name: 'xp-cell',
    display: 'flex',
    props: Utils.toProps(config),
    computed: {
        cssText(){
            const chars = ['左','中', '右'];
            const eng = ['left', 'center', 'right'];
            let style =  {
                "border": this.border,
                "background": this.background,
                'border-radius': this.borderRadius + 'px',
                flex: this.flex,
            };
            style = Object.assign(style, Utils.toCSS(this));
            this.textAlign && (style['text-align'] = eng[chars.indexOf(this.textAlign)]);
            return style;
        }
    }
}
</script>

<style>
    .compo-cell {
        position: relative;
    }
</style>
