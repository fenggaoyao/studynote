<template>
    <div class="xp-provinces">
        <div @click="doOpen">
            <slot></slot>
        </div>
        <div class="provinces-modal"
             v-show="isShowModal">
            <div class="provinces-container">
                <div class="header">
                    <div class="close" @click.stop="doClose"></div>
                    <div class="title">选择你的菜</div>
                </div>
                <div class="provinces"
                     v-for="area in provincesData"
                     :data-key="area.key">
                    <div class="area">{{area.areaName}}</div>
                    <div class="province"
                         v-for="province in area.provinces"
                         :data-key="province.key"
                         @click.stop="goProvince(province.key)">
                        {{province.name}}
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
import Utils from 'utils'
import provincesData from './provincesData'

const generateConfig = (data) => {
    let config = []
    data.forEach(area => {
        area.provinces.forEach(province => {
            config.push({
                name: province.key,
                title: province.name + '链接地址',
                type: String,
                require: false,
                component: 'InputText'
            })
        })
    })
    return config
}

export default {
    name: 'xp-april-activity-provinces',

    props: Utils.toProps(generateConfig(provincesData)),

    data() {
        return {
            provincesData: provincesData,
            isShowModal: false,
        };
    },

//    mounted() {
//        var deviceWidth = document.documentElement.clientWidth;
//        if (deviceWidth > 640) deviceWidth = 640;
//        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
//    },

    methods: {
        doOpen() {
            this.isShowModal = true
            this.newSak({
                daSrc: 'provincesButton.1',
                daAct: 'click',
                daTrace: ''
            })
        },

        doClose() {
            this.isShowModal = false
            this.newSak({
                daSrc: 'provincesButton.0',
                daAct: 'click',
                daTrace: ''
            })
        },

        goProvince(key) {
            const url = this[key]
            if (url) {
                this.newSak({
                    daSrc: `goProvince.${key}`,
                    daAct: 'click',
                    daTrace: ''
                }, this.changePage.bind(this, url))
            }
        },
    }
}
</script>

<style lang="less">
.xp-provinces {
    @font-face {
        font-family: "webfont";
        src: url("kaiti.ttf") format("truetype"); /* iOS 4.1- */
        font-style: normal;
        font-weight: normal;
    }

    width: 100%;

    .provinces-modal {
        position: fixed;
        z-index: 10000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: .3rem .2rem;
        font-family: webfont;
        font-weight: bold;
        background-color: rgba(0, 0, 0, .6);
        transition: opacity .3s ease;
        overflow: hidden;

        .provinces-container {
            position: relative;
            padding: .3rem .3rem .1rem .3rem;
            width: 100%;
            border-radius: .2rem;
            background-color: rgb(245, 243, 228);

            .header {
            }

            .title {
                font-size: .5rem;
                font-weight: bold;
                color: #0e254e;
                letter-spacing: .05rem;
            }

            .close {
                position: absolute;
                right: .3rem;
                margin-top: .1rem;
                width: .5rem;
                height: .5rem;
                line-height: .4rem;
                font-size: .4rem;
                text-align: center;
                border-radius: 50%;
                background: url(http://img.waimai.baidu.com/pb/201d39a84a733995c091a1ef6477a35119) #ee3b3d no-repeat;
                background-size: cover;
                color: #fff;
            }

            .provinces {
                padding: .14rem 0;
                width: 100%;
                -ms-writing-mode: tb-lr;
                -webkit-writing-mode: vertical-lr;
                writing-mode: vertical-lr;
                text-align: center;
                border-bottom: 1px solid rgb(220, 221, 205);

                .area {
                    font-size: .2rem;
                    color: #ff2d4b;
                    letter-spacing: .04rem;
                }

                .province {
                    margin: 0 .3rem;
                    font-size: .4rem;
                    font-weight: bold;
                    color: #464646;
                    letter-spacing: .1rem;

                    &[data-key="neimenggu"],
                    &[data-key="heilongjiang"] {
                        letter-spacing: .01rem;
                    }
                }

                &[data-key="huanan"],
                &[data-key="gangaotai"] {
                    width: 50%;
                    height: 1.6rem;
                    /*height: 1.4rem;*/
                }

                &[data-key="huanan"] {
                    float: left;
                }

                &[data-key="gangaotai"] {
                    .area {
                        position: relative;
                        left: .2rem;
                    }
                }

                &:last-child {
                    border: none
                }
            }

        }
    }
}
</style>
