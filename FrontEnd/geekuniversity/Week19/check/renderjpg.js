var webPage = require('webpage');
var page = webPage.create();

page.open("https://news.qq.com/", function start(status) {
    page.render('baidu.jpeg');
    phantom.exit();
});