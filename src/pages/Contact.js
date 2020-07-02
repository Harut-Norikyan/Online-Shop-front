import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import bag from '../assets/img/core-img/bag.svg';
import product1 from '../assets/img/product-img/product-1.jpg';
import product2 from '../assets/img/product-img/product-2.jpg';
import product3 from '../assets/img/product-img/product-3.jpg';
import Wrapper from '../components/Wrapper';

class Contact extends Component {
  render() {
    return (
      <Wrapper>

        <div className="right-side-cart-area">
          <div className="cart-button">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="" id="rightSideCart">
              <img src={bag} alt="" />
              {' '}
              <span>3</span>
            </Link>
          </div>

          <div className="cart-content d-flex">


            <div className="cart-list">

              <div className="single-cart-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link to="" className="product-image">
                  <img src={product1} className="cart-thumb" alt="" />

                  <div className="cart-item-desc">
                    <span className="product-remove">
                      <i
                        className="fa fa-close"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="badge">Mango</span>
                    <h6>Button Through Strap Mini Dress</h6>
                    <p className="size">Size: S</p>
                    <p className="color">Color: Red</p>
                    <p className="price">$45.00</p>
                  </div>
                </Link>
              </div>


              <div className="single-cart-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link to="" className="product-image">
                  <img src={product2} className="cart-thumb" alt="" />

                  <div className="cart-item-desc">
                    <span className="product-remove">
                      <i
                        className="fa fa-close"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="badge">Mango</span>
                    <h6>Button Through Strap Mini Dress</h6>
                    <p className="size">Size: S</p>
                    <p className="color">Color: Red</p>
                    <p className="price">$45.00</p>
                  </div>
                </Link>
              </div>


              <div className="single-cart-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link to="" className="product-image">
                  <img src={product3} className="cart-thumb" alt="" />

                  <div className="cart-item-desc">
                    <span className="product-remove">
                      <i
                        className="fa fa-close"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="badge">Mango</span>
                    <h6>Button Through Strap Mini Dress</h6>
                    <p className="size">Size: S</p>
                    <p className="color">Color: Red</p>
                    <p className="price">$45.00</p>
                  </div>
                </Link>
              </div>
            </div>


            <div className="cart-amount-summary">

              <h2>Summary</h2>
              <ul className="summary-table">
                <li>
                  <span>subtotal:</span>
                  {' '}
                  <span>$274.00</span>
                </li>
                <li>
                  <span>delivery:</span>
                  {' '}
                  <span>Free</span>
                </li>
                <li>
                  <span>discount:</span>
                  {' '}
                  <span>-15%</span>
                </li>
                <li>
                  <span>total:</span>
                  {' '}
                  <span>$232.00</span>
                </li>
              </ul>
              <div className="checkout-btn mt-100">
                <Link to="/checkout" className="btn essence-btn">check out</Link>
              </div>
            </div>
          </div>
        </div>


        <div className="contact-area d-flex align-items-center">

          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.5760304829273!2d43.842519314907236!3d40.79333404057366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ3JzM2LjAiTiA0M8KwNTAnNDEuMCJF!5e0!3m2!1sru!2s!4v1590418592229!5m2!1sru!2s"
              className="addressMap"
              tabIndex="0"
            />
          </div>
          <div className="contact-info">
            <h2>How to Find Us</h2>
            <p>
              {/* eslint-disable-next-line max-len */}
              Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit
              id urna vehicula, nec maximus est sollicitudin.
            </p>

            <div className="contact-address mt-50">
              <p>
                <span>address:</span>
                {' '}
                10 Suffolk st Soho, London, UK
              </p>
              <p>
                <span>telephone:</span>
                {' '}
                +12 34 567 890
              </p>
              <p><Link to="mailto:contact@essence.com">contact@essence.com</Link></p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);
export default Container;
