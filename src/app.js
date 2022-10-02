let apiKey = "5863935ee9cca4c02ed68203f807c65b";
let tempSpan = "https://api.openweathermap.org/data/2.5/weather";
let tempWeek ="https://api.openweathermap.org/data/2.5/onecall?";

let searchInput = document.querySelector("#cityName");

let temperatureSearch = document.querySelector("#temperatureSearch");
let iconElement = document.querySelector("#icon");
const weatherForecastEl = document.getElementById('weather-forecast');
const wind = document.getElementById('wind');


function searchCity(event) {
    event.preventDefault();
    if (searchInput.value) {
        temperatureSearch.innerHTML = `${searchInput.value}`;
        axios.get(`${tempSpan}?q=${searchInput.value}&appid=${apiKey}&units=metric`).then(showTemperature);


    } else {
        temperatureSearch.innerHTML = null;
        alert("Please type a city");
    }
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchCity);

function searchWeek(response){
    response.data.daily.forEach((day, idx) => {
        console.log(new Date(day.dt*1000))

        weatherForecastEl.innerHTML += `
            <div class="weather-forecast-item">
                <div>
                    <div class="day">${days[new Date(day.dt*1000).getDay()]}</div>
                    <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                </div>
                <div class="other">
                    <div class="temp">Night - ${ Math.round(day.temp.night)}&#176;C</div>
                    <div class="temp">Day - ${ Math.round(day.temp.morn)}&#176;C</div>
                    <div class="temp">Wind - ${ Math.round(day.wind_speed)}m/c</div>
                </div>
            </div>
            <hr>
            `
    })
}

let now = new Date();
let temperatureDay = document.querySelector("#temperatureDay");
let data = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let month = months[now.getMonth()]
temperatureDay.innerHTML = `${day} ${data} ${month}`;

let tempFahrenheit = document.querySelector("#tempfahrenheit");
let tempCelsius = document.querySelector("#tempcelsius");

function convertToF(celsius) {
    return Math.round( (celsius * 9) / 5 + 32);
}
tempFahrenheit.addEventListener("click", function () {
    let celsius = tempCelsius.querySelector("span");
    tempFahrenheit.querySelector("span").textContent = convertToF(
        celsius.textContent
    );
});
convertToF(30);

function showCurrentTime(){
    var currDate = new Date();
    var hours = currDate.getHours();
    var minutes = currDate.getMinutes();
    var seconds = currDate.getSeconds();
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }
    document.Clock.timer.value = hours + ":" + minutes + ":" + seconds;
    setTimeout("showCurrentTime()", 2000);
}
showCurrentTime();


function showTemperature(response) {
    tempCelsius.querySelector("span").innerHTML = `${Math.round(response.data.wind.speed)}`
    wind.querySelector("span").innerHTML = `${Math.round(response.data.main.temp)}`
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    if(response.data.weather[0].main =="Clouds"){
        document.querySelector('.weather').style.backgroundImage="url(src/img/cloudy.jpg)";
    }
    if(response.data.weather[0].main =="Rain"){
        document.querySelector('.weather').style.backgroundImage="url(src/img/rain.jpg)";
    }
    if(response.data.weather[0].main =="Clear"){
        document.querySelector('.weather').style.backgroundImage="url(src/img/sun.jpg)";
    }
    let lat = response.data.coord.lat
    let lon = response.data.coord.lon
    tempCelsius.querySelector("span").innerHTML = `${Math.round(response.data.main.temp)}`


    axios.get(`${tempWeek}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(searchWeek);

}


