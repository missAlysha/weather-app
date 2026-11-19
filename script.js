//____________with  Notes______________ 
//getting element by html doc
     let serachBar = document.getElementById("search");
     let serachBtn = document.getElementById("searchBtn");
     let temperature = document.getElementById("temperature");
     let humidity = document.getElementById("humidity");
     let cityName = document.getElementById("cityName");
     let windSpeed = document.getElementById("windSpeed");
//i-add functionality on btn:____ if we didnt enter any name then show alert(popUp)
//ii-otherwise the entering text is equal to the inner text of html ......
//iii-one more thing i learn't is that (if user click on button after getting inner text then blank the search bar) 
     let print = ()=>{
if(serachBar.value == ""){
     alert("please enter a city name")
}else{
     cityName.innerText = serachBar.value
      data();
     serachBar.value = "";
     }
}
//inbuilt function (it listen funtion and act / do work according to it) 
 serachBtn.addEventListener("click", print); 

//_____________________________06 methods are using here 
//i-  ASYNC,AWAIT : wait for api response until or unless the promise will fullfilled
//ii- .json : convert apis data (array form) in to readable format

const data = async()=>{
//iii-TRY and CATCH method : if in some case the api isnt be work the catch block code will bw run
    
     try{ let lat2 = await cityCordinates();
//iv-use FETCH method for using api or getting data

     let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat2[0]}&longitude=${lat2[1]}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
     let myData = await response.json();
//v-getting html's text and assigned with json's data
//vi- i also used CONCATINATION
         temperature.innerText = myData.current.temperature_2m + "°C"
         windSpeed.innerText = myData.current.wind_speed_10m + "km/h"
         humidity.innerText = myData.hourly.relative_humidity_2m[0] + "%"
    } catch (error) {
         "Something went wrong ,please try again"
    }
}
const cityCordinates = async ()=>{
     let city = serachBar.value;
    console.log(city)
     let response2 = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
     let myData2 = await response2.json();
     console.log(myData2);
if(myData2.results.length === 0){
         alert("City not found")
         return;
    }
//copied from ai to fix error without understanding............
     if (myData2.results[0].name.toLowerCase() !== city.toLowerCase()) {
         alert("Please enter a correct city");
         return;
}
     let lat = myData2.results[0].latitude
     let long = myData2.results[0].longitude
         return[lat , long]
}

