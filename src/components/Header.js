import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  MDBCard, MDBCol, MDBContainer, MDBRow,
} from 'mdbreact';
import { IconContext } from 'react-icons';
import { IoIosCloseCircleOutline, IoIosLogOut } from 'react-icons/io';
import queryString from 'query-string';
import InfiniteList from 'react-infinite-scroll-list';
import DropdownMenu from './DropdownMenu';
import logo from '../assets/img/core-img/logo.png';
import heart from '../assets/img/core-img/heart.svg';
import userIcon from '../assets/img/core-img/user.svg';
import bag from '../assets/img/core-img/bag.svg';
import bg6 from '../assets/img/bg-img/bg-6.jpg';
import Cart from './Cart';
import Registration from './Registration';
import Login from './Login';
import Utils from '../helpers/Utils';
import UpdateUser from './UpdateUser';
import { getProductsRequest, searchProductRequest } from '../store/actions/getProducts';
import { getProductByIdRequest } from '../store/actions/getProductById';
import { getProductFromOrders } from '../store/actions/orders';
import { getCategoryRequest } from '../store/actions/category';
import LoadingBar from 'react-redux-loading-bar'
import ChatFlow from "./ChatFlow";

class Header extends Component {
  static propTypes = {};


  constructor(props) {
    super(props);
    this.state = {
      showMenu: -1,
      showCart: false,
      sticky: false,
      showRegistrationPage: false,
      showLoginPage: false,
      transitionBlock: false,
      showSearch: false,
      hearted: JSON.parse(localStorage.getItem('heart')),
      openUpdateBlock: false,
      blink: '',
      close: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // eslint-disable-next-line react/prop-types
    this.props.getProductFromOrders();
    // eslint-disable-next-line react/prop-types
    this.props.getCategoryRequest();
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  handleScroll = () => {
    const { sticky } = this.state;
    const top = Math.max(document.getElementsByTagName('html')[0].scrollTop, document.body.scrollTop);
    if (top > 10 && !sticky) {
      this.setState({
        sticky: true,
      });
    } else if (top <= 10 && sticky) {
      this.setState({
        sticky: false,
      });
    }
  };

  setMenuIndex = (showMenu) => {
    this.setState({ showMenu });
  };

  handleShowCart = () => {
    if (this.props?.token) {
      const { showCart } = this.state;
      this.setState({
        showCart: !showCart,
      });
    } else {
      this.setState({
        blink: 'loginBlock',
      });
      setTimeout(() => {
        this.setState({ blink: '' });
      }, 4500);
    }
  };

  transition = (ev) => {
    ev.preventDefault();
    const { transitionBlock } = this.state;
    this.setState({
      transitionBlock: !transitionBlock,
      blink: '',
      openUpdateBlock: false,
    });
    if (this.props?.blinkSingle) {
      // eslint-disable-next-line react/prop-types
      this.props.stopBlink();
    }
  }

  handleLogin=(ev) => {
    ev.preventDefault();
    this.setState({
      transitionBlock: false,
      showLoginPage: true,
    });
  }

  handleRegistration=(ev) => {
    ev.preventDefault();
    this.setState({
      transitionBlock: false,
      showRegistrationPage: true,
    });
  }

  closeLoginPage = () => {
    this.setState({
      showLoginPage: false,
    });
  }

  closeRegistrationPage = () => {
    this.setState({
      showRegistrationPage: false,
    });
  }

  create=() => {
    this.setState({
      showLoginPage: false,
      showRegistrationPage: true,
    });
  }


  clickHere=() => {
    this.setState({
      showRegistrationPage: false,
      showLoginPage: true,
    });
  }

  deleteToken=() => {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    localStorage.removeItem('heart');
  }

  openUpdateBlock=() => {
    const { openUpdateBlock } = this.state;
    this.setState({
      transitionBlock : false,
      openUpdateBlock: !openUpdateBlock,
    });
  }


  handleSearch= async (key, value) => {
    const queryObj = queryString.parse(window.location.search);
    queryObj[key] = value;
    const query = queryString.stringify(queryObj);
    const loc = window.location.origin + window.location.pathname;
    await window.history.pushState(`${query}`, `${loc}?${query}`, `${loc}?${query}`);
    // eslint-disable-next-line react/prop-types
    await this.props.searchProductRequest(queryObj);
    // eslint-disable-next-line react/prop-types
    await this.props.getProductsRequest(queryObj);
  }

  onBlurCloseSearch=() => {
    if (!this.state.close) {
      this.setState({
        showSearch: false,
      });
    }
  }

  render() {
    const {
      showMenu, showCart, showLoginPage, transitionBlock, showRegistrationPage, sticky, showSearch,
      openUpdateBlock, blink,
    } = this.state;
    const {
      // eslint-disable-next-line react/prop-types
      token, userImg, userName, orders,  blinkSingle, categories,user
    } = this.props;
    // eslint-disable-next-line react/prop-types
    const brand = categories.filter((b) => b.type === 'brand');
    const category = categories.filter((c) => c.type === 'category');
    const toCheckOutArr = orders ? orders.filter((orders) => orders.name && orders.type !== 'payed') : null;
    return (
      <div>

        {openUpdateBlock ? null :<ChatFlow className="asasa"/>}

        {openUpdateBlock ? <UpdateUser openUpdateBlock={this.openUpdateBlock} /> : null}
        <header className={`header_area ${sticky ? 'sticky' : ''}`}>
          {transitionBlock ? (
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
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
                        <div onClick={this.transition}>
                          <IoIosCloseCircleOutline />
                        </div>
                      </IconContext.Provider>
                      <div
                        className="text-white rgba-stylish-strong py-5 px-5 z-depth-4"
                        style={{
                          height: 400,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {/*<div className="settings">*/}
                        {/*  <IoMdSettings />*/}
                        {/*</div>*/}
                        <form className="form" style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {!token ? <input className="submit logReg" type="submit" value="Login" onClick={this.handleLogin} /> : null}
                            {/*{token ? <input className="submit" type="submit" value="Log Out" onClick={this.deleteToken} />*/}
                            {/*  : null}*/}
                            {token ? <div className="logOut_update">
                              <input className="submit" type="submit" value="Settings"
                                     onClick={this.openUpdateBlock}
                              />
                              <input className="submit " type="submit" value="Log Out" onClick={this.deleteToken} />
                            </div> :null}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {!token ? <input className="submit logReg" type="submit" value="Registration" onClick={this.handleRegistration} /> : null}
                          </div>
                        </form>
                      </div>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          ) : null}
          {/* eslint-disable-next-line max-len */}
          {showLoginPage ? <Login closeLoginPage={this.closeLoginPage} create={this.create} /> : null}
          {/* eslint-disable-next-line max-len */}
          {showRegistrationPage ? <Registration closeRegistrationPage={this.closeRegistrationPage} clickHere={this.clickHere} /> : null}

          <div
            className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between"
          >

            <CSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              {showCart ? <Cart handleShowCart={this.handleShowCart} /> : null}
            </CSSTransitionGroup>

            <nav className="classy-navbar" id="essenceNav">
              <Link className="nav-brand" to="/">
                <img
                  src={logo}
                  alt=""
                  onMouseLeave={() => this.setMenuIndex(-1)}
                />
              </Link>                  <input type="checkbox" id="res_menu" className="res_menu_check"/>
              <div className="classy-navbar-toggler">
                <label htmlFor="res_menu" className="res_menu">

                <span className="navbarToggler">

                  <span className="navbarSpanTop" />
                  <span className="navbarSpanMiddle" />
                  <span className="navbarSpanBottom" />
                </span>
                </label>
              </div>

              <nav className="nav_bar">
                <ul className="nav_link">
                  <li className="links"><Link className="nav_ref" to="/">Home</Link>
                  </li>
                  <li className="links"><Link className="nav_ref" to="/shop/?page=1">Shop</Link>
                  </li>

                  <li className="links"><Link className="nav_ref" to="/blog">Blog</Link></li>
                  <li className="links"><Link className="nav_ref" to="/regular-page">Regular Page</Link></li>
                  <li className="links"><Link className="nav_ref" to="/contact">Contact</Link></li>

                </ul>
              </nav>
              <div className="classy-menu">
                <div className="classycloseIcon">
                  <div className="cross-wrap">
                    <span className="top" />
                    <span
                      className="bottom"
                    />
                  </div>
                </div>
                <div className="classynav">
                  <ul>
                    <li>
                      <Link
                        to="/shop/?page=1"
                        onMouseEnter={() => this.setMenuIndex(1)}
                      >
                        Shop
                        <div>&gt;</div>
                      </Link>
                      <DropdownMenu
                        open={showMenu === 1}
                      >

                        <div
                          className="megamenu megadropdown"
                          onMouseLeave={() => this.setMenuIndex(-1)}
                        >
                          {brand ? brand.map((b) => (
                            <ul key={b.id} className="single-mega cn-col-4">
                              <li className="title">{b.name}</li>
                              {category ? category.map((i) => (
                                <li key={i.id}>
                                  <Link to={`/shop/?categories=${i.id}-${b.id}&page=1`}>{i.name}</Link>
                                </li>

                              )) : null}
                            </ul>
                          )) : null}

                          <div className="single-mega cn-col-4">
                            <img src={bg6} alt="" />
                          </div>
                        </div>
                      </DropdownMenu>
                    </li>
                    <li>
                      <a
                        onMouseEnter={() => this.setMenuIndex(2)}
                      >
                        Pages

                        <div> &gt;</div>
                      </a>
                      <ul
                        className="dropdown"
                        onMouseLeave={() => this.setMenuIndex(-1)}
                      >
                        <DropdownMenu open={showMenu === 2}>
                          <li>

                            <Link to="/">Home</Link>
                          </li>
                          <li>

                            <Link to="/shop/?page=1">Shop</Link>
                          </li>
                          <li>

                            <Link to="/blog">Blog</Link>
                          </li>

                          <li>

                            <Link to="/regular-page">Regular Page</Link>
                          </li>
                          <li>

                            <Link to="/contact">Contact</Link>
                          </li>
                          <li>
                            <Link to="/payed-products">Bought products</Link>
                          </li>
                        </DropdownMenu>
                      </ul>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>

                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="header-meta d-flex clearfix justify-content-end">
              <div
                className="search-area"
              >
                <form action="#" method="post">
                  <input
                    type="search"
                    name="search"
                    id="headerSearch"
                    placeholder="Type for search"
                    autoComplete="off"
                    onChange={(value) => this.handleSearch('s', value.target.value)}
                    onFocus={() => this.setState({ showSearch: true })}
                    // onBlur={() => this.setState({showSearch: false})}
                    onBlur={this.onBlurCloseSearch}

                  />
                  <button type="submit">
                    <i className="fa fa-search" aria-hidden="true" />
                  </button>
                </form>
                {showSearch ? (
                  <div
                    onMouseOver={() => this.setState({
                      close: true,
                    })}
                    onMouseOut={() => this.setState({
                      close: false,
                    })}
                  >
                    <InfiniteList
                      root="container"
                      isLoading
                      isEndReached
                      containerClassName="InfiniteList"
                      sentinelClassName="custom-sentinel-class-name"
                      containerTagName="div"
                      sentinelTagName="div"
                      threshold={0}
                      onReachThreshold={()=> 1}
                    >
                      {this.props.searchedProducts.length === 0
                        ? <div className="InfiniteList__Item"
                               onClick={()=>this.setState({
                                 showSearch : false,
                                 close : false
                               })}
                        >There are no products</div>
                        : this.props.searchedProducts.map((item) => (
                          <div
                            key={item.id}
                            className="InfiniteList__Item"
                            onClick={()=>this.setState({
                              showSearch : false,
                              close : false
                            })}
                          >
                            <Link to={`/single-product-details/${item.id}`}>{item.name}</Link>
                          </div>
                        ))}
                    </InfiniteList>
                  </div>
                ) : null}

              </div>

              <div className="cart-area">

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link to="/watchlist" id="essenceCartBtn">
                  <img src={heart} alt="" />
                  <span>{this.props.heart || this.state.hearted && this.state.hearted.length}</span>
                </Link>
              </div>

              <div className="user-login-info ">
                {/*  <Link to="./" onClick={this.transition}><img src={user} alt="" /></Link> : */}
                <div className={`${blink} ${blinkSingle}`} />
                {userImg
                  ? (
                    <div className="imgBlock" onClick={this.transition}>
                      <img src={Utils.fileUrl(userImg)} className="imgUser" />
                      <p title={userName}>
                        Log Out
                        <IoIosLogOut />
                      </p>
                    </div>
                  )
                  : null}
                {userName && !userImg
                  ? (
                    <div className="imgBlock" onClick={this.transition}>
                      <h6>{userName}</h6>
                      <p>
                        Log Out
                        <IoIosLogOut />
                      </p>
                    </div>
                  )
                  : null}
                {!userName && !userImg
                  ? (
                    <Link to="./" onClick={this.transition}>
                      <img src={userIcon} alt="" />
                    </Link>
                  ) : null}

              </div>
              <div className="cart-area">

                <Link onClick={this.handleShowCart} to="#" id="essenceCartBtn">
                  <img src={bag} alt="" />

                  {/*<span>{orders ? orders.length : 0}</span>*/}
                  <span>{toCheckOutArr ? toCheckOutArr.length : 0}</span>

                </Link>
              </div>
            </div>
          </div>
          <LoadingBar progressIncrease={90} style={{ backgroundColor: 'red', height: '3px'}}/>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.users.token,
  userImg: state.users?.user?.images,
  userName: state.users?.user?.firstName,
  searchedProducts: state.getProducts.searchedProducts || [],
  orders: state.orders?.order,
  user: state.users?.user,
  categories: state.category.categories.categories || [],

});

const mapDispatchToProps = {
  searchProductRequest,
  getProductByIdRequest,
  getProductsRequest,
  getProductFromOrders,
  getCategoryRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default Container;
