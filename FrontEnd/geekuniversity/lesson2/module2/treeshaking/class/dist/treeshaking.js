(() => {
  "use strict";
  class e {
    constructor({ name: e, age: t, sex: s }) {
      (this.className = "Person"),
        (this.name = e),
        (this.age = t),
        (this.sex = s);
    }
    getName() {
      return this.name;
    }
    getSex() {
      return 1;
    }
  }
  let t = [o],
    s = t[(Math.random(), 0)];
  (e.prototype = t[s]),
    (e.prototype.toString = function () {
      return "Person";
    });
  class o {
    constructor({ model: e }) {
      (this.className = "Apple"), (this.model = e);
    }
    getModel() {
      return this[["get", "Price"].join()]();
    }
    getPrice() {
      return 5e3;
    }
  }
  const r = new o({ model: "IphoneX" }).getModel();
  console.log(r);
})();
