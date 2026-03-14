import { useState } from "react";
import generatePDF from "../generatePDF";
import { useNavigate } from "react-router-dom";

function Dashboard(){

const [code,setCode] = useState("");
const [certificate,setCertificate] = useState(null);
const navigate = useNavigate();

const searchCertificate = async()=>{

if(!code){
alert("Enter Certificate Code");
return;
}

const res = await fetch(`http://localhost:5000/api/certificate/${code}`);
const data = await res.json();

setCertificate(data);

};

const logout = ()=>{
localStorage.removeItem("user");
navigate("/");
};

return(

<div className="dashboard-container">

<div className="dashboard-card">

<div className="dashboard-header">

<h2>Student Dashboard</h2>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

<div className="search-box">

<input
type="text"
placeholder="Enter Certificate Code"
value={code}
onChange={(e)=>setCode(e.target.value)}
/>

<button onClick={searchCertificate}>
Search
</button>

</div>

{certificate && (

<div className="certificate-preview">

<div className="certificate-box">

<h1>CERTIFICATE</h1>
<h3>OF COMPLETION</h3>

<p>This is proudly presented to</p>

<h2>{certificate.studentName}</h2>

<p>
for successfully completing internship in
</p>

<h3>{certificate.domain}</h3>

<p>
Duration: {certificate.startDate} - {certificate.endDate}
</p>

<div className="certificate-footer">

<p>Certificate ID: {certificate.certificateId}</p>

<p>Authorized Signature</p>

</div>

</div>

<button
className="download-btn"
onClick={()=>generatePDF(certificate)}
>

Download Certificate

</button>

</div>

)}

</div>

</div>

);

}

export default Dashboard;