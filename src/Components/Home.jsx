/* eslint-disable react/prop-types */

import SideBar from "./SideBar"





const Home = ({ isLoading, weatherData }) => {

    console.log(weatherData)
    return (

        <section className="bg-[url('/src/assets/Images/clear-sky.jpg')] bg-[rgba(0,0,0,0,0.5)] text-[#FFFF] h-[100vh] relative">

            <div className="container mx-auto w-[85%] pt-[20px]">
                <h1 className="text-[#FFFF]">Weather-Wiz</h1>
            </div>


            {isLoading ? (<div><h1>.....loading</h1></div>) : (<div className="container mx-auto ">


                <div className="container mx-auto flex lg:mt-[400px] gap-4 ">
                    <div className="location ">
                        <p className="text-[70px]">  DALLAS</p>
                    </div>

                    <div className="temp">
                        <h2 className="text-[40px]">60 F</h2>

                    </div>
                    <div className="decription">
                        <p>Clouds</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="feels">
                        <h1>65 F</h1>
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

            <SideBar />

        </section >


    )
}

export default Home
