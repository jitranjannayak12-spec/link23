async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const state = document.getElementById("stateInput").value.trim();
    const country = document.getElementById("countryInput").value.trim();
    const result = document.getElementById("weatherResult");

    // Check empty inputs
    if (!city || !state || !country) {
        result.innerHTML = "<h3>Please enter city, state and country.</h3>";
        return;
    }

    // Add your OpenWeatherMap API key here
    const apiKey = "8e10973be9ad609a9e80edd0961ec8ad";

    // Create location query
    const location = `${city},${state},${country}`;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    result.innerHTML = "<h3>Loading weather details...</h3>";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            result.innerHTML = `
                <h3>Weather not found</h3>
                <p>${data.message || "Please check your location and API key."}</p>
            `;
            return;
        }

        // Weather details
        result.innerHTML = `
            <h2>📍 ${data.name}, ${data.sys.country}</h2>

            <h1>${Math.round(data.main.temp)}°C</h1>

            <p>🌤️ Condition: ${data.weather[0].description}</p>

            <p>🌡️ Feels Like: ${Math.round(data.main.feels_like)}°C</p>

            <p>⬆️ Maximum Temperature: ${Math.round(data.main.temp_max)}°C</p>

            <p>⬇️ Minimum Temperature: ${Math.round(data.main.temp_min)}°C</p>

            <p>💧 Humidity: ${data.main.humidity}%</p>

            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>

            <p>🔵 Pressure: ${data.main.pressure} hPa</p>

            <p>👁️ Visibility: ${(data.visibility / 1000).toFixed(1)} km</p>
        `;

    } catch (error) {
        console.error("Weather error:", error);

        result.innerHTML = `
            <h3>Connection Error</h3>
            <p>Please check your internet connection and try again.</p>
        `;
    }
}