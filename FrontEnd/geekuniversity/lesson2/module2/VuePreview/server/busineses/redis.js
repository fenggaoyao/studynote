const redis = require('redis');
let connected = false;
const redisConfig = {
    // host: 'gzhxy-waimai-dcloud48.gzhxy.iwm.name',
    host: '127.0.0.1',
    port: 6688
};
let client;

function connect(func, error) {
    if (!connected) {
        client = redis.createClient(redisConfig);
        client.on('connect', () => {
            connected = true;
            console.log('redis connected success!');
            func && func();
        });
        client.on('reconnecting', () => {
            console.log('redis reconnecting');
        });
        client.on('error', (err) => {
            console.log(err);
            error && error();
        });
    } else {
        func && func();
    }
}


export default {
    hget(schema, key){
        console.log('hget', schema, key);
        return new Promise((resolve, reject) => {
            connect(() => {
                client.hgetall(schema, (err, replies) => {
                    if (!replies) {
                        resolve({});
                    } else {
                        if(!key){
                            resolve(replies);
                        } else {
                            resolve(replies[key]);
                        }
                    }
                });
            })
        })
    },

    hset(schema, obj) {
        return new Promise((resolve, reject) => {
            connect(() => {
                client.hmset(schema, obj, resolve);
            })
        })
    },

    get(key){
        return new Promise((resolve, reject) => {
            connect(() => {
                client.get(key, (err, reply) => {
                    resolve(reply);
                });
            })
        })
    },

    set(key, value){
        return new Promise((resolve, reject) => {
            connect(() => {
                client.set(key, value, (err, reply) => {
                    resolve(true);
                });
            }, () => {
                resolve(false);
            })
        })
    }
};