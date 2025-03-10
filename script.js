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
            <h2 style="color: blue;">Weather in ${city}</h2> 
            <p style="color: red;">Temperature: ${json1.main.temp}°C</p>
            <p style="color: red;">Feels Like: ${json1.main.feels_like}°C</p>
            <p style="color: red ;">Min: ${json1.main.temp_min}°C</p>
            <p style="color: red;">Max: ${json1.main.temp_max}°C</p>
            <p style="color: red;">Humidity: ${json1.main.humidity}%</p>
            <p style="color: red;">Wind speed: ${json1.wind.speed}%</p>
            <p style="color: red;">Description: ${json1.weather[0].description}</p>
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






