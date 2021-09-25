const formidable = require('formidable')
const path = require('path')
const uuid = require('uuid/v1')
const http = require('http')
const fs = require('fs')

const UploadService = {
  component: function (req, res, next) {
    let userId = req.session.currentUserId
      ? req.session.currentUserId + '/'
      : ''
    let name = userId + 'com_' + uuid()
    fs.mkdirSync(
      path.resolve(__dirname, '../../src/components/upload/user/' + name)
    )
    fs.mkdirSync(path.resolve(__dirname, '../../upload/component/' + name))

    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.resolve(__dirname, '../../upload/component/' + name)
    form.keepExtensions = true
    form.maxFieldsSize = 2 * 1024 * 1024
    form.maxFields = 1000

    form.parse(req, function (err, fields, files) {
      require('child_process').exec(
        'unzip ' + files.file.path,
        {
          cwd: files.file.path.split('/').slice(0, -1).join('/')
        },
        function (error, stdout, stderr) {
          require('child_process').exec(
            'rm -f' + files.file.path,
            {
              cwd: files.file.path.split('/').slice(0, -1).join('/')
            },
            function (error, stdout, stderr) {
            }
          )
        }
      )
    })
  },

  photo: function (req, res, next) {
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.resolve(__dirname, '../../upload/')
    form.keepExtensions = true
    form.maxFieldsSize = 2 * 1024 * 1024
    form.maxFields = 1000
    form.hash = true

    form.parse(req, function (err, fields, files) {
      UploadService.uploadImageToBOS(files.file.path, req, result => {
        res.json(result)
      })
    })
  },

  media: function (req, res, next) {
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.resolve(__dirname, '../../upload/')
    form.keepExtensions = true
    form.maxFieldsSize = 20 * 1024 * 1024
    form.maxFields = 1000
    form.hash = false
    form.parse(req, function (err, fields, files) {
      const option = {
        originName: files.file.name
      }
      UploadService.uploadMediaToBOS(files.file.path, req, option, result => {
        res.json(result)
      })
    })
  },

  uploadToServer: function (fileKeyValue, options, contentType, setting, fn) {
    let result = '',
      currentPath = ''
    let req = http.request(options, function (res) {
      // res.setEncoding("utf8");
      res.on('data', function (chunk) {
        result += chunk
      })
      res.on('end', function (chunk) {
        console.log('result', result)
        fn(result)
      })
    })
    req.on('error', function (e) {
      console.log('problem with request:' + e.message)
      console.log(e)
    })

    let boundaryKey = Math.random().toString(16)
    let enddata = '\r\n----' + boundaryKey + '--'

    let files = new Array()
    for (let i = 0; i < fileKeyValue.length; i++) {
      const name = setting.origin
        ? setting.originName
        : path.basename(fileKeyValue[i].urlValue)
      let content =
        '\r\n----' +
        boundaryKey +
        '\r\n' +
        'Content-Disposition: form-data; name="name"\r\n\r\n' +
        name
      if (contentType == 'text/javascript') {
        content +=
          '\r\n----' +
          boundaryKey +
          '\r\n' +
          'Content-Disposition: form-data; name="prefix"\r\n\r\n' +
          fileKeyValue[i].prefix
      }
      content +=
        '\r\n----' +
        boundaryKey +
        '\r\n' +
        'Content-Type: ' +
        contentType +
        '\r\nContent-Disposition: form-data; name="' +
        fileKeyValue[i].urlKey +
        '"; filename="' +
        name +
        '"\r\n' +
        'Content-Transfer-Encoding: binary\r\n\r\n'
      let contentBinary = new Buffer(content, 'utf-8') // 当编码为ascii时，中文会乱码。
      files.push({
        contentBinary: contentBinary,
        filePath: fileKeyValue[i].urlValue
      })
    }
    let contentLength = 0
    for (let i = 0; i < files.length; i++) {
      var stat = fs.statSync(files[i].filePath)
      contentLength += files[i].contentBinary.length
      contentLength += stat.size
    }

    req.setHeader(
      'Content-Type',
      'multipart/form-data; boundary=--' + boundaryKey
    )
    req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata))

    let fileindex = 0
    let doOneFile = function () {
      req.write(files[fileindex].contentBinary)
      let fileStream = fs.createReadStream(files[fileindex].filePath, {
        bufferSize: 4 * 1024
      })
      fileStream.pipe(req, { end: false })
      fileStream.on('end', function () {
        fs.unlink(files[fileindex].filePath)
        fileindex++
        if (fileindex == files.length) {
          req.end(enddata)
        } else {
          doOneFile()
        }
      })
    }

    if (fileindex == files.length) {
      req.end(enddata)
    } else {
      doOneFile()
    }
  },

  uploadImageToBOS (path, request, fn) {
    let files = [{ urlKey: 'file', urlValue: path, prefix: '' }]
    var cookies = []
    for (let key in request.cookies) {
      cookies.push(key + '=' + request.cookies[key])
    }
    let options = {
      host: 'wmaudit.baidu.com',
      port: '80',
      method: 'POST',
      path: '/audit?qt=upload',
      headers: {
        Cookie: cookies.join(';')
      }
    }
    UploadService.uploadToServer(
      files,
      options,
      'application/octet-stream',
      {},
      result => {
        let jsonStr = result.match(/\{.*\}/)
        if (jsonStr && jsonStr.length > 0) {
          fn({
            error_no: 0,
            error_msg: '',
            result: JSON.parse(jsonStr[0])
          })
        } else {
          fn({
            error_no: 1005,
            error_msg: 'upload error',
            result: ''
          })
        }
      }
    )
    console.log('done')
  },

  uploadMediaToBOS (path, request, option, fn) {
    const files = [{ urlKey: 'file', urlValue: path, prefix: '' }]
    var cookies = []
    for (let key in request.cookies) {
      cookies.push(key + '=' + request.cookies[key])
    }
    const options = {
      host: 'gzhxy-waimai-dcloud11.gzhxy.iwm.name',
      port: '8065',
      method: 'POST',
      path: '/pinzhi/audit/uploadmedia',
      headers: {
        Cookie: cookies.join(';')
      }
    }
    const setting = {
      origin: true,
      originName: option.originName
    }
    UploadService.uploadToServer(
      files,
      options,
      'application/octet-stream',
      setting,
      result => {
        let jsonStr = result.match(/\{.*\}/)
        if (jsonStr && jsonStr.length > 0) {
          fn(JSON.parse(jsonStr[0]))
        } else {
          fn({
            error_no: 1005,
            error_msg: 'upload error',
            result: ''
          })
        }
      }
    )
    console.log('done')
  },

  uploadFileToBOS (path) {
    return new Promise((resolve, reject) => {
      let files = [
        { urlKey: 'file', urlValue: path, prefix: 'xin/static/h5platform/' }
      ]
      let options = {
        host: '10.19.128.91',
        port: '8999',
        method: 'POST',
        path: '/sprite/bos/upload'
      }
      UploadService.uploadToServer(
        files,
        options,
        'text/javascript',
        {},
        result => {
          if (result) {
            resolve(JSON.parse(result))
          } else {
            resolve(false)
          }
        }
      )
    })
  }
}

export default UploadService
