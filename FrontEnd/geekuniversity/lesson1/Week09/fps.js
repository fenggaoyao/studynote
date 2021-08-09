// 60 Hz代表每秒周期震动60次。

// (周期 / 秒

function run_fps_test() {
    let fps = 0;
    let frame = 0;
    const start = new Date().getTime()
    const loop = () => {
        requestAnimationFrame(() => {
            frame++;
            const t = new Date().getTime();
            fps = 1000 * frame / (t - start)
            console.log("fps" + fps)
            loop()
        })
    }
    loop();
}

const interposlate = (rangeA, rangeB) => {
    return (value) => {
        const r = (rangeB[1] - rangeB[0]) / rangeA[1] - rangeA[0]
        return rangeB[0] + r * (value - rangeA[0])
    }
}
const it1 = interposlate([0, 200], [0, 1])
const it2 = interposlate([0, 1], [100, 300])
const t = 20
const t_prime = it1(t) //0.05
console.log("t is " + t_prime)
console.log(it2(t_prime))


console.log("distance is" + d)