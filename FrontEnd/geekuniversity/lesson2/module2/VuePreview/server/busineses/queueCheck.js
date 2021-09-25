import screenshot from './Screenshot'
import build from './Build'

function checkScreenShot(glob){
    glob.shotQueue.process(function(job, done){
        console.log('🐂：', 'de queue: [screenshot]', job.data.key);
        let rr = glob.cache[job.data.key];
        if(rr && rr.req && rr.res){
            try{
                screenshot(rr.req, rr.res).then( () => {
                    delete glob.cache[job.data.key];
                    console.log('🐂：screen shot done');
                    done();
                    job.remove();
                });
            } catch (e) {
                done();
                job.remove();
            }
        } else {
            done();
            job.remove();
        }
    });
}

function checkBuild(glob){
    glob.buildQueue.process(function(job, done){
        console.log('🐂：', 'de queue: [build]', job.data.key);
        let rr = glob.cache[job.data.key];
        console.log(rr);
        if(rr && rr.req && rr.res){
            try{
                build(rr.req, rr.res).then( () => {
                    delete glob.cache[job.data.key];
                    console.log('🐂：build done');
                    done();
                    job.remove();
                });
            } catch(e) {
                done();
                job.remove();
            }
        } else {
            done();
            job.remove();
        }
    });
}

export default function(glob){
    checkScreenShot(glob);
    checkBuild(glob);
}