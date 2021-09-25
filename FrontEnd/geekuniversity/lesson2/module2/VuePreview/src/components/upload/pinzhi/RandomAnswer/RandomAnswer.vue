<template>
    <div class="random-answer">
        <div v-if="showInput" class="input-panel">
            <img src="http://img.waimai.baidu.com/pb/971e8a4d4bebac16ee8e53968b86287a56@w_750,q_80"/>
            <div class="input-pos">
                <input class="input-item" type="text" v-model="val" @input="inputChange"/>
            </div>
            <img src="http://img.waimai.baidu.com/pb/9ca66a003167ae3c85f25471597e2e26d3@w_750,q_80"/>
            <a :href="resultHref" class="button" @click="showAnswer"></a>
        </div>

        <div v-else class="result-panel">
            <img :src="answer"/>

            <template v-if="isShare">
                <div class="name-share-pos">{{name}}</div>
                <img src="http://img.waimai.baidu.com/pb/738ee092e53257678e73eb56967351ea58@w_750,q_80"/>
                <div class="button4" @click="gotoHome"></div>
                <a href="http://waimai.baidu.com/static/h5/index.html?modelId=14907717591&t=2332443" class="button5"></a>
            </template>
            
            <template v-if="!isShare">
                <div class="name-pos">{{name}}</div>
                <img src="http://img.waimai.baidu.com/pb/8d827063f1bb1844ac49a81ee869cd9333@w_750,q_80"/>
                <div class="button2" @click="doShare"></div>
                <a href="http://waimai.baidu.com/static/h5/index.html?modelId=14907717591&t=2332443" class="button3"></a>
            </template>
        </div>

        <div v-if="showMask" class="weixin-mask" @click="hideMask">
            <img src="http://img.waimai.baidu.com/pb/8d62888aaaf56ecc6158a3b66d6ce6ac9e@w_600,q_80,f_png"/>
        </div>
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'forbiden',
        title: '敏感词',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'answers',
        title: '答案',
        type: String,
        default: '',
        require: true,
        component: 'InputArea'
    },
    {
        name: 'shareResults',
        title: '分享结果',
        type: String,
        default: '',
        require: true,
        component: 'InputArea'
    },
];

export default {
    name: 'xp-random-answer',
    props: Utils.toProps(config),
    data() {
        let mode = Utils.getQueryString('m');
        let name = Utils.getQueryString('n');
        let resultId = Utils.getQueryString('r');
        let answer = '';
        
        let isShare = false;
        let weixin = Utils.getQueryString('from') == 'singlemessage' || Utils.getQueryString('from') == 'timeline';
        if(weixin && mode && name && resultId != ''){
            isShare = true;
        }

        if(resultId){
            let ans = this.answers.split('\n');
            let srs = this.shareResults.split('\n');
            if(isShare){
                answer = srs[parseInt(resultId)] || '';
            } else {
                answer = ans[parseInt(resultId)] || '';
            }
        }

        return {
            val: '',
            showInput: mode == 'r'? false : true,
            resultId: resultId,
            name: name,
            answer: answer,
            isShare: isShare,
            res: null,
            showMask: false,
            resultHref: ''
        };
    },

    methods: {
        inputChange(e) {
            let ans = this.answers.split('\n');
            this.name = e.currentTarget.value;
            let len = ans.length;
            this.resultId = Math.floor(Math.random()*len);
            this.answer = ans[this.resultId];
            let url = 'http://waimai.baidu.com/static/h5/index.html?modelId=14925286872518';
            url += '&m=r&n=' + encodeURIComponent(this.name) + '&r=' + this.resultId + '&t=' + Date.now();
            this.resultHref = url;
        },

        showAnswer(e) {
            if(!this.val) return;
            let fb = this.forbiden.split(','), name = this.val;
            let pass = true;
            fb.map(item => {
                if(item == name) {
                    pass = false;
                }
            })
            if(!pass){
                this.val = '';
                this.alert({
                    title: '-_-!!',
                    content: '昵称含有敏感字符，请重新输入哦~'
                });
                e.preventDefault();
                return false;
            }
            this.newSak({
                daSrc: 'answer.click',
                daAct: 'click',
            });
        },

        doShare() {
            let me = this;
            let shareInfo = me.getShareInfo();
            if (window.WMApp) {
                let params = {};
                let pinfo = {
                    'imageUrl': shareInfo.image,          // 图片
                    'title': shareInfo.title,             // 分享标题
                    'description': shareInfo.description, // 分享描述
                    'linkUrl': shareInfo.url, // 链接
                    'shareType': 0 // 0表示链接分享
                };
                let weixinInfo = Object.assign(pinfo, {linkUrl: shareInfo.url + '&from=weixin'});
                params.WXTimelineShare = weixinInfo;
                params.WXSessionShare = pinfo;
                params.TextCopyShare = pinfo;
                params.WeiboShare = pinfo;
                params.QQZoneShare = pinfo;
                params.QQSessionShare = pinfo;
                window.WMApp.share.universalShare(params);
            } else if (window.BNJS) {
                let pfs = ['weixin_timeline', 'weixin_session', 'copylink', 'sinaweibo', 'qq_zone', 'qq_friend'];
                window.BNJS.ui.share({
                    title: shareInfo.title,
                    content: shareInfo.description,
                    imgUrl: shareInfo.image,
                    platforms: pfs,
                    url: shareInfo.url,
                    onSuccess: function () {
                    },
                    onFail: function () {
                    }
                });
            } else if(me.isWeixin()){
                this.showMask = true;
            }
            this.newSak({
                daSrc: 'share.click',
                daAct: 'click',
            });
        },

        hideMask(){
            this.showMask = false;
        },

        commandClick(data){
            let me = this;
            if (data && data.result) {
                if (data.result.id == 'share') {
                    me.newSak({
                        daSrc: 'doshare.click',
                        daAct: 'click',
                    });
                    me.doShare();
                }
            }
        },

        getShareInfo() {
            let me = this;
            let title = '天机泄露！我的买买买宣言是这个。你呢？';
            let description = '天机泄露！我的买买买宣言是这个。你呢？';
            let url;
            let image = 'http://img.waimai.baidu.com/pb/f8cbd4bf8ecbc4764c9899ad334565c567@w_200,q_80';
            
            if(!this.showInput){
                title = '厉害了word哥！' + me.name + '的买买买宣言居然是这个→';
                description = '又有什么幺蛾子？去看看！';
                url = 'http://waimai.baidu.com/static/h5/index.html?modelId=14925286872518';
                url += '&m=r&n=' + encodeURIComponent(this.name) + '&r=' + this.resultId + '&t=' + Date.now();
            } else {
                url = 'http://waimai.baidu.com/static/h5/index.html?modelId=14907717591';
            }
            return {
                url,
                title,
                description,
                image
            };
        },

        setWeixinShare() {
            let me = this;
            let shareInfo = me.getShareInfo();
            if(me.isWeixin()){
                me.get({
                    url: '/fly/h5/rest/getwxtoken',
                    param: {url: location.href}
                }).then( data => {
                    if(data.error_no == 0){
                        me.res = data.result;
                        if(window._wxReady){
                            setShare();
                        } else {
                            window._setShare = setShare;
                        }
                    }
                });
            }
            function setShare(){
                window.setShareInfo({
                    title:  shareInfo.title,
                    summary: shareInfo.description,
                    url: shareInfo.url + '&from=weixin',
                    pic: shareInfo.image,
                    WXconfig: {
                        swapTitleInWX: false,
                        appId: me.res.appId,
                        timestamp: me.res.timestamp,
                        nonceStr: me.res.nonceStr,
                        signature: me.res.signature
                    }
                });
            }
        },

        again(){
            debugger;
            this.val = '';
            this.showInput = true;

            let shareInfo = this.getShareInfo();
            this.newSak({
                daSrc: 'back.click',
                daAct: 'click',
            }, () => {
                location.href = shareInfo.url;
            });
        },

        gotoHome() {
            let me = this;
            me.newSak({
                daSrc: 'toHome.click',
                daAct: 'click',
            }, () => {
                me.changePage('http://waimai.baidu.com/static/h5/index.html?modelId=14848930244&t=1491467130082');
            });
        }
    },

    mounted(){
        let me = this;
        this.NAready().then(() => {
            if (window.WMApp) {
                setTimeout(function(){
                    window.WMApp.page.setTitleBar({
                        title: document.title,
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
                }, 500)
            } else if (window.BNJS) {
                window.BNJS.ui.title.setTitle(document.title);
                window.BNJS.ui.title.addActionButton({
                    tag: 100,
                    text: '分享',
                    callback: me.doShare
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
        });
        
        this.setWeixinShare();
    }
    
}
</script>

<style lang="less-loader">
    .random-answer{
        img{
            width: 100%;
        }

        .input-panel{
            text-align: center;
            font-size: 0;
            .input-pos{
                position: absolute;
                width: 80%;
                left: 10%;
                top: 6.2rem;
                text-align: center;
            }
            .input-item{
                display: inline-block;
                padding: 3px 10px;
                box-sizing: border-box;
                color: #1f2d3d;
                height: 1rem;
                background-color: #fff;
                background-image: none;
                border: 3px solid #6e371e;
                border-radius: 4px;
                -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                outline: 0;
                line-height: normal;
                vertical-align: middle;
                width: 90%;
                font-size: 0.6rem;
            }
            .input-item:hover {
                border-color: #8492A6;
            }
            .input-item:focus {
                outline: 0;
                border-color: #20a0ff;
            }

            .button{
                width: 4.53rem;
                height: 1.18rem;
                line-height: 1rem;
                font-size: 0.6rem;
                cursor: pointer;
                background-image: url(http://img.waimai.baidu.com/pb/49273a5312c19ec5d4f646a50407eabb91@w_300,q_80,f_png);
                background-size: 100% 100%;
                position: absolute;
                left: 50%;
                margin-left: -2.27rem;
                bottom: 2.5rem;
            }
        }

        .result-panel{
            font-size: 0;

            .name-pos{
                position: absolute;
                width: 80%;
                left: 10%;
                top: 0.6rem;
                text-align: center;
                font-size: 0.56rem;
                color: #6e371e;
                font-weight: bold;
            }

            .name-share-pos{
                position: absolute;
                width: 80%;
                left: 10%;
                top: 1rem;
                text-align: center;
                font-size: 0.56rem;
                color: #6e371e;
                font-weight: bold;
            }

            .button2{
                width: 3.12rem;
                height: 1.19rem;
                line-height: 1rem;
                font-size: 0.6rem;
                cursor: pointer;
                background-image: url(http://img.waimai.baidu.com/pb/7be21b263045d87a23c2d2931598a1ce3c@w_300,q_80,f_png);
                background-size: 100% 100%;
                position: absolute;
                left: 6%;
                bottom: 2.5rem;
            }

            .button3{
                width: 3.12rem;
                height: 1.19rem;
                line-height: 1rem;
                font-size: 0.6rem;
                cursor: pointer;
                background-image: url(http://img.waimai.baidu.com/pb/67e4dbfd3118a7d4cffc428c7ee0eb74ee@w_300,q_80,f_png);
                background-size: 100% 100%;
                position: absolute;
                left: 6%;
                bottom: 1rem;
            }

            .button4{
                width: 3rem;
                height: 1.19rem;
                line-height: 1rem;
                font-size: 0.6rem;
                margin-left: 0.2rem;
                cursor: pointer;
                background-image: url(http://img.waimai.baidu.com/pb/b03d6c576d1edf2e798078ed35e5729953@w_300,q_80,f_png);
                background-size: 100% 100%;
                position: absolute;
                left: 6%;
                bottom: 2.5rem;
            }

            .button5{
                width: 3rem;
                height: 1.19rem;
                line-height: 1rem;
                font-size: 0.6rem;
                margin-left: 0.2rem;
                cursor: pointer;
                background-image: url(http://img.waimai.baidu.com/pb/d89586fe3b418eafda1a672c23f2f6812d@w_300,q_80,f_png);
                background-size: 100% 100%;
                position: absolute;
                left: 6%;
                bottom: 1rem;
            }
        }

        .weixin-mask{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0, 0.8);

            img{
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
</style>