import Utils from 'utils'
import api from 'api'
import mixin from './mixin'

export const initWXResource = (() => {
    let p
    return () => {
        if (window.wx) {
            return Promise.resolve(window.wx)
        }
        if (!p) {
            p = Utils.require('//res.wx.qq.com/open/js/jweixin-1.0.0.js')
        }
        return p.then(() => {
            return window.wx
        })
    }
})()

const getWXToken = (() => {
    let p
    let result
    return () => {
        if (result) {
            return Promise.resolve(result)
        }
        if (!p) {
            p = api.getWXToken()
        }
        return p
    }
})()

export const initWX = (() => {
    let p
    let result
    return () => {
        if (result) {
            return Promise.resolve(window.wx)
        }
        if (!p) {
            p = Promise.all([getWXToken(), initWXResource()]).then(([data, wx]) => {
                wx.config({
                    debug: false,
                    appId: data.result.appId,
                    timestamp: data.result.timestamp,
                    nonceStr: data.result.nonceStr,
                    signature: data.result.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'getLocation']
                })
                result = true
                return wx
            })
            return p
        }
    }
})()

const readyWX = () => {
    return initWX().then(wx => {
        return new Promise((resolve, reject) => {
            wx.ready(() => {
                resolve(wx);
            })
        })
    })
}

export const setShareWXInfo = data => {
    readyWX().then(wx => {
        const config = {
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            type: '',
            dataUrl: '',
            success() {
                data.callback && data.callback();
            },
            cancel() {
            }
        };
        wx.onMenuShareAppMessage(config);
        wx.onMenuShareQQ(config);
        wx.onMenuShareQZone(config);
        wx.onMenuShareTimeline(config);
    })
}

export const shareNA = (params = {
                            WXSessionShare: {
                                imageUrl,
                                title,
                                description,
                                linkUrl,
                                bigImageUrl,
                                shareType, // 0表示链接分享 1大图分享
                            },
                            WXTimelineShare,
                            WeiboShare,
                            QQZoneShare,
                            QQSessionShare,
                            TextCopyShare // only accept linkUrl
                        }) => {
    mixin.NAready().then(() => {
        window.WMApp && WMApp.share.universalShare(params);
    })
}

export const shareNuomi = param => {
    /**
     属性名	   类型	   是否必填 支持JSB版本	   描述
     title	    String	否	  1.0	分享内容标题，默认值‘分享’
     content	String	否	  1.0	分享详细内容，默认值‘’
     imgUrl	    String	否	  1.0	分享图片url, type为1时，分享图片的地址
     type	    Number	否	  2.6	分享的类型，默认值1，普通分享；2，大图分享
     imageList	Array	否	  2.6	分享的大图地址。type为2时，必须填写，分享图片的地址
     url	    String	是	  1.0	分享内容url
     platforms	Array	否	  2.4	"qq_friend" // QQ好友
                                    "qq_zone" // QQ空间
                                    "weixin_session" // 微信好友
                                    "weixin_timeline" // 微信朋友圈
                                    "sinaweibo" // 新浪微博
                                    "copylink" // 复制链接
                                    "email" // 邮件
                                    "sms" // 短信
                                    不传或传空，则全部显示
     srcPage	string	否	2.7	    分享页面来源,用于统计分享
     onSuccess	Function否	1.0 分享成功，回调函数
     onFail	    Function否	1.0	分享失败，回调函数
     *
     * */
    mixin.NAready().then(() => {
        window.BNJS && window.BNJS.ui.share(param);
    })
}
