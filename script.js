
const cityInput = document.getElementById("cityInput");

async function getWeather() {

    const cityName = cityInput.value.trim() || "Kochi";

    const message = document.getElementById("message");

    message.textContent = "Loading...";

    try {

        

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found!");
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
        );

        const data = await weatherResponse.json();

        const current = data.current;

        

        document.getElementById("city").textContent =
            location.name;

        

        document.getElementById("temperature").textContent =
            Math.round(current.temperature_2m) + "°C";

        

        document.getElementById("humidity").textContent =
            current.relative_humidity_2m + "%";

        

        document.getElementById("wind").textContent =
            current.wind_speed_10m + " km/h";

        

        document.getElementById("feels").textContent =
            Math.round(current.apparent_temperature) + "°C";

        

        document.getElementById("description").textContent =
            getDescription(current.weather_code);

        

        document.getElementById("icon").textContent =
            getIcon(current.weather_code);

        message.textContent = "";

    }

    catch (error) {

        message.textContent = error.message;

    }
}




function getDescription(code) {

    if (code === 0) return "Sunny";

    if ([1, 2, 3].includes(code))
        return "Partly Cloudy";

    if ([45, 48].includes(code))
        return "Foggy";

    if ([51, 53, 55, 56, 57].includes(code))
        return "Drizzle";

    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
        return "Rainy";

    if ([71, 73, 75, 77, 85, 86].includes(code))
        return "Snowy";

    if ([95, 96, 99].includes(code))
        return "Thunderstorm";

    return "Weather Update";
}




function getIcon(code) {

    if (code === 0) return "☀️";

    if ([1, 2, 3].includes(code))
        return "🌤️";

    if ([45, 48].includes(code))
        return "🌫️";

    if ([51, 53, 55, 56, 57].includes(code))
        return "🌦️";

    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
        return "🌧️";

    if ([71, 73, 75, 77, 85, 86].includes(code))
        return "❄️";

    if ([95, 96, 99].includes(code))
        return "⛈️";

    return "🌤️";
}




getWeather();




cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});
