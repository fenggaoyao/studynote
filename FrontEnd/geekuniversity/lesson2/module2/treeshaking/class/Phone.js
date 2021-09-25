class Person {
  constructor({ name, age, sex }) {
    this.className = "Person";
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  getName() {
    return this.name;
  }
  getSex() {
    return 1;
  }
}
let mod = [Apple];
let index = mod[Math.random() > 0.5 ? 0 : 0];
Person.prototype = mod[index];
Person.prototype.toString = function () {
  return "Person";
};

class Apple {
  constructor({ model }) {
    this.className = "Apple";
    this.model = model;
  }
  getModel() {
    let mod = ["get", "Price"].join();
    return this[mod]();
  }
  getPrice() {
    return 5000;
  }
}

class Huawei {
  constructor({ model }) {
    this.className = "Huawei";
    this.model = model;
  }
  getModel() {
    let method = ["get", "Price"].join("");
    return this[method]();
  }
  getPrice() {
    return 5000;
  }
}

export { Apple, Huawei };
