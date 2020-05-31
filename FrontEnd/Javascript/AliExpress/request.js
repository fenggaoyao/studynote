var http=require('http');
var url=require('url');

//写一个函数解析url
function getUrl(sUrl,success){
      var urlObject=url.parse(sUrl);//解析成url对象
    //   console.log("urlobject",urlObject);
      var  http=require('https');
    //   if(urlObject.protocol=='http:'){
    //      http=require('http');
    //   }else{
    //      http=require('https');
    //   }
      let req=http.request({
        'hostname': urlObject.hostname,//主机或域名baidu.com
        'path': urlObject.pathname,//路径/baidupan
        'method': 'GET'
      },res=>{//这里的res是回调函数参数   
        console.log(res.statusCode)
        console.log(res.headers)
        if(res.statusCode==200){
          var chunks =[];
          var size = 0;
          var str='';
          res.on('data',buffer=>{          
            str+=buffer;//用字符串拼接     
          });    
    
          res.on('end',()=>{
             success(str);  
          });
        }else if(res.statusCode==302 ||res.statusCode==301){
         console.log(res.headers.location)
          getUrl(res.headers.location,success);
        }
    
    
      });
      req.end();//结束请求
    req.on('error',()=>{
      console.log('404');
    });
}


module.exports={
    getUrl
}
