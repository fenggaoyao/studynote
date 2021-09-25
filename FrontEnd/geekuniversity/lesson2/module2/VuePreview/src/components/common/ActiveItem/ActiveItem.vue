<template>
    <div v-if="active" class="compo-active-item active" :style="activeCssText">
        <img v-if="showImage" :src="activeSrc"/>
        <p v-if="showText">{{text}}</p>
    </div>
    <div v-else class="compo-active-item" :style="cssText">
        <img v-if="showImage" :src="src"/>
        <p v-if="showText">{{text}}</p>
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'active',
        title: '激活',
        type: Boolean,
        default: false,
        require: false,
        component: 'none'
    },
    {
        name: 'showImage',
        title: '显示图片',
        type: Boolean,
        default: true,
        require: false,
        component: 'InputSwitch'
    },
    {
        name: 'src',
        title: '图片地址',
        type: String,
        default: '/public/images/simage.png',
        require: false,
        component: 'UploadImage'
    },
    {
        name: 'activeSrc',
        title: '激活图片',
        type: String,
        default: '',
        require: false,
        component: 'UploadImage'
    },
    {
        component: 'split'
    },
    {
        name: 'showText',
        title: '显示文字',
        type: Boolean,
        default: true,
        require: false,
        component: 'InputSwitch'
    },
    {
        name: 'text',
        title: '文字',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    },
    {
        name: 'fontSize',
        title: '大小',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'color',
        title: '颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        name: 'activeColor',
        title: '激活颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        name: 'background',
        title: '背景颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        name: 'activeBackground',
        title: '激活背景',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    },
    {
        component: 'split'
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
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'lineHeight',
        title: 'lineHeight',
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'textAlign',
        title: '对齐',
        type: String,
        default: 'left',
        require: false,
        component: 'InputAlign'
    },
    {
        name: 'padding',
        title: '内边距',
        type: String,
        default: '0px 0px 0px 0px',
        require: false,
        component: 'InputLRTB'
    },
    {
        name: 'margin',
        title: '外边距',
        type: String,
        default: '0px 0px 0px 0px',
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
        default: '1px #cccccc solid',
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
    }
];

export default {
    name: 'xp-active-item',
    display: 'flex',
    props: Utils.toProps(config),
    computed: {
        cssText() {
            const chars = ['左','中', '右'];
            const eng = ['left', 'center', 'right'];
            let style =  {
                "opacity": this.opacity,
                "transform": "rotate(" + this.rotate + "deg)",
                "opacity": this.opacity,
                "border": this.border,
                "background": this.background,
                "color": this.color,
                'border-radius': this.borderRadius + 'px',
                'box-shadow': this.boxShadow,
            };
            style = Object.assign(style, Utils.toCSS(this));
            this.fontSize && (style['font-size'] = this.fontSize + 'px');
            this.textAlign && (style['text-align'] = eng[chars.indexOf(this.textAlign)]);
            return style;
        },
        activeCssText() {
            const chars = ['左','中', '右'];
            const eng = ['left', 'center', 'right'];
            let style =  {
                "opacity": this.opacity,
                "transform": "rotate(" + this.rotate + "deg)",
                "opacity": this.opacity,
                "border": this.border,
                "background": this.activeBackground,
                "color": this.activeColor,
                'border-radius': this.borderRadius + 'px',
                'box-shadow': this.boxShadow,
            };
            style = Object.assign(style, Utils.toCSS(this));
            this.fontSize && (style['font-size'] = this.fontSize + 'px');
            this.textAlign && (style['text-align'] = eng[chars.indexOf(this.textAlign)]);
            return style;
        },
    },

    updated(){

    },
}
</script>

<style lang="less-loader">
    .compo-active-item{
        flex: 1;
        font-size: 0;
        img{
            width: 100%;
        }
    }
</style>
