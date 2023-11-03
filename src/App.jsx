import './App.css'
import Axios from './Axios-Api/Axios'
import { useState, useEffect } from 'react'
import Home from './Components/Home'




function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState({})


  const weatherForcast = async () => {
    try {
      setIsLoading(true)
      const response = await Axios.get("http://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=ed56b79b5e1480bc48e4dade380e5bcb")
      setWeatherData(response.data)
      if (response.status === 200) {
        setIsLoading(false)
      }
    }
    catch (error) {
      console.log(error)
    }




  }
  useEffect(() => {
    weatherForcast()
  }, [])


  return (
    <section>
      <Home isLoading={isLoading} weatherData={weatherData} setIsLoading={setIsLoading} setWeatherData={setWeatherData} />
    </section>

  )
}

export default App
