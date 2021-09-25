<template>
    <span class="compo-cater-card-1x2" @click="gotoDetail">
        <div class="cater-image">
            <img :src="image"/>
        </div>
        <div class="cater-info">
            <p class="title-area">
                {{name}}
            </p>
            <p class="address-area">
                {{address}}
            </p>
            <p class="book-area">
                <a class="book-btn">预定浪漫席位</a>
            </p>
        </div>
    </span>
</template>

<script>

export default {
    name: 'xp-cater-card-1x2',
    display: 'flex',
    props: {
        image: {
            type: String,
            default: '',
            require: true
        },
        name: {
            type: String,
            default: '',
            require: true
        },
        address: {
            type: String,
            default: '',
            require: true
        }
    },
    methods: {
        gotoDetail(e){
            this.newSak({
                daSrc: 'bookButton.click',
                daAct: 'click',
                daTrace: ''
            });
            
            let link = "http://waimai.baidu.com/static/chisha/index.html?shopName=" + encodeURIComponent(this.name) + '&shopAdr=' + encodeURIComponent(this.address) + '#/activityQixi'
            this.changePage(link);
        }
    }
}
</script>

<style lang="less-loader">
    .compo-cater-card-1x2{
        display: inline-block;
        width: 50%;
        padding: 0.15rem 0.1rem;

        .cater-image{
            font-size: 0;
            img{
                width: 100%;
                border-radius: 4px;
            }
        }

        .cater-info{
            border-radius: 0 0 6px 6px;
            position: relative;

            .title-area{
                color: #c3835e;
                padding: 0.2rem 0.1rem;
                font-size: 0.3rem;
                line-height: 1.5;
            }

            .address-area{
                color: #c3835e;
                padding: 0rem 0.1rem;
                font-size: 0.2rem;
                line-height: 1.3;
            }

            .book-area{
                text-align: left;
                padding: 0.2rem 0.1rem;

                .book-btn{
                    display: inline-block;
                    background-color: #e87358;
                    color: #fff;
                    border-radius: 4px;
                    padding: 0.2rem 0.4rem;
                    font-size: 0.28rem;
                    box-shadow: 0px 2px 0px #BF2A1E
                }
            }
            
        }
    }
</style>
