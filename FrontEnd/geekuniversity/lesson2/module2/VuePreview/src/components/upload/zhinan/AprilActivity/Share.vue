<template>
    <div class="xp-share" @click.stop="doShare">
        <slot></slot>
        <div class="coupon" @click.stop="goCoupon" v-if="isCouponShow">
            <div class="close"
                 @click.stop="closeCoupon"></div>
        </div>
        <div class="guide" @click.stop="closeGuide" v-if="isGuideShow"></div>
    </div>
</template>

<script type="es6">
import Utils from 'utils'
import api from 'api'
import {initWX, setShareWXInfo, shareNA, shareNuomi} from 'platform'
const config = [
    {
        name: 'wxCouponUrl',
        title: 'wx红包',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'naCouponUrl',
        title: 'na红包',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'NASharePicSrc',
        title: 'NA分享图片链接',
        type: String,
        default: '/public/images/no-image-icon.png',
        require: true,
        component: 'InputUpload'
    },
    {
        name: 'wxSharePicSrc',
        title: '微信分享图片链接',
        type: String,
        default: '/public/images/no-image-icon.png',
        require: true,
        component: 'InputUpload'
    },
    {
        name: 'wxShareTitle',
        title: '微信分享标题',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'wxShareDesc',
        title: '微信分享描述',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
]

export default {
    name: 'xp-april-activity-share',

    props: Utils.toProps(config),

    data() {
        return {
            isCouponShow: false,
            isGuideShow: false,
        };
    },

    mounted() {
        eventHub.$on('modelName', function (modelName) {
            modelName && (document.title = modelName)
            this.NAready().then(() => {
                if (this.isWMApp()) {
                    window.WMApp.page.setTitleBar({
                        titleText: modelName,
                        titleClickAble: 0,     // 是否可点击，0不可点，1可点，默认0
                    });
                } else if (this.isNuomi()) {
                    window.BNJS.ui.title.setTitle(modelName);
                } else if(this.isWeixin()) {
                    let i = document.createElement('iframe');
                    i.src = '//m.baidu.com/favicon.ico';
                    i.style.display = 'none';
                    i.onload = function() {
                        setTimeout(function(){
                            i.remove();
                        }, 16)
                    }
                    document.body.appendChild(i);
                }
            })
        }.bind(this))
        if (this.isWeixin()) {
            initWX().then(wx => {
                setShareWXInfo({
                    title: this.wxShareTitle,
                    desc: this.wxShareDesc,
                    link: location.href,
                    imgUrl: this.wxSharePicSrc,
                    callback: function () {
                        this.newSak({
                            daSrc: 'shareSuccess',
                            daAct: 'share',
                            daTrace: ''
                        }, function () {
                            this.changePage(this.wxCouponUrl)
                        }.bind(this))
                    }.bind(this)
                })
            })
        }
        
    },

    watch: {
        'isCouponShow': function (val) {
            if (val === true) {
                this.newSak({
                    daSrc: 'coupon',
                    daAct: 'show',
                    daTrace: ''
                })
            } else {
                this.newSak({
                    daSrc: 'closeCoupon',
                    daAct: 'click',
                    daTrace: ''
                })
            }
        }
    },

    methods: {
        doShare() {
            this.newSak({
                daSrc: 'shareButton',
                daAct: 'click',
                daTrace: ''
            })
            if (this.isWMApp()) {
                const params = {
                    WXSessionShare: {
                        'imageUrl': this.NASharePicSrc,
                        'bigImageUrl': this.NASharePicSrc,
                        'shareType': 1    // 1大图分享
                    },
                    WXTimelineShare: {
                        'imageUrl': this.NASharePicSrc,
                        'bigImageUrl': this.NASharePicSrc,
                        'shareType': 1    // 1大图分享
                    }
                }
                shareNA(params)
                this.showCoupon()
            } else if (this.isNuomi()) {
                shareNuomi({
                    type: 2, // 分享的类型，默认值1，普通分享；2，大图分享
                    imageList: [this.NASharePicSrc], // 分享的大图地址。type为2时，必须填写，分享图片的地址
                    platforms: ['weixin_timeline', 'weixin_session'],
                    onSuccess: function () {
                        this.newSak({
                            daSrc: 'shareSuccess',
                            daAct: 'share',
                            daTrace: ''
                        }, this.changePage.bind(this, this.naCouponUrl))
                    }.bind(this),
                    onFail: function () {
                    }
                })
            } else if (this.isWeixin()) {
                this.isGuideShow = true
            }
        },

        showCoupon() {
            setTimeout(function () {
                this.isCouponShow = true
            }.bind(this), 300)
        },

        closeCoupon() {
            this.isCouponShow = false
        },

        closeGuide() {
            this.isGuideShow = false
        },

        goCoupon() {
            const url = this.naCouponUrl
            this.newSak({
                daSrc: 'goCoupon',
                daAct: 'click',
                daTrace: ''
            }, this.changePage.bind(this, url))
        },
    }
}
</script>

<style lang="less">
.xp-share {
    height: 100%;
    .coupon {
        position: fixed;
        z-index: 999;
        bottom: 0;
        margin: 0 -1rem;
        width: 2rem;
        height: 2rem;
        background: url(http://img.waimai.baidu.com/pb/e9d3ae16dc1b4cae870ece207f8e37f6ba) no-repeat;
        background-size: contain;

        .close {
            position: absolute;
            top: .1rem;
            right: .1rem;
            z-index: 999;
            width: .4rem;
            height: .4rem;
            line-height: .4rem;
            font-size: .3rem;
            text-align: center;
            border-radius: 50%;
            background: url(http://img.waimai.baidu.com/pb/201d39a84a733995c091a1ef6477a35119) #ee3b3d no-repeat;
            background-size: cover;
            color: #fff;
        }
    }
    .guide {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background: url(http://img.waimai.baidu.com/pb/4a594ea7198a97a0b2dbd99b9ed9418509) rgba(0, 0, 0, .8) no-repeat;
        background-size: contain;
        z-index: 999;
    }
}
</style>