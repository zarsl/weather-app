function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "4fb8f394cc5f2d439df6249cf258d6a4";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiRoot}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showResponse);
}

function handleCurrentLocationSearch() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function showResponse(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  let humidityProjection = `Humidity: ${response.data.main.humidity}%`;
  humidityElement.innerHTML = humidityProjection;

  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeedProjection = `Wind: ${response.data.wind.speed} km/h`;
  windSpeedElement.innerHTML = windSpeedProjection;
}

function handleSearch() {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  let apiKey = "4fb8f394cc5f2d439df6249cf258d6a4";
  let apiRoot = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiRoot}q=${cityInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showResponse);

  let cityHeader = document.querySelector("#city-header");
  cityHeader.innerHTML = cityInput.value;
}

function convertToCelsius() {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `17`;
}

function convertToFahrenheit() {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `66`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMins = date.getMinutes();
  if (currentMins < 10) {
    currentMins = `0${currentMins}`;
  }

  let currentTime = `${currentDay} ${currentHour}:${currentMins}`;

  return currentTime;
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = formatDate(now);

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("click", handleSearch);

let currentLocation = document.querySelector("#current-search");
currentLocation.addEventListener("click", handleCurrentLocationSearch);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
