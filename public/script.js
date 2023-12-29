  function changeCity() {
    const cityInput = document.getElementById('cityInput').value;
    window.history.pushState({}, document.title, `?city=${encodeURIComponent(cityInput)}`);
    getWeather();
  }

  document.addEventListener('DOMContentLoaded', function () {
    getWeather();
  });

  async function getWeather() {
    try {

        const urlParams = new URLSearchParams(window.location.search);
        const city = urlParams.get('city') || 'Kavali';

        const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        document.getElementById('city-name').innerText = data.name;

        // Display the weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        document.getElementById('weatherIcon').src = iconUrl;

        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('temperature').innerText = `${(data.main.temp -273.15).toFixed(2)} \u{00B0}C`;
        document.getElementById('feels-like').innerText = `${(data.main.feels_like -273.15).toFixed(2)} \u{00B0}C`;
        document.getElementById('temp-min').innerText = `${(data.main.temp_min -273.15).toFixed(2)} \u{00B0}C`;
        document.getElementById('temp-max').innerText = `${(data.main.temp_max -273.15).toFixed(2)} \u{00B0}C`;
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('windSpeed').innerText = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
        document.getElementById('cloudiness').innerText = `${data.clouds.all}%`;
        if(isNaN(data.main.sea_level)){
          document.getElementById('sea-level').innerText = `- -`;  
        }else{
          document.getElementById('sea-level').innerText = `${data.main.sea_level} hPa`;
        }
        document.getElementById('visibility').innerText = `${data.visibility / 1000} km`;

    } catch (error) {
      console.error('Error:', error);
      document.getElementById('weatherData').innerText = 'Error fetching weather data.';
    }
  }