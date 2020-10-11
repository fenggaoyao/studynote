function addMethod(obj, name, fn) {
    var old = obj[name];
    obj[name] = function () {
        if (arguments.length === fn.length) {
            return fn.apply(this, arguments);
        } else {
            return old.apply(this, arguments)
        }
    }
}

var o = {
    name: {
        c: 2
    }
}

var old = o["name"]

o.name.c = 22

console.log(old)