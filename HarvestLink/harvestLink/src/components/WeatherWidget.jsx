import { useState, useEffect } from "react";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Thermometer,
  Droplets,
  Eye,
  Clock
} from "lucide-react";
import { weatherService } from "../services/weatherService";

export default function WeatherWidget({ location = "New York, NY" }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const [currentWeather, forecastData] = await Promise.all([
          weatherService.getCurrentWeather(location),
          weatherService.getForecast(location)
        ]);
        setWeather(currentWeather);
        setForecast(forecastData);
      } catch (err) {
        setError("Failed to load weather data");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="h-8 w-8 text-blue-300" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    } else if (conditionLower.includes('wind')) {
      return <Wind className="h-8 w-8 text-gray-400" />;
    } else {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getWeatherAdvice = (condition, temp) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) {
      return "Consider covering crops or delaying harvest";
    } else if (conditionLower.includes('frost') || temp < 32) {
      return "Protect sensitive crops from frost damage";
    } else if (temp > 85) {
      return "Ensure adequate irrigation for crops";
    } else if (conditionLower.includes('wind')) {
      return "Secure any loose equipment or structures";
    } else {
      return "Good conditions for outdoor farm work";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weather</h3>
          <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="bg-gray-200 h-16 rounded"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather</h3>
        <div className="text-center text-gray-500">
          <Cloud className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>Unable to load weather data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Weather</h3>
        <span className="text-sm text-gray-500">{location}</span>
      </div>

      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <h4 className="text-2xl font-bold text-gray-900">{weather.temperature}°F</h4>
              <p className="text-gray-600">{weather.condition}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Feels like</p>
            <p className="font-medium text-gray-900">{weather.feelsLike}°F</p>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Wind: {weather.windSpeed} mph</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Visibility: {weather.visibility} mi</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <span className="text-sm text-gray-600">Pressure: {weather.pressure} hPa</span>
          </div>
        </div>

        {/* Farming Advice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800">
            <strong>Farming Tip:</strong> {getWeatherAdvice(weather.condition, weather.temperature)}
          </p>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">5-Day Forecast</h4>
        <div className="space-y-2">
          {forecast.slice(0, 5).map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900 w-16">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                {getWeatherIcon(day.condition)}
                <span className="text-sm text-gray-600">{day.condition}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">{day.high}°</span>
                <span className="text-sm text-gray-500 ml-1">/ {day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
} 