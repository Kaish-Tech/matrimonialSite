import home from "./home.js";
import login, { loginBinding } from "./login.js";
import register,{bindHandler} from "./register.js";
let navbar=()=>{
    return `
    <a href="login">login</a>
    <a href="register">register</a>
    <div><input type="search"></div>
    `
}
export default navbar;

export let bindingAnchor=()=>{
    let allAnchor= document.querySelectorAll("a")
    let routes={
        "/login":[login,loginBinding],
        "/register":[register,bindHandler],
        "/home":[home]
    }
    
    function pageLoader(e){
        e.preventDefault()

        history.pushState(null,"" ,`${e.target.pathname}`)
        
    
        let path = window.location.pathname
        
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
    
}