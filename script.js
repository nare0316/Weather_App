

const apiKey = '1059b74042e92132c9be94d6080172d3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElemet = document.getElementById('humidity');
const iconElement = document.getElementById('icon');


function handleSearch() {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
}

searchButton.addEventListener('click', () => {
    getElementById()
    handleSearch();
});

locationInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

let temperature;
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`location not found! Or invalid API Key!: ${response.status}`)
            } 
            return response.json();
        })
        .then(data => {
            if (data.cod ===404) {
                throw new Error("Location not found");
            } else if(data.cod === 401) {
                throw new Error("Invalid API key");
            }
            locationElement.textContent = data.name;
            temperature  = Math.round(data.main.temp);
            temperatureElement.textContent = `${temperature}°C`;
            description = data.weather[0].description;
            descriptionElement.textContent = description;
            humidityElemet.textContent = `${data.main.humidity}% humidity`;
            iconElement.textContent = getIcon(description);
            console.log(getIcon(description));
            changeImage(temperature);
            const container = document.querySelector('.container');
            container.style.height = "600px";

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            if (error.message.includes('404')) {
                alert('Error: City not found. Please try again!');
            } else if (error.message.includes('401')) {
                alert('Error: Invalid API key. Please check your API key.');
            } else if (error.message === 'Failed to fetch') {
                alert('Error: Unable to fetch weather data. Please try again later!');
            } else {
                alert(`Error: ${error.message}`);
            }
        });

}

function changeImage(temperature) {
    let ImageUrl;
    const date = new Date();
    const currentMonth = date.getMonth();
    if (temperature <= 0) {
        document.body.style.backgroundImage = "url('https://image.pbs.org/bento3-prod/pbsnc-redesign-phase-1/blogs/science/b07872c74e_sci-nc-the-science-of-staying-warm-2107-1440-560.jpg')";
    } else if (temperature > 0 && temperature <= 10) {
        ImageUrl = "url('https://www.hopenergy.com/wp-content/uploads/Top-5-Tips-to-Stay-Warm-Inside-and-Protect-Your-Home.webp')";
    } else if (temperature > 10 && temperature <= 20 && (currentMonth >= 8 && currentMonth <= 10)) {
        ImageUrl = "url('https://c02.purpledshub.com/uploads/sites/47/2023/07/Autumn.jpg')";
    } else if (temperature > 10 && temperature <= 20 && (currentMonth >= 3 && currentMonth <= 5)) {
        ImageUrl = "url('https://t3.ftcdn.net/jpg/05/83/14/98/360_F_583149825_4hNnw3ISIUTd0NOYVrVEjKaD35ZWvNis.jpg')";
    } else if (temperature > 10 && temperature <= 20) {
        ImageUrl = "url('https://www.guardianstorage.com/wp-content/uploads/2023/02/GS-Blog-8-Cities-with-the-Best-Weather-in-the-US-1-scaled.jpg')";
    }else if (temperature > 20 && temperature <= 35) {
        ImageUrl = "url('https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.pennlive.com/home/penn-media/width2048/img/wildaboutpa/photo/summer-sunrisejpg-8a3de64ee9c00a6e.jpg')";
    } else {
        ImageUrl = "url('https://community.thriveglobal.com/wp-content/uploads/2020/06/summer.jpg')";
    } 
    document.body.style.backgroundImage = ImageUrl;

}

function getIcon(description) {
    let weatherIcon = "";
    switch (description) {
        case "clear sky":
            weatherIcon = "🌞"; 
        case "cloudy":
            weatherIcon = "☁️"; 
            break;
        case "light rain":
            weatherIcon = "🌧️"; 
            break;
        case "heavy snow":
            weatherIcon = "🌨️"; 
            break;
        case "thunderstorm":
            weatherIcon = "⚡️"; 
            break;
        case "fog":
            weatherIcon = "🌫️";
        default:
            weatherIcon = "🌥️"; 
            break;
    }
    return weatherIcon;
}