// import login from "./login.js"
// import register from "./register.js"
// import home from "./home.js"


// let loginAnchor = document.querySelector("a[href='login']")
// let registerAnchor = document.querySelector("a[href='register']")
// let homeAnchor = document.querySelector("a[href='home']")

// let root = document.querySelector("#root")


// loginAnchor.addEventListener("click",(e)=>{
//     e.preventDefault()
//     history.pushState(null,"","login")
//     root.innerHTML = login()
// })

// registerAnchor.addEventListener("click",(e)=>{

//     e.preventDefault()
//     history.pushState(null, "","register")
//     root.innerHTML=register()
// })
// homeAnchor.addEventListener("click",(e)=>{

//     e.preventDefault()
//     history.pushState(null, "","home")
//     root.innerHTML=home()
// })


// ****************************************************************


import home from "./home.js";
import login, { loginBinding } from "./login.js";
import register,{bindHandler} from "./register.js";

let root = document.querySelector("#root")

let routes={
    "/login":[login,loginBinding],
    "/register":[register,bindHandler],
    "/home":[home]
}

let allAnchor= document.querySelectorAll("a")

function pageLoader(e){
    e.preventDefault()
    // console.log(e.target.pathname);

    history.pushState(null,"" ,`${e.target.pathname}`)
    // console.log(window.location.pathname)

    let path = window.location.pathname
    // console.log(path);

    // instead of using multiple if else we have been created object of pages as routes and accessing by using box notation
    // if(path=="/login"){
    //     root.innerHTML= login()
    // }else if(path=="/register"){
    //     root.innerHTML= register()
    // }else if(path=="/home"){
    //     root.innerHTML= home()
    // }
    root.innerHTML= routes[path][0]()
    if(routes[path][1]){
        routes[path][1]()
    }
}

allAnchor.forEach((e)=>{
    e.addEventListener("click",pageLoader)
})

console.log(allAnchor)

window.addEventListener("popstate",()=>{
    let path = window.location.pathname
    if(path=="/index.html"){
        root.innerHTML=""
    }
    else{
        root.innerHTML= routes[path][0]()
    }
})

