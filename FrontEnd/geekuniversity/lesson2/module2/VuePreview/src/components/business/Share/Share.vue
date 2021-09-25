<template>
    <div class="compo-share">
    </div>
</template>

<script>
import Utils from 'utils'

export default {
    name: 'xp-share',
    props: {
        platforms: {
            type: Array,
            default: () => [],
            require: true
        },
        title: {
            type: String,
            default: '0',
            require: false
        },
        image: {
            type: String,
            default: '0',
            require: false
        },
        description: {
            type: String,
            default: '0',
            require: false
        }
    },

    methods: {
        commandClick(data){
            let me = this;
            if (data && data.result) {
                if (data.result.id == 'share') {
                    me.newSak({
                        daSrc: 'doshare.click',
                        daAct: 'click',
                    });
                    me.share();
                }
            }
        },

        share(shareUrl){
            let me = this;
            let url = 'http://waimai.baidu.com/static/h5/index.html?modelId=' + Utils.getQueryString('modelId') + '&from=weixin';
            if (window.WMApp) {
                let params = {};
                let pinfo = {
                    'imageUrl': me.image,          // 图片
                    'title': me.title,             // 分享标题
                    'description': me.description, // 分享描述
                    'linkUrl': shareUrl || url, // 链接
                    'shareType': 0 // 0表示链接分享
                };
                for(let p in me.platforms){
                    switch(me.platforms[p]){
                        case "微信朋友圈":
                        pinfo.linkUrl = url + '&from=weixin'
                            params.WXTimelineShare = pinfo;
                        break;
                        case "微信好友":
                            params.WXSessionShare = pinfo;
                        break;
                        case "复制链接":
                            params.TextCopyShare = pinfo;
                        break;
                        case "微博":
                            params.WeiboShare = pinfo;
                        break;
                        case "QQ空间":
                            params.QQZoneShare = pinfo;
                        break;
                        case "QQ好友":
                            params.QQSessionShare = pinfo;
                        break;
                    }
                }
                window.WMApp.share.universalShare(params);
            } else if (window.BNJS) {
                let pfs = [];
                for(let p in me.platforms){
                    switch(p){
                        case "微信朋友圈":
                            pfs.push('weixin_timeline');
                        break;
                        case "微信好友":
                            pfs.push('weixin_session');
                        break;
                        case "复制链接":
                            pfs.push('copylink');
                        break;
                        case "微博":
                            pfs.push('sinaweibo');
                        break;
                        case "QQ空间":
                            pfs.push('qq_zone');
                        break;
                        case "QQ好友":
                            pfs.push('qq_friend');
                        break;
                    }
                }
                window.BNJS.ui.share({
                    title: me.title,
                    content: me.description,
                    imgUrl: me.image,
                    platforms: pfs,
                    url: shareUrl || url,
                    onSuccess: function () {
                    },
                    onFail: function () {
                    }
                });
            } else if(me.isWeixin()) {
                this.weixinShare(shareUrl)
            }
        },

        weixinShare(linkUrl) {
            let me = this;
            if(me.isWeixin()){
                let url = 'http://waimai.baidu.com/static/h5/index.html?modelId=' + Utils.getQueryString('modelId') + '&from=weixin';
                me.get({
                    url: '/fly/h5/rest/getwxtoken',
                    param: {url: location.href}
                }).then( data => {
                    if(data.error_no == 0){
                        let res = data.result;
                        let shareUrl = linkUrl || url;
                        if(window._wxReady){
                            setShare();
                        } else {
                            window._setShare = setShare;
                        }

                        function setShare(){
                            window.setShareInfo({
                                title:  me.title,
                                summary: me.description,
                                url: shareUrl,
                                pic: me.image,
                                WXconfig: {
                                    swapTitleInWX: false,
                                    appId: res.appId,
                                    timestamp: res.timestamp,
                                    nonceStr: res.nonceStr,
                                    signature: res.signature
                                }
                            });
                        }
                    }
                });
            }
        },

        setTitle(title) {
            const me = this
            title && (document.title = title)
            this.NAready().then(() => {
                if (window.WMApp) {
                    window.WMApp.page.setTitleBar({
                        titleText: title || document.title,
                        titleClickAble: 0,     // 是否可点击，0不可点，1可点，默认0
                        actionText: '分享',     // 右边操作文案，
                        actionClickAble: 1,    // 右边按钮是否可点击
                        actionList: [
                            {
                                "title": "分享",
                                "titleColor": "#cccccc",
                                "icon": 'https://img.waimai.baidu.com/pb/bae031e3fc1a3e4fab5ee369d32895c729',
                                "id": "share",
                            }
                        ]
                    });
                    window.WMApp.entry.setPageAction('onActionClick', me.commandClick);
                } else if (window.BNJS) {
                    window.BNJS.ui.title.setTitle(title || document.title);
                    window.BNJS.ui.title.addActionButton({
                        tag: 100,
                        text: '分享',
                        callback: me.share
                    });
                }  else if(me.isWeixin()) {
                    var i = document.createElement('iframe');
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
        }
    },

    mounted(){
        let me = this;
        eventHub.$on('modelName', (modelName) => {
            this.setTitle(modelName)
        })

        eventHub.$on('share', (url) => {
            this.share(url)
        })

        this.setTitle()
        this.weixinShare();
        window._global_share = {
            platforms: this.platforms,
            title: this.title,
            image: this.image,
            description: this.description
        }
    }


}
</script>