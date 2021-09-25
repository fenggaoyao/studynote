const express = require('express');
const router = express.Router();
import redis from '../busineses/redis'
import uuid from 'uuid/v4'
import Upload from '../busineses/Upload';
import RtCompile from '../busineses/RtCompile';

module.exports = function(glob){
    router.post('/upload/component', Upload.component);
    router.post('/upload/photo', Upload.photo);
    router.post('/upload/audio', Upload.media);
    router.get('/compile', RtCompile);

    //异步队列
    router.get('/snapshot', function(req, res, next){
        let msg = {
            req: req,
            res: res
        };
        let key = uuid();
        console.log('🐎:', key);
        glob.cache[key] = msg;

        glob.shotQueue.add({key: key});
    });
    //异步队列
    router.get('/build', function(req, res, next){
        let msg = {
            req: req,
            res: res
        };
        let key = uuid();
        glob.cache[key] = msg;
        console.log('🐂：', 'enqueue:' + key);
        glob.buildQueue.add({key: key});

        res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
			'Access-Control-Allow-Origin': '*'
	    });
        res.write('\n');
    });

    //异步队列
    router.get('/clearQueue', function(req, res, next){
        glob.shotQueue.empty();
        glob.buildQueue.empty();
    });

    return router;
}