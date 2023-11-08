/* eslint-disable react/prop-types */
import Axios from "../Axios-Api/Axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCloudRainFill, BsFillCloudsFill, BsSnow, BsSunFill, } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
    const todaysDate = new Date();
    const [isLoading, setIsLoading] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [inputLocation, setInputLocation] = useState("");
    const [weatherForecastBg, setWeatherForecastBg] = useState("bg-cloudy");
    const [weatherIcon, setWeatherIcon] = useState(<BsFillCloudsFill className="inline-flex text-lg mb-1 lg:text-3xl" />

    );

    const weatherForcast = async () => {
        try {
            setIsLoading(true);
            const response = await Axios.get(
                "http://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=ed56b79b5e1480bc48e4dade380e5bcb"
            );
            setWeatherData(response.data);
            if (response.status === 200) {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //get location
    const getWeather = async (latitude, longitude) => {
        try {
            const url = `/weather?lat=${latitude}&lon=${longitude}appid=ed56b79b5e1480bc48e4dade380e5bcb&units=metric`;

            const response = await Axios.get(url);

            if (response.status === 200) {
                setWeatherData(response.data);
                setWeatherBackground(response.data.weather[0].main);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //get background image
    const setWeatherBackground = (weather) => {
        switch (weather) {
            case "Clouds":
                setWeatherForecastBg("bg-cloudy");
                setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
                break;
            case "Clear":
                setWeatherForecastBg("bg-sunny");
                setWeatherIcon(<BsSunFill className="weather-icon" />);
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
                setWeatherForecastBg("bg-cloudy");
                setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
                break;
        }
    };
    // eslint-disable-next-line no-unused-vars
    const inputLocationHandler = async () => {
        try {
            setIsLoading(true);
            const response = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=ed56b79b5e1480bc48e4dade380e5bcb`);

            if (response.status === 200) {
                setInputLocation('');
                console.log(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(inputLocation);
    };

    useEffect(() => {
        weatherForcast();
        inputLocationHandler();
    }, []);

    return (
        <section className={`${weatherForecastBg} bg-cover bg-no-repeat min-h-screen relative`}  >
            <div className=" top-0  h-screen w-screen bg-gradient-to-r from-[#00000080] to-[#0000009c]">
                <div className="container mx-auto w-[85%] pt-[20px] absolute inset-0 ">
                    <h1 className=" text-white text-xl lg:text-2xl font-semibold">Weather-Wiz</h1>
                </div>
                <aside className=" bg-opacity-50 shadow-2xl  top-0  w-[38%] right-0 h-[100vh] fixed p-4 z-20">
                    <div className="relative">
                        <input type="text"
                            className="w-[500px] h-[50px]  rounded p-3"
                            placeholder="search for a city"
                            value={inputLocation}
                            onChange={(e) => setInputLocation(e.target.value)}

                        />

                        <button onClick={inputLocationHandler} className="bg-[#00F] rounded w-[50px]  h-[40px] absolute  top-[7px] left-[430px]  text-[10px] p-2">Search</button>
                    </div>

                    <hr className="mt-[180px]" />
                    <button className="bg-[#FFFF] text-[blue] rounded mt-[40px] h-[40px] w-[200px]">View Saved Location</button>

                    {isLoading ? (<div className="absolute inset-0">isLoading....</div>) : <div className="text-[20px] font-medium mt-[90px]">

                        <h2>Current Location Weather Details</h2>
                        <div className="flex justify-between mt-4">
                            <h2 className="text-[20px] font-medium ">Humidity:</h2>
                            {weatherData.main ? <p>{weatherData.main.humidity}</p> : null}
                        </div>
                        <div className="flex justify-between mt-4">
                            <h2 className="text-[20px] font-medium">Temperature:</h2>
                            {weatherData.main ? <p>{weatherData.main.temp} °F</p> : null}
                        </div>
                        <div className="flex justify-between mt-4">
                            <h2 className="text-[20px] font-medium ">Wind Speed:</h2>
                            {weatherData.main ? <p>{weatherData.wind.speed}</p> : null}
                        </div>




                    </div>}

                </aside>
                <div>
                    {isLoading ? (
                        <div className="absolute inset-0 ">
                            <h1>.....loading</h1>
                        </div>
                    ) : (
                        <div className="container mx-auto absolute inset-0  ">
                            <div className="container mx-auto  w-[85%]flex lg:mt-[400px] gap-4 z-50 ">
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
                                <div className="decription">
                                    <p>Clouds</p>
                                    <p className="text-white text-lg font-semibold lg:text-xl">
                                        {`${todaysDate.toLocaleTimeString()} - ${todaysDate.toDateString()}`}
                                        <div>
                                            {weatherIcon}
                                            <p className="text-lg xl:text-xl font-bold">
                                                {weatherData.weather[0].main}
                                            </p>
                                        </div>
                                    </p>
                                </div>


                            </div>
                            <div className="flex">
                                <div className="feels">
                                    <h1>{weatherData.temps}</h1>


                                </div>
                                <div className="humidity">
                                    <p>20</p>
                                </div>
                                <div className="wind">
                                    <p>200</p>
                                </div>
                            </div>

                            <p>{weatherData.timezone}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Home;
