
import PropTypes from "prop-types";
import { createContext, useReducer } from "react";

export const WeatherApp = createContext({});

const ForecastContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <WeatherApp.Provider
            value={{
                dispatch,
                searchHistory: state.searchHistory,
                cityWeather: state.cityWeather,
                isModalOpen: state.isModalOpen,
                savedLocations: state.savedLocations,
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
