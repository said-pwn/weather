import { useState } from "react";

function Weather() {
  const [city, setCity] = useState(""); // Состояние для города
  const [weatherData, setWeatherData] = useState(null); // Состояние для данных погоды
  const [error, setError] = useState(null); // Состояние для ошибки

  // Замени на свой API-ключ
  const apiKey = "a6de1f22ddf74d0cae8202535251205"; 

  const handleCityChange = (event) => {
    setCity(event.target.value); // Обновление города
  };

  const getWeather = async () => {
    if (!city) {
      setError("Введите название города");
      return;
    }

    try {
      setError(null); // Очистить ошибки при новом запросе
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Невозможно получить данные");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message); // Если ошибка — выводим сообщение
      setWeatherData(null); // Очищаем данные о погоде
    }
  };

  return (
    <div className="flex items-center justify-center p-5 min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Weather in city</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
        />
        <button
          onClick={getWeather}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          To know weather
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {weatherData && (
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-semibold">{weatherData.location.name}:</h2>
            <p className="text-xl">Temperature: {weatherData.current.temp_c}°C</p>
            <p className="text-xl">Humidity: {weatherData.current.humidity}%</p>
            <p className="text-xl">Condition: {weatherData.current.condition.text}</p>
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
              className="mx-auto mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
