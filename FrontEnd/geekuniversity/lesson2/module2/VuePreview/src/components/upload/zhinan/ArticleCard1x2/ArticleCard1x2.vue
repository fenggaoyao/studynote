<template>
    <span class="article-card-1x2" @click="gotoDetail">
        <div class="article-image">
            <img :src="src"/>
        </div>
        <div class="article-info">
            <div class="title-area">
                {{articleName}}
            </div>
            <div class="source-area">
                {{source}}
            </div>
            <div class="category-area">
                <div class="category"><img :src="themeImage"/> <span>{{theme}}</span></div>
                <div class="zan">点赞 {{zan}}</div>
            </div>
        </div>
    </span>
</template>

<script>

export default {
    name: 'xp-article-card-1x2',
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
        src(){
            return this.productData.image + '@w_375,q_75'
        },
        articleName(){
            return this.productData.title;
        },
        source(){
            return this.productData.coop_name;
        },
        theme(){
            return this.productData.theme;
        },
        themeImage(){
            return this.productData.theme_logo;
        },
    },
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
    .article-card-1x2{
        display: inline-block;
        width: 50%;
        padding: 0.15rem 0.1rem;

        .article-image{
            font-size: 0;
            img{
                width: 100%;
                border-radius: 6px 6px 0 0;
            }
        }

        .article-info{
            background-color: #fff;
            border-radius: 0 0 6px 6px;
            position: relative;

            .title-area{
                color: #c3835e;
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
            }

            .offline{
                padding: 0px 0.10rem 0.10rem 0.10rem;
                height: 0.6rem;
                line-height: 0.6rem;
            }
            
        }
    }
</style>
