<template>
    <div class="product-card-1x1">
        <div class="product-image">
            <img :src="src"/>
            <span v-if="isMiaosha"></span>
        </div>
        <div class="product-info">
            <p class="title-area">
                {{productName}}
            </p>
            <p class="price-area">
                <span class="price">{{price}}元/件 <b v-if="showOrigin">{{originPrice}}元</b></span>
                <span><a class="buy-btn" @click="gotoBuy">详情</a></span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'xp-product-card-1x1',
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
            return this.productData.name;
        },
        price(){
            return this.productData.activity_price;
        },
        showOrigin(){
            return this.productData.has_activity ? true : false;
        },
        originPrice(){
            return this.productData.current_price/100;
        },
        isMiaosha(){
            return this.productData.is_seckill ? true : false;
        },
        src(){
            return this.productData.images.split('$')[0];
        }
    },
    methods: {
        gotoBuy(e){

        }
    }
}
</script>

<style lang="sass-loader">
    .product-card-1x1{
        width: 100%;
        display: flex;
        background-color: #fff;
        padding: 15px 10px;

        .product-image{
            width: 40%;
            img{
                width: 100%;
            }
        }
        .product-info{
            width: 60%;
            padding-left: 15px;
            position: relative;

            .title-area{
                color: #000;
            }

            .price-area{
                position: absolute;
                width: 100%;
                bottom: 5px;
                padding-right: 15px;

                .price{
                    color: #ff2d4b;
                    b{
                        font-weight: normal;
                        text-decoration: line-through;
                        color: #666;
                        padding-left: 5px;
                    }
                }

                .buy-btn{
                    float: right;
                    color: #ff2d4b;
                    border: 1px solid #ff2d4b;
                    padding: 2px 15px;
                    border-radius: 30px;
                    font-size: 12px;
                    margin-top: -3px;
                    cursor: pointer;
                }
            }
            
        }
    }
</style>
