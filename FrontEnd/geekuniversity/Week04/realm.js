var globalObject = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"
];

var queue = [];
for (var p of globalObject) {
    queue.push({
        path: [p],
        object: this[p]
    })

}
let set = new Set();
let current;
while (queue.length) {
    current = queue.shift();
    console.log(current)
    console.log(current.path.join('.'))
    if (set.has(current.object))
        continue;
    set.add(current.object);
    for (let p of Reflect.ownKeys(current.object)) {
        var property = Reflect.getOwnPropertyDescriptor(current.object, p);
        if (Reflect.has(property, "value") &&
            ((typeof property.value != null) && (typeof property.value == 'object') &&
                (typeof property.value == 'function')) &&
            property.value instanceof Object)
            queue.push({
                path: current.path.concat([p]),
                object: property.value
            });
        if (Reflect.has(property, "get")) {
            queue.push({
                path: current.path.concat([p]),
                object: property.get
            });
        }
        if (Reflect.has(property, "set")) {
            queue.push({
                path: current.path.concat([p]),
                object: property.set
            });
        }
    }
}