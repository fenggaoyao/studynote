// 可以采用课堂上钱冠丞的 express 做法也行

var page = require('webpage').create();
page.open('https://github.com/', function (status) {
    console.log("Status: " + status);
    if (status === "success") {
        var body = page.evaluate(function () {
            var toString = function (pad, element) {
                var children = element.childNodes;
                var childrenString = '';
                for (var i = 0; i < children.length; i++) {
                    childrenString += toString('  ' + pad, children[i]) + '\n';
                }
                var name;
                if (element.nodeType === Node.TEXT_NODE) {
                    name = '#text' + JSON.stringify(element.textContent);
                }
                if (element.nodeType === Node.ELEMENT_NODE) {
                    name = element.tagName;
                }
                return pad + name + (childrenString ? '\n' + childrenString : '');
            }

            return toString('', document.body);
        });
        console.log((body));
    }
    phantom.exit();
});