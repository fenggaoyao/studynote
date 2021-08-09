var a={n:1}
//Object.freeze(a)
try{
    a.x=2
}
catch(x){
    console.log("fdfd")
}

console.log(a.x)