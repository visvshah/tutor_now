import React, {useState, useEffect} from "react";
import "./navbar.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import decode from "jwt-decode";

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/login');
    setUser(null);
}
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
      setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);
  return (
    <div>
        <div className="navbar">
            <div className="left">
                Go Tutor
            </div>
            <div className="right">
            <a to = "/" href = "/"><button className = "signin" component = {Link}>Home</button></a>
                {user?(
                  <>
                    
                    <a><button className = "signout" onClick = {logOut}>Sign Out</button></a>
                  </>
                ):(
                  <a to = "/login" href = "/login"><button className = "signin" component = {Link}>Log In</button></a>
                )}
            </div>
        </div>
    </div>
  )
}