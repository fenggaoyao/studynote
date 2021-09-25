<template>
    <div class="compo-flex-item" :style="cssText">
        <slot></slot>
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'padding',
        title: '边距',
        type: String,
        default: '5px 5px 5px 5px',
        require: false,
        component: 'InputLRTB'
    },
    {
        name: 'background',
        title: '背景颜色',
        type: String,
        default: '',
        require: false,
        component: 'InputColor'
    }
];

export default {
    name: 'xp-flex-item',
    display: 'flex',
    props: Utils.toProps(config),

    computed: {
        cssText(){
            let style =  {
                "background": this.background,
                flex: 1,
            };
            style = Object.assign(style, Utils.toCSS(this));
            return style;
        }
    }
}
</script>

<style lang="less-loader">
    .compo-flex-item{
        flex: 1;
        height: 100%;
    }
</style>
