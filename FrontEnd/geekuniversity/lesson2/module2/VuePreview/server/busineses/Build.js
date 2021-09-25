import UploadService from './Upload'
import api from '../../isomorph/api'
import Sh from './sh'

export default function (req, res) {
  return new Promise(resolve => {
    var mid = req.query.modelId
    console.log('🚌', mid)
    let isDone = false
    let uuid = 5
    console.log('ajax start')
    try {
      api.getModel(mid).then(result => {
        console.log('ajax done')
        if (result.error_no == 0) {
          Sh.execute(result.result.model_detail.model_content, (log, type) => {
            let msgType = type || 'message'
            sendMessage(res, msgType, log)
          }, (done) => {
            isDone = true
            resolve()
          })
          setTimeout(() => {
            if (!isDone) {
              sendMessage(res, msgType, '发布超时')
              resolve()
            }
          }, 20000)
        }
      })
    } catch (e) {
      console.log(e)
      isDone = true
      resolve()
    }

    function preparePayload (type, msg) {
      return {
        type: type,
        data: msg
      }
    }

    function sendMessage (response, type, msg) {
      var data = preparePayload(type, msg)
            // convert message to string
            // console.log(data);
            // send message back
      response.write('data: ' + JSON.stringify(data) + '\n\n')
    }
  })
};
