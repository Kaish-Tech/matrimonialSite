import navbar from "./navbar.js";

let home=()=>{
    
    (async ()=>{
        let res = await fetch("http://localhost:8080/api/filter-user",{
            headers:{
                "Authorization":`Bearer ${window.sessionStorage.getItem("token")}`
            }
        })
        let data =await res.json();
        console.log(data)
         let stringData = data.map((val)=>{
            return `
            <div class= "card">
                <img src="${val.imageUrl}">
                <div>
                    <div><span>Name:</span> ${val.name}</div>
                </div>
                <div>
                    <div><span>Email:</span> ${val.email}</div>
                </div>
                <div>
                    <div><span>Age:</span> ${val.age}</div>
                    <div><span>Gender:</span> ${val.gender}</div>
                </div>
                <div>
                    <div><span>Zodiac Sign: </span> ${val.zodiacSign}</div>
                </div>
                <div>
                    <div><span>Religion:</span> ${val.religion}</div>
                </div>
                <div>
                    <div><span>Job:</span> ${val.job}</div>
                </div>
                <div>
                    <div><span>Education Qualification:</span> ${val.educationQualification}</div>
                </div>
                <div>
                    <div>
                        <div><span>Area:</span> ${val.area}</div>
                        <div><span>State:</span> ${val.state}</div>
                        <div><span>pin:</span> ${val.pin}</div>
                    </div>
                </div>
                <div>
                    <div><span>About:</span> ${val.about}</div>
                </div>
                <div>
                    <div><span>Family:</span> ${val.family}</div>
                </div>
                <div>
                    <div><span>Hobbies:</span> ${val.hobbies.map((hobbi)=>{
                        return `<div>${hobbi}</div>`
                    })}</div>
                </div>
                <div>
                    <div><span>Interests:</span> ${val.interests.map((hobbi)=>{
                        return `<div>${hobbi}</div>`
                    })}</div>
                </div>
            
            </div>
            `
        }).join("")
        console.log(stringData)
        root.innerHTML=`<div class ="cardContainer">
        <div class="nav">${navbar()}</div>
        <div id ="allPeople">
        ${stringData}</div></div>`

        let inp= document.querySelector("input")

        inp.addEventListener("input",(e)=>{
            let filterData = data.filter((val)=>val.name.toLowerCase().includes(e.target.value.toLowerCase()) || val.gender.toLowerCase().includes(e.target.value.toLowerCase()) || val.zodiacSign.toLowerCase().includes(e.target.value.toLowerCase()) ).map((val)=>{

                return `
                 <div class="card">
                        <img src=${val.image} >
                        <div>
                            <div><span>Name:</span>  ${val.name}</div>
                        </div>
                        <div>
                            <div><span>Email:</span>  ${val.email}</div>
                        </div>
                        <div>
                            <div><span>Age: </span>${val.age}</div>
                             <div><span>Gender: </span>${val.gender}</div>
                        </div>
                        <div>
                            <div><span>Zodiac Sign: </span>${val.zodiacSign}</div>
                        </div>
                        <div>
                            <div><span>Religion: </span>${val.religion}</div>
                    
                        </div>
                        <div>
                             <div><span>Job: </span>${val.job}</div>
                        </div>
                        <div>
                             <div><span>Education Qualification: </span>${val.educationQualification}</div>
                        
                        </div>
                        <div>
                            <div>
                                <div><span>Area </span>${val.address.area}</div>
                                <div><span>State </span>${val.address.state}</div>
                                <div><span>Pin </span>${val.address.pin}</div>
                            </div>
                        </div>
                        <div>
                            <div><span>About: </span>${val.about}</div>
                        </div>
                        <div>
                             <div><span>Family: </span>${val.family}</div>
                        </div>
    
                        <div>
                            <div><span>Hobbies:</span> ${val.hobbies.map((hobbi)=>{
                                return `<div>${hobbi}</div>`
                            })}</div>
                        </div>
    
                        
                        <div>
                            <div><span>Interests:</span> ${val.interests.map((hobbi)=>{
                                return `<div>${hobbi}</div>`
                            })}</div>
                        </div>
                    </div>
                `
            }).join("")
            allPeople.innerHTML=`${filterData}`
        })
    })()
}
export default home