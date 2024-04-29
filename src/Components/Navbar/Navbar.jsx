import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import CNPSwitch from "../cnpswitch/cnpswitch";

function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isChange = useSelector((state) => state.toggle.isChangeName);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleNavlinkClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      <header>
        <style>
          {`
          #list{
            display:${isMenuOpen ? "block" : "none"};
          }
          @media (min-width: 500px){
            #list{
              display:inline-flex;
            }
          }
        `}
        </style>
        <nav className="navbar">
          <h1 className="title" onClick={() => navigate("/")}>
            {props.title}
          </h1>
          <ul id="list" onClick={handleNavlinkClick}>
            <li>
              <NavLink onClick={handleNavlinkClick} className="link" to="/">
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleNavlinkClick}
                className="link"
                to="/about"
              >
                <span>About</span>
              </NavLink>
            </li>
          </ul>
          <div className="icons">
            {isChange ? <CNPSwitch className="navswitch"></CNPSwitch> : null}
            <label htmlFor="togglemenu" onClick={handleMenuToggle}>
              <i
                className={`bi ${isMenuOpen ? "bi-x" : "bi-list"} icon`}
                id="menu"
              ></i>
            </label>
            <input
              type="checkbox"
              id="togglemenu"
              checked={isMenuOpen}
              readOnly
            />
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
