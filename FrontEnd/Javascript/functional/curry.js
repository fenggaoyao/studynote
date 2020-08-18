var fn = function () {
    console.log("fn", ...arguments);
    return fn.bind(null, ...arguments);

    // 如果没有es6的话我们可以这样写：
    // return Function.prototype.bind.apply(fn, [null].concat(
    //   Array.prototype.slice.call(arguments)
    // ));
}

fb = fn(1); //[1]
fb = fb(2); //[1, 2]
fb = fb(3); //[1, 2, 3]
fb = fb(4); //[1, 2, 3, 4]


function curry(targetfn) {
    var numOfArgs = targetfn.length;
    if (arguments.length - 1 < numOfArgs) {
        return curry.bind(null, ...arguments);
    } else {
        return targetfn.apply(null, Array.prototype.slice.call(arguments, 1));
    }
}

function sum(a, b, c) {
    return a + b + c;
}

let b = curry(sum);
let b1 = b(1);
let b2 = b1(2);
let b3 = b2(3);
console.log(b1, b2, b3);