import { add, multiply } from "./math";
function increment(val) {
  return add(val, 1);
}
function incrementBy2(val) {
  return add(val, 2);
}
function decrement(val) {
  return add(val, 1);
}

export { increment, incrementBy2, decrement };
