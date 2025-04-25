import home from "./home.js"

let login=()=>{
    return `<div class="loginFormContainer">

            <form action="">
                <div>
                    <h1>Login Form</h1>
                </div>
               
                <div>
                    <input type="email" placeholder="Enter Your Email" name="email">
                </div>
                <div>
                    <input type="password" placeholder="Enter Your password" name="password">
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>`
}
export default login

export let loginBinding=()=>{
    let allInput = document.querySelectorAll("input")
let form = document.querySelector("form")

let state={
    setState(name, value){
        this[name]=value
    }
}
let handleChange= (e)=>{
    state.setState(e.target.name,e.target.value)
}
let handleSubmit= (e)=>{
e.preventDefault()
let {email, password}=state;
let payload={email,password};
// console.log(state)
// let payload={
//     email:state.email,
//     password: state.password
// };
console.log(payload)
try {

    (async ()=>{
        let res = await fetch("http://localhost:8080/auth/login",{
            method:"POST",
            body: JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data =await res.json()
        console.log(data)
        if(data.token){
            alert(`${data.message}`)
            window.sessionStorage.setItem("token",`${data.token}`) 
            window.history.pushState(null,"","/home")
            root.innerHtml = home()
            }
            else{
                alert(`${data.message}`)
            
            }
        // if(data.statusCode!=404){
        //     alert(`${data.message}`)
        //     window.history.pushState(null,"","/home")
        //     root.innerHTML=home()
        // }
        // else{
        //     alert(`${data.message}`)
        //     window.history.pushState(null,"","/login")
        //     root.innerHTML=login()
        //     loginBinding();
        // }
        
       
    })()
} catch (error) {
    console.log(error)
    alert("something went wrong")
}
}

allInput.forEach((inp)=>{
    inp.addEventListener("change",handleChange)
})

form.addEventListener("submit",handleSubmit)


}
