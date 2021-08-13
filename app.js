const button = document.querySelector('.btn');
const inputt = document.querySelector('input');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon img');

const updateCity = async (city)=>{
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets:cityDets,
        weather:weather
    };
}

const updateUI = (data)=>{
    const cityDets = data.cityDets;
    const weather = data.weather;
    
    details.innerHTML = `
        <div class="temp"><p>${weather.Temperature.Metric.Value} &deg;<span>c</span></p></div>
        <div class="desc"><p>${weather.WeatherText}</p></div>
        <div class="location"><p>${cityDets.EnglishName}</p></div>
    `;

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

    icon.setAttribute('src',`./icons/${weather.WeatherIcon}.svg`);
}


button.addEventListener('click', (e)=>{
    e.preventDefault();
    const city = inputt.value.trim();
    inputt.value = '';
    updateCity(city).then(data => {
        updateUI(data);
    }).catch(err => console.log(err));
});