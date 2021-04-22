// font-size -=>重复了
// color -=>重复了
const Styletron = require('styletron');
const { injectStyle } = require('styletron-utils');
const styletron = new Styletron();

// const parsedCSS = require('./main.css');
// console.log('parsedCSS: ', parsedCSS);

const redButtons = injectStyle(styletron, {
  color: 'red',
  fontSize: '14px',
});

const blueButtons = injectStyle(styletron, {
  color: 'blue',
  fontSize: '14px',
});

console.log(redButtons, blueButtons);
console.log(styletron);
