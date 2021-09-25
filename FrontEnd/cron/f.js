const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

function fibo(n) {
    return n === 0 ?
        0 :
        n === 1 ?
        1 :
        fibo(n - 1) + fibo(n - 2)
}

var numOfCompelete = 0
var collection = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
const fbGenerator = FbGenerator(collection);

if (cluster.isMaster) {
    var st = Date.now();
    console.log("numCPUs", Math.min(numCPUs, collection.length))
    for (var i = 0; i < Math.min(numCPUs, collection.length); i++) {
        var worker = cluster.fork();
        worker.on('message', function (msg) {
            console.log(`[master] receive message from [worker${this.id}]: ${msg}`);
            numOfCompelete++;
            nextTask(this)
        })
        nextTask(worker)

    }
    cluster.on('fork', function (worker) {
        console.log(`[master] : fork worker ${worker.id}`);
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log(`[master] : worker ${worker.id} died`);
    });


} else {
    process.on('message', function (msg) {
        var st = Date.now();
        var result = fibo(msg);
        console.log(`[worker ${cluster.worker.id}] finish work and using
 ${Date.now() - st} ms`);
        process.send(`${msg}-${result}`);
    });
}

function nextTask(worker) {
    var data = fbGenerator.next()
    if (data.done) {
        if (numOfCompelete >= collection.length) {
            console.log(`[master] finish all work and using ${Date.now() -
st} ms`);
            cluster.disconnect();
        }
        return
    }
    worker.send(data.value);
}

function* FbGenerator(task) {
    for (var i = 0; i < task.length; i++) {
        yield task[i];
    }
    return;
}