const WeatherDisplay = ({ weatherData }) => {
    return (
        <div className="display-container">
            <h3>
                {weatherData.name}, {weatherData.sys.country}
            </h3>
            <h2>{weatherData.main.temp}°C</h2>
            <p>{weatherData.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
            />
        </div>
    );
};

export default WeatherDisplay;
