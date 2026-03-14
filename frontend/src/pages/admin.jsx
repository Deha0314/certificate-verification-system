import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Admin(){

const navigate = useNavigate();

const [certificates,setCertificates] = useState([]);
const [search,setSearch] = useState("");

const [form,setForm] = useState({

certificateId:"",
studentName:"",
domain:"",
startDate:"",
endDate:""

});

/* load certificates */

useEffect(()=>{

fetch("http://localhost:5000/api/certificates")
.then(res=>res.json())
.then(data=>setCertificates(data));

},[]);


/* logout */

const logout = ()=>{

navigate("/");

};


/* add certificate */

const addCertificate = async()=>{

if(!form.certificateId || !form.studentName){
alert("Fill all fields");
return;
}

const res = await fetch("http://localhost:5000/api/certificate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});

const data = await res.json();

setCertificates([...certificates,data]);

setForm({
certificateId:"",
studentName:"",
domain:"",
startDate:"",
endDate:""
});

};


/* delete */

const deleteCertificate = async(id)=>{

await fetch(`http://localhost:5000/api/certificate/${id}`,{
method:"DELETE"
});

setCertificates(certificates.filter(c=>c.certificateId!==id));

};


/* edit */

const editCertificate = async(id)=>{

const newName = prompt("Enter new student name");

if(!newName) return;

await fetch(`http://localhost:5000/api/certificate/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({studentName:newName})

});

setCertificates(certificates.map(c=>

c.certificateId===id
? {...c,studentName:newName}
: c

));

};


/* search */

const filteredCertificates = certificates.filter(c=>

c.studentName.toLowerCase().includes(search.toLowerCase()) ||
c.certificateId.toLowerCase().includes(search.toLowerCase())

);


return(

<div className="admin-wrapper">

<div className="admin-card">

<h2>Admin Dashboard</h2>

<button className="logout-btn" onClick={logout}>
Logout
</button>


{/* stats */}

<div className="stats">

<div className="stat-card">
<h3>{certificates.length}</h3>
<p>Total Certificates</p>
</div>

<div className="stat-card">
<h3>{new Set(certificates.map(c=>c.domain)).size}</h3>
<p>Domains</p>
</div>

</div>


{/* add certificate */}

<h3>Add Certificate</h3>

<div className="form-grid">

<input
placeholder="Certificate ID"
value={form.certificateId}
onChange={(e)=>setForm({...form,certificateId:e.target.value})}
/>

<input
placeholder="Student Name"
value={form.studentName}
onChange={(e)=>setForm({...form,studentName:e.target.value})}
/>

<input
placeholder="Domain"
value={form.domain}
onChange={(e)=>setForm({...form,domain:e.target.value})}
/>

<input
type="date"
value={form.startDate}
onChange={(e)=>setForm({...form,startDate:e.target.value})}
/>

<input
type="date"
value={form.endDate}
onChange={(e)=>setForm({...form,endDate:e.target.value})}
/>

<button className="add-btn" onClick={addCertificate}>
Add
</button>

</div>


{/* search */}

<input
className="search-input"
placeholder="Search certificate..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


{/* table */}

<table className="cert-table">

<thead>

<tr>
<th>ID</th>
<th>Name</th>
<th>Domain</th>
<th>Start</th>
<th>End</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{filteredCertificates.map(c=>(

<tr key={c.certificateId}>

<td>{c.certificateId}</td>
<td>{c.studentName}</td>
<td>{c.domain}</td>
<td>{c.startDate}</td>
<td>{c.endDate}</td>

<td>

<button
className="edit-btn"
onClick={()=>editCertificate(c.certificateId)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteCertificate(c.certificateId)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default Admin;