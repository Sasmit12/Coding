import { useState, useEffect } from "react";
import { weatherService } from "../services/weatherService";

export function useWeather(latitude, longitude) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const weatherData = await weatherService.getCurrentWeather(
          latitude,
          longitude,
        );
        setCurrentWeather(weatherData);

        // Fetch forecast
        const forecastData = await weatherService.getForecast(
          latitude,
          longitude,
        );
        setForecast(forecastData);

        // Fetch alerts
        const alertsData = await weatherService.getWeatherAlerts(
          latitude,
          longitude,
        );
        setAlerts(alertsData.alerts || []);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [latitude, longitude]);

  const saveFarmerLocation = async (location) => {
    try {
      await weatherService.saveFarmerLocation(location);
    } catch (err) {
      console.error("Failed to save farmer location:", err);
      throw err;
    }
  };

  return {
    currentWeather,
    forecast,
    alerts,
    loading,
    error,
    saveFarmerLocation,
  };
}
