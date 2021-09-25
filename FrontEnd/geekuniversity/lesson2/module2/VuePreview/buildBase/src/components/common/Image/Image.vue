<template>
    <div v-if="link" class="compo-image" :style="cssText">
        <a v-if="preview" :href="link"><img :src="src"/></a>
        <img v-else :src="src" alt="图片"/>

        <a v-if="!preview" class="image-link" :href="link" target="_blank">点击跳转</a>
        <xp-controll v-if="showControll" @change="psChange"></xp-controll>
    </div>
    <div v-else class="compo-image" :style="cssText">
        <img :style="{width: width}" :src="src" alt="图片"/>
        <xp-controll v-if="showControll" @change="psChange"></xp-controll>
    </div>
</template>

<script>
import Controll from '../Controll/Controll';
import utils from 'utils';
export default {
    name: 'xp-image',
    components: {
        'xp-controll': Controll
    },
    props: {
        cid: {
            type: String,
            default: '',
            require: false
        },
        src: {
            type: String,
            default: '/public/images/no-image-icon.png',
            require: true
        },
        width: {
            require: false,
            default: '100%'
        },
        height: {
            require: false
        },
        link: {
            type: String,
            require: false,
            default: '',
        },
        marginTop: {
            default: 0,
            require: false
        },
        marginLeft: {
            default: 0,
            require: false
        },
        marginRight: {
            default: 0,
            require: false
        },
        marginBottom: {
            default: 0,
            require: false
        },
        position: {
            type: String,
            default: 'static',
            require: false
        },
        left: {
            default: 0,
            require: false
        },
        top: {
            default: 0,
            require: false
        },
        right: {
            default: 0,
            require: false
        },
        bottom: {
            default: 0,
            require: false
        },
        rotate: {
            type: Number,
            default: 0,
            require: false
        },
        opacity: {
            type: Number,
            default: 1,
            require: false
        },
        zIndex: {
            type: Number,
            default: 1,
            require: false
        }
    },
    data(){
        return {
            showLink: false,
            preview: this.$root.env == 'preview' ? true : false,
        }
    },
    computed: {
        cssText(){
            let style =  {
                "position": this.position,
                "link": this.link,
                "opacity": this.opacity,
                "transform": "rotate(" + this.rotate + "deg)",
                "opacity": this.opacity,
                "border": this.border,
                'box-shadow': this.boxShadow,
            };
            style = Object.assign(style, utils.toCSS(this));
            return style;
        },
        showControll(){
            if(this.$root.env == 'edit' && this.zIndex >= 100){
                return true;
            }
            return false;
        }
    },
    methods: {
        imageClick(e){
            this.showLink = true;
        },

        psChange(data){
            console.log(data);
            let val = {};
            data.left && (val.left = data.left + this.left);
            data.top && (val.top = data.top + this.top);
            data.width && (val.width = data.width);
            data.height && (val.height = data.height);
            this.dispatchPropertyChange(val);
        }
    }
}
</script>
<style lang="sass-loader">
    .compo-image{
        display: inline-block;
        vertical-align: top;
        line-height: 0;

        img{
            width: 100%;
            line-height: 0;
            vertical-align: top;
        }

        .image-link{
            background: rgba(0,0,0, 0.5);
            color: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
        }
    }
</style>
