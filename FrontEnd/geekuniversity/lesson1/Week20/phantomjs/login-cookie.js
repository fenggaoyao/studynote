var page = require('webpage').create()
phantom.outputEncoding = "gb2312"; //避免乱码
page.open("http://61.143.36.203:8081/Login", function (status) {
    if (status !== 'success') {
        console.log('Unable to post!');
        phantom.exit();
    } else {
        // var cookiesStr = "";
        // var cookies = page.cookies;
        // for (var i in cookies) {
        //     cookiesStr = cookiesStr + cookies[i].name + "=" + cookies[i].value + ";";
        // }
        // console.log(cookiesStr);
        page.evaluate(function () {
            $("#txtaccount")[0].value = '450471' //660005mes
            $("#txtpassword")[0].value = '450471' //86181160
            $("#btlogin")[0].click()
        });
        // console.log("........................");
        // var cookiesStra = "";
        // var cookiesc = page.cookies;
        // for (var j in cookiesc) {
        //     cookiesStra = cookiesStra + cookiesc[j].name + "=" + cookiesc[j].value + ";";
        // }
        // console.log(cookiesStra)
        setTimeout('print_cookies()', 5000)
        //console.log(phantom.cookies);
    }
});

function print_cookies() {
    console.log("........................print_cookies");
    // let cookiesStra = "";
    // for (let j in page.cookies) {
    //     cookiesStra = cookiesStra + page.cookies[j].name + "=" + page.cookies[j].value + ";";
    // }
    // console.log(cookiesStra)
    page.render('1.png');

    var page1 = require('webpage').create();
    //phantom.addcookie
    page1.open("http://61.143.36.203:8081/Home/AccordionIndex", function (status) {
        if (status === 'success') {
            // console.log("........................pages1_content");
            // console.log(page1.content);
            page.render('2.png');
            var cookiesStrb = "";
            var cookiesb = page1.cookies;
            for (var k in cookiesb) {
                cookiesStrb = cookiesStrb + cookiesb[k].name + "=" + cookiesb[k].value + ";";
            }
            console.log("........................pages1_cookies");
            console.log(cookiesStrb);
            page1.evaluate(function () {});
            phantom.exit()

        } else {
            console.log("error.....");
            phantom.exit()
        }
    })
}