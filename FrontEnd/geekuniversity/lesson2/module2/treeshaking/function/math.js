function add() {
  var sum = 0,
    i = 0,
    args = arguments,
    l = args.length;
  while (i < l) {
    sum += args[i++];
  }
  return sum;
}

function multiply() {
  var product = 0,
    i = 0,
    args = arguments,
    l = args.length;
  while (i < l) {
    sum *= args[i++];
  }
  return sum;
}

export { add, multiply };
