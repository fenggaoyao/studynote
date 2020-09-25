var webPage = require('webpage');
var page = webPage.create();

page.open("https://detail.1688.com/offer/628068931355.html", function start(status) {
    page.render('baidu.jpeg');
    phantom.exit();
});