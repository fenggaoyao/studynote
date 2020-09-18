var c = 1
async function a() {
    var b = await 10 + c
    console.log(b) //
}
a()
c = c + 1


var c = 1
async function a() {
    var b = c + await 10
    console.log(b)
}
a()
c = c + 1