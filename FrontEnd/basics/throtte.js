//_throttle
function throttle(func, wait, options) {

    let args, context, previous = 0,
        timeout;

    let later = function () {
        previous = options.leading == false ? 0 : Date.now();
        func.apply(contex, args)
        args = context = null
    }
    let throttled = function () {
        args = arguments
        context = this;
        let now = Date.now();
        if (!previous && options.leading === false) previous = now
        let remainnig = wait - (now - previous);
        if (remainnig <= 0) {
            if (timeout) {
                clearTimeout(later);
                timeout = null
            }
            func.apply(context, args)
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remainnig);
        }
    }

    return throttled
}

//截流
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        if (immediate) {
            let callnow = !timeout;
            if (callnow) func.apply(this, arguments);
        }
        timeout = setTimeout(() => {
            func.apply(this, arguments);
            timeout = null;
        }, wait);
    }
}
//使用requestAnimationFrame
function _debounce(func, wait, options) {
    let leading = true; // 第一次点击触发
    let trailing = true; // 最后一次点击触发
    let lastCallTime; //最后一次触发
    let lastArgs;
    let lastThis;
    let timeout;
    let lastInvokeTime
    let shouldInvoke = function (now) {
        let sinceLastTime = now - lastCallTime;
        let sinceLastTime = now - lastInvokeTime
        return lastCallTime === undefined || sinceLastTime > wait || sinceLastTime >= wait
    }

    let timeExpired = function () {
        let now = Date.now(); //当时定时器到了，是否需要执行函数  
        if (shouldInvoke(now))
            return trailingEdge(now)
        startTimer(timeExpired, remainingWait(now))
    }

    let startTimer = function (timeExpired, wait) {
        timeout = setTimeout(timeExpired, wait)
    }

    let invokeFun = function () {
        func.apply(lastThis, lastArgs)
    }


    let remainingWait = function () {
        return wait - (now - lastCallTime);
    }

    let trailingEdge = function (time) {
        if (trailing) {
            invokeFun(time)
        }
        startTimer(timeExpired, wait)
    }
    //leadingEdge是否第一次执行
    let leadingEdge = function (now) {
        if (leading)
            invokeFun()
        startTimer(timeExpired, wait); //开启一个定时器，看下一次定时器到了，是否需要执行
    }
    let debounced = function () {
        lastArgs = args
        lastThis = this;
        let now = Date.now();
        //判断当前debounced是否需要执行
        let isInvoking = shouldInvoke(now);
        lastCallTime = now;
        if (isInvoking) {
            if (timeout === undefined) {
                leadingEdge(now);
            }
        }

    }
    return debounced;

}