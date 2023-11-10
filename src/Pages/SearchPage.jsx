import { WeatherApp } from "../Context-Api/ForecastContext"
import { useContext } from "react"
import { Link } from "react-router-dom";
// import {
//   BsFillCloudRainFill,
//   BsFillCloudsFill,
//   BsSnow,
//   BsSunFill,
// } from "react-icons/bs";
import { AiOutlineStepBackward } from "react-icons/ai"

const SearchPage = () => {
  const { weatherData, weatherIcon, weatherForecastBg, setWeatherForecastBg } = useContext(WeatherApp)

  const todaysDate = new Date();


  return (

    <section className="bg-[url('src/assets/Images/rainy.jpg')] bg-cover bg-no-repeat min-h-screen  ">
      <div className="  h-screen w-screen bg-gradient-to-r from-[#00000080] to-[#0000009c]">
        <div className="pt-[120px]">
          <div className="flex justify-center  gap-6 justify-items-center text-center  lg:w-[800px]  rounded border mx-auto  shadow-lg  shadow-[white] lg:pt-[110px] lg:pb-[40px]">

            <div className="">
              <Link to="/">
                <AiOutlineStepBackward className="text-[40px] text-white" /></Link>


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
            <div>
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
          </div>



        </div>



      </div>

    </section>
  )
}

export default SearchPage
