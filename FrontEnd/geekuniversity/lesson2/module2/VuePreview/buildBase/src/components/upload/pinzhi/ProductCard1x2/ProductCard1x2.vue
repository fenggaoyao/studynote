<template>
    <span class="product-card-1x2" @click="gotoDetail">
        <div class="product-image">
            <img :src="src"/>
        </div>
        <div class="product-info">
            <p class="title-area">
                {{productName}}
            </p>
            <p v-if="isOnline" class="price-area">
                <span class="price"><i>￥</i>{{price}} <b v-if="showOrigin">￥{{originPrice}}</b></span>
                
                <a v-if="canSale" class="buy-btn" @click="gotoBuy"><i class="icon-buy"></i></a>
                <span v-else>{{reason}}</span>
            </p>
            <p v-else class="offline">
                已下线
            </p>
        </div>
    </span>
</template>

<script>
import NA from '../NA.js';
import Utils from '../Utils.js';

export default {
    name: 'xp-product-card-1x2',
    display: 'flex',
    props: {
        productId: {
            type: String,
            default: '',
            require: true
        },
        link: {
            require: false,
            default: ''
        },
        productData: {
            type: Object,
            default: () => {
                return {
                    has_activity: 0,
                    is_seckill: 0,
                    images: ''
                }
            },
            require: false
        }
    },
    computed: {
        productName(){
            return this.productData.tiny_name;
        },
        isOnline(){
            return this.productData.user_client_offline == '1' ?  false : true;
        },
        price(){
            if(this.productData.has_activity == '1'){
                return this.productData.activity_price;
            } else {
                return this.productData.current_price/100;
            }
        },
        showOrigin(){
            if(this.productData.has_activity == '1'){
                return true;
            }
            return false;
        },
        originPrice(){
            return Math.max(this.productData.current_price, this.productData.origin_price)/100;
        },
        isMiaosha(){
            return this.productData.is_seckill ? true : false;
        },
        src(){
            return this.productData.images.split('$')[0] + '@w_375,q_75'
        },
        canSale(){
            if(this.productData.on_sale == 2){
                return false
            }else if(this.productData.left_num == 0 || this.productData.activity_left_num == 0){
                return false;
            }
            return true;
        },
        reason(){
            if(this.productData.on_sale == 2){
                return '不在可售时间'
            }else if(data.left_num == 0 || data.activity_left_num == 0){
                return '已售罄'
            }
        }
    },
    methods: {
        gotoBuy(e){
            e.preventDefault();
            e.stopPropagation();
        },

        gotoDetail(e){
            var link = 'https://waimai.baidu.com/static/pinzhi2/index.html#/detail/' + this.productId;
            NA.changePage(link);
        }
    }
}
</script>

<style lang="sass-loader">
    .product-card-1x2{
        display: inline-block;
        width: 50%;
        padding: 0.15rem 0.1rem;

        .product-image{
            font-size: 0;
            img{
                width: 100%;
                border-radius: 6px 6px 0 0;
            }
        }

        .product-info{
            background-color: #fff;
            border-radius: 0 0 6px 6px;
            position: relative;

            .title-area{
                color: rgba(58, 54, 53, 0.9);
                padding: 0.2rem 0.10rem;
                font-size: 0.3rem;
            }

            .price-area{
                padding: 0px 0.10rem 0.10rem 0.10rem;
                height: 0.6rem;
                .price{
                    color: #ff2d4b;
                    font-size: 0.36rem;
                    i{
                        font-style: normal;
                        color: #ff2d4b;
                        font-size: 12px;
                    }

                    b{
                        font-weight: normal;
                        text-decoration: line-through;
                        color: #666;
                        padding-left: 5px;
                        font-size: 12px;
                    }
                }

                .buy-btn{
                    float: right;
                    background: url(./buy.svg);
                    background-size: 100% 100%;
                    width: 0.4rem;
                    height: 0.4rem;
                    cursor: pointer;
                    margin-top: 0.1rem;
                }
            }

            .offline{
                padding: 0px 0.10rem 0.10rem 0.10rem;
                height: 0.6rem;
                line-height: 0.6rem;
            }
            
        }
    }
</style>
