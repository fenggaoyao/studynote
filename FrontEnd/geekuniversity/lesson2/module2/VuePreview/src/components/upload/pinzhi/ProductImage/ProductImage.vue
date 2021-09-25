<template>
    <div class="compo-product-image"  @click="gotoDetail">
        <div class="product-image">
            <div class="holder"></div>
            <img :src="src"/>
        </div>
        <a class="buy-btn" @click="gotoBuy"><i class="icon-buy"></i></a>
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'pId',
        title: '商品ID',
        type: String,
        default: '',
        require: false,
        component: 'InputText'
    },
    {
        name: 'src',
        title: '图片地址',
        default: '',
        require: false,
        component: 'InputUpload'
    },
];

export default {
    name: 'xp-product-image',
    props: Utils.toProps(config),
    methods: {
        gotoBuy(e){
            let me = this;
            e.preventDefault();
            e.stopPropagation();

            me.post({
                url: '/pinzhi/main/addcartitem',
                data: {
                    item_id: this.productId,
                    display: 'json'
                }
            }).then(data => {
                if(data.error_no == 0 && data.result.total > 0){
                    me.emit('addToCart', e);
                }
            })
        },

        gotoDetail(e){
            var link = 'https://waimai.baidu.com/static/pinzhi2/index.html#/detail/' + this.productId;
            this.changePage(link);
        }
    }
}
</script>

<style lang="less-loader">
    .compo-product-image{
        width: 100%;
        display: flex;
        position: relative;
        padding: 0.15rem 0.1rem;
        font-size: 0;
        align-items: stretch;

        .product-image{
            width: 40%;
            position: relative;
            .holder{
                padding-top: 70%;
            }
            img{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                border-radius: 6px;
            }
        }

        .buy-btn{
            float: right;
            background: url(./buy.svg);
            background-size: 100% 100%;
            width: 0.5rem;
            height: 0.5rem;
            cursor: pointer;
            margin-right: 0.1rem;
        }
            
    }
</style>
