import login from "./login.js"
import navbar, { bindingAnchor } from "./navbar.js"

let register = () => {
    setTimeout(()=>{
        bindingAnchor()
    })
    return `
    <div class="nav">${navbar()}</div>
    <div class="registrationFormContainer">
            <form action="">
                <div>
                    <h1>Registration Form</h1>
                </div>
                <div>
                    <input type="text" placeholder="Enter Your Name" name="name">
                </div>
                <div>
                    <input type="email" placeholder="Enter Your Email" name="email">
                </div>
                <div>
                    <input type="password" placeholder="Enter Your password" name="password">
                </div>
                <div>
                    <input type="text" placeholder="Enter Your Age" name="age">
                </div>
                <div>
                    <div>
                        <input type="radio" value="Male" name="gender"><span>Male</span>
                    </div>
                    <div>
                        <input type="radio" value="Female" name="gender"><span>Female</span>
                    </div>
                    <div>
                        <input type="radio" value="Other" name="gender"><span>Other</span>

                    </div>
                </div>
                <div>
                    <input type="text" placeholder="Enter Job Role" name="job">
                </div>
                <div>
                    <input type="text" placeholder="Enter Your Education Qualification" name="educationQualification">
                </div>
                <div>
                    <select name="zodiacSign">
                        <option value="" selected disabled><span>select Zodiac Sign</span></option>
                        <option value="Aries"  >Aries</option>
                        <option value="Taurus" >Taurus</option>
                        <option value="Gemini" >Gemini</option>
                        <option value="Cancer" >Cancer</option>
                        <option value="Leo" >Leo</option>
                        <option value="Virgo" >Virgo</option>
                        <option value="Libra" >Libra</option>
                        <option value="Scorpio" >Scorpio</option>
                        <option value="Sagittarius" >Sagittarius</option>
                        <option value="Capricorn" >Capricorn</option>
                        <option value="Aquarius" >Aquarius</option>
                        <option value="Pisces" >Pisces</option>

                    </select>
                </div>
                <div>
                    <input type="text" placeholder="Enter your religion" name="religion">
                </div>
                <div>
                    <textarea placeholder="Enter bio" name="about"></textarea>
                </div>
                <div>
                    <textarea placeholder="Enter Family Details" name="family"></textarea>
                </div>
                <div>
                    <input type="text" placeholder="Enter your Area" name="area">
                </div>
                <div>
                    <input type="text" placeholder="Enter your State" name="state">
                </div>
                <div>
                    <input type="text" placeholder="Enter your pin" name="pin">
                </div>

                <div>
                    <div><label for="">Hobbies</label></div>

                    <div>
                        <input type="checkbox" value="cricket" name="hobbies"><span>Cricket</span>
                        <input type="checkbox" value="music" name="hobbies"><span>Music</span>
                        <input type="checkbox" value="dance" name="hobbies"><span>Dance</span>
                        <input type="checkbox" value="travelling" name="hobbies"><span>Travelling</span>
                        <input type="checkbox" value="cooking" name="hobbies"><span>Cooking</span>
                        <input type="checkbox" value="reading" name="hobbies"><span>Reading</span>
                    </div>
                </div>
                <div>
                    <div><label for="">Interests</label></div>
                    <div>
                        <input type="checkbox" value="cricket" name="interests"><span>Cricket</span>
                        <input type="checkbox" value="music" name="interests"><span>Music</span>
                        <input type="checkbox" value="dance" name="interests"><span>Dance</span>
                        <input type="checkbox" value="travelling" name="interests"><span>Travelling</span>
                        <input type="checkbox" value="cooking" name="interests"><span>Cooking</span>
                        <input type="checkbox" value="reading" name="interests"><span>Reading</span>
                    </div>
                </div>
                <div>
                    <input type="file" name="image" accept=".png,,jpeg">
                    <img src="" alt="">
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    `
}


export let bindHandler=()=>{
    let allInp = document.querySelectorAll("input")
let select = document.querySelector("select")
let textareas= document.querySelectorAll("textarea")
let form = document.querySelector("form")
let checkBoxes= document.querySelectorAll("input[type=checkbox]")



let state={
    interests :[],
    hobbies :[],
    setState(name, value){
        if(name!="interests" && name!="hobbies"){
            this[name]=value;
        }
    },
    setCheckBoxes(name, value, isChecked){
        if(isChecked){
        // console.log(name, value);
           this[name].push(value)
        }else{
            this[name] = this[name].filter(item => item !== value);

        }
    }
}

let handleCheckBox=(e)=>{
    // console.log(e.target.name,e.target.value,e.target.checked);
    let name = e.target.name
    let value = e.target.value
    let isChecked = e.target.checked
    state.setCheckBoxes(name,value, isChecked)
    
}
let handleChange=(e)=>{
    // console.log(e.target.name,e.target.value);
    let name = e.target.name
    let value = e.target.value
    if(name=="image"){
        let file = e.target.files[0]
        
        value=file

        let reader = new FileReader();
        reader.onload= function (){

            form.style.backgroundImage=`url(${reader.result})`
        }
        reader.readAsDataURL(file)
    }
    state.setState(name,value)
}



let handleSubmit=(e)=>{
    e.preventDefault()
    

    let payload={
    email:state.email,
    name : state.name,
    password: state.password,
    age: state.age,
    gender : state.gender,
    job:state.job,
    educationQualification:state.educationQualification,
    zodiacSign:state.zodiacSign,
    religion:state.religion,
    about:state.about,
    family:state.family,
    area:state.area,
    state:state.state,
    pin:state.pin,
    hobbies:state.hobbies,
    interests:state.interests,
    image:state.image

    };

    let formData = new FormData() 

    for(let data in payload){
        if(data=="hobbies" || data =="interests"){
            formData.append(data,JSON.stringify(payload[data]))
        }

        else{
            formData.append(data,payload[data])
        }
            
    }

    try {
        (async()=>{
            let res = await fetch("http://localhost:8080/api/register",{
                method:"POST",
                body:formData
            })
            let data =  await res.json()

            console.log(data)
            history.pushState(null,"","/login")
            root.innerHTML=login()
        })()
    } catch (error) {
        console.log(error);
        alert("something went wrong")
        
    }

    // console.log(state);
    

}
allInp.forEach((inp)=>{
    inp.addEventListener("change",handleChange)
})
select.addEventListener("change",handleChange)
textareas.forEach((textArea)=>{
    textArea.addEventListener("change",handleChange)
})
checkBoxes.forEach((checkBoxes)=>{
    checkBoxes.addEventListener("change",handleCheckBox)
})

form.addEventListener("submit",handleSubmit)
}

export default register