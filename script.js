document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById("btn");
    const cityInput = document.getElementById("input");
    const weatherContainer = document.getElementById("sec2");
    const weatherForm = document.getElementById("weather-form");

    // Check for city parameter in URL (from welcome page)
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    
    if (cityParam) {
        cityInput.value = cityParam;
        getWeather(cityParam);
    }

    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        showLoading();
        
        try {
            // First get coordinates for the city
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},ZA&limit=1&appid=35a77c57fbff46d6e88b80e751f22dda`;
            const geoResponse = await fetch(geoUrl);
            
            if (!geoResponse.ok) {
                throw new Error(`Geocoding API error: ${geoResponse.status}`);
            }
            
            const geoJson = await geoResponse.json();
            
            // Check if city was found
            if (!geoJson || geoJson.length === 0) {
                throw new Error("City not found. Please try another location.");
            }
            
            const lat = geoJson[0].lat;
            const lon = geoJson[0].lon;
            const cityName = geoJson[0].name;

            // Then get weather data
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=35a77c57fbff46d6e88b80e751f22dda&units=metric`;
            const weatherResponse = await fetch(weatherUrl);
            
            if (!weatherResponse.ok) {
                throw new Error(`Weather API error: ${weatherResponse.status}`);
            }

            const weatherJson = await weatherResponse.json();
            displayWeather(cityName, weatherJson);
            
        } catch(error) {
            showError(error.message);
            console.error("Weather fetch error:", error);
        }
    }

    function displayWeather(city, data) {
        const date = new Date();
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        weatherContainer.innerHTML = `
            <div class="weather-card">
                <div class="weather-header">
                    <h2>${city}</h2>
                    <p>${date.toLocaleDateString()}</p>
                </div>
                
                <div class="weather-main">
                    <div class="weather-icon">
                        <img src="${iconUrl}" alt="${data.weather[0].description}">
                        <p>${data.weather[0].description}</p>
                    </div>
                    
                    <div class="weather-temp">
                        <h3>${Math.round(data.main.temp)}°C</h3>
                        <p>Feels like ${Math.round(data.main.feels_like)}°C</p>
                    </div>
                </div>
                
                <div class="weather-details">
                    <div class="detail">
                        <i class="fas fa-temperature-low"></i>
                        <div>
                            <p>Min</p>
                            <h4>${Math.round(data.main.temp_min)}°C</h4>
                        </div>
                    </div>
                    
                    <div class="detail">
                        <i class="fas fa-temperature-high"></i>
                        <div>
                            <p>Max</p>
                            <h4>${Math.round(data.main.temp_max)}°C</h4>
                        </div>
                    </div>
                    
                    <div class="detail">
                        <i class="fas fa-tint"></i>
                        <div>
                            <p>Humidity</p>
                            <h4>${data.main.humidity}%</h4>
                        </div>
                    </div>
                    
                    <div class="detail">
                        <i class="fas fa-wind"></i>
                        <div>
                            <p>Wind</p>
                            <h4>${data.wind.speed} m/s</h4>
                        </div>
                    </div>
                    
                    <div class="detail">
                        <i class="fas fa-compress-alt"></i>
                        <div>
                            <p>Pressure</p>
                            <h4>${data.main.pressure} hPa</h4>
                        </div>
                    </div>
                    
                    <div class="detail">
                        <i class="fas fa-eye"></i>
                        <div>
                            <p>Visibility</p>
                            <h4>${data.visibility/1000} km</h4>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function showLoading() {
        weatherContainer.innerHTML = `
            <div class="weather-loading">
                <div class="spinner"></div>
                <p>Fetching weather data...</p>
            </div>
        `;
    }

    function showError(message) {
        weatherContainer.innerHTML = `
            <div class="weather-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="window.location.reload()">Try Again</button>
            </div>
        `;
    }
});