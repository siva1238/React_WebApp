import React, { useState, useContext, Fragment } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import "../CSS/NavBar.css";
import { IconContext } from "react-icons";
import AuthContext from "../store/auth-context";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const showSidebar = (e) => {
    setSidebar(!sidebar);
    if (e.target.innerText == "Logout") {
      authCtx.logout();
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {isLoggedIn && (
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          )}
          {!isLoggedIn && (
            <Fragment>
              <Link className="login-button" to="/login">
                Login
              </Link>
              <Link className="login-button" to="/user">
                SignUp
              </Link>
            </Fragment>
          )}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
