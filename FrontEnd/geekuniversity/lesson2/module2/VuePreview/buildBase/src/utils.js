import fetch from 'isomorphic-fetch'
import 'es6-promise/auto';

const utils = {
    getQueryString(name){
        var reg = new RegExp("(?:\\?|&)" + name + "=([^&]*)(?:&|$)", "i");
        var r = window.location.href.match(reg);
        if (r != null) return unescape(r[1]);
        return '';
    }
};

export default utils;
