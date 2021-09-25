let cache = {};
const fs = require('fs');
var fsx = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
import Upload from './Upload';
import uuid from 'uuid/v4';

const cmds = {
    execute(data, fn, done){
        cache = {};
        
        fn('😊:-------------ready--------------');
        Promise.resolve()
        .then(() => {
            return cmds.init(fn)
        })
        .then(() => {
            return cmds.copy(data, fn)
        })
        .then(() => {
            fn('😊:-------------copy finish--------------');
            fn(3, 'finish');
            return cmds.build(fn)
        })
        .then(() => {
            fn(4, 'finish');
            return cmds.upload(fn)
        })
        .then(() => {
            console.log('😊 completed');
            done()
        })
    },

    init: function (fn){
        console.log('🏠init');
        fn('🔨:-------------start init--------------');
        return new Promise((resolve, reject) => {
            let cli = spawn('/bin/sh', [path.join(__dirname, '../../syncBuildBase.sh')]);
            cli.stdout.on('data', function(data) { 
                fn && fn(data.toString('utf8') + '\n');
            });
            cli.stdout.on('error', function(data) { 
                fn && fn(data.toString('utf8') + '\n');
            });
            cli.stdout.on('end', function(data) {
                fn('🔨:-------------init finish--------------');
                resolve();
            });
            cli.on('exit', function(code) {
            });
        });
    },

    copy: function (tree, fn){
        console.log('🏠copy');
        fn('😊:-------------start copy--------------');
        let me = this;
        let stack = [];
        let result = [];
        let root = tree;

        if(!root.children) return;
        let tasks = [];

        tasks.push(cmds.copyDir('platform/common/ComponentTree', fn));
        tasks.push(cmds.copyDir('platform/Preview/Preview', fn));
        tasks.push(cmds.copyDir('common/common/ContainerMixin', fn));

        for(var i=0; i<root.children.length; i++){
            let child = root.children[i];
            stack.push(child);
            
            while(stack.length > 0){
                let node = stack.pop();
                if(!cache[node.path]){
                    cache[node.path] = true;
                    tasks.push(cmds.copyDir(node.path, fn));
                }
                for(var j=0; j<node.children.length; j++){
                    stack.push(node.children[j]);
                }
            }
        }
        return Promise.all(tasks)
    },

    copyDir: function (modPath, fn){
        return new Promise((resolve, reject) => {
            let ps = modPath.split('/').slice(0, -1).join('/');
            let src = path.join(__dirname, '../../src/components/' + ps);
            let dist = path.join(__dirname, '../../buildBase/src/components/' + ps);
            let distUp = dist.split('/').slice(0, -1).join('/');
            let cmd = [
                'rm -rf ' + dist,  
                'mkdir -p ' + distUp, 
                'cp -R ' + src + ' "$_"', 
                'rm -f ' + dist + '/*Property.vue',
                'rm -f ' + dist + '/*Property.js'
            ].join(' && ')
            fn('copy: '+ src);
            exec(cmd, function(err, stdin, stdout){
                 if(err){
                     reject();
                     console.error('🚗copyFile🚗', err);
                 } else {
                     resolve();
                 }
            })
        });
     },

     copyFile: function (src, dist, fn){
        return new Promise((resolve, reject) => {
            let distUp = dist.split('/').slice(0, -1).join('/');
            let cmd = 'rm -rf ' + dist + ' && mkdir -p ' + distUp + ' && cp -R ' + src + ' "$_"'
            fn('copy: '+ src);
            exec(cmd, function(err, stdin, stdout){
                 if(err){
                     reject();
                     console.error('🚗copyFile🚗', err);
                 } else {
                     resolve();
                 }
            })
        });
     },

     build: function (fn){
        console.log('🏠build');
        fn('🔨:-------------start build--------------');
        return new Promise((resolve, reject) => {
            let cli = spawn('/bin/sh', [path.join(__dirname, '../../buildBase/build.sh')]);
            cli.stdout.on('data', function(data) { 
                fn && fn(data.toString('utf8') + '\n');
            });
            cli.stdout.on('error', function(data) { 
                fn && fn(data.toString('utf8') + '\n');
            });
            cli.stdout.on('end', function(data) {
                fn('🔨:-------------build finish--------------');
                resolve();
            });
            cli.on('exit', function(code) {
            });
        });
     },

     upload: function (fn){
        console.log('🏠upload');
        fn('⏫:-------------start upload--------------');

        return new Promise((resolve, reject) => {
            let name = uuid() + '.js';
            let jsPath = path.join(__dirname, '../../buildBase/build/'+ name);
            fsx.copySync(path.join(__dirname, '../../buildBase/build/main.js'), jsPath);
            Upload.uploadFileToBOS(jsPath).then((data) => {
                if(data.error_no == 0){
                    fn(data.result['xin/static/h5platform/'+ name], 'done')
                }
                resolve();
            });
        });
     }

};

export default cmds;