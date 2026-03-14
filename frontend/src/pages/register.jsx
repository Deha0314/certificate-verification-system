import { useState } from "react";

function Register(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [role,setRole]=useState("Student");

const handleRegister = async () => {

const response = await fetch(
"http://localhost:5000/api/auth/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password,
role
})
}
);

const data = await response.json();

alert(data.message);

};

return(

<div style={{
display:"flex",
justifyContent:"center",
marginTop:"80px"
}}>

<div style={{
width:"350px",
border:"1px solid #ccc",
padding:"30px"
}}>

<h2>Register</h2>

<input
placeholder="Email"
style={{width:"100%",padding:"10px"}}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
style={{width:"100%",padding:"10px"}}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<select
style={{width:"100%",padding:"10px"}}
onChange={(e)=>setRole(e.target.value)}
>

<option value="Student">
Student
</option>

<option value="Admin">
Admin
</option>

</select>

<br/><br/>

<button
onClick={handleRegister}
style={{
width:"100%",
padding:"10px",
background:"#16a085",
color:"white",
border:"none",
cursor:"pointer"
}}
>
Register
</button>

</div>

</div>

)

}

export default Register;