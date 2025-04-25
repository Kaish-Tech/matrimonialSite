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
        root.innerHTML=`<div class ="cardContainer">${stringData}</div>`

        // let allImg = document.querySelectorAll("img")
        // allImg.forEach((img)=>{
        //     img.addEventListener("click",(e)=>{
        //         let id = e.target.getAttribute("data-id")
        //       let clickedUser =  data.find((val)=>val._id==id)
        //       console.log(clickedUser)
        //       let remainingUser = data.filter((val)=>val._id!=id)
        //       console.log(remainingUser);


        //       let remainingUserString = remainingUser.map((val)=>{
        //         return`
        //         <div class= "card">
        //                 <img src="${val.image}" data-id=${val._id}>
        //                 <div>
        //                     <div>Name:${val.name}</div>
        //                 </div>
        //         </div>
        //         `
        //       }).join("")
        //       root.innerHTML=`<div class="allContainner>
              
        //         <div>
        //             <div>
        //             <img src="${clickedUser.image}">
        //             </div>
        //             <div></div>
        //         </div>
        //         <div>
        //         ${remainingUserString}</div>
        //       </div>`
        //     })
        // })
    })()
}
export default home