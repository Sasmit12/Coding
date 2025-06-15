import api from "./api";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

export const weatherService = {
  // Get current weather by coordinates
  getCurrentWeather: async (lat, lon) => {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    );
    return response.json();
  },

  // Get weather forecast by coordinates
  getForecast: async (lat, lon) => {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
    );
    return response.json();
  },

  // Get weather alerts for a location
  getWeatherAlerts: async (lat, lon) => {
    const response = await fetch(
      `${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&exclude=current,minutely,hourly,daily`,
    );
    return response.json();
  },

  // Save farmer's location for weather updates
  saveFarmerLocation: async (location) => {
    const response = await api.post("/farmers/location", location);
    return response.data;
  },

  // Get weather data for all saved locations (admin only)
  getAllLocationsWeather: async () => {
    const response = await api.get("/weather/all-locations");
    return response.data;
  },

  // Weather service for farmer dashboard
  // Note: In a real app, you would use an actual weather API like OpenWeatherMap

  // Mock weather data for demonstration
  async getCurrentWeather(location = "default") {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data
      const mockWeather = {
        location: "Farm Location",
        temperature: 22,
        feelsLike: 24,
        humidity: 65,
        windSpeed: 12,
        windDirection: "NE",
        description: "Partly Cloudy",
        icon: "partly-cloudy-day",
        uvIndex: 5,
        visibility: 10,
        pressure: 1013,
        sunrise: "06:30",
        sunset: "18:45",
        timestamp: new Date().toISOString()
      };

      return mockWeather;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  },

  async getWeatherForecast(location = "default", days = 7) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock forecast data
      const forecast = [];
      const today = new Date();
      
      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        forecast.push({
          date: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          high: Math.floor(Math.random() * 15) + 15, // 15-30°C
          low: Math.floor(Math.random() * 10) + 5,   // 5-15°C
          description: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Clear"][Math.floor(Math.random() * 5)],
          icon: ["sun", "partly-cloudy-day", "cloud", "rain", "clear-day"][Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
          precipitation: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0 // 30% chance of rain
        });
      }

      return forecast;
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      throw error;
    }
  },

  async getWeatherAlerts(location = "default") {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock weather alerts
      const alerts = [
        {
          id: "1",
          type: "warning",
          title: "Frost Warning",
          description: "Temperatures expected to drop below freezing tonight",
          severity: "moderate",
          startTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
          endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
          recommendations: [
            "Cover sensitive crops",
            "Consider irrigation to protect from frost",
            "Monitor temperature closely"
          ]
        },
        {
          id: "2",
          type: "info",
          title: "Rain Expected",
          description: "Light rain expected in the next 24 hours",
          severity: "low",
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
          endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
          recommendations: [
            "Plan outdoor activities accordingly",
            "Ensure proper drainage in fields"
          ]
        }
      ];

      return alerts;
    } catch (error) {
      console.error("Error fetching weather alerts:", error);
      throw error;
    }
  },

  // Get farming recommendations based on weather
  getFarmingRecommendations(weather, forecast) {
    const recommendations = [];
    
    // Temperature-based recommendations
    if (weather.temperature < 5) {
      recommendations.push({
        type: "warning",
        message: "Low temperatures detected. Consider protecting sensitive crops.",
        action: "Check frost protection measures"
      });
    }
    
    if (weather.temperature > 30) {
      recommendations.push({
        type: "warning",
        message: "High temperatures detected. Ensure adequate irrigation.",
        action: "Increase watering frequency"
      });
    }
    
    // Humidity-based recommendations
    if (weather.humidity > 80) {
      recommendations.push({
        type: "info",
        message: "High humidity detected. Monitor for fungal diseases.",
        action: "Check crop health"
      });
    }
    
    // Wind-based recommendations
    if (weather.windSpeed > 20) {
      recommendations.push({
        type: "warning",
        message: "Strong winds detected. Secure any loose equipment.",
        action: "Check equipment and structures"
      });
    }
    
    // Precipitation-based recommendations
    const hasRain = forecast.some(day => day.precipitation > 0);
    if (hasRain) {
      recommendations.push({
        type: "info",
        message: "Rain expected in forecast. Plan outdoor activities accordingly.",
        action: "Adjust farming schedule"
      });
    }
    
    return recommendations;
  },

  // Get optimal planting times based on weather
  getPlantingRecommendations(forecast) {
    const recommendations = [];
    
    // Check for stable weather conditions
    const stableDays = forecast.filter(day => 
      day.high - day.low < 10 && // Temperature variation less than 10°C
      day.precipitation < 5 && // Low precipitation
      day.windSpeed < 15 // Low wind
    );
    
    if (stableDays.length >= 3) {
      recommendations.push({
        type: "success",
        message: "Good planting conditions expected in the next few days.",
        action: "Consider planting new crops"
      });
    }
    
    // Check for irrigation needs
    const dryDays = forecast.filter(day => day.precipitation < 2);
    if (dryDays.length >= 5) {
      recommendations.push({
        type: "warning",
        message: "Extended dry period expected. Plan irrigation accordingly.",
        action: "Schedule irrigation"
      });
    }
    
    return recommendations;
  }
};
