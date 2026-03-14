import certificate from "../assets/certificate.png";

function Home() {

return (

<div className="home-wrapper">

<div className="home-card">

<div className="hero">

<div className="hero-text">

<h1>Certificate Verification System</h1>

<p>
Our platform ensures secure verification and management of internship
certificates. Students can easily access and download their certificates
while administrators manage certificate data efficiently.
</p>

<p>
The system prevents certificate fraud and provides quick authentication
using unique certificate IDs stored in a secure database.
</p>

<div className="hero-buttons">



</div>

</div>

<div className="hero-image">

<img src={certificate} alt="certificate"/>

</div>

</div>

</div>

</div>

);

}

export default Home;