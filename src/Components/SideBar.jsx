


const SideBar = () => {
    return (
        <section className=" bg-opacity-50 shadow-lg     text-[#FFFF] top-0  w-[38%] right-0 h-[100vh] fixed p-4">
            <div className="relative">
                <input type="text" className="w-[500px] h-[50px]  rounded p-3" placeholder="search for a city" />
                <button className="bg-[#00F] rounded w-[50px]  h-[40px] absolute  top-[7px] left-[430px]  text-[10px] p-2">Search</button>
            </div>

            <hr className="mt-[180px]" />
            <button className="bg-[#FFFF]   text-[blue] rounded mt-[40px]  h-[40px] w-[200px]">View Saved Location</button>
        </section>
    )
}

export default SideBar
