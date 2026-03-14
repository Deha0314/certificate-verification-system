import generatePDF from "../generatePDF";
import { useState } from "react";

function Search() {

  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);

  const searchCertificate = async () => {

    const res = await fetch(
      `http://localhost:5000/api/certificate/${certificateId}`
    );

    const data = await res.json();

    if (data) {
      setCertificate(data);
    } else {
      alert("Certificate not found");
    }
  };

  return (

    <div className="search">

      <h2>Search Certificate</h2>

      <input
        type="text"
        placeholder="Enter Certificate ID"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
      />

      <button onClick={searchCertificate}>
        Search
      </button>

      {certificate && (

<div className="certificate-card">

<h3>Certificate Details</h3>

<p><b>ID:</b> {certificate.certificateId}</p>
<p><b>Name:</b> {certificate.studentName}</p>
<p><b>Domain:</b> {certificate.domain}</p>
<p><b>Start:</b> {certificate.startDate}</p>
<p><b>End:</b> {certificate.endDate}</p>

<button
className="primary-btn"
onClick={()=>generatePDF(certificate)}
>
Download Certificate
</button>

</div>

)}
    </div>

  );
}

export default Search;