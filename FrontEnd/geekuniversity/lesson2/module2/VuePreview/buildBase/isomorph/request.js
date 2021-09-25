import fetch from 'isomorphic-fetch'
import 'es6-promise/auto';

const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

const params = (obj) => {
    let result = [];
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            if(obj[k] !== ''){
                result.push(k + '=' + encodeURIComponent(obj[k]));
            }
        }
    }
    return result.join('&');
};

const addItemToForm = (form, names, value) => {
    var name = encodeURIComponent(names.join('.').replace(/\.\[/g, '['));
    value = encodeURIComponent(value.toString());
    if(value !== ''){
        form.push(`${name}=${value}`);
    }
}

const addItemsToForm = (form, names, obj) => {
    if (obj === undefined || obj === "" || obj === null) return addItemToForm(form, names, "");

    if (typeof obj == "string" || typeof obj == "number" || obj === true || obj === false) return addItemToForm(form, names, obj);

    if (obj instanceof Date) return addItemToForm(form, names, obj.toJSON());

    // array or otherwise array-like
    if (obj instanceof Array) {
        return obj.forEach((v, i) => {
            names.push(`[${i}]`);
            addItemsToForm(form, names, v);
            names.pop();
        });
    }

    if (typeof obj === "object") {
        return Object.keys(obj).forEach((k) => {
            names.push(k);
            addItemsToForm(form, names, obj[k]);
            names.pop();
        });
    }
}

const toFormData = (obj) => {
    var formData = new FormData();
    let result = [];
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            formData.append(k, obj[k]);
        }
    }
    return formData;
}

const get = (opts) => {
    return new Promise((resolve, reject) => {
        let url = opts.url;
        let pa = opts.param || {};
        pa.t = Date.now();
        url += '?' + params(pa);

        fetch(url, { credentials: 'include' }).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
                reject({errno: response.status})
            } else {
                return response.json();
            }
        }).then(data => {
            resolve(data);
        }, error => {
            resolve(error);
        })
    })
};

const post = (opts) => {
    return new Promise((resolve, reject) => {
        let url = opts.url;
        let form = [];
        let pa = opts.param || {};
        pa.t = Date.now();
        if (pa) {
            url += '?' + params(pa);
        }
        addItemsToForm(form, typeof opts.data == 'object' ? [] : [opts.name || 'model'], opts.data);

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: form.join('&')
        }).then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
                reject({errno: response.status})
            } else {
                return response.json();
            }
        }).then(data => {
            resolve(data);
        }, error => {
            resolve(error);
        })
    })
};

export default {
    get: get,
    post: post
};
