const button = document.createElement("button");
button.innerText = "button";
button.addEventListener("click", () => {
    import('./title.js').then((module) => {
        console.log(module.title);
    })
})
document.body.appendChild(button)