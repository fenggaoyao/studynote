<template>
    <div class="compo-pinzhi-home-button" :style="cssText" @click="gotoHome">
        {{text}}
    </div>
</template>

<script>
import utils from 'utils';
export default {
    name: 'xp-shop-cart',
    display: 'fixed',
    props: {
        styleName: {
            type: String,
            default: 'style1',
            require: true
        },
        text: {
            type: String,
            default: '<< 还没逛够？去质享生活首页看看！',
            require: false
        }
    },
    methods: {
        gotoHome(pos, tarPos){
            var link = 'https://waimai.baidu.com/static/pinzhi2/index.html#/';
            NA.changePage(link);
        }
    }
}
</script>

<style lang="less-loader">
    .compo-pinzhi-home-button{
        position: fixed;
        img{
            width: 100%;
        }
    }
</style>
