import {

    BsFillCloudsFill,

} from "react-icons/bs";
import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const WeatherApp = createContext({});

export const ForecastContext = ({ children }) => {
    const [inputLocation, setInputLocation] = useState("");
    const [weatherHistory, setWeatherHistory] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    const [weatherIcon, setWeatherIcon] = useState(
        <BsFillCloudsFill className="inline-flex text-lg mb-1 lg:text-3xl" />
    )


    return (
        <WeatherApp.Provider
            value={{
                inputLocation, setInputLocation,
                weatherHistory, setWeatherHistory,
                weatherData, setWeatherData,
                weatherIcon, setWeatherIcon

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
