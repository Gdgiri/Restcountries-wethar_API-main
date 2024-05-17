// ? Create Element

    function element(tagename,claslist,idname,content){
        
        let ele =document.createElement(tagename);
        // ele.className=clasname;
        ele.classList=claslist;
        ele.id=idname;
        ele.innerHTML=content;

        return ele
      
    }
// ? create container 

let condainer = element("div","container","","");
let head = element("h1","text-center","title","Countries Weather Details");
let row = element("div","row","","");


//? api fetch

let responce = fetch("https://restcountries.com/v3.1/all")
responce.then((data)=>data.json())
.then((result)=>{
    console.log(result)

 for(let key of result){
    
    let col =  document.createElement("div");
    col.classList ="col-sm-6 col-md-4 col-lg-4 col-xl-4" ;
    col.innerHTML=`
    <div class="card h-100 " >
    <div class="card-header ">
    <h5 class="card-title text-center ">${key.name.common}</h5>
    </div>
    <div class = "img-box">
    <img src="${key.flags.png}" alt="country-img" class="card-img-top" >
    </div>
     
    <div class="card-body text-center">
    
    <p>Capital : ${key.capital}</p>
  

    <p>Capital : ${key.region}</p>
  
    
    <p>Capital : ${key.cca3}</p>
   
    </div>
    <button class="btn btn-primary "> Click for weather </button>
    </div>
    `
    row.append(col)
 }

// ? Button logic for appending weather detaile from weather api

let buttons = document.querySelectorAll("button")

buttons.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{
        let latlng = result[index].latlng
        // console.log(latlng)
        let lat = latlng[0]
        let lon = latlng[1]

        // console.log(lat);
        // console.log(lon);

        // ? weather api logic
        let wetharapi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27841d2b206619c6fc9c3093a252883c`)
        wetharapi.then((data11)=>data11.json())
        .then((ele22)=>{
            // alert(`weather :${ele22}`)
            
            // let celsiusround= Math.round(celsius)

            // let Fahrenheit = celsiusround * 1.8 + 32 
            console.log(ele22);
            alert(`Weather of ${result[index].name.common} is : ${Math.floor(ele22.main.temp)}🌡️C`)
        })
    })
})


   
})
.catch((error)=>{
     console.log(error)
})


// ? append part
condainer.append(row)
document.body.append(condainer,head)


















