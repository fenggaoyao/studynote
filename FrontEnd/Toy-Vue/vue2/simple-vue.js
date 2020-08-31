const Utils = {
    getValue(expr, data) {
        return data[expr]
    },
    setValue(attr, vm, newValue) {
        vm[attr] = newValue
    },
    model(node, attr, vm) {
        const initValue = this.getValue(attr, vm);
        new Watcher(attr, vm, (newValue) => {
            this.modelUpdate(newValue);
        })
        node.addEventListener('input', e => {
            const newValue = e.target.value;
            this.setValue(attr, vm, newValue);
        })
        this.modelUpdate(node, initValue);
    },
    text(node, value, vm) {
        let result;
        if (value.includes('{{'))
            result = value.replace(/\{\{(.+)\}\}/g, (...args) => {
                //收集依赖
                new Watcher(args[1], vm, (newValue) => {
                    this.textUpate(node, newValue);
                })
                return this.getValue(args[1], vm)
            });
        else {
            result = this.getValue(value, vm);
        }
        this.textUpate(node, result);
    },
    on(node, value, vm, eventName) {
        const fn = vm.$optios.methods[value];
        node.addEventListener(eventName, fn.bind(vm), false);
    },
    textUpate(node, value) {
        node.textContent = value;
    },
    modelUpdate(node, value) {
        node.value = value;
    }
}
class Watcher {
    constructor(expr, vm, cb) {
        this.expr = expr;
        this.vm = vm;
        this.cb = cb; //回调函数
        this.oldValue = this.getOldValue();

    }
    getOldValue() {
        Dep.target = this; //使用到对象的静态方法
        const oldValue = Utils.getValue(this.expr, this.vm);
        Dep.target = null;
        return oldValue;
    }
    update() {
        const newValue = Utils.getValue(this.expr, this.vm);
        if (newValue !== this.oldValue) {
            this.cb(newValue);
        }
    }

}

//有哪些wacher
class Dep {
    constructor() {
        this.collect = [];
    }

    addWacher(wacher) {
        this.collect.push(wacher)
    }

    notify() {
        this.collect.forEach(wacher => wacher.update());
    }

}

class Observer {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key]);
            })
        }
    }

    defineReactive(obj, key, value) {
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get() {
                // console.log("$data,get",key,value)
                const target = Dep.target;
                target && dep.addWacher(target)
                return value;
            },
            set: (newValue) => {
                if (newValue === value) return;
                this.observe(newValue);
                value = newValue;
                dep.notify();
                //  console.log("$data,set",key,value)         
            }
        })
    }



}

class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        const fragment = this.compilerFragement(this.el)
        this.compiler(fragment)
        this.el.appendChild(fragment);
    }

    compiler(fragment) {
        const childNodes = Array.from(fragment.childNodes);
        childNodes.forEach(child => {
            if (this.isElementNode(child)) {
                this.compilerElement(child)

            } else if (this.isTextNode(child)) {
                this.compilerText(child);
            }

            if (child.childNodes && child.childNodes.length) {
                this.compiler(child)
            }
        });
    }

    compilerElement(node) {
        //v-model v-text v-on:click
        const attributes = Array.from(node.attributes);
        attributes.forEach(attr => {
            const {
                name,
                value
            } = attr;
            if (this.isDirector(name)) {
                //指令 v-model v-text v-bind v-on:click
                const [, Directive] = name.split('-');
                const [compileKey, eventName] = Directive.split(':');
                Utils[compileKey](node, value, this.vm, eventName)
            } else if (this.isEventName(name)) {
                //@方法
                const [, eventName] = name.split('@');
                Utils['on'](node, value, this.vm, eventName)
            }
        })
    }

    isDirector(name) {
        return name.startsWith('v-')
    }
    isEventName(name) {
        return name.startsWith('@')
    }

    compilerText(node) {
        //{{model}} 
        const content = node.textContent;
        if (/\{\{(.+)\}\}/.test(content)) {
            Utils['text'](node, content, this.vm)
        }
    }

    compilerFragement(element) {
        const f = document.createDocumentFragment();
        let firstChild;
        while (firstChild = element.firstChild) {
            f.appendChild(firstChild);
        }
        return f;

    }
    isElementNode(element) {
        return element.nodeType === 1
    }

    isTextNode(element) {
        return element.nodeType === 3
    }
}


class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$optios = options;
        this.proxyData(this.$data)
        new Observer(this.$data);
        new Compiler(this.$el, this);
    }

    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal;
                }
            })

        })
    }
}