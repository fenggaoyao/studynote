// 可以采用课堂上钱冠丞的 express 做法也行

var page = require('webpage').create();
page.open('https://detail.1688.com/offer/628068931355.html', function (status) {
    console.log("Status: " + status);
    if (status === "success") {
        var obj = {
            name: document.querySelector("meta[name='b2c_auction']").content,
            main: Array.prototype.map.call(document.querySelectorAll('div#dt-tab li'), item => JSON.parse(item.attributes["data-imgs"].value).preview),
            detail: Array.prototype.map.call(document.querySelectorAll('div#desc-lazyload-container img'), item => item.src)
        }
        console.log(JSON.stringify(obj))
    }
    phantom.exit();
});