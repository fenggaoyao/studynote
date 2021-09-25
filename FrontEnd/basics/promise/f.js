function sleep(timeout) {
    return new Promise((resolve) =>
        setTimeout(resolve, timeout)
    )
}

async function light(color, timeout) {
    await sleep(timeout)
    document.getElementById("app").style.backgroundColor = color
}

async function main() {
    while (true) {
        await light("red", 1000)
        await light("yellow", 2000)
        await light("green", 1000)
    }
}

export default main;