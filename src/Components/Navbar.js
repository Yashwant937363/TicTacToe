import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../store/slice/togglecnp';
import './Navbar.css';

function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isToggled = useSelector((state) => state.toggle.togglecnp);
  const isChange = useSelector((state) => state.toggle.isChangeName);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleNavlinkClick = () => {
    setIsMenuOpen(false);
  }
  return (
    <>
      <header>
        <style>
          {`
          #list{
            display:${isMenuOpen ? 'block' : 'none'};
          }
          @media (min-width: 500px){
            #list{
              display:inline-flex;
            }
          }
        `}
        </style>
        <nav className="navbar">
          <h1 className="title">{props.title}</h1>
          <ul id="list" onClick={handleNavlinkClick}>
            <li>
              <NavLink onClick={handleNavlinkClick} className="link" to="/"><span>Home</span></NavLink>
            </li>
            <li>
              <NavLink onClick={handleNavlinkClick} className="link" to="/about"><span>About</span></NavLink>
            </li>
          </ul>
          <div className="icons">
            {isChange ? ( <div className="toggle-container"> <i className='bi bi-robot'></i> <label className="switch"> <input type="checkbox" checked={isToggled} onChange={() => dispatch(toggle())} /> <span className="slider round"></span> </label> <i className="bi bi-people-fill"></i> </div> ) : null}
            <label htmlFor="togglemenu" onClick={handleMenuToggle}>
              <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} icon`} id="menu"></i>
            </label>
            <input type="checkbox" id="togglemenu" checked={isMenuOpen} readOnly />
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
