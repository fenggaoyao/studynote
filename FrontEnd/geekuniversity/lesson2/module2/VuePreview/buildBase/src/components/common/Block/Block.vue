<template>
    <div class="compo-block" :style="cssText">
        <slot></slot>
        <xp-controll v-if="showControll" @change="psChange"></xp-controll>
    </div>
</template>

<script>

import utils from 'utils';
import Controll from '../Controll/Controll';

export default {
    name: 'xp-block',
    components: {
        'xp-controll': Controll
    },
    props: {
        position: {
            type: String,
            default: 'none',
            require: false
        },
        left: {
            default: '0',
            require: false
        },
        top: {
            default: '0',
            require: false
        },
        right: {
            default: '0',
            require: false
        },
        bottom: {
            default: '0',
            require: false
        },
        width: {
            default: '0',
            require: false
        },
        height: {
            default: '0',
            require: false
        },
        lineHeight: {
            default: '0',
            require: false
        },
        textAlign: {
            type: String,
            default: 'left',
            require: false
        },
        paddingTop: {
            default: '10',
            require: false
        },
        paddingLeft: {
            default: '10',
            require: false
        },
        paddingRight: {
            default: '10',
            require: false
        },
        paddingBottom: {
            default: '10',
            require: false
        },
        marginTop: {
            default: '5',
            require: false
        },
        marginLeft: {
            default: '5',
            require: false
        },
        marginRight: {
            default: '5',
            require: false
        },
        marginBottom: {
            default: '5',
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
        boxShadow: {
            type: String,
            default: 'none',
            require: false
        },
        border: {
            type: String,
            default: '1px #cccccc solid',
            require: false
        },
        borderRadius: {
            type: Number,
            default: 0,
            require: false
        },
        background: {
            type: String,
            default: 'none',
            require: false
        },
        zIndex: {
            type: Number,
            default: 0,
            require: false
        },
    },

    computed: {
        cssText(){
            const chars = ['左','中', '右'];
            const eng = ['left', 'center', 'right'];
            let style =  {
                "position": this.position,
                "opacity": this.opacity,
                "transform": "rotate(" + this.rotate + "deg)",
                "opacity": this.opacity,
                "border": this.border,
                "background": this.background,
                'border-radius': this.borderRadius + 'px',
                'box-shadow': this.boxShadow,
                'z-index': this.zIndex,
                'line-height': this.lineHeight + 'px'
            };
            style = Object.assign(style, utils.toCSS(this));
            this.textAlign && (style['text-align'] = eng[chars.indexOf(this.textAlign)]);
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

<style>
    .compo-text{
        display: inline-block;
        vertical-align: middle;
    }
</style>
