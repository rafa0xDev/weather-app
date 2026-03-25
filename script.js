async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    const data = await response.json();

    const cityName = document.querySelector('.city-name');
    const weatherTemp = document.querySelector('.weather-temp');
    const realfeelval = document.getElementById('RealFeel-value');
    const windval = document.getElementById('Wind-value');
    const rainchance = document.getElementById('rainchanceval');

    cityName.textContent = data.name;
    weatherTemp.textContent = `${Math.round(data.main.temp - 273.15)}°`;
    realfeelval.textContent = `${Math.round(data.main.feels_like - 273.15)}°`;
    windval.textContent = `${data.wind.speed} km/h`;
    rainchance.textContent = `${data.weather[0].description}`;

}

async function getForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
    const data = await response.json();
    console.log(data);

    const forecastItem = document.querySelectorAll('.forecast-item .temp');
    const time = document.querySelectorAll('.forecast-item .time');
    for (let i = 0; i < forecastItem.length; i++) {
        time[i].textContent = `${data.list[i].dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')}`
        forecastItem[i].textContent = `${Math.round(data.list[i].main.temp - 273.15)}°`;
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




