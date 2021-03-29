/* eslint-disable */
import React from 'react';
import Navbar from '../Layout/Navbar';
import bgfacet from '../../images/bgfacet.png';
import asterisk from '../../images/asterisk.png';
import icons from '../../images/icons.png';
import { Link } from 'react-router-dom';
import '../../App.css';
const Landing = () => {
  return (
    <div className="landing">
      <Navbar />
      <main
        style={{
          backgroundImage: `url(${bgfacet})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <div className="container main">
          <div className="row">
            <div
              className="col "
              style={{
                marginTop: '120px',
                marginBottom: '150px',
              }}
            >
              <h1>Less stress when</h1>
              <h1>sharing expenses</h1>
              <h1>with anyone.</h1>
              <img src={icons} alt="icons" />
              <p style={{ padding: '20px 0px 15px 0px' }}>
                Keep track of your shared expenses and balances <br />
                with housemates, trips, groups,
                <br /> friends, and family.
              </p>
              <Link to="/SignUp" className="green-button-big">
                Sign up
              </Link>
              <p style={{ padding: '20px 0px 15px 0px' }}>
                Free for iPhone , Android , and web.
              </p>
            </div>
            <div className="col right" style={{ marginTop: '40px' }}>
              <img src={asterisk} alt="asterisk" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Landing;
