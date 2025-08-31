// elemen DOM
const inputLoc = document.getElementById('location');
const btnGet = document.getElementById('get-weather');
const weatherResult = document.getElementById('weather-result');
const form = document.getElementById('weather-form');

// tunggu form disubmit, cegah reload
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = inputLoc.value.trim();
    getWeather(location);
})

//Simulasikan data cuaca:
function getWeather(location) {
    //Ambil teks dari input:
    if(location === '') {
        alert('Please enter a location');
        return;
    }
    weatherResult.classList.add('show');
    
    switch(location.toLowerCase()) {
        case 'jakarta':
            weatherResult.innerHTML = 'Cuaca di Jakarta: Cerah, 30°C';
            break;
        case 'tokyo':
            weatherResult.innerHTML = 'Cuaca di Tokyo: Hujan, 19°C';
            break;
        case 'london':
            weatherResult.innerHTML = 'Cuaca di London: Berawan, 22°C';
            break;
        default:
            weatherResult.innerHTML = 'Lokasi tidak ditemukan';
    }
}
