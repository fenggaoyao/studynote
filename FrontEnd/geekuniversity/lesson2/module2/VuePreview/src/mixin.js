import http from 'request'
import Utils from './utils'
import ComponentTree from 'components/platform/common/ComponentTree'
import Alert from 'components/common/common/Alert'
import Confirm from 'components/common/common/Confirm'
let loading = null;

const download = () => {
    const currentUrl = location.href;
    // 判断ios和android
    if (navigator.userAgent.match(/iPhone|iPod/i) != null) {
        // iphone代码
        setTimeout(function () {
            // 若无app，则执行此函数调起app store 外卖下载页
            if (currentUrl.indexOf('share_platform=nuomi') !== -1) {
                location.href = 'https://d.nuomi.com/download?sign=tuan_iPhone_web_1&from=unknown';
            } else {
                location.href = 'https://itunes.apple.com/cn/app/bai-du-wai-mai-mei-shi-you/id911686788?mt=8';
            }
        }, 200);
    }
    if (navigator.userAgent.match(/Android/i) != null) {
        // android代码
        setTimeout(function () {
            // 若无app，则执行此函数直接下载app
            if (currentUrl.indexOf('share_platform=nuomi') !== -1) {
                location.href = 'http://d.nuomi.com/download?sign=tuan_Android_web_2&from=unknown';
            } else {
                location.href = 'http://bcscdn.baidu.com/lbsapp/BaiduWaimai.apk';
            }
        }, 500);
    }
};

const methods = {
    getCid(){
        if(this.cid){
            return this.cid;
        }
        if(this.$el){
            let cid = this.$el.getAttribute('cid');
            if(!cid){
                cid = this.$el.parentNode.getAttribute('cid')
            }
            return cid
        }
        return null;
    },

    dispatchPropertyChange(){
        let cid = this.getCid();
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this.$options._componentTag + '|' + cid);
        args.unshift('xp-com-property-change');
        eventHub.$emit.apply(eventHub, args);
    },

    getModelData(){
        let cid = this.getCid();
        let tree = new ComponentTree(this.$root.modelData);
        return tree.find(cid);
    },

    addComponent(com){
        let cid = this.getCid();
        eventHub.$emit('xp-global-add-component', cid, com);
    },

    removeComponent(cid){
        eventHub.$emit('xp-global-remove-component', cid);
    },

    updateProps(cid, props){
        eventHub.$emit('xp-global-update-component', cid, props);
    },

    setChildren(data){
        let node = this.getModelData();
        eventHub.$emit('xp-global-update-children', node.cid, data);
    },

    get(opts){
        return http.get(opts);
    },

    post(opts){
        return http.post(opts);
    },

    nextZIndex() {
        if(this.$root.__zIndex){
            ++this.$root.__zIndex;
            return this.$root.__zIndex;
        } else {
            this.$root.__zIndex = 100;
            return this.$root.__zIndex;
        }
    },

    emit(evt, ...params) {
        eventHub.$emit(evt, ...params);
    },

    on(evt, fn) {
        eventHub.$on(evt, (...params) => {
            fn && fn(...params);
        });
    },

    off(evt) {
        eventHub.$off(evt);
    },

    getPlateform(){
        if(methods.isOffline()){
            return 'Offline';
        }
        if(methods.isWeixin()){
            return 'weixin';
        }
        if(methods.isWMApp()){
            return 'WMApp';
        }
        if(methods.isNuomi()){
            return 'Nuomi';
        }
    },

    isWeixin() {
        return (/MicroMessenger/i).test(window.navigator.userAgent);
    },
    
    isWMApp() {
        return (/wmapp/i).test(window.navigator.userAgent);
    },
    
    isNuomi() {
        return (/BDNuomiApp/i).test(window.navigator.userAgent);
    },
    
    isIOS() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1;
    },

    isAndroid() {
        (/Android/i).test(window.navigator.userAgent);
    },

    isOffline() {
        return location.href.indexOf('file:///') != -1;
    },

    changePage(url, title) {
        eventHub.$emit('beforeChangePage')
        const from = Utils.getQueryString('from');
        const xid1 = Utils.getQueryString('xid1');
        from && (url = Utils.addSakParam(url, {from: from}));
        xid1 && (url = Utils.addSakParam(url, {xid1: xid1}));
        if (methods.isWMApp()) {
            if (methods.isOffline()) {
                var hashs = url.split('#');
                var params = Utils.getParams(url);
                params.router = hashs[1];
                var options = {
                    page: 'index',
                    title: title || '质享生活',
                    pdata: params
                }
                methods.gotoOffsetPage(options);
            } else {
                var params = {
                    pageName: 'webview',
                    pageParams: {
                        url: encodeURIComponent(url),    // url需encode
                        header: 1,     // 0无头，1白头，2红头，默认1
                        scrollViewBounces: 0
                    }
                };
                window.WMApp.page.changePage(params);
            }
        } else if (window.BNJS) {
            var link = 'bainuo://component?url=' + encodeURIComponent(url);
            window.BNJS.page.start(link, {}, 0, 'rtl');
        } else {
            location.href = url;
        }
    },

    gotoOffsetPage(options) {
        var defaultOptions = {
            pluginId: "bdwm.plugin.pinzhi",
            page: "index",
            title: "质享生活",
            pdata: {}
        }
        var changePageOptions = Object.assign(defaultOptions,options);
        var data = {
            pluginId: changePageOptions.pluginId,
            page: changePageOptions.page,
            title: encodeURIComponent(changePageOptions.title),
            pageData: encodeURIComponent(JSON.stringify(changePageOptions.pdata))
        }
        var link = "bdwm://plugin?pluginId={pluginId}&pageName={page}&title={title}&pageData={pageData}&scrollViewBounces=0";
        link = link.replace(/\{(.*?)\}/g, function (s0, s1) {
            return data[s1];
        });
        location.href = link;
    },

    setTitle (title){
        if (window.WMApp) {
            window.WMApp.page.setTitleBar({
                title: title
            });
        } else {
            document.title = title;
        }
    },

    NAready() {
        return new Promise((resolve, reject) => {
            if (window.BNJS && typeof window.BNJS == 'object' && BNJS._isAllReady) {
                resolve(window.BNJS);
            } else if (window.WMApp) {
                resolve(window.WMApp);
            } else {
                document.addEventListener('WMAppReady', function (pd) {
                    pd && (window.pageData = pd.pageData);
                    resolve(window.WMApp);
                }, false);
                document.addEventListener('BNJSReady', function () {
                    resolve(window.BNJS);
                }, false);
            }
            setTimeout(() => {
                resolve();
            }, 3000)
        })
    },
    
    //请在ready之后调用
    getCityId() {
        return new Promise((resolve, reject) => {
            if (window.WMApp) {
                window.WMApp.location.getAsyncLocation(function (data) {
                    if (data.cityId) {
                        resolve({"city_id": data.cityId});
                    } else {
                        resolve({"city_id": -1});
                    }
                });
            } else if (window.BNJS) {
                window.BNJS.location.requestRealTimeLocation(function (res) {
                    if (res && res.data && res.data.cityCode) {
                        Utils.translateCityCode(res.data.cityCode, function (data) {
                            resolve({"city_id": data.cityCode});
                        });
                    } else {
                        resolve({"city_id": -1});
                    }
                });
            } else {
                resolve({"city_id": -1});
            }
        })
    },

    // sak埋点规范3.0,质享4.0
    newSak(params, fn) {
        let mid = Utils.getQueryString('modelId');
        const searchParams = Utils.getParams(location.href);
        if (methods.isOffline()) {
            let naObj = {};
            naObj.daSrc = mid + '.' + params.daSrc;
            naObj.daAct = params.daAct;
            naObj.daTrace = params.daTrace || '';
            naObj.daRefer = 'bdwm.plugin.h5';
            // xid1 will set from
            naObj.xid2 = params.xid2 || '';
            naObj.xid3 = params.xid3 || '';
            naObj.xid4 = params.xid4 || '';
            naObj.xid5 = params.xid5 || '';
            // NA will set `from` to `na-iphone` or `na-android`
            window.WMApp.stat.sendOnlineStat(naObj);
            fn && fn();
        } else {
            let h5Obj = {};
            h5Obj.da_src = mid + '.' + params.daSrc;
            h5Obj.da_act = params.daAct;
            // xid1 will set from
            h5Obj.xid2 = params.xid2 || '';
            h5Obj.xid3 = params.xid3 || '';
            h5Obj.xid4 = params.xid4 || '';
            h5Obj.xid5 = params.xid5 || '';
            methods.sak(h5Obj, fn);
        }
    },

    //统计
    sak(data, fn) {
        let img = new Image();
        let done = false;
        let params = {
            resid: 31,   //webapp
            func: "place",
            da_ver: "2.1.0",
            da_trd: 'h5platform',
            page: data.page || 'PinZhiCollect',
            da_src: data.da_src || 'PinZhiCollectPg',
            da_act: data.da_act || 'collect',
            from: 'webapp',  //webapp,na-iphone na-android, nuomi-iphone, nuomi-android
            xid1: data.xid1 || '',    //        //
            xid2: data.xid2 || '',          //
            xid3: data.xid3 || '',     //
            xid4: data.xid4 || '',      //
            xid5: data.xid5 || '',
            t: Date.now()
        };
        let temp = [];
        for (var key in params) {
            temp.push(key + '=' + encodeURIComponent(params[key]));
        }
        var url = 'https://log.waimai.baidu.com/static/transparent.gif?' + temp.join('&');
        img.onload = function () {
            if(done) return;
            img = null;
            done = true;
            fn && fn();
        };
        img.onerror = function () {
            if(done) return;
            img = null;
            done = true;
            fn && fn();
        };
        setTimeout( ()=> {
            if(done) return;
            img = null;
            done = true;
            fn && fn();
        }, 400);
        img.src = url;
    },

    alert(option = {
        title: '',
        content: '',
        onOK: function () {}
    }) {
        Alert(option);
    },

    confirm(option = {
        title: '',
        content: '',
        onOK: function () {},
        onCancel: function () {}
    }) {
        Confirm(option);
    },

    showLoading(){
        if(loading) return;
        let mask = document.createElement('div');
        mask.className = '_p_loading';
        mask.innerHTML = `
        <div class="_p_loading">
            <p class="load">
                <span></span>
			    <img src="/public/images/deer.svg"/>
            <p>
		</div>`;
        document.body.appendChild(mask);
        loading = mask;
    },

    hideLoading(){
        if(loading){
            loading.remove();
            loading = null;
        }
    },

    wrapImage(url='', option = {}) {
        if(url.indexOf('img.waimai.baidu.com') == -1){
            return url;
        }
        const SEPARATOR = '@';
        if (url.indexOf(SEPARATOR) === -1) {
            let defaultOption = {w: '750', q: '80'};
            if (this.isAndroid()) defaultOption.f = 'webp';
            for (let prop in defaultOption) {
                if (defaultOption.hasOwnProperty(prop) && !option.hasOwnProperty(prop)) {
                    option[prop] = defaultOption[prop];
                }
            }
            let extractUrl = SEPARATOR;
            let index = 0;
            for (let prop in option) {
                if (option.hasOwnProperty(prop)) {
                    if (option[prop]) {
                        if (index++) extractUrl += ',';
                        extractUrl += prop + '_' + option[prop];
                    }
                }
            }
            return url + extractUrl;
        }
        return url;
    },

    login(func, url, params) {
        if (window.WMApp) {
            WMApp.account.login(function (data) {
                if (data.status) {
                    func && func(params);
                } else {
                }
            });
        } else if (window.BNJS) {
            window.BNJS.account.login({
                onSuccess: function () {
                    func && func(params);
                },
                onFail: function (res) {
                    setTimeout(function () {
                        methods.alert('登陆失败！' + res.errmsg);
                    }, 0);
                }
            });
        } else {
            location.href = 'https://wappass.baidu.com/passport/?authsite=1&sms=1&u=' + encodeURIComponent(url);
        }
    },

    checkBrowser() {
        if (!methods.isWeixin() && !methods.isWMApp() && !methods.isNuomi()) {
            // const activityIdUrl = 'activity=' + location.search.match(/[&|\?]activity=\d*/)[0].slice(10);
            const activityIdUrl = 'modelId=' + location.hash.match(/[&|\?]modelId=\d*/)[0].slice(10);
            const currentUrl = location.href;
            let schemaUrl = 'http://waimai.baidu.com/static/commoditycoupon/index.html';
            if (currentUrl.indexOf('share_platform=nuomi') !== -1) {
                schemaUrl += (location.search ? location.search + '&env=nuomi&' + activityIdUrl : '?env=nuomi&' + activityIdUrl) + location.hash;
                location.href = 'bainuo://component?url=' + encodeURIComponent(schemaUrl);
            } else {
                schemaUrl += (location.search ? location.search + '&env=na&' + activityIdUrl : '?env=na&' + activityIdUrl) + location.hash;
                location.href = 'bdwm://native?pageName=webview&url=' + encodeURIComponent(schemaUrl) + '&header=1';
            }
            download();
            return false;
        }
        return true;
    },

    //统计来源
    sakFrom (from) {
        methods.sak({
            xid1: from || Utils.getQueryString('xid1') || Utils.getQueryString('from') || ''
        });
    }
    
}

export default methods;