// WEATHER APP JAVASCRIPT CODE


const API_KEY = 'ADD YOUR API'; // Get this from OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const weatherInfo = document.getElementById('weatherInfo');
const error = document.getElementById('error');


const locationEl = document.getElementById('location');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');


const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};


searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        showError('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                hideLoading();
                showError('Unable to get your location. Please try entering a city name.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        showError('Geolocation is not supported by this browser.');
    }
});


async function getWeatherByCity(city) {
    showLoading();
    try {
        
        await simulateAPICall();
        
       
        const mockData = {
            name: city,
            sys: { country: 'IN' },
            main: {
                temp: Math.floor(Math.random() * 20) + 20,
                feels_like: Math.floor(Math.random() * 20) + 22,
                humidity: Math.floor(Math.random() * 40) + 40,
                pressure: Math.floor(Math.random() * 50) + 1000
            },
            weather: [{
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
            }],
            wind: { speed: Math.floor(Math.random() * 10) + 5 }
        };
        
        displayWeatherData(mockData);
        
        
    } catch (err) {
        hideLoading();
        showError('City not found. Please check the spelling and try again.');
        console.error('API Error:', err);
    }
}

async function getWeatherByCoords(lat, lon) {
    try {
        
        await simulateAPICall();
        
        const mockData = {
            name: 'Your Location',
            sys: { country: 'IN' },
            main: {
                temp: Math.floor(Math.random() * 15) + 25,
                feels_like: Math.floor(Math.random() * 15) + 27,
                humidity: Math.floor(Math.random() * 30) + 50,
                pressure: Math.floor(Math.random() * 30) + 1010
            },
            weather: [{
                main: 'Partly Cloudy',
                description: 'partly cloudy',
                icon: '02d'
            }],
            wind: { speed: Math.floor(Math.random() * 8) + 3 }
        };
        
        displayWeatherData(mockData);
        
        
    } catch (err) {
        hideLoading();
        showError('Unable to fetch weather data for your location.');
        console.error('API Error:', err);
    }
}


function displayWeatherData(data) {
    hideLoading();
    hideError();
    
    
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    weatherIcon.textContent = weatherIcons[data.weather[0].icon] || '🌤️';
    
    
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
    
    
    weatherInfo.style.animation = 'none';
    weatherInfo.offsetHeight; 
    weatherInfo.style.animation = 'fadeIn 1s ease-out';
}

function showLoading() {
    loading.style.display = 'block';
    weatherInfo.style.display = 'none';
    hideError();
}

function hideLoading() {
    loading.style.display = 'none';
    weatherInfo.style.display = 'block';
}

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    setTimeout(() => {
        error.style.display = 'none';
    }, 5000);
}

function hideError() {
    error.style.display = 'none';
}

function simulateAPICall() {
    return new Promise(resolve => {
        setTimeout(resolve, 1500); 
    });
}


document.addEventListener('DOMContentLoaded', () => {
    
    weatherInfo.style.opacity = '1';
    
    
    console.log('Weather App initialized successfully!');
});


function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function mpsToKmh(mps) {
    return Math.round(mps * 3.6);
}

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


function updateBackgroundByWeather(weatherMain) {
    const gradients = {
        'Clear': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Clouds': 'linear-gradient(135deg, #5f72bd 0%, #9b59b6 100%)',
        'Rain': 'linear-gradient(135deg, #405572 0%, #3d5a80 100%)',
        'Snow': 'linear-gradient(135deg, #a8a8a8 0%, #e5e5e5 100%)',
        'Thunderstorm': 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        'Mist': 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)'
    };
    
    const gradient = gradients[weatherMain] || gradients['Clear'];
    document.body.style.background = gradient;
}


