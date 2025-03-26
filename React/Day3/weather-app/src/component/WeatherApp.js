import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import WeatherDisplay from "./WeatherDisplay";
import "./WeatherApp.css";

const WeatherApp = () => {
    const [city, setCity] = useState("Bareilly");
    const [weatherData, setWeatherData] = useState(null);
    console.log(process.env);

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const fetchWeather = async (cityName) => {
        try {
            console.log(process.env.CURRENT_WEATHER_API_KEY);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_CURRENT_WEATHER_API_KEY}&units=metric`
            );
            const data = await response.json();
            console.log(data);
            if (data.cod === 200) {
                setWeatherData(data);
            } else {
                alert("City Not Found!");
            }
        } catch (error) {
            console.log("Error Fetching the weather data:", error);
        }
    };

    return (
        <div className="container">
            <h2>Weather Dashboard</h2>
            <SearchBar setCity={setCity} />
            {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </div>
    );
};

export default WeatherApp;
