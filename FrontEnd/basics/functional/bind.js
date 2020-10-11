function add(a, b, c) {
    return a + b + c;
}

var b = add.bind(null, 2);
var c = b.bind(null, 2);
console.log(c(3))