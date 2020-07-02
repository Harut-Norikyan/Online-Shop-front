import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo2 from '../assets/img/core-img/logo2.png';
// eslint-disable-next-line import/named
import { sendEmailRequest } from '../store/actions/email';


class Footer extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  handleSubmit =(ev) => {
    ev.preventDefault();
    // eslint-disable-next-line react/prop-types
    this.props.sendEmailRequest(this.state.email);
  }


  render() {
    return (
      <div>
        <footer className="footer_area clearfix">
          <div className="container">
            <div className="row">

              <div className="col-12 col-md-6">
                <div className="single_widget_area d-flex mb-30">

                  <div className="footer-logo mr-50">

                    <Link to="./">
                      <img src={logo2} alt="" />

                    </Link>
                  </div>

                  <div className="footer_menu">
                    <ul>
                      <li><Link to="/shop">Shop </Link></li>
                      <li><Link to="/blog">Blog </Link></li>
                      <li><Link to="/contact">Contact </Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="single_widget_area mb-30">
                  <ul className="footer_widget_menu">
                    <li><Link to="./">Order Status </Link></li>
                    <li><Link to="./">Payment Options </Link></li>
                    <li><Link to="./">Shipping and Delivery </Link></li>
                    <li><Link to="./">Guides </Link></li>
                    <li><Link to="./">Privacy Policy </Link></li>
                    <li><Link to="./">Terms of Use </Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row align-items-end">

              <div className="col-12 col-md-6">
                <div className="single_widget_area">
                  <div className="footer_heading mb-30">
                    <h6>Subscribe</h6>
                  </div>
                  <div className="subscribtion_form">
                    <form action="">
                      <input
                        type="email"
                        name="mail"
                        className="mail"
                        placeholder="Your email here"
                        onChange={(e) => this.setState({ email: e.target.value })}
                      />
                      <button className="submit">
                        <i
                          onClick={this.handleSubmit}
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="single_widget_area">
                  <div className="footer_social_area">

                    <Link to="./" data-toggle="tooltip" data-placement="top" title="Facebook">
                      <i
                        className="fa fa-facebook"
                        aria-hidden="true"
                      />
                    </Link>

                    <Link to="./" data-toggle="tooltip" data-placement="top" title="Instagram">
                      <i
                        className="fa fa-instagram"
                        aria-hidden="true"
                      />
                    </Link>

                    <Link to="./" data-toggle="tooltip" data-placement="top" title="Twitter">
                      <i
                        className="fa fa-twitter"
                        aria-hidden="true"
                      />
                    </Link>

                    <Link to="./" data-toggle="tooltip" data-placement="top" title="Pinterest">
                      <i
                        className="fa fa-pinterest"
                        aria-hidden="true"
                      />
                    </Link>

                    <Link to="./" data-toggle="tooltip" data-placement="top" title="Youtube">
                      <i
                        className="fa fa-youtube-play"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-12 text-center">
                <p>

                  Copyright &copy;
                  <script>document.write(new Date().getFullYear());</script>
                  All rights reserved | This template is made with

                  <i
                    className="fa fa-heart-o"
                    aria-hidden="true"
                  />
                  by
                  <Link
                    to="https://colorlib.com"
                    target="_blank"
                  >
                    Colorlib
                  </Link>

                </p>
              </div>
            </div>

          </div>
        </footer>
      </div>
    );
  }
}


const mapStateToProps = () => ({});

const mapDispatchToProps = {
  sendEmailRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

export default Container;
