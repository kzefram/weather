const wrapper = document.querySelector(".wrapper")
inputPart = document.querySelector(".input-part")
infoText = document.querySelector(".info-text")
inputField = document.querySelector("input")
getLocationBtn = document.querySelector("button")
arrowBack = wrapper.querySelector("header i")
weatherIcon = document.querySelector("weather-part img")



let api
var apiKey = "a49f6674d7c42aca933797552831da83"

function requestApi(city){
    
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fectchWeatherData()
}

function fectchWeatherData(){
    infoText.innerText="Getting weather info..."
    infoText.classList.add("pending")
    
    fetch(api).then(response => response.json()).
    then(result => weatherDetails(result)) 
}

function weatherDetails(info){
    infoText.classList.replace("pending", "error") 
    if(info.cod == "404"){ 
        infoText.innerText = `You entered ${inputField.value} which isn't a valid city` 
    } else{
            
        const city = info.name
        const country = info.sys.country
        const {description, id} = info.weather[0]
        const{feels_like,humidity, temp} = info.main

        
        wrapper.querySelector(".temp, .numb").innerText = Math.floor(temp) 
        wrapper.querySelector(".weather").innerHTML = description
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`

        infoText.classList.remove("pending", "error") 
        wrapper.classList.add("active")
    }
}

getLocationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert("Browser doesn't support geolocation api")
    }
})

function onSuccess(position){
    const {latitude, longitude} = position.coords 
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fectchWeatherData()
}

function onError(error){
  infoText.innerText = error.message 
  infoText.classList.add("error")
}

inputField.addEventListener("keyup", e=>{
     
    if(e.key == "Enter" && inputField.value !=""){
        requestApi(inputField.value)
    }
})

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active")
})

day1 = document.getElementById("#day-1");
day2 = document.getElementById("#day-2");
day3 = document.getElementById("#day-3");
day4 = document.getElementById("#day-4");
day5 = document.getElementById("#day-5");

function requestApi2(city){
    
    api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    fectchWeatherData2()
}

function fectchWeatherData2(){
    infoText.innerText="Getting weather info..."
    infoText.classList.add("pending")
    fetch(api).then(response => response.json()).
    then(result => weatherDetails(result)) 
}

function onSuccess2(position){
    const {latitude, longitude} = position.coords 
    api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`
    
    fectchWeatherData2()
}

let parseWeather = function(weatherText) {
    let weatherJSON = JSON.parse(weatherText);
    console.log(weatherJSON);
    let dailyForecast = weatherJSON.daily;
    console.log(dailyForecast);
    for (x = 0; x < dailyForecast.length; x++) {
        let day = dailyForecast[x];
        let today = new Date().getDay() + x;
        if (today > 6) {
            today = today - 7;
        }
        let dayOfWeek = getDayOfWeek(today);
        let description = day.weather[0].description;
        let icon = day.weather[0].icon;
        let sunrise = timestampToTime(day.sunrise);
        let sunset = timestampToTime(day.sunset);
        let highTemp = kToF(day.temp.max);
        let lowTemp = kToF(day.temp.min);
        let humidity = day.humidity;
        let windSpeed = day.wind_speed;
        let windGust = day.wind_gust;
        displayWeatherDay(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, humidity, windSpeed, windGust);
    }
}

let displayWeatherDay = function(dayOfWeek, description, icon, sunrise, sunset, highTemp, lowTemp, humidity, windSpeed, windGust) {
    let out = "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + ".png'/>";
    out += "<h2>" + dayOfWeek + "</h2>";
    out += "<h3>" + description + "</h3>";
    out += "<p>Sunrise: " + sunrise + "</p>";
    out += "<p>Sunset: " + sunset + "</p>";
    out += "<p>High Temperature: " + highTemp + "C</p>";
    out += "<p>Low Temperature: " + lowTemp + "C</p>";
    out += "<p>Humidity: " + humidity + "%</p>";
    out += "<p>Wind Speed: " + Math.round(windSpeed) + " with gusts up to " + Math.round(windGust) + "</p></div>";
    document.getElementById("forecast").innerHTML += out;
}

let getDayOfWeek = function(dayNum) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return (weekday[dayNum]);
}


let kToF = function(kelvinTemp) {
    const celsius = kelvinTemp - 273;
    return celsius
}

let timestampToTime = function(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = "";
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }
    return hours + ":" + minutes;
}

navigator.geolocation.getCurrentPosition(gotPosition);