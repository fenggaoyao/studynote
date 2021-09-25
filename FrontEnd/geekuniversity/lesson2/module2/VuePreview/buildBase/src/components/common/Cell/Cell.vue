<template>
    <div class="compo-cell" :style="cssText">
        <slot></slot>
    </div>
</template>

<script>
import utils from 'utils';
export default {
    name: 'xp-cell',
    display: 'flex',
    props: {
        flex: {
            type: Number,
            default: 1,
            require: false
        },
        height: {
            type: Number,
            default: 0,
            require: false
        },
        textAlign: {
            type: String,
            default: 'left',
            require: false
        },
        paddingTop: {
            type: Number,
            default: 10,
            require: false
        },
        paddingLeft: {
            type: Number,
            default: 10,
            require: false
        },
        paddingRight: {
            type: Number,
            default: 10,
            require: false
        },
        paddingBottom: {
            type: Number,
            default: 10,
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
        }
    },

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
            style = Object.assign(style, utils.toCSS(this));
            this.textAlign && (style['text-align'] = eng[chars.indexOf(this.textAlign)]);
            return style;
        }
    }
}
</script>

<style>
</style>
