<template>
    <div ref="cartIcon" class="compo-shop-cart" :style="cssText" @click="gotoCartPage">
        <img v-if="isEmpty" :src="emptyImage">
        <img v-else :src="image">
    </div>
</template>

<script>
import utils from 'utils';
export default {
    name: 'xp-shop-cart',
    display: 'fixed',
    props: {
        image: {
            type: String,
            default: 'http://img.waimai.baidu.com/pb/fc12c35df768111793aa07d9bb95ab707c@f_png,w_100,h_100',
            require: false
        },
        emptyImage: {
            type: String,
            default: 'http://img.waimai.baidu.com/pb/72dc34a27a3676828a8e9cf6d7fac88f31@f_png,w_100,h_100',
            require: false
        },
        link: {
            require: false,
            default: 'http://waimai.baidu.com/static/pinzhi2/index.html#/shopCart/detail'
        },
        width: {
            default: 52,
            require: false
        },
        height: {
            default: 52,
            require: false
        },
        left: {
            default: 20,
            require: false
        },
        right: {
            default: 0,
            require: false
        },
        top: {
            default: 0,
            require: false
        },
        bottom: {
            default: 20,
            require: true
        }
    },
    data(){
        return {
            isEmpty: true,
            flyItems: []
        }
    },
    computed: {
        cssText(){
            let style =  {
                "position": 'fixed',
                'z-index': 999999
            };
            style = Object.assign(style, utils.toCSS(this));
            return style;
        }
    },
    created(){
        let me = this;
        this.on('addToCart', (evt) => {
            let rect = me.$refs.cartIcon.getBoundingClientRect();
            me.addItem({
                left: evt.clientX - 10,
                top: evt.clientY - 20
            }, {
                left: rect.left + 10,
                top: rect.top + 10
            });
            me.isEmpty = false;
        })

        this.post({
            url: '/pinzhi/main/getcartnum',
        }).then(data => {
            if(data.error_no == 0 && data.result.total > 0){
                me.isEmpty = false;
            }
        })
    },
    methods: {
        addItem(pos, tarPos){
            let div = document.createElement('div');
            div.className = 'fly-item';
            div.style.left = pos.left + 'px';
            div.style.top = pos.top + 'px';
            div.style.zIndex = this.nextZIndex();
            div.innerHTML = 1;
            document.body.appendChild(div);

            div.addEventListener('transitionend', () => {
                if(div.parentNode == document.body){
                    document.body.removeChild(div);
                }
            });
            
            setTimeout(() => {
                div.style.left = tarPos.left + 'px';
                div.style.top = tarPos.top + 'px';

                setTimeout(()=> {
                    if(div.parentNode == document.body){
                        document.body.removeChild(div);
                    }
                }, 600);
            }, 0);
        },

        gotoCartPage(){
            if(this.link){
                this.newSak({
                    daSrc: 'toCartPage.click',
                    daAct: 'click'
                }, () => {
                    this.changePage(this.link)
                });
            }
        }
    }
}
</script>

<style lang="less-loader">
    .compo-shop-cart{
        position: fixed;
        img{
            width: 100%;
        }
    }
    .fly-item{
        position: fixed;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 100%;
        background-color: #4d4a49;
        color: #ccc;
        font: 12px;
        transition: left 0.6s cubic-bezier(0, 0, 0, 0), top 0.6s cubic-bezier(0, -0.3, 0.58, -0.01);
    }
</style>
