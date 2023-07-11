
function getWeather(city) {
    const apiKey = '94ab95aabbbaf5870bd9cc06799eb26';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${94ab95aabbbaf5870bd9cc06799eb26}`;
  

    const storedWeather = localStorage.getItem(city);
    if (storedWeather) {

      processWeatherData(JSON.parse(storedWeather));
    } else {

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
      
          localStorage.setItem(city, JSON.stringify(data));
          processWeatherData(data);
        })
        .catch(error => {
          console.error('Error fetching weather forecast:', error);
        });
    }
  }
  

  function processWeatherData(data) {
    const forecastArea = document.getElementById('forecast-area');
    forecastArea.innerHTML = '';
  
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
  
      const date = new Date(forecast.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temperature = Math.round(forecast.main.temp - 273.15);
      const description = forecast.weather[0].description;
  
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
      forecastItem.innerHTML = `
        <p class="day">${day}</p>
        <p class="temperature">${temperature}°C</p>
        <p class="description">${description}</p>
      `;
  
      forecastArea.appendChild(forecastItem);
    }
  }
  