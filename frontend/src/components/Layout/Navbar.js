/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logosw.svg';
import '../../App.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="row">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/Login" className="btn-land-login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/SignUp" className="green-button">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
