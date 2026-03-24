
async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    const data = await response.json();

    const cityName = document.querySelector('.city-name');
    const weatherTemp = document.querySelector('.weather-temp');
    const realfeelval = document.getElementById('RealFeel-value');
    const windval = document.getElementById('Wind-value');

    cityName.textContent = data.name;
    weatherTemp.textContent = `${Math.round(data.main.temp - 273.15)}°`;
    realfeelval.textContent = `${Math.round(data.main.feels_like - 273.15)}°`;
    windval.textContent = `${data.wind.speed} km/h`;
    

}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const city = searchInput.value;
        getWeather(city);
    } else {
        return;
    }
});




