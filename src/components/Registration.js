import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MDBCard, MDBCol, MDBContainer, MDBRow,
} from 'mdbreact';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { addUser, userLoginRequest } from '../store/actions/users';


class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // eslint-disable-next-line react/no-unused-state
      images: '',
      emailError: '',
    };
  }

  // eslint-disable-next-line react/sort-comp
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeFile = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  };

  onBlurFirstName=(e) => {
    const { firstName } = this.state;
    const regFirstName = /^\w[A-z]{2,15}$/;
    if (regFirstName.test(firstName) !== true) {
      this.setState({
        firstName: '',
      });
      e.target.className = 'error';
    } else {
      e.target.className = '';
    }
  }

  onBlurLastName=(e) => {
    const { lastName } = this.state;
    const regLastName = /^\w[A-z]{2,15}$/;
    if (regLastName.test(lastName) !== true) {
      this.setState({
        lastName: '',
      });
      e.target.className = 'error';
    } else {
      e.target.className = '';
    }
  }

  onBlurEmail=(e) => {
    const { email } = this.state;
    const regEmail = /^[A-z]*\d*@[A-z]*.[A-z]*$/gm;
    if (regEmail.test(email) !== true) {
      this.setState({
        email: '',
      });
      e.target.className = 'error';
    } else {
      e.target.className = '';
    }
  }

  onBlurPassword=(e) => {
    const { password } = this.state;
    const regPassword = /^.{4,}$/;
    if (regPassword.test(password) !== true) {
      this.setState({
        password: '',
      });
      e.target.className = 'error';
    } else {
      e.target.className = '';
    }
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const {
      firstName, lastName, email, password,images
    } = this.state;

    await this.setState({
      data: {
        firstName, lastName, email, password,images
      },
    });
    // eslint-disable-next-line max-len
    if (firstName.length !== 0 && lastName.length !== 0 && email.length !== 0 && password.length !== 0) {
      // eslint-disable-next-line react/prop-types
      this.props.addUser(this.state.data);
    }
    await this.setState({ emailError: this.props?.errors?.error?.errors?.email });
  };


  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    if (prevProps.errors?.error?.errors?.email !== this.props?.errors?.error?.errors?.email) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ emailError: this.props?.errors.error?.errors.email });
    }
  }


  render() {
    // eslint-disable-next-line react/prop-types
    const { status } = this.props;
    if (status === 'ok') {
      // eslint-disable-next-line react/prop-types
      this.props.userLoginRequest(this.state.email, this.state.password);
      // eslint-disable-next-line react/prop-types
      this.props.closeRegistrationPage();
    }

    return (
      <div>
        <div className="mdbcontainer">
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mdbcontent">
                <MDBCard
                  className="card-image"
                  style={{
                    backgroundImage:
                      'url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)',
                    width: '26rem',
                    backgroundRepeat: 'round',
                  }}
                >
                  <IconContext.Provider
                    value={{ className: 'global-class-name closeIcon' }}
                  >
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line react/prop-types,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <div onClick={() => {
                      // eslint-disable-next-line react/prop-types
                      this.props.closeRegistrationPage();
                    }}
                    >
                      <IoIosCloseCircleOutline />
                    </div>
                  </IconContext.Provider>
                  <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">

                    <div className="text-center">
                      <h3 className="white-text mb-5 mt-4 font-weight-bold">
                        <strong>Registration</strong>
                      </h3>
                    </div>

                    <form onSubmit={this.handleSubmit} className="form">
                      {/* {errors && _.values(errors).map((e) => (<h3>{e}</h3>))} */}
                      <p>
                        <input
                          id="firstName"
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          onChange={this.handleChange}
                          onBlur={this.onBlurFirstName}
                        />
                        <br />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="firstName">First name</label>
                      </p>
                      <p>
                        <input
                          id="lastName"
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          onChange={this.handleChange}
                          onBlur={this.onBlurLastName}
                        />
                        <br />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="lastName">Last name</label>
                      </p>
                      <p>
                        <span className="emailErroring">{this.state.emailError ? this.state.emailError : null}</span>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={this.handleChange}
                          onBlur={this.onBlurEmail}
                        />
                        <br />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="email">Email</label>
                      </p>

                      <p>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={this.handleChange}
                          onBlur={this.onBlurPassword}
                        />
                        <br />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="password">Password</label>
                      </p>
                      <p>
                        <input
                          id="images file"
                          type="file"
                          name="images"
                          accept=".png,.jpg,.jpeg"
                          onChange={this.handleChangeFile}
                        />
                        <br />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="text">Upload Images</label>
                      </p>
                      <p>
                        <input className="submit" type="submit" value="Sign in" />
                      </p>
                    </form>
                    <MDBCol md="12">
                      <p className="font-small white-text d-flex justify-content-end">
                        If you are registered
                        {/* eslint-disable-next-line react/prop-types,jsx-a11y/anchor-is-valid */}
                        <Link
                          to="#"
                          className="green-text ml-1 font-weight-bold"
                          onClick={() => this.props.clickHere()}
                        >
                          click here
                        </Link>
                      </p>
                    </MDBCol>
                  </div>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  status: state.users.requestStatus,
  errors: state.users,
});
const mapDispatchToProps = {
  addUser,
  userLoginRequest,
};


const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm);

export default Container;
