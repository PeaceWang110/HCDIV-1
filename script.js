async function fetchWeather() {
    try {
        const response = await fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast');
        const data = await response.json();
        const forecasts = data.items[0].forecasts;
        const lastUpdated = new Date(data.items[0].update_timestamp).toLocaleString();
        const expiryDate = new Date(data.items[0].valid_period.end).toLocaleString();

        const tableBody = document.getElementById('weather-data');
        tableBody.innerHTML = '';
        document.getElementById('last-updated').textContent = 'Last updated: ' + lastUpdated;
        document.getElementById('expiry-date').textContent = 'Expires on: ' + expiryDate;

        forecasts.forEach(forecast => {
            const row = `<tr><td>${forecast.area}</td><td>${forecast.forecast}</td></tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
    }
}

// Search function
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#weather-data tr");

    rows.forEach(row => {
        const area = row.querySelector("td").textContent.toLowerCase();
        row.style.display = area.includes(input) ? "" : "none";
    });
}

fetchWeather();
