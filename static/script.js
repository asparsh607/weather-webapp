function getIntFromHour(){
    currentTime = new Date()
    currentHour = currentTime.getHours()
    return currentHour
}

function addZero(num) {
    return num < 10 ? "0" + num : num;
}

function getWeatherColorAndUpdateBackground(weatherData) {
    const temperature = weatherData.temperature;
    const precipitationProbability = weatherData.precipitationProbability;
    const cloudCover = weatherData.cloudCover;

    if (temperature >= 50) {
        color = '#ff7f50'; // Reddish orange for extremely hot
    } else if (temperature >= 40 && temperature < 50) {
        color = '#ff6347'; // Reddish orange for hot
    } else if (temperature >= 30 && temperature < 40) {
        color = '#f6f41e'; // Light yellow for warm
    } else if (temperature >= 20 && temperature < 30) {
        color = '#4682b4'; // Bluish grey for mild
    } else if (temperature >= 10 && temperature < 20) {
        color = '#708090'; // Bluish grey for cool
    } else if (temperature < 10) {
        color = '#2f4f4f'; // Dark bluish grey for cold
    } else {
        color = '#68d1ff'; // Default color for other conditions
    }    
        
    var body = document.querySelector("body");
    body.style.backgroundColor = color
}

function getCurrentTime() {
    const d = new Date();
    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    const s = addZero(d.getSeconds());
    return `${h} hr: ${m}min: ${s}sec`;
}

function getWeather() {
    // Get the element by ID
    var longit = document.getElementById('lon');
    var latit = document.getElementById('lat');

    // Get the text content inside the div
    var valueInsideLongit = longit.textContent;
    var valueInsideLatit = latit.textContent;

    // Send the input to the server using an AJAX request
    fetch('/get_weather_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longitude_value: valueInsideLongit, latitude_value: valueInsideLatit }),
    })
    .then(response => response.json())
    .then(data => {
        var time = document.getElementById('time');
        var temprature = document.getElementById('temp');
        var app_temp = document.getElementById('app_temp');
        var humidity = document.getElementById('humidity');
        var prec_prob = document.getElementById('precipitation_prob');
        var prec = document.getElementById('precipitation');
        var pressure = document.getElementById('pressure');
        var cloud_cover = document.getElementById('cloud_cover');
        var visibility = document.getElementById('visibility');
        var wind_speed = document.getElementById('wind_speed');
        var wind_direction = document.getElementById('wind_direction');
        
        currentHour = getIntFromHour()
        const weatherData = {
            temperature: data.hourly.apparent_temperature[currentHour],
            precipitationProbability: data.hourly.precipitation_probability[currentHour],
            cloudCover: data.hourly.cloudcover[currentHour],
        };

        time.textContent = `Time ${getCurrentTime()}`;
        temprature.textContent = `Temperature ${data.hourly.temperature_2m[currentHour]} °C`;
        humidity.textContent = `Humidity ${data.hourly.relative_humidity_2m[currentHour]} %`;
        app_temp.textContent = `Feels like ${data.hourly.apparent_temperature[currentHour]} °C`;
        prec_prob.textContent = `Chance of rain ${data.hourly.precipitation_probability[currentHour]} %`;
        prec.textContent = `Precipitation ${data.hourly.precipitation[currentHour]} mm`;
        pressure.textContent = `Atmospheric pressure ${data.hourly.pressure_msl[currentHour]} hPa`;
        cloud_cover.textContent = `Cloud Cover ${data.hourly.cloudcover[currentHour]} %`;
        visibility.textContent = `Visibility ${data.hourly.visibility[currentHour]} m`;
        wind_speed.textContent = `Windspeed ${data.hourly.windspeed_10m[currentHour]} km/h`;
        wind_direction.textContent = `Wind direction ${data.hourly.winddirection_10m[currentHour]} °`;
        

        getWeatherColorAndUpdateBackground(weatherData)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getLocation() {
    var addressInput = document.getElementById('address-input').value;

    // Send the input to the server using an AJAX request
    fetch('/get_location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address_input: addressInput }),
    })
    .then(response => response.json())
    .then(data => {
        var location = document.getElementById('loc');
        var latitude = document.getElementById('lat');
        var longitude = document.getElementById('lon');

        // Insert text into the element
        location.textContent = data[0]['display_name'];
        longitude.textContent = data[0]['lon'];
        latitude.textContent = data[0]['lat'];
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




