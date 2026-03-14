import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {

const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("token");
setIsLoggedIn(false);
navigate("/");
};

return (

<nav className="navbar">

<div className="logo">
Certificate Verification System
</div>

<div className="nav-links">

<Link to="/">Home</Link>

{!isLoggedIn && <Link to="/login">Login</Link>}

{!isLoggedIn && <Link to="/register">Register</Link>}

{isLoggedIn && (
<button className="logout-btn" onClick={handleLogout}>
Logout
</button>
)}

</div>

</nav>

);

}

export default Navbar;