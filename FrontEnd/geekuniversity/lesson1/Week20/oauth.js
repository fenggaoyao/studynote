//https://github.com/apps/toy-publish

{
    const code = "cbfcfeebdaa2908214ea"
    const state = "abc123"
    const client_id = "Iv1.04da7de61ecd6c5a"
    const client_secret = "0c3f4d8b2258a1e92e0e3cae4bb27091313fe3da"
    const redirect_url = encodeURIComponent("http://localhost:8000")

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_url=${redirect_url}`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", `https://github.com/login/oauth/access_token?${params}`, true);
    xhr.send(null)

    xhr.addEventListener("readstatechange", function (event) {
        if (event.readystate === 4) {
            console.log(event.responseText)
        }
    })
}

{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", `https://api.github.com/user`, true);
    xhr.setRequestHeader("Authorization", "Bearer 64ad9d36792192bd5d9db80f5062f18730277e91")
    xhr.send(null)

    xhr.addEventListener("readystatechange", function (event) {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText)
        }
    })
}


//access_token=64ad9d36792192bd5d9db80f5062f18730277e91&expires_in=28800&refresh_token=r1.a5480426bd610e4861e9c6ca87f15a86dd775911ec2ecd8e717fd45954b62fbd9a527c12c9cd6daa&refresh_token_expires_in=15638400&scope=&token_type=bearer