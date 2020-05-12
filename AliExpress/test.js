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
  }
  catch (e) {
    console.log(e);
  }
})()
