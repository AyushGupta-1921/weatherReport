let p = "https://openweathermap.org/img/wn/";
let e = "@2x.png";
let startURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let endURL = "&appid=8fdf9da40d68e700534ecbae7604637d&units=metric";
let cityName = "Mumbai";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Current Day //
function currentDay() {
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var currentDate = new Date();
  var currentDayNumber = currentDate.getDay();
  var currentDayName = daysOfWeek[currentDayNumber];
  return currentDayName;
}

// Current Time //
function currTime(tz, curr_time) {
  curr_time = curr_time + tz - 19800;
  var CT = new Date(curr_time * 1000);
  var Time = CT.toLocaleTimeString();
  Time = Time.slice(0, 4) + Time.slice(7, 11);
  return Time;
}

// Sun-Rise //
function sunRise(sunr) {
  var SUNR = new Date(sunr * 1000);
  var timestrrise = SUNR.toLocaleTimeString();
  return timestrrise.slice(0, 8);
}

// Sun-Set //
function sunSet(suns) {
  var SUNS = new Date(suns * 1000);
  var timestrset = SUNS.toLocaleTimeString();
  return timestrset.slice(0, 8);
}

let temp = document.getElementById("temp");
let city = document.getElementById("city");
let type = document.getElementById("type");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let visible = document.getElementById("visible");
let windSpeed = document.getElementById("windSpeed");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let curDay = document.getElementById("curDay");
let time = document.getElementById("time");
let sunR = document.getElementById("sunR");
let sunS = document.getElementById("sunS");

const getData = async (cityName) => {
  let response = await fetch(startURL + cityName + endURL);
  if (!response.ok) {
    console.log("Error");
    // showErrorBox();
    alert("Show error");
  } else {
    let data = await response.json();
    console.log(data);

    temp.innerHTML = Math.round(data.main.temp);
    city.innerHTML = data.name;
    type.innerHTML = data.weather[0].main;
    icon.src = p + data.weather[0].icon + e;
    pressure.innerHTML = data.main.pressure;
    humidity.innerHTML = data.main.humidity;
    visible.innerHTML = data.visibility / 1000;
    windSpeed.innerHTML = data.wind.speed;
    minTemp.innerHTML = Math.round(data.main.temp_min) + "°";
    maxTemp.innerHTML = Math.round(data.main.temp_min) + "°";
    curDay.innerHTML = currentDay();

    let tz = data.timezone;
    let curr_time = data.dt;
    time.innerHTML = currTime(tz, curr_time);

    var sunr = data.sys.sunrise + tz - 19800;
    var suns = data.sys.sunset + tz - 19800;
    sunR.innerHTML = sunRise(sunr);
    sunS.innerHTML = sunSet(suns);
  }
};

getData(cityName);

document.getElementById("btn").addEventListener("click", () => {
  let value = document.getElementById("searchVal").value;
  getData(value);
});

let searchVal = document.getElementById("searchVal");
searchVal.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let value = document.getElementById("searchVal").value;
    getData(value);
  }
});
