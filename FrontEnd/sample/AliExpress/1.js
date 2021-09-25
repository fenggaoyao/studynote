var fs=require('fs');
var http=require('http');
var url=require('url');
var gbk=require('gbk');//转换字符编码
var jsdom=require('jsdom');//操作jsdocument
var JSDOM=jsdom.JSDOM;
//调用
getUrl('',(data,str)=>{//这里的data是参数，es6的函数新写法
  // fs.writeFile('one.jpg',data,()=>{//data是数组，one.jpg是图片名称或文件名称
  //   console.log('抓取图片成功');
  // });
  var htlm=gbk.toString('utf-8',str);//吧gbk的字符串数据转成utf8的字符串
  let dom=new JSDOM(html);//吧html字符串加载到doom中去
  let document=dom.window.document;
  console.log(document.querySelect(':f').innerHTML);//:f是选择器
});
//写一个函数解析url
function getUrl(sUrl,success){
  var urlObject=url.parse(sUrl);//解析成url对象
  var http='';
  if(urlObject.protocol=='http:'){
     http=require('http');
  }else{
     http=require('https');
  }
  let req=http.request({
    'hostname': urlObject.hostname,//主机或域名baidu.com
    'path': urlObject.pathname//路径/baidupan
  },res=>{//这里的res是回调函数参数
    if(res.statueCode==200){
      var arr=[];
      var str='';
      res.on('data',buffer=>{
        arr.push(buffer);//用数组添加
        str+=buffer;//用字符串拼接
      });


      res.on('end',()=>{
        let b=Buffer.contact(arr);
          success&& success(b,str);


      });
    }else if(res.statueCode==302 ||res.statueCode==301){
      getUrl(res.headers.location,success);
    }


  });
  req.end();//结束请求
req.on('error',()=>{
  console.log('404');
});
}
