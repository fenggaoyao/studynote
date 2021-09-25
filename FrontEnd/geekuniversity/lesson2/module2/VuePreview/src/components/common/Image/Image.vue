<template>
    <div v-if="link" :class="cn" :style="cssText">
        <img :src="src" :style="imgCss" @click="jump"/>
        <xp-controll v-if="showControll" @change="psChange"></xp-controll>
    </div>
    <div v-else :class="cn" :style="cssText">
        <img :src="src" :style="imgCss"/>
        <xp-controll v-if="showControll" @change="psChange"></xp-controll>
    </div>
</template>

<script>
import Controll from '../common/Controll/Controll';
import LazyImage from '../common/LazyImage/LazyImage';
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
        name: 'src',
        title: '图片地址',
        type: String,
        default: '/public/images/no-image-icon.png',
        require: false,
        component: 'UploadImage'
    },
    {
        component: 'split'
    },
    {
        name: 'width',
        title: '宽度',
        type: Number,
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
        name: 'display',
        title: '定位',
        type: Boolean,
        default: false,
        require: false,
        component: 'InputSwitch'
    },
    {
        name: 'position',
        title: '位置',
        type: String,
        default: '',
        require: false,
        component: 'InputLRTB'
    },
    {
        component: 'split'
    },
    {
        name: 'link',
        title: '链接',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    },
    {
        component: 'split'
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
        component: 'split'
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
        component: 'InputSlider?min=0&max=1&step=0.1'
//        component: 'InputSlide?min=0&max=1&step=0.1'
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
        name: 'boxShadow',
        title: '阴影',
        type: String,
        default: 'none',
        require: false,
        component: 'InputShadow'
    },
    {
        component: 'split'
    },
    {
        name: 'tongji',
        title: '埋点key',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    },
    {
        name: 'lazyImageRatio',
        title: '高宽比',
        type: String,
        default: '75%',
        require: false,
        component: 'InputText'
    },
    {
        name: 'animation',
        title: '动画',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    }
];


export default {
    name: 'xp-image',
    components: {
        'xp-controll': Controll,
        'xp-lazy-image': LazyImage
    },
    props: Utils.toProps(config),
    computed: {
        cssText(){
            let style =  {
                "position": this.display ? 'absolute' : 'static',
                "link": this.link,
                "opacity": this.opacity,
                "border": this.border,
                "border-radius": this.borderRadius,
                'box-shadow': this.boxShadow,
            };
            if (this.rotate) {
                style.transform =  "rotate(" + this.rotate + "deg)";
            }
            style = Object.assign(style, Utils.toCSS(this));
            return style;
        },
        imgCss() {
            return {
                "border-radius": this.borderRadius
            };
        },
        showControll(){
            if(this.isEditMode() && this.display){
                return true;
            }
            return false;
        },
        cn() {
            let animateType = 'compo-image';
            if(this.animation){
                let ans = this.animation.split(' ');
                animateType = 'compo-image animated ' + ans[0];
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
        },

        jump() {
            let me = this;
            if(me.tongji){
                me.newSak({
                    daSrc: me.tongji + '.click',
                    daAct: 'click'
                }, function() {
                    me.changePage(me.link);
                });
            } else {
                me.changePage(me.link);
            }
        }
    }
}
</script>
<style lang="less-loader">
    .compo-image{
        display: inline-block;
        vertical-align: top;
        width: 100%;
        text-align: center;
        text-align: center;
        
        img{
            width: 100%;
            vertical-align: top;
        }
    }
</style>
