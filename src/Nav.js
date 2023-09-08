import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
function Nav() {
  const [show, handleshow] = useState(false);
  const navigate = useNavigate();
  const trainsitionNavBar = () => {
    if (window.scrollY > 100) {
      handleshow(true);
    } else handleshow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", trainsitionNavBar);
    // Clean up function
    return () => window.removeEventListener("scroll", trainsitionNavBar);
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_contents">
        <img
          onClick={() => navigate("/")}
          className="nav_logo"
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt=""
        />
        <img
          onClick={() => navigate("/profile")}
          className="nav_avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu9VhASGSfFj_77fZ748zUwZZ0HbLv35YYrd93apRFEjDlRDUcoBJlyiiLfzxymVaJMp0&usqp=CAU"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
