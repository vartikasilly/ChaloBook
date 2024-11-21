import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
 const navigate=useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    try {
      const res = await axios.get("/auth/logout");
      //dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
     // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">booking</span>
        </Link>
        {user ? 
          (<div className="navlog" > {user.username}
            <button onClick={handleClick} className="logout">Logout</button>)
            </div> )    
         : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;