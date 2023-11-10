import { WeatherApp } from "../Context-Api/ForecastContext"
import { useContext } from "react"

const SearchPage = () => {
  const { weatherHistory, setWeatherHistory, weatherData, setWeatherData } = useContext(WeatherApp)

  console.log(weatherData);
  return (

    <section className="bg-[url('src/assets/Images/rainy.jpg')] bg-cover bg-no-repeat min-h-screen  ">
      <div className="  h-screen w-screen bg-gradient-to-r from-[#00000080] to-[#0000009c]">
        <div className="flex justify-center">


        </div>



      </div>

    </section>
  )
}

export default SearchPage
