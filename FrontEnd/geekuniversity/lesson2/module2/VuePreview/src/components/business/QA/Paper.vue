<template>
    <div class="compo-paper">
        <div class="paper-box">
            <div class="page-header">
                <img :src="headerImage"/>
                <div class="user-name">
                    姓名 <input v-model="name" type="text" maxlength="6"/> (必填)
                </div>
            </div>

            <div :class="{blur: this.showScore}">
                <slot></slot>
            </div>

            <img class="submit-btn" :src="submitImage" @click="submit"/>
        </div>

        <div v-if="showMask" class="weixin-layer" @click="hideMask">
            <img src="https://img.waimai.baidu.com/pb/5f13d0636f0fe6f47b15c69f2375ab9946@f_png,q_80"/>
        </div>
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'headerImage',
        title: '头部背景图',
        type: String,
        default: 'https://img.waimai.baidu.com/pb/2499a2700ea31b593bf67e580c1b624443@w_750,q_80',
        require: false,
        component: 'InputUpload'
    },
    {
        name: 'submitImage',
        title: '提交按钮图',
        type: String,
        default: 'https://img.waimai.baidu.com/pb/8973102ad6633373fa3cefcb59e0998400@w_750,q_80',
        require: false,
        component: 'InputUpload'
    }
];

export default {
    name: 'xp-paper',
    components: {
    },
    props: Utils.toProps(config),
    data() {
        return {
            showScore: false,
            scoreDetails: [],
            totalScore: 0,
            name: '',
            showMask: false
        }
    },
    methods: {
        submit() {
            // if(!this.name){
            //     this.alert({
            //         content: '同学，忘写名字了'
            //     });
            // } else {
                // let fb = forbiden.split(',');
                // let pass = true;
                // fb.map(item => {
                //     if(item == this.name) {
                //         pass = false;
                //     }
                // })
                // if(!pass){
                //     this.alert({
                //         content: '同学，换个名字吧'
                //     });
                //     return;
                // }
                // this.showScore = true;
                this.totalScore = 0
                this.$children.forEach( (item, idx) => {
                    // if(item.result == 1){
                        this.scoreDetails.push({
                            no: item.no,
                            score: item.score
                        })
                        this.totalScore += parseInt(item.score);
                    // } else {
                    //     this.scoreDetails.push({
                    //         no: item.no,
                    //         score: 0
                    //     })
                    // }
                })
                console.log(this.totalScore)
                this.gotoResult()
            // }
        },
        hideMask() {
            this.showMask = false;
        },
        gotoResult() {
            let pages = [{
                '0': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692296856&t=1503758418825', //辣辣
                '1': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692296856&t=1503758418825', //辣苦
                '2': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692198854&t=1503758526249', //辣甜
                '3': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692345857&t=1503758544481', //辣酸
            }, {
                '0': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692572921&t=1503758887558', //苦辣
                '1': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692658923&t=1503758985094', //苦苦
                '2': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692526920&t=1503758917847', //苦甜
                '3': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692658923&t=1503758985094', //苦酸
            }, {
                '0': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692123853&t=1503759061061', //甜辣
                '1': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692123853&t=1503759061061', //甜苦
                '2': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503691896851&t=1503759228516', //甜甜
                '3': 'https://waimai.baidu.com/static/h5/index.html?modelId=15034695077451&t=1503759182625', //甜酸
                
            }, {
                '0': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692471918&t=1503759494673', //酸辣
                '1': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692425899&t=1503759394161', //酸苦
                '2': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692526920&t=1503759521976', //酸甜
                '3': 'https://waimai.baidu.com/static/h5/index.html?modelId=1503692425899&t=1503759394161', //酸酸
            }];
            let scoreArr = ((10000 + this.totalScore) + '').slice(1).split('')
            console.log('>>>before:', JSON.stringify(scoreArr))
            scoreArr = scoreArr.map((item, idx) => {
                return {
                    index: idx,
                    value: item
                }
            })
            scoreArr.sort((a, b) => {
                return b.value - a.value
            })
            console.log('>>>after:', JSON.stringify(scoreArr))
            let url = pages[scoreArr[0].index][scoreArr[1].index];
            console.log('>>>>url:', url)
            if(url){
                this.changePage(url);
            }
        },
        doShare() {
            let url = 'https://waimai.baidu.com/static/h5/index.html?modelId=149675493116';
            if(this.isWeixin()){
                this.showMask = true;
            }
            eventHub.$emit('share', url);
            this.newSak({
                daSrc: 'share.click',
                daAct: 'click',
            });
        }
    }
}
</script>
<style lang="less-loader">
    .compo-paper{
        display: block;
        padding: 20px 10px;
        background-color: #c2c2c2;

        .paper-box{
            position: relative;
            background-color: #fffcf5;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);

            .page-header{
                position: relative;
                img{
                    width: 100%;
                }
                .user-name{
                    display: none;
                    position: absolute;
                    top: 1.3rem;
                    left: 0;
                    width: 100%;
                    font-size: 0.36rem;
                    font-weight: 900;
                    color: #000;
                    text-align: center;
                    letter-spacing: 2px;

                    input{
                        border: none;
                        outline: none;
                        border-bottom: 1px #000 solid;
                        background-color: transparent;
                        text-align: center;
                        width: 2rem;
                        font-size: 0.3rem;
                        color: #000;
                        border-radius: 0
                    }
                }
            }
            .submit-btn{
                width: 100%;
                cursor: pointer;
                margin: 30px 0 10px 0;
            }
        }

        .scorePanel{
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 100;

            .mask{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(0,0,0,0.5);
                z-index: 101;
            }

            .panel-content{
                position: absolute;
                width: 80%;
                left: 10%;
                top: 50%;
                transform: translateY(-50%);
                background-color: #fff;
                padding: 10px;
                z-index: 102;
                
                .panel-border{
                    border:1px solid #444;
                    padding: 0 20px 0 20px;
                }

                .title-main{
                    padding: 5px 0 5px 0;
                    text-align: center;
                    font-size: 0.3rem;
                    color: #323232;
                    letter-spacing: 2px;
                }
                .title-sub{
                    padding: 0 0 10px 0;
                    text-align: center;
                    color: rgb(182, 73,43);
                    font-size: 0.3rem;
                    letter-spacing: 15px;
                }
                table{
                    width: 100%;
                    tr{
                        td{
                            text-align: center;
                            font-size: 12px;
                        }
                    }
                    .redfont{
                        color: #b6492b;
                        font-weight: bolder;
                        font-size: 16px;
                        td{
                            padding: 2px;
                        }
                    }
                }

            }
        }

        .weixin-layer{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            text-align: right;
            background-color: rgba(0,0,0, 0.8);
            z-index: 103;

            img{
                width: 94%;
            }
        }
    }

    .blur{
        filter: blur(10px);
    }
</style>
