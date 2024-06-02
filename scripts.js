function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

// creating the base (container , heading , row)

let container = element("div", "container", "", "");
let h1 = element("h1", "text-center", "title", "Countries Weather Details");
let row = element("div", "row", "", "");

//fetch part

let response = fetch("https://restcountries.com/v3.1/all")
  .then((data) => data.json())
  .then((ele) => {
    {
      for (let i = 0; i < ele.length; i++) {
        let col = document.createElement("div");
        col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
        col.innerHTML = `
          <div class="card h-100">
          <div class="card-header">
          <h5 class="card-title text-center">${ele[i].name.common}</h5>
          </div>
          <div class="img-box">
          <img src="${ele[i].flags.png}" alt="flag" class="card-img-top" >
          </div>
          <div class="card-body">
          <div class="card-text text-center">Region: ${ele[i].region}</div>
          <div class="card-text text-center">Capital: ${ele[i].capital}</div>
          <div class="card-text text-center">Country-code: ${ele[i].cca3}</div>
          <div class="card-text text-center">Population: ${ele[i].population}</div>
          <button class="btn btn-primary ">Click for Weather</button>
          </div>
          </div>
          `;
        row.append(col);
      }
    }
    //Button logic for Weather Details from Weather api

    let buttons = document.querySelectorAll("button"); //select all the buttons from the api
    buttons.forEach((btn, index) => {
      //btn-classname index-userdefined name
      btn.addEventListener("click", () => {
        //latlng splitting for weather api

        let latlng = ele[index].latlng; //ele[index]=ele is a array name and index is a index value
        let lat = latlng[0];
        let lon = latlng[1]; // in this way we split the lat and lng

        //Weather api getting and updating the lat , lon , api key to the api and append

        let weatherApi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metrics&appid=5c0172544e3c22ffd6a7928d766ad4fd`
        )
          .then((data1) => data1.json())
          .then((ele1) => {
            alert(
              `  Weather of ${ele[index].name.common} is ${Math.floor(
                ele1.main.temp
              )}°F`
            );
          });
      });
    });
  })
  .catch((error) => console.log(error));

// appending part
container.append(row);
document.body.append(h1, container);
