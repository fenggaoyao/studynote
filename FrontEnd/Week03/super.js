let obj = {
    foo() { // （所以这⾥是静态声明，⽽⾮初始器赋值）
        console.log(super.name, this.name);
    }
}
Object.setPrototypeOf(obj, {
    name: 'Super'
});
obj.name = 'obj';
obj.foo(); // Super, obj
let obj2 = Object.create(obj, {
    name: {
        value: 'I am obj2'
    }
});
obj2.foo(); // Super, I am obj2

//console.log(Object.getPrototypeOf(obj2))

let foo = obj.foo;
foo()

class Atom extends null {
    constructor() {
        return Object.create(new.target.prototype)
    }
}