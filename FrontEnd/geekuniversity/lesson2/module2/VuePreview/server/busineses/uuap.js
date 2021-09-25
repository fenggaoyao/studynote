/**
 * @file    UUAP登录
 * @author linxi linxi@baidu.com
 * @date 15/5/13 10:25
 */
var http = require('http');
var https = require('https');
var request = require('request');
var url = require('url');
var express = require('express');
var router = express.Router();

// 第一次用户请求url
var service;

/**
 * HTTP验证
 * @param req   当前请求request
 * @param res   当前请求response
 * @param ops   uuap验证请求链接参数
 * @param callback  uuap验证请求回调
 */
function validateByHttp(req, res, next, ops, callback) {
    var vUrl = url.format(ops);
    http.get(vUrl, function (uuapRes) {
        callback(req, res, next, uuapRes);
    });
}

/**
 * HTTPS验证
 * @param req   当前请求request
 * @param res   当前请求response
 * @param ops   uuap验证请求链接参数
 * @param callback  uuap验证请求回调
 */
function validateByHttps(req, res, next, ops, callback) {
    var vUrl = url.format(ops);
    http.get(vUrl, function (uuapRes) {
        callback(req, res, next, uuapRes);
    });
}


/**
 * 验证ticket回调
 * @param req   当前请求request
 * @param res   当前请求response
 * @param uuapRes   uuap验证请求response
 */
function validateTicket(req, res, next, uuapRes) {
    var responseText = '';
    uuapRes.on('error', function (e) {
        console.log(e);
        res.send(e.message);
    });
    uuapRes.on('data', function (chunk) {
        responseText += chunk;
    });
    uuapRes.on('end', function () {
        var statusCode = res.statusCode;
        var userName;
        if (statusCode === 200) {
            if(responseText){
                var data = JSON.parse(responseText);
                if(data.errno == 0 && data.data.uname){
                    var userId = data.data.uname;
                    console.log('set cookie:', userId);
                    res.cookie('userId', userId, {domain: '.baidu.com', expires: new Date(Date.now() + 24*60*60*1000)});
                    req.session.currentUserId = userId;
                    req.session.currentEmail = data.data.email;

                    next();
                } else {
                    res.json({ errNo: '10001', errorMsg: "user didn't login, Permission Denied", data: false})
                }
            } else {
                res.json({ errNo: '10001', errorMsg: "user didn't login, Permission Denied", data: false})
            }
        } else {
            console.log('UUAP验证失败,状态码');
            res.send('UUAP验证失败,状态码：' + statusCode);
        }

    });
}

function all(req, res, next){

    var wmuuap = req.cookies.WMUUAP;
    var userId = req.session.currentUserId;
    var isJson = /\/api\//.test(req.originalUrl);

    //如果是预览页面，放行，否则phantomJs报错
    if(/preview\.html/.test(req.originalUrl) || /templet\/getmodel\?model_id/.test(req.originalUrl) || /\.(js|css|jpeg|jpg|png|svg)$/.test(req.originalUrl) ){
        console.log('let it go');
        next();
        return;
    }

    service = url.format({
        protocol: 'http',
        hostname: 'h5.inwaimai.baidu.com',
        pathname: ''
    });

    // session 验证
    if(userId){
        console.log('current user:', userId);
        res.cookie('userId', userId, {domain: '.baidu.com', expires: new Date(Date.now() + 24*60*60*1000)});
        next();
    } else if (wmuuap) {
        console.log('----------ticket认证--------------');
        // ticket 验证
        var urlOps = {
            protocol: 'http',
            hostname: 'uuap.inwaimai.baidu.com',
            pathname: '/wmpass/checklogin',
            query: {
                WMUUAP: wmuuap,
                platform: "xinpin",
            }
        };
        validateByHttps(req, res, next, urlOps, validateTicket);
    } else {
        console.log('-----------UUAP login-----------------');

        var redirecturl = url.format({
            protocol: 'https',
            hostname: 'uuap.inwaimai.baidu.com',
            pathname: '/ucenter/userlogin',
            query: {
                "redirect_url": service
            }
        });

        if(isJson){
            res.json({ error_no: '10001', error_msg: "user didn't login, Permission Denied", data: false})
        } else {
            res.redirect(redirecturl);
        }
    }
}


module.exports = all;