const output = document.getElementById("h3");
const btn = document.getElementById("btn");
const cita = document.getElementById("input");
const weatherContainer = document.getElementById("sec2");


 async function getWeather(city){
    
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},ZA&limit=1&appid=35a77c57fbff46d6e88b80e751f22dda`;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        const lat = json[0].lat;
        const lon = json[0].lon;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=35a77c57fbff46d6e88b80e751f22dda&units=metric`;

        const response1 = await fetch(weatherUrl);
        if(!response1.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const json1 = await response1.json();
        console.log(json1);
        weatherContainer.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${json1.main.temp}°C</p>
            <p>Feels Like: ${json1.main.feels_like}°C</p>
            <p>Min: ${json1.main.temp_min}°C</p>
            <p>Max: ${json1.main.temp_max}°C</p>
            <p>Humidity: ${json1.main.humidity}%</p>
            <p>Wind speed: ${json1.wind.speed}%</p>
            <p>Description: ${json1.weather[0].description}</p>
        `;

    }catch(error){
        console.error(error.message);
    }
 };

 btn.addEventListener("click",(event)=>{
    event.preventDefault();
    const city1 = cita.value;
    getWeather(city1);
 });






