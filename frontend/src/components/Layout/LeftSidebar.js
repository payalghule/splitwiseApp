/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import flagIcon from '../../images/flagIcon.png';
import '../../App.css';
/*import SignedLinks from './SignedLinks';*/

const LeftSidebar = () => {
  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{
          height: '30px',
          width: '30px',
          float: 'left',
          marginTop: '7px',
        }}
      />
      <Link
        to="/Dashboard"
        className="nav-link"
        style={{
          color: '#5bc5a7',
          fontSize: '22px',
          fontWeight: 'bold',
        }}
      >
        Dashboard
      </Link>
      <div>
        <img
          src={flagIcon}
          alt="flagIcon"
          style={{
            height: '22px',
            width: '20px',
            float: 'left',
            marginTop: '7px',
          }}
        />
        <Link
          to="/RecentActivity"
          className="nav-link"
          style={{
            color: 'grey',
            fontSize: '15px',
            fontWeight: 'bold',
            float: 'left',
          }}
        >
          Recent Activity
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
