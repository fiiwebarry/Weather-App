/* eslint-disable react/prop-types */
import { WeatherApp } from "../Context-Api/ForecastContext";
import { useContext } from "react";
import axios from "../Axios-Api/axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BsFillCloudRainFill,
    BsFillCloudsFill,
    BsSnow,
    BsSunFill,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
    const navigate = useNavigate();
    const {
        inputLocation,
        setInputLocation,
        weatherHistory,
        setWeatherHistory,
        weatherData,
        setWeatherData,
    } = useContext(WeatherApp);
    const todaysDate = new Date();
    const [isLoading, setIsLoading] = useState(false);
    const [weatherForecastBg, setWeatherForecastBg] = useState("bg-cloudy");
    const [weatherIcon, setWeatherIcon] = useState(
        <BsFillCloudsFill className="inline-flex text-lg mb-1 lg:text-3xl" />
    );

    //get location
    const getWeatherForecast = async (latitude, longitude) => {
        setIsLoading(true);
        try {
            const url = `/weather?lat=${latitude}&lon=${longitude}&appid=ed56b79b5e1480bc48e4dade380e5bcb&units=metric`;
            const response = await axios.get(url);

            setWeatherData(response.data);
            setWeatherBackground(response.data.weather[0].main);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    //get background image
    const setWeatherBackground = (weather) => {
        switch (weather) {
            case "Clear":
                setWeatherForecastBg("bg-sunny");
                setWeatherIcon(<BsSunFill className="weather-icon" />);
                break;
            case "Clouds":
                setWeatherForecastBg("bg-cloudy");
                setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
                break;

            case "Rain":
                setWeatherForecastBg("bg-rainy");
                setWeatherIcon(<BsFillCloudRainFill className="weather-icon" />);
                break;
            case "Snow":
                setWeatherForecastBg("bg-snowy");
                setWeatherIcon(<BsSnow className="weather-icon" />);
                break;
            default:
                setWeatherForecastBg("bg-rainy");
                setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
                break;
        }
    };
    // eslint-disable-next-line no-unused-vars
    const inputLocationHandler = async (location) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `/weather?q=${location}&appid=ed56b79b5e1480bc48e4dade380e5bcb`
            );

            setWeatherData(response.data);
            setWeatherBackground(response.data.weather[0].main);
            navigate("/SearchPage");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const searchCityWeather = async () => {
        if (inputLocation.trim()) {
            setWeatherHistory((weatherHistory) => [...weatherHistory, { history: inputLocation }]);
            await inputLocationHandler(inputLocation);
            // localStorage.setItem("history", JSON.stringify(weatherHistory))
            setInputLocation("");
        } else {
            alert("Enter the name of a valid city");
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherForecast(latitude, longitude);
        });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (inputLocation) { inputLocationHandler(inputLocation) }
        // const oldLocation = JSON.parse(localStorage.getItem("history"))

        // setWeatherHistory(oldLocation)
        // const lastItem = oldLocation[-1]
        // console.log(lastItem);


    }, []);
    return (
        <section
            className={`${weatherForecastBg} bg-cover bg-no-repeat min-h-screen relative`}
        >
            <div className=" top-0  min-h-screen w-screen bg-gradient-to-r from-[#00000080] to-[#0000009c]">
                <div className="container mx-auto w-[85%] pt-[20px] lg:absolute inset-0 ">
                    <h1 className=" text-white text-xl lg:text-2xl font-semibold">
                        Weather-Wiz
                    </h1>
                </div>
                <aside className=" bg-opacity-100 shadow-2xl  lg:top-0  md:left-2  w-[100%] lg:w-[38%] lg:left-[899px] lg:h-[100vh] lg:fixed p-4 z-20">
                    <div className="relative">
                        <input
                            type="text"
                            className=" lg:w-[500px] md:w-[350px] w-[300px] lg:h-[50px]  md:ml-5 h-[50px] lg:mt-0 mt-[450px] rounded p-3"
                            placeholder="search for a city"
                            value={inputLocation}
                            onChange={(e) => setInputLocation(e.target.value)}
                        />

                        <button
                            onClick={searchCityWeather}
                            className="bg-[#00F] rounded w-[50px]  lg:w-[100px] text-white md:left-[300px] h-[40px] lg:absolute  absolute top-[455px]  left-[240px] lg:top-[6px] lg:left-[400px]  text-[10px] p-2"
                        >
                            Search
                        </button>
                    </div>

                    <div className="min-h-[150px] pb-2 max-h-[250px]">
                        <h2 className=" text-white text-lg lg:text-2xl  md:ml-5 font-semibold mt-5 lg:mb-2">
                            Your Previous Searches
                        </h2>
                        <div>
                            {weatherHistory.length > 0 ? (
                                <ul>
                                    {" "}
                                    {weatherHistory.map((history) => {
                                        return (
                                            <li
                                                key={history.history}
                                                className="font-semibold text-xl xl:text-2xl mb-3 w-[300px] flex items-center justify-between"
                                            >
                                                <button onClick={""}>{history.history}</button>
                                                <button
                                                    onClick={""}
                                                    className="w-[30px] h-[30px] bg-gray-300 text-black rounded-full shadow-xl flex items-center justify-center"
                                                >
                                                    <AiOutlineClose className="inline-block text-lg" />
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div>
                                    <p className="font-semibold xl:text-xl text-white p-5">
                                        No searches yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="lg:mt-[60px] mt-[40px]" />
                    <button className="bg-[#FFFF] text-[blue] rounded mt-[40px] h-[40px] w-[200px]">
                        View Saved Location
                    </button>

                    {isLoading ? (
                        <div className="absolute inset-0">isLoading....</div>
                    ) : (
                        <div className=" text-[white]text-[20px] font-medium lg:mt-[30px] mt-[90px]">
                            <h2 className="text-white text-[20px]">
                                Current Location Weather Details
                            </h2>
                            <div className="flex justify-between mt-4 text-white">
                                <h2 className="text-[20px] font-medium text-white">
                                    Humidity:
                                </h2>
                                {weatherData.main ? <p>{weatherData.main.humidity}</p> : null}
                            </div>
                            <div className="flex justify-between mt-4 text-white">
                                <h2 className="text-[20px] font-medium">Temperature:</h2>
                                {weatherData.main ? <p>{weatherData.main.temp}</p> : null}
                            </div>
                            <div className="flex justify-between mt-4 text-white">
                                <h2 className="text-[20px] font-medium ">Wind Speed:</h2>
                                {weatherData.main ? <p>{weatherData.wind.speed}</p> : null}
                            </div>
                        </div>
                    )}
                </aside>
                <div>
                    {isLoading ? (
                        <div className="absolute inset-0 ">
                            <h1>.....loading</h1>
                        </div>
                    ) : (
                        <div className="container mx-auto absolute inset-0  flex">
                            <div className="md:p-[40px] p-[30px]  w-[85%] lg:flex  flex flex-col lg:mt-[400px]  mt-[200px] gap-4 z-50 ">
                                <div className="location ">
                                    <p className="text-[70px] text-[#FFFF]">{weatherData.name}</p>
                                </div>

                                <div className="temp">
                                    {weatherData.main ? (
                                        <h2 className="text-[40px] text-[#FFFF]">
                                            {weatherData.main.temp} °F
                                        </h2>
                                    ) : null}
                                </div>
                                <div className="decription flex">
                                    <div className="text-white text-lg font-semibold lg:text-xl">
                                        {`${todaysDate.toLocaleTimeString()} - ${todaysDate.toDateString()}`}
                                        <div>
                                            <p>{weatherIcon}</p>
                                            {weatherData.main ? (
                                                <p className="text-lg xl:text-xl font-bold">
                                                    {weatherData.weather[0].main}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Home;
