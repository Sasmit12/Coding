# 🌦️ Weather App

A simple, responsive Weather App that lets users check current weather conditions for any city using the [OpenWeatherMap API](https://openweathermap.org/api). Built with **HTML**, **CSS**, and **JavaScript**.

## 🚀 Features

- Real-time weather data (temperature, humidity, wind speed)
- Dynamic weather icons based on conditions (clear, clouds, rain, etc.)
- User-friendly search interface
- Error handling for invalid city names
- Stylish, responsive UI

## 📁 Project Structure

```

Day2-Weather\_App/
│
├── images/               # Weather icons
│   ├── clear.png
│   ├── clouds.png
│   ├── drizzle.png
│   ├── humidity.png
│   ├── mist.png
│   ├── rain.png
│   ├── search.png
│   ├── snow\.png
│   └── wind.png
│
├── index.html            # Main HTML file
├── script.js             # JavaScript logic (API fetch, DOM updates)
└── style.css             # Styling for layout and components

````

## 🧠 How It Works

1. User enters a city name and clicks the search button.
2. JavaScript fetches data from OpenWeatherMap API using `fetch()`.
3. The app displays temperature, city name, humidity, and wind speed.
4. Weather icon updates based on the response (`Clear`, `Clouds`, `Rain`, etc.).
5. If city not found, an error message appears.

## 🔑 API Key

The app uses an API key from OpenWeatherMap. Make sure to replace the placeholder in `script.js` with your valid API key if regenerating the project:

```javascript
const apiKey = "your_api_key_here";
````

## 🖼️ Screenshots

![Weather App Screenshot](images/clouds.png) <!-- Replace or update this with an actual UI screenshot if available -->

## 📌 To Run Locally

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Search for any city to view its current weather.

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla)
* OpenWeatherMap API

---

💡 *This was built as part of a learning exercise to explore working with APIs and building interactive frontends.*

```

Would you like me to save this as a file for you?
```
