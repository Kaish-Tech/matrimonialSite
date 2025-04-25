import login, { loginBinding } from "./login.js"

let root = document.querySelector("#root")
if(window.location.pathname=="/index.html"){
    history.pushState(null,"","/login")
    root.innerHTML=login()
    loginBinding()
}
