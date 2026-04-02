const weatherIcon = {
        'clear': 'https://openweathermap.org/img/wn/01d.png',
        'clouds': 'https://openweathermap.org/img/wn/02d.png',
        'rain': 'https://openweathermap.org/img/wn/10d.png',
        'thunderstorm': 'https://openweathermap.org/img/wn/11d.png',
        'snow': 'https://openweathermap.org/img/wn/13d.png',
        'mist': 'https://openweathermap.org/img/wn/50d.png',
        'fog':  'https://openweathermap.org/img/wn/50d.png',
        'drizzle': 'https://openweathermap.org/img/wn/09d.png',
        'haze': 'https://openweathermap.org/img/wn/50d.png',
    }

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    const data = await response.json();
    console.log(data);

    const cityName = document.querySelector('.city-name');
    const weatherTemp = document.getElementById('weatherTemp');
    const realfeelval = document.getElementById('RealFeel-value');
    const windval = document.getElementById('Wind-value');
    const rainchance = document.getElementById('rainchanceval');

    const weatherMain = data.weather[0].main.toLowerCase();
    const iconUrl = weatherIcon[weatherMain] || 'https://openweathermap.org/img/wn/01d.png';

    const currentWeatherIcon = document.getElementById('weather-icon');
    const onlycurrentWeatherIcon = iconUrl.replace('.png', '@2x.png');
    currentWeatherIcon.innerHTML = `<img src="${onlycurrentWeatherIcon}" alt="${weatherMain}">`;

    cityName.textContent = data.name;
    weatherTemp.textContent = `${Math.round(data.main.temp - 273.15)}°`;
    realfeelval.textContent = `${Math.round(data.main.feels_like - 273.15)}°`;
    windval.textContent = `${data.wind.speed} km/h`;
    rainchance.textContent = `${data.weather[0].description}`;

}

async function getForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
    const data = await response.json();

    // 3-hour forecast
    const forecastItem = document.querySelectorAll('.forecast-item .temp');
    const time = document.querySelectorAll('.forecast-item .time');
    const forecastIcon = document.querySelectorAll('.forecast-icon');

    for (let i = 0; i < forecastItem.length; i++) {
        time[i].textContent = `${data.list[i].dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')}`
        forecastItem[i].textContent = `${Math.round(data.list[i].main.temp - 273.15)}°`;
        forecastIcon[i].outerHTML = `<img src="${weatherIcon[data.list[i].weather[0].main.toLowerCase()] || 'https://openweathermap.org/img/wn/01d.png'}" alt="${data.list[i].weather[0].main}">`;
    }

    // 5-day forecast
    const frcDay = document.querySelectorAll('.frc-day');
    const frcDesc = document.querySelectorAll('.frc-desc');
    const frclist = document.querySelectorAll('.svn-day-content .svn-day-item');
    const frcTemp = document.querySelectorAll('.frc-temp');
    const frcIcon = document.querySelectorAll('.frc-icon');
    
    for (let i = 0; i < frclist.length; i++) {
        frcDay[i].textContent = new Date(data.list[i * 8].dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        frcDesc[i].textContent = data.list[i * 8].weather[0].description;
        frcTemp[i].innerHTML = `${Math.round(data.list[i * 8].main.temp - 273.15)}° <p class="frc-range">/ ${Math.round(data.list[i * 8].main.temp_max - 273.15)}°</p>`;
        frcIcon[i].src = weatherIcon[data.list[i * 8].weather[0].main.toLowerCase()] || 'https://openweathermap.org/img/wn/01d.png';
    }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const city = searchInput.value;
        getWeather(city);
        getForecast(city);
    } else {
        return;
    }
});

getForecast('New York');
getWeather('New York');



