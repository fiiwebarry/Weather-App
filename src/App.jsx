import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import SearchPage from './Pages/SearchPage'





function App() {


  return (
    <Routes>

      <Route path="/" Component={Home} />
      <Route path="/SearchPage" Component={SearchPage} />


    </Routes>

  )
}

export default App
