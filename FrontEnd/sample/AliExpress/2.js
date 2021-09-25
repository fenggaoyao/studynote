let m=Array.prototype.map.call(document.querySelectorAll('div#dt-tab li'),item=>JSON.parse(item.attributes["data-imgs"].value).preview)
let d=Array.prototype.map.call(document.querySelectorAll('div#desc-lazyload-container p img'),item=>item.src)
let source={
    "main":m,
    "detail":d
}
