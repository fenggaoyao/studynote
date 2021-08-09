let utils = {
  extendsObj: (obj1, obj2) => {
    for (let k in obj2) {
      obj1[k] = obj2[k]
    }
    return obj1
  }
}

export default utils
