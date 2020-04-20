// for (let i = 0; i < 128; i++) {
//     console.log(String.fromCharCode(i))
// }


var a = 4.5;
var b = 0.2;
const memery = new Float64Array(1);
memery[0] = a;

const intarr = new Uint8Array(memery.buffer);
for (let i = 0; i < 8; i++) {
    console.log(intarr[i].toString(2))
}

console.log(memery);
console.log(intarr);

// var a = 0.1;
// var b = 0.2;
// const intarr = new Uint8Array(8);
// const memery = new Float64Array(intarr.buffer);

// intarr[0] = 0b00000000;
// intarr[1] = 0b00001000;

// console.log(memery[0]);