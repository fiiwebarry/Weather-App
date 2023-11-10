
import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const WeatherApp = createContext({});

export const ForecastContext = ({ children }) => {
    const [inputLocation, setInputLocation] = useState("");
    const [weatherHistory, setWeatherHistory] = useState([]);
    const [weatherData, setWeatherData] = useState({});


    return (
        <WeatherApp.Provider
            value={{
                inputLocation, setInputLocation,
                weatherHistory, setWeatherHistory,
                weatherData, setWeatherData

            }}
        >
            {children}
        </WeatherApp.Provider>
    );
};

ForecastContext.propTypes = {
    children: PropTypes.element,
};

export default ForecastContext
