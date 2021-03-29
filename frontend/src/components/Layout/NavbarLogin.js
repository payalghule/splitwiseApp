/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import logosplit from '../../images/logosplit.svg';
import '../../App.css';

const NavbarLogin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbarlogin">
      <div className="container">
        <div className="row">
          <img src={logosplit} className="logogreen" alt="logo" />
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/Login" className="login-nav-green-button">
              Log in
            </Link>
          </li>
          <li>
            <Link to="/SignUp" className="signup-nav-orange-button">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLogin;
