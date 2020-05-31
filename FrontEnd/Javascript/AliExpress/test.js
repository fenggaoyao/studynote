const Ut = require("./common");
const {main,detail}=require("./config");


async function downloadAsync(urls,name){
  Ut.deleteall(`./img/${name}/`)
  for(let url of urls){
    try {   
      let opts = {
        url: url,
      };
      let path = `./img/${name}/${url.split("/").slice(-1)[0]}`;
      let r1 = await Ut.downImg(opts, path);
      console.log(r1);
    }
    catch (e) {
      console.log(e);
    }  
  }
}

 
(async () => {

  console.log(main())
  console.log(detail())
await downloadAsync(main(),"main")
await downloadAsync(detail(),"detail")
})()


//Array.prototype.map.call(document.querySelectorAll('div#dt-tab li'),item=>JSON.parse(item.attributes["data-imgs"].value).preview)
//Array.prototype.map.call(document.querySelectorAll('div#desc-lazyload-container p img'),item=>item.src)

// Array.prototype.map.call(document.getElementById("pagination-bottom").querySelectorAll('a:not(.ui-pagination-prev):not(.ui-pagination-next)'), item => item.href).join('\n')

// 价格之和： Array.prototype.map.call(document.querySelectorAll("ul.items-list.util-clearfix>li"), item => {
//   var price = item.querySelector(".cost .notranslate").innerText.replace("US $ ", "");
//   var amount = item.querySelector(".recent-order") ? item.querySelector(".recent-order").innerText.match(/\d+/g)[0] : 0;
//   return price * amount
// }).reduce((pre, curr) => pre + curr)