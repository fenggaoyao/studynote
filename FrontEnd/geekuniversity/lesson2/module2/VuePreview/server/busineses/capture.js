var args = require('system').args;
console.log(args);

var page = require('webpage').create();
page.viewportSize = { width: 375, height: 667 };
page.clipRect = { top: 0, left: 0, width: 375, height: 667 };

if(args[1] && args[2]){
    page.open(args[1], function(status) {
        if(status == 'success'){
            console.log('done:', status);
            setTimeout(function(){
                page.render(args[2]);
                phantom.exit();
            }, 5000);
        }
    });
} else {
    phantom.exit();
}
