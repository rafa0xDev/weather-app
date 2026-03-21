async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=033861db95f20ae7e1c74cfacbbc6b6c`)
    console.log(response)
    console.log("------------------------------")
    const data = await response.json()
    console.log(data)
    console.log(data.name)
    const temp = data.main.temp//300.92
    const celcius = temp - 273.15
    console.log(celcius)//27.77
    console.log(data.weather[0].main)//rain
}

getWeather('Kudus') //300.92