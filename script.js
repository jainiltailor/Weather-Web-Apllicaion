// script.js

const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your API key from OpenWeatherMap
const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherConditionElement = document.getElementById('weatherCondition');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location.trim() === '') {
        alert('Please enter a location');
        return;
    }

    fetchWeather(location);
});

async function fetchWeather(location) {
    const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const weatherData = await response.json();
        console.log(weatherData);

        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

function displayWeather(data) {
    locationElement.textContent = data.name + ', ' + data.sys.country;
    temperatureElement.textContent = 'Temperature: ' + data.main.temp + '°C';
    weatherConditionElement.textContent = 'Weather: ' + data.weather[0].main;
    humidityElement.textContent = 'Humidity: ' + data.main.humidity + '%';
    windSpeedElement.textContent = 'Wind Speed: ' + data.wind.speed + ' m/s';
}
