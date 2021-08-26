const $=new Env('env');

const cookie=`
ModuleId=E6B3AF4249A4CA95;LoginUserKey=FF11BEE54EA30A0B6005B90F9AC0AFD3CCA9C4902A8BA089D251BFC553270720521D080CD50BA4D301341D217ADCFBE0F9A0787729284FE0E2D8F0F629646A7CA989F81136802276D8A126305E6D178F72FB9E6C4352405DFED5DE9CAAF2AD3604508343046C43C52856A87BAABE1E00310BC449126A03D58ECEEBE9804523F66FDA561D38F4C21B5E94BAB1C4CEA8F0824BB1F3B9CF35203D92D38D532675F1FF58C8A8349041A3778F17BF6456F5E1DE13AAFFC48C72D2002FB30B6056DA9D0F3956CB3D420CBC30F9F8272DD84BBAA37F1AB85E4C2B6E9A1D971C62447294FB3C21A2D5ABB3546273385B34C23F959F83437A7F55D45877C5B903C2C4575A8D8EC62C152C00959358159C2BCEA1E91ECFCC8782F02A03B5DE10B32296DFB7FF2C162B209549C2883210F385F2B558AAAA4190A7FC09E4677CD4DA2DE96F150D92FC09AC4C824E0C0F0F927682FA43DE2298B65315EE1A2D7C441655173FAC3EB357B286638B38C3A50538FA4675111D504367C1092BBC4D44F68468B551EDB9957A1CD25D6D4E28D3EA010D30F804B5FC6666CCAF54C9359740BD05787F4D495FC29ACF53A6CCAF550740C693D2B88070F8590E610ACDB1EB4C3BE2D2F9414709F204E2720E92E047EDB3AAFA97D3BF609A69D1422D5BCAD90578F0F8CEDED78D0B550A65EE23535431722C2DDAE43489BA0D4D5D64177E1B2FD227C66FA7B7BFFFD69CCED1850DF9B8CA1150989DBE652412E20B241FCBA03570432BA6D2F8394E0875E651349FB3EDDC30F90D9A3894AF1497C5E9B33288F3DD7A6B4ADE4FB0FE684EF58CB22B09658299217908A742D3DA680B209DCA6662CFD6E037EEF659F384A7D8E83B23075FE9B8AEFCD0C9E8B7EA22DEA230A2F005CBF9205B0EF61488B208FCAF58D5875C66ABDAB76A445478FFAEBB0359;Language=ZH-CN;

`.trim()



!(async () => {
  await GetMachineView();  
  })()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })



function GetMachineView(code,place){
    return new Promise((resolve,reject) => {
        $.get({
            url: `http://61.143.36.203:8081/HighnetModule/Machine/GetMachineView`,
            headers:{
              'Host': '61.143.36.203:8081',
              'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
              'Referer':'http://61.143.36.203:8081/Home/AccordionPage',
              'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
              'Cookie':cookie
            },
            'timeout': 10000
          }, (err, resp, data) => {
            try {
              if (err) {              
                console.log(err);
              } else {
                //console.log(JSON.parse(data));  

                console.log("GetMachineView>--------",data)
              
                resolve()              
              }
            } catch (e) {
              $.log(e, resp);
              reject(e)
            }       
          })  
    })

}


//GetPurchaseOrderSumGree()

function Env(name, opts) {
    class Http {
      constructor(env) {
        this.env = env
      }
  
      send(opts, method = 'GET') {
        opts = typeof opts === 'string' ? { url: opts } : opts
        let sender = this.get
        if (method === 'POST') {
          sender = this.post
        }
        return new Promise((resolve, reject) => {
          sender.call(this, opts, (err, resp, body) => {
            if (err) reject(err)
            else resolve(resp)
          })
        })
      }
  
      get(opts) {
        return this.send.call(this.env, opts)
      }
  
      post(opts) {
        return this.send.call(this.env, opts, 'POST')
      }
    }
  
    return new (class {
      constructor(name, opts) {
        this.name = name
        this.http = new Http(this)
        this.data = null
        this.dataFile = 'box.dat'
        this.logs = []
        this.isMute = false
        this.isNeedRewrite = false
        this.logSeparator = '\n'
        this.startTime = new Date().getTime()
        Object.assign(this, opts)
        this.log('', `🔔${this.name}, 开始!`)
      } 
  
      toObj(str, defaultValue = null) {
        try {
          return JSON.parse(str)
        } catch {
          return defaultValue
        }
      }
  
      toStr(obj, defaultValue = null) {
        try {
          return JSON.stringify(obj)
        } catch {
          return defaultValue
        }
      }
  
      getjson(key, defaultValue) {
        let json = defaultValue
        const val = this.getdata(key)
        if (val) {
          try {
            json = JSON.parse(this.getdata(key))
          } catch {}
        }
        return json
      }
  
      setjson(val, key) {
        try {
          return this.setdata(JSON.stringify(val), key)
        } catch {
          return false
        }
      }
  
      getScript(url) {
        return new Promise((resolve) => {
          this.get({ url }, (err, resp, body) => resolve(body))
        })
      }
  
      runScript(script, runOpts) {
        return new Promise((resolve) => {
          let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
          httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
          let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
          httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
          httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
          const [key, addr] = httpapi.split('@')
          const opts = {
            url: `http://${addr}/v1/scripting/evaluate`,
            body: { script_text: script, mock_type: 'cron', timeout: httpapi_timeout },
            headers: { 'X-Key': key, 'Accept': '*/*' }
          }
          this.post(opts, (err, resp, body) => resolve(body))
        }).catch((e) => this.log(e))
      }
  
      loaddata() {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
          try {
            return JSON.parse(this.fs.readFileSync(datPath))
          } catch (e) {
            return {}
          }
        } else return {}
      }
  
      writedata() {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        const jsondata = JSON.stringify(this.data)
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsondata)
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        }
      }
  
      lodash_get(source, path, defaultValue = undefined) {
        const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
        let result = source
        for (const p of paths) {
          result = Object(result)[p]
          if (result === undefined) {
            return defaultValue
          }
        }
        return result
      }
  
      lodash_set(obj, path, value) {     
        if (Object(obj) !== obj) return obj
        //将字符串任何不是. [ ] 全部去掉
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
        //.slice(开始,结束)，-1，表示倒数第一位（为不包含）
        //reduce的参数（total，currentValue，currentIndex）,initialValue
        path
            .slice(0, -1)
            .reduce((a, c, i) =>
                (Object(a[c]) === a[c] ? a[c] :
                    (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                path[path.length - 1]
            ] = value
        return obj
      }
  
      getdata(key) {
        let val = this.getval(key)
        // 如果以 @
        if (/^@/.test(key)) {
          const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
          const objval = objkey ? this.getval(objkey) : ''
          if (objval) {
            try {
              const objedval = JSON.parse(objval)
              val = objedval ? this.lodash_get(objedval, paths, '') : val
            } catch (e) {
              val = ''
            }
          }
        }
        return val
      }
  
      setdata(val, key) {
        let issuc = false
        if (/^@/.test(key)) {
          const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
          const objdat = this.getval(objkey)
          const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
          try {
            const objedval = JSON.parse(objval)
            this.lodash_set(objedval, paths, val)
            issuc = this.setval(JSON.stringify(objedval), objkey)
          } catch (e) {
            const objedval = {}
            this.lodash_set(objedval, paths, val)
            issuc = this.setval(JSON.stringify(objedval), objkey)
          }
        } else {
          issuc = this.setval(val, key)
        }
        return issuc
      }
  
      getval(key) {
          this.data = this.loaddata()
          return this.data[key]     
      }
  
      setval(val, key) {
          this.data = this.loaddata()
          this.data[key] = val
          this.writedata()
          return true        
      }
  
      initGotEnv(opts) {
        this.got = this.got ? this.got : require('got')
        this.cktough = this.cktough ? this.cktough : require('tough-cookie')
        this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
        if (opts) {
          opts.headers = opts.headers ? opts.headers : {}
          if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
            opts.cookieJar = this.ckjar
          }
        }
      }
  
      get(opts, callback = () => {}) {
        if (opts.headers) {
          delete opts.headers['Content-Type']
          delete opts.headers['Content-Length']
        }
        this.initGotEnv(opts)
        this.got(opts)
          .on('redirect', (resp, nextOpts) => {
            try {
              if (resp.headers['set-cookie']) {
                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                if (ck) {
                  this.ckjar.setCookieSync(ck, null)
                }
                nextOpts.cookieJar = this.ckjar
              }
            } catch (e) {
              this.log(e)
            }
            // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
          })
          .then(
            (resp) => {
              const { statusCode: status, statusCode, headers, body } = resp
              callback(null, { status, statusCode, headers, body }, body)
            },
            (err) => {
              const { message: error, response: resp } = err
              callback(error, resp, resp && resp.body)
            }
          )
      }
  
      post(opts, callback = () => {}) {
        // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
        if (opts.body && opts.headers && !opts.headers['Content-Type']) {
          opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        if (opts.headers) delete opts.headers['Content-Length']
        this.initGotEnv(opts)
        const { url, ..._opts } = opts
        this.got.post(url, _opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => {
            const { message: error, response: resp } = err
            callback(error, resp, resp && resp.body)
          }
        )
      }
      /**
       *
       * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
       *    :$.time('yyyyMMddHHmmssS')
       *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
       *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
       * @param {string} fmt 格式化参数
       * @param {number} 可选: 根据指定时间戳返回格式化日期
       *
       */
      time(fmt, ts = null) {
        const date = ts ? new Date(ts) : new Date()
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'H+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        return fmt
      }
  
      /**
  
       */
      msg(title = name, subt = '', desc = '', opts) {
        if (!this.isMuteLog) {
          let logs = ['', '==============📣系统通知📣==============']
          logs.push(title)
          subt ? logs.push(subt) : ''
          desc ? logs.push(desc) : ''
          console.log(logs.join('\n'))
          this.logs = this.logs.concat(logs)
        }
      }
  
      wxToken(){
        const corpid= 'ww1e0ee0fc04cd6f5e';
        const corpsecret= 'f9I1VX7znBRpiiFyHh3D1dVsWupBqHd7CPrCmcMWmPE'
        return new Promise(resolve => {
        var options = {  
          url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`, 
        };
        $.get(options, (err, resp, data) => {
          try {
            if (err) {
              console.log('\n发送通知调用API失败！！\n')
              console.log(err);
            } else {
              data = JSON.parse(data);
              if (data.errcode === 0) {
                resolve(data.access_token);
              } else  {
                console.log('\n错误\n')
              }
            }
          } catch (e) {
            $.log(e, resp);
          }
        })  
      
      })
      }  
      
      async wxMsg(text,desp,userid='gaoyao'){
        let wxtoken='';
        var date= $.getdata("@weixin.date");   
        var outdate=date>new Date().getTime()- 2*60 * 60 * 1000;  
        if(outdate){
          wxtoken= $.getdata("@weixin.token");   
          //console.log(wxtoken);     
        }else{
          wxtoken= await this.wxToken();
          $.setdata(wxtoken,'@weixin.token') 
          $.setdata(new Date().getTime(),'@weixin.date') 
        } 
        await this.wxMessage(text,desp,wxtoken,userid)
      }
  
      wxMessage(text,desp,token,userid='gaoyao'){
        return new Promise(resolve => {
            var data = JSON.stringify({"touser":userid,"msgtype":"text","agentid":1000002,"text":{"content": `${text} \n ${desp}` },"safe":0});
            var options = {  
              url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`,
              headers: { 
                'Content-Type': 'application/json'
              },
              body : data
            };
            $.post(options, (err, resp, data) => {
              try {
                if (err) {
                  console.log('\n发送通知调用API失败！！\n')
                  console.log(err);
                } else {
                  data = JSON.parse(data);
                  if (data.errcode === 0) {
                    console.log('\n微信发送通知消息成功\n')
                  } else  {
                    console.log('\n错误\n')
                  }
                }
              } catch (e) {
                $.log(e, resp);
              } finally {
                resolve(data);
              }
            }) 
          })
      }
  
  
      log(...logs) {
        if (logs.length > 0) {
          this.logs = [...this.logs, ...logs]
        }
        console.log(logs.join(this.logSeparator))
      } 
      
      wait(time) {
        return new Promise((resolve) => setTimeout(resolve, time))
      }
  
      done() {
        const endTime = new Date().getTime()
        const costTime = (endTime - this.startTime) / 1000
        this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
      }
    })(name, opts)
  }