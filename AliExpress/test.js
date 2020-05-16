let Ut = require("./common");

(async () => {
  try {
    let url = "http://avatar.csdn.net/1/A/1/3_zzwwjjdj1.jpg";
    let opts = {
      url: url,
    };
    let path = "./1.jpg";
    let r1 = await Ut.downImg(opts, path);
    console.log(r1);
  } catch (e) {
    console.log(e);
  }
})()


店铺类别： Array.prototype.map.call(document.querySelectorAll('.group-item'), item => item.innerText.replace(/[\r\n]/g, " ")).join('\n')


Array.prototype.map.call(document.getElementById("pagination-bottom").querySelectorAll('a:not(.ui-pagination-prev):not(.ui-pagination-next)'), item => item.href).join('\n')

价格之和： Array.prototype.map.call(document.querySelectorAll("ul.items-list.util-clearfix>li"), item => {
  var price = item.querySelector(".cost .notranslate").innerText.replace("US $ ", "");
  var amount = item.querySelector(".recent-order") ? item.querySelector(".recent-order").innerText.match(/\d+/g)[0] : 0;
  return price * amount
}).reduce((pre, curr) => pre + curr)