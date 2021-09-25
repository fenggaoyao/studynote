const formidable = require('formidable');
const path = require('path');
const uuid = require('uuid/v4');
const util = require('util');
const http = require('http');
import api from '../../isomorph/api';

const fs = require('fs');
import webshot from 'webshot';
import UploadService  from './Upload';

export default function(req, res){
    console.log('🐂: screenShot');
    return new Promise(resolve => {
        let filePath = path.resolve(__dirname, "../../public/upload/" + 'shot-' + uuid() + '.jpg');
        var options = {
            screenSize: {
                width: 320, 
                height: 568
            }, 
            shotSize: {
                width: 320, 
                height: 568  ///'all'
            },
            cookies: [req.cookies],
            phantomPath: '/home/work/h5platform/bin/phantomjs-2.1.1-linux-x86_64/bin/phantomjs',
            quality: 100,
            streamType: 'jpg',
            defaultWhiteBackground: true,
            renderDelay: 7000,
            userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
        };

        if(req.query.widgetId){
            options.shotSize = {
                width: 320,
                height: 320
            };
        }

        try{
            let pa = [];
            for(var key in req.query){
                pa.push(key + '=' + req.query[key]);
            }
            console.log(filePath);

            webshot('http://10.19.128.95:8088/preview.html#/?'+ pa.join('&'), filePath, options, function(err) {
                if(!err){
                    UploadService.uploadImageToBOS(filePath, req, (result) => {
                        if(result.error_no == 0){
                            res.json({
                                error_no: 0,
                                error_msg: '',
                                result: {
                                    url: result.result.url
                                }
                            });
                            resolve(true);
                            // if(req.query.modelId){
                            //     api.updateModel({
                            //         model_id: req.query.modelId,
                            //         model_image: result.result.url,
                            //         cookies: req.cookies
                            //     }).then(ires => {
                            //         res.json({
                            //             error_no: 0,
                            //             error_msg: '',
                            //             result: ires
                            //         });
                            //         resolve(true);
                            //     })
                            // } else if(req.query.widgetId){
                            //     api.updateWidget({
                            //         widget_id: req.query.widgetId,
                            //         widget_image: result.result.url,
                            //         cookies: req.cookies
                            //     }).then(ires => {
                            //         res.json({
                            //             error_no: 0,
                            //             error_msg: '',
                            //             result: ires
                            //         });
                            //         resolve(true);
                            //     })
                            // }
                        }
                    });
                } else {
                    console.log(err);
                    resolve(false);
                }
            });
        } catch(e) {
            console.log(e);
            resolve(false);
        }

    });
    
};