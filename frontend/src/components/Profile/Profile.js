/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
//import profilepic from '../../images/profilepic.PNG';
import NavbarDashBoard from '../Layout/NavbarDashboard';
import backendServer from '../../backEndConfig';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../../redux/actions/userProfileActions';
import axios from 'axios';
import '../../App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userid'),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillMount() {
    const user = { userId: this.state.userId };
    console.log('current user ID: ', user);
    this.props.getUser(user);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      let { user } = nextProps;

      let userData = {
        userid: user.id || this.state.userId,
        username: user.username || this.state.username,
        email: user.email || this.state.email,
        phone: user.phone || this.state.phone,
        user_image: user.user_image || this.state.user_image,
        currency: user.currency || this.state.currency,
        language: user.language || this.state.language,
        timezone: user.timezone || this.state.timezone,
      };

      this.setState(userData);
      console.log('userData is : ', userData);
    }
  }

  onImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  onUpload = (e) => {
    console.log('inside upload');
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.file);
    const uploadConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post(
        `${backendServer}/uploads/${this.state.userId}`,
        formData,
        uploadConfig
      )
      .then((response) => {
        alert('Image uploaded successfully!');
        this.setState({
          fileText: 'Choose file',
          user_image: response.data,
        });
      })
      .catch((err) => {
        console.log('Error' + err);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userid = localStorage.getItem('userid');
    const updatedData = {
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      currency: this.state.currency,
      timezone: this.state.timezone,
      language: this.state.language,
      userid: userid,
    };
    console.log('userid', userid);
    console.log('this  Data: ', updatedData);
    this.props.updateUser(updatedData);
  };

  render() {
    let redirectVar = null;

    let imageSrc;

    if (this.state) {
      imageSrc = `${backendServer}/images/${this.state.user_image}`;
    }
    if (this.state.isUpdated === 1) {
      redirectVar = <Redirect to="/DashBoard" />;
    }
    return (
      <div className="container-fluid">
        {redirectVar}
        <NavbarDashBoard />
        <div className="container profile-div">
          <div className="row">
            <div className="col">
              <img
                src={imageSrc}
                className="img-fluid"
                alt="profilepic"
                style={{ height: 300, width: 300, marginTop: '100px' }}
              />
              <div>
                <form onSubmit={this.onUpload}>
                  <div class="form-group">
                    <label for="image">Change your avatar</label>
                    <input
                      type="file"
                      class="form-control-file"
                      name="image"
                      accept="image/*"
                      onChange={this.onImageChange}
                      id="profileimg"
                      required
                    />
                  </div>
                  <button type="submit" className="green-button">
                    Upload
                  </button>
                </form>
              </div>
            </div>

            <div className="col">
              <form onSubmit={this.onSubmit}>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="username">Your name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      onChange={this.onChange}
                      defaultValue={this.state.username}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your email address</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="email"
                      pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                      title="Please enter valid email address"
                      required
                      onChange={this.onChange}
                      defaultValue={this.state.email}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Your phone number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      id="phone"
                      onChange={this.onChange}
                      pattern="[1-9]{1}[0-9]{9}"
                      defaultValue={this.state.phone}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="signup-block">
                    <div className="form-group">
                      <label htmlFor="">Your Default currency</label>
                      <br />
                      <select
                        name="currency"
                        className="form-control"
                        value={this.state.currency}
                        onChange={this.onChange}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="HUF">HUF</option>
                        <option value="HUF">INR</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">You timezone</label>
                      <select
                        name="timezone"
                        className="form-control"
                        value={this.state.timezone}
                        onChange={this.onChange}
                      >
                        <option value="(GMT-08:00) Pacific Time">
                          (GMT-08:00) Pacific Time
                        </option>
                        <option value="(GMT-06:00) Central America">
                          (GMT-06:00) Central America
                        </option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Language</label>
                      <select
                        name="language"
                        className="form-control"
                        value={this.state.language}
                        onChange={this.onChange}
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                    <button type="submit" className="green-button float-right">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.userProfile.user,
  };
};

export default connect(mapStateToProps, { getUser, updateUser })(Profile);
