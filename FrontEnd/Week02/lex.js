// for (let i = 0; i < 128; i++) {
//     console.log(String.fromCharCode(i))
// }


var a = 0.1;
var b = 0.1;
const memery = new Float64Array(1);
memery[0] = a;

console.log(memery.buffer)
const intarr = new Uint8Array(memery.buffer);


for (let item of intarr.reverse()) {
    console.log(item.toString(2).padStart(8, '0'));
}

console.log("length", intarr.length)
var num = 0.1,
    result = [];
new Uint8Array(new Float64Array([num]).buffer).reverse().map(item => result.push(item.toString(2).padStart(8, '0')));
console.log(result.join(' '));

// for (let i = 0; i < 8; i++) {
//     console.log(intarr[i].toString(2).padStart(8, '0'))
// }

console.log(memery);
console.log(intarr);

// var a = 0.1;
// var b = 0.2;
// const intarr = new Uint8Array(8);
// const memery = new Float64Array(intarr.buffer);

// intarr[0] = 0b00000000;
// intarr[1] = 0b00001000;

// console.log(memery[0]);