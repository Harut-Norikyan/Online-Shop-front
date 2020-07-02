import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MDBCard, MDBCol, MDBContainer, MDBRow,
} from 'mdbreact';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { userLoginRequest } from '../store/actions/users';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // eslint-disable-next-line react/sort-comp
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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


  handleSubmit =async (ev) => {
    ev.preventDefault()
    const { email, password } = this.state;
    if (email.length !== 0 && password.length !== 0) {
      // eslint-disable-next-line react/prop-types
      await this.props.userLoginRequest(this.state.email, this.state.password);
    }
    await this.setState({ loginError: this.props?.error ? this.props?.error : null });
  };

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    if (this.props.error && this.props?.error !== prevProps.error) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        // eslint-disable-next-line react/prop-types
        loginError: this.props.error ? this.props.error : null,
      });
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { token } = this.props;
    if (token) {
      // eslint-disable-next-line react/prop-types
      this.props.closeLoginPage();
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
                    {/* eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <div onClick={() => this.props.closeLoginPage()}
                    >
                      <IoIosCloseCircleOutline />
                    </div>
                  </IconContext.Provider>
                  <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">

                    <div className="text-center">
                      <h3 className="white-text mb-5 mt-4 font-weight-bold">
                        <strong>Login</strong>
                      </h3>
                    </div>

                    <p className="emailErroring">{this.state.loginError ? this.state.loginError : null}</p>

                    <form onSubmit={this.handleSubmit} className="form">

                      <p>
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
                        {/* eslint-disable-next-line react/prop-types */}
                        <input className="submit" type="submit" value="Sign in" onClick={token ? () => this.props.closeLoginPage() : null} />
                      </p>
                    </form>

                    <MDBCol md="12">
                      <p className="font-small white-text d-flex justify-content-end">
                        Dont have an account?
                        {/* eslint-disable-next-line react/prop-types,jsx-a11y/anchor-is-valid */}
                        <Link to="" className="green-text ml-1 font-weight-bold" onClick={() => this.props.create()}>
                          Create
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
  token: state.users.token,
  user: state.users.user,
  error: state.users.error,
});
const mapDispatchToProps = {
  userLoginRequest,
};


const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default Container;
