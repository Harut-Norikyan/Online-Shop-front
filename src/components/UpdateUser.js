import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Utils from '../helpers/Utils';
import { getProductFromOrders } from '../store/actions/orders';
import userDef from '../assets/img/core-img/user.svg';
import {deleteUser, updateUser} from '../store/actions/users';
import {Redirect} from "react-router-dom";

class UpdateUser extends Component {
  static propTypes = {};


  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      images: '',
      emailError: '',
      userDeleteError:'',
      check: false,
      blinkMini:''
    };
  }

 async componentDidMount() {
  // this.props.getProductFromOrders();
   await this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        images: this.props.user.images,
    })
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
      e.target.className = 'errorText';
    } else {
      e.target.className = 'inputsUser';
    }
  }

  onBlurLastName=(e) => {
    const { lastName } = this.state;
    const regLastName = /^\w[A-z]{2,15}$/;
    if (regLastName.test(lastName) !== true) {
      this.setState({
        lastName: '',
      });
      e.target.className = 'errorText ';
    } else {
      e.target.className = 'inputsUser';
    }
  }

  onBlurEmail=(e) => {
    const { email } = this.state;
    const regEmail = /^[A-z]*\d*@[A-z]*.[A-z]*$/gm;
    if (regEmail.test(email) !== true) {
      this.setState({
        email: '',
      });
      e.target.className = 'errorText ';
    } else {
      e.target.className = 'inputsUser';
    }
  }

  onBlurPassword=(e) => {
    const { password } = this.state;
    const regPassword = /^.{4,}$/;
    if (regPassword.test(password) !== true) {
      this.setState({
        password: '',
      });
      e.target.className = 'errorText ';
    } else {
      e.target.className = 'inputsUser';
    }
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const { user } = this.props;
    const {
      firstName, lastName, email, password, images,
    } = this.state;
    await this.setState({
      data: {
        firstName, lastName, email, password, images,
      },
    });
    // eslint-disable-next-line max-len
    if (firstName.length !== 0 && lastName.length !== 0 && email.length !== 0 && password.length !== 0) {
      // eslint-disable-next-line react/prop-types
      // this.props.addUser(this.state);
      await this.props.updateUser(user.id, this.state.data);
    }
    // window.location.reload()
    await this.setState({ emailError: this.props.error ? this.props.error : null });
  };

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    if (this.props.error && this.props.error !== prevProps.error) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        emailError: this.props?.error ? this.props?.error : null,
      });
    }
    if (this.props.errorFromDeleteUser && this.props.errorFromDeleteUser !== prevProps.errorFromDeleteUser) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userDeleteError: this.props?.errorFromDeleteUser ? this.props?.errorFromDeleteUser : null,
      });
    }
  }


  deleteThisOrder=async (id)=>{
    if (this.state.check){
      await this.props.deleteUser(id,this.state.password)
      await this.setState({ userDeleteError: this.props.errorFromDeleteUser ? this.props.errorFromDeleteUser : null });
    }else {
      this.setState({
        blinkMini :"blinkInput"
      })
      setTimeout(() => {
        this.setState({ blinkMini: '' });
      }, 3000);
    }

  }

  render() {
    const { user, status,successDeleteUser} = this.props;
    let {blinkMini} = this.state
    if (status === 'OK') {
      window.location.reload();
    }
    if (successDeleteUser === "Successfully deleted"){
      localStorage.removeItem('token');
      localStorage.removeItem('account');
      localStorage.removeItem('heart');
      localStorage.removeItem('total');
     // return <Redirect to="/" />
      window.location.reload();
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>

          {user
            ? (
              <div className={`blockUser ${''}`}>
                <div className="titleUpdateBlock"><p className="titleUpdate">Update Data</p></div>
                <div className="arrow" />
                <div className="userDataImgContent">
                  {/* eslint-disable-next-line max-len */}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/prop-types */}
                  <div className="closeUpdateBlock" onClick={() => this.props.openUpdateBlock()}><IoIosCloseCircleOutline /></div>
                  {/* eslint-disable-next-line react/prop-types,jsx-a11y/alt-text */}
                  {user.images ? <img src={Utils.fileUrl(user.images)} className="userDataImg" />
                    : <img src={userDef} alt="" className="userDataImg" />}
                </div>
                <div className="userData">
                  <div>
                    <p className="label">First Name</p>
                    {/* <input type="text" placeholder={user.firstName} className="inputsUser"/> */}
                    <input
                      className="inputsUser"
                      id="firstName"
                      type="text"
                      name="firstName"
                      autoComplete="off"
                      // placeholder={user.firstName}
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      onBlur={this.onBlurFirstName}
                    />
                  </div>
                  <div className="line" />
                  <div>
                    <p className="label">Last Name</p>
                    {/* <input type="text" placeholder={user.lastName} className="inputsUser"/> */}
                    <input
                      className="inputsUser"
                      id="lastName"
                      type="text"
                      name="lastName"
                      autoComplete="off"
                      // placeholder={user.lastName}
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      onBlur={this.onBlurLastName}
                    />
                  </div>
                  <div className="line" />

                  <p className="emailErroringUpdate">{this.state.emailError ? this.state.emailError : null}</p>
                  <p className="emailErroringUpdate">{this.state.userDeleteError ? this.state.userDeleteError : null}</p>

                  <div>
                    <p className="label">Email</p>
                    {/* <input type="text" placeholder={user.email} className="inputsUser"/> */}
                    <input
                      className="inputsUser"
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="off"
                      // placeholder={user.email}
                      value={this.state.email}
                      onChange={this.handleChange}
                      onBlur={this.onBlurEmail}
                    />
                  </div>
                  <div className="line" />
                  <div>
                    <p className="label">Password</p>
                    {/* <input type="text" placeholder="new password" className="inputsUser"/> */}
                    <input
                      className="inputsUser"
                      id="password"
                      type="password"
                      name="password"
                      autoComplete="off"
                    // placeholder="new password"
                      onChange={this.handleChange}
                      onBlur={this.onBlurPassword}
                    />
                  </div>
                  <div className="line" />

                  <div>
                    <p className="label">Images</p>
                    <input
                      className="inputsUser"
                      type="file"
                      name="images"
                      accept=".png,.jpg,.jpeg"
                      // value={this.state.images}
                      onChange={this.handleChangeFile}
                    />
                  </div>
                  <div className="line" />

                </div>
                <div className="buttonBlock">
                  <button className="buttonUpdate">Update</button>
                  <p
                    title="You must enter your password"
                    className="buttonUpdate deleteUser"
                    onClick={()=>this.deleteThisOrder(user.id)}
                  >Delete User
                  </p>

                  <div className={`check ${blinkMini}`} >
                    <input type="checkbox" value={this.state.check} onClick={()=>this.setState({
                      check:!this.state.check,
                      blinkMini: ''
                    })}/>
                  </div>
                </div>
              </div>
            )
            : null}
        </form>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.users.user,
  status: state.users.status,
  error: state.users.error,
  errorFromDeleteUser:state.users.errorFromDeleteUser,
  successDeleteUser : state.users.successDel
});

const mapDispatchToProps = {
  getProductFromOrders,
  updateUser,
  deleteUser
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);

export default Container;
