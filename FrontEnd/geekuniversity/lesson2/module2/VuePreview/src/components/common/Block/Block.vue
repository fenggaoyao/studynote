<template>
    <div :class="cn" :style="cssText">
        <slot></slot>
        <xp-controll v-if="showControll" @change="psChange"></xp-controll>
    </div>
</template>

<script>

import Utils from 'utils';
import Controll from '../common/Controll/Controll';

const config = [
    {
        name: 'display',
        title: '定位',
        type: Boolean,
        default: false,
        require: false,
        component: 'InputSwitch'
    },
    {
        name: 'position',
        title: '定位',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        name: 'width',
        title: '宽度',
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'height',
        title: '高度',
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'lineHeight',
        title: '行距',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'margin',
        title: '外边距',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
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
        name: 'rotate',
        title: '旋转',
        type: Number,
        default: 0,
        require: false,
        component: 'InputSlide?min=0&max=360&step=1'
    },
    {
        name: 'opacity',
        title: '透明度',
        type: Number,
        default: 1,
        require: false,
        component: 'InputSlide?min=0&max=1&step=0.1'
    },
    {
        name: 'boxShadow',
        title: '阴影',
        type: String,
        default: 'none',
        require: false,
        component: 'InputShadow'
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
        name: 'zIndex',
        title: 'zIndex',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
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
        name: 'background',
        title: '背景',
        type: String,
        default: '',
        require: false,
        component: 'StyleBackground'
    },
    {
        name: 'animation',
        title: '动画',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    }
]

export default {
    name: 'xp-block',
    components: {
        'xp-controll': Controll,
    },
    props: Utils.toProps(config),

    computed: {
        cssText(){
            const chars = ['左','中', '右'];
            const eng = ['left', 'center', 'right'];
            let style =  {
                "position": this.display ? 'absolute' : 'static',
                "link": this.link,
                "opacity": this.opacity,
                "transform": "rotate(" + this.rotate + "deg)",
                "background": this.background,
                "border": this.border,
                "border-radius": this.borderRadius,
                'box-shadow': this.boxShadow,
            };
            style = Object.assign(style, Utils.toCSS(this));
            this.textAlign && (style['text-align'] = eng[chars.indexOf(this.textAlign)]);
            return style;
        },
        showControll(){
            if(this.isEditMode()&& this.zIndex >= 100){
                return true;
            }
            return false;
        },
        cn() {
            let animateType = 'compo-block';
            if(this.animation){
                let ans = this.animation.split(' ');
                animateType = 'compo-block animated ' + ans[0];
            }
            return animateType;
        }
    },
    methods: {
        psChange(data){
            let val = {};
            let left = 0, top = 0, width = 0, height = 0;
            let pos = Utils.parsePosition(this.position);

            data.width && (val.width = data.width);
            data.height && (val.height = data.height);
            if(data.left != undefined || data.top != undefined) {
                left = ( data.left || 0 ) + pos.left;
                top = ( data.top || 0 ) + pos.top;
                val.position = top + 'px 0px 0px ' + left + 'px';
            }
            this.dispatchPropertyChange(val);
        }
    }
}
</script>

<style>
    .compo-text{
        display: inline-block;
        vertical-align: middle;
    }
</style>
