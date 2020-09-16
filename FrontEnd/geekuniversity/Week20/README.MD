
## Github OAuth 流程

- 请求 github.com/login/oauth/authorize，获取code和state
- 通过 code 和 state 换取 access_token
- 通过在 Header 设置 access_token 来访问 Github API


集成到publish里



## XMLHttpRequest

```javascript
let xhr = new XMLHttpRequest;

xhr.open("GET", `https://api.github.com/user`, true);
xhr.setRequestHeader('Authorization', 'token xxx')
xhr.send(null);

xhr.addEventListener('readystatechange', function(event) {
    if (xhr.readyState === 4) {
        debugger
        console.log(xhr.responseText)
    }
})
```