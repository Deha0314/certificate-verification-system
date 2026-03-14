import { Routes, Route } from "react-router-dom"

import Navbar from "./pages/navbar"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import Admin from "./pages/admin"

function App(){

return(

<>
<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/admin" element={<Admin/>}/>

</Routes>

</>

)

}

export default App