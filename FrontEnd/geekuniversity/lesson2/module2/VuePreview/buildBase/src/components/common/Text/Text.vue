<template>
    <span v-if="link">
        <a :href="link"><span :style="cssText" class="compo-text">{{text}}</span></a>
    </span>
    <span v-else>
        <span :style="cssText" class="compo-text">{{text}}</span>
    </span>
</template>

<script>
export default {
    name: 'xp-text',
    props: {
        text: {
            type: String,
            default: () => "文字",
            require: true
        },
        fontSize: {
            type: Number,
            default: () => 14,
            require: false
        },
        color: {
            type: String,
            default: '#444444',
            require: false
        },
        textAlign: {
            type: String,
            default: 'left',
            require: false
        },
        fontStyle: {
            type: String,
            require: false
        },
        textAlign: {
            type: String,
            default: 'left',
            require: false
        },
        paddingTop: {
            type: Number,
            default: () => 0,
            require: false
        },
        paddingLeft: {
            type: Number,
            default: () => 0,
            require: false
        },
        paddingRight: {
            type: Number,
            default: () => 0,
            require: false
        },
        paddingBottom: {
            type: Number,
            default: () => 0,
            require: false
        },
        lineHeight: {
            type: Number,
            default: () => 1.5,
            require: false
        },
        link: {
            type: String,
            require: false
        },
        rotate: {
            type: Number,
            default: () => 0,
            require: false
        },
        opacity: {
            type: Number,
            default: () => 1,
            require: false
        },
        textShadow: {
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
                "color": this.color, 
                "font-size": this.fontSize + 'px',
                'padding': this.paddingTop + 'px ' + this.paddingRight + 'px ' + this.paddingBottom  + 'px ' + this.paddingLeft + 'px',
                "link": this.link,
                "opacity": this.opacity,
                "textShadow": this.textShadow,
                "transform": "rotate(" + this.rotate + 'deg)',
                "lineHeight": this.lineHeight
            };
            if(this.fontStyle){
                let fs =  this.fontStyle.split(':')
                style[fs[0]] = fs[1];
            }
            this.textAlign && (style['text-align'] = eng[chars.indexOf(this.textAlign)]);
            return style;
        },
        production() {
            return this.$root.env == 'production'
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
