import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = (e)=>{
e.preventDefault();

/* Example login check */

if(email === "admin@gmail.com" && password === "admin123"){
navigate("/admin");
}
else{
navigate("/dashboard");
}

};

return(

<div className="login-page">

<div className="login-card">

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">Login</button>

</form>

</div>

</div>

);

}

export default Login;