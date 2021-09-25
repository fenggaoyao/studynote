<template>
    <div class="article-card-1x1" @click="gotoDetail">
        <div class="article-image">
            <div class="holder"></div>
            <img :src="src"/>
        </div>
        <div class="article-info">
            <div class="title-area">
                {{articleName}}
                <div class="source-area">
                    {{source}}
                </div>
            </div>
            
            <div class="category-area">
                <span class="category"><img :src="themeImage"/><span>{{theme}}</span></span>
                <span class="zan">点赞 {{zan}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'xp-article-card-1x1',
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
            return this.productData.image + '@s_2,h_180,w_240,q_80'
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
        zan(){
            return this.productData.praise_num;
        }
    },
    methods: {
        gotoDetail(e){
            this.newSak({
                daSrc: 'bookButton.click',
                daAct: 'click',
                daTrace: ''
            });

            var link = '';
            if(this.productData.is_self == '1'){
                link = 'http://waimai.baidu.com/static/chisha/index.html?city_id=131&time=' + Date.now() + '#/selfArticle/' + this.productId;
            } else {
                link = 'http://waimai.baidu.com/static/chisha/index.html?city_id=131&time=' + Date.now() + '#/outArticle/' + this.productId;
            }
            this.changePage(link);
        }
    }
}
</script>

<style lang="less-loader">
    .article-card-1x1{
        width: 100%;
        display: flex;
        padding: 0.4rem 0.1rem;

        .article-image{
            width: 34%;
            position: relative;
            img{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                border-radius: 6px;
            }
            .holder{
                padding-top: 75%;
            }
        }
        .article-info{
            width: 66%;
            padding-top: 26.5%;
            padding-left: 0.3rem;
            padding-right: 0.1rem;
            position: relative;

            .title-area{
                position: absolute;
                left: 0.3rem;
                top: 0px;
                color: #c3835e;
                padding: 0rem 0.1rem 0rem 0;
                font-size: 0.3rem;
                .source-area{
                    color: #5c3830;
                    font-size: 0.24rem;
                }
            }
            
            .category-area{
                position: absolute;
                width: 100%;
                left: 0rem;
                bottom: 2px;
                width: 100%;

                .category{
                    font-size: 0.24rem;
                    padding-left: 0.3rem;

                    img{
                        width: 0.46rem;
                        height: 0.46rem;
                        border-radius: 100%;
                        vertical-align: middle;
                    }
                    span{
                        color: #5c3830;
                        vertical-align: middle;
                        padding-left: 0.16rem;
                        font-size: 0.24rem;
                    }
                }
                .zan{
                    float: right;
                    margin-top: 0.08rem;
                    color: #976447;
                }
            }
            
        }
    }
</style>
