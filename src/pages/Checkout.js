import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Accordion, AccordionItem } from 'react-sanfona';
import ClipLoader from 'react-spinners/ClipLoader';
import CheckoutForm from '../components/CheckoutForm';
import Wrapper from '../components/Wrapper';
import breadcumb from '../assets/img/bg-img/breadcumb.jpg';

const stripe = loadStripe('pk_test_ao0GC8lcGlxwdCe0RSew6T9x');

class Checkout extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      billing_details: {
        first_name: JSON.parse(localStorage.getItem('account'))?.firstName,
        last_name: JSON.parse(localStorage.getItem('account'))?.lastName,
        email: JSON.parse(localStorage.getItem('account'))?.email,
        company: '',
        country: '',
        address: '',
        post_code: '',
        town_city: '',
        province: '',
        phone_number: '',
      },
      totalArr: [],
      loading: false,
    };
  }

   componentDidMount() {
     this.setState({
      totalArr: JSON.parse(localStorage.getItem('total')),
    });

  }


  handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({
      billing_details: {
        // eslint-disable-next-line react/no-access-state-in-setstate
        ...this.state.billing_details,
        [name]: value,
      },
    });
  }

  // handleChange = (event) => {
  //   const { name } = event.target;
  //   const { value } = event.target;
  //   if (event.target.value){
  //     this.setState({
  //       billing_details: {
  //         // eslint-disable-next-line react/no-access-state-in-setstate
  //         ...this.state.billing_details,
  //         [name]: value,
  //       },
  //     })
  //   }else {
  //     console.log('error')
  //   }
  // }

  loading=  () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  }


  render() {
    const { billing_details, totalArr,loading } = this.state;
    // let newTotalArr = totalArr ? totalArr.filter(totalArr => totalArr.type!=="payed") : null
    // eslint-disable-next-line no-shadow
    const newTotalArr = totalArr ? totalArr.filter((totalArr) => totalArr.name && totalArr.type !== 'payed') : null;
    // console.log(billing_details,"billing_details")
    // console.log(this.state.loading)
    return (
      <Wrapper>
        {loading?
          <div className="sweet-loading-container">
            <h3 className="loading">Loading</h3>
            <div className="sweet-loading">
              <ClipLoader
                css={{
                  display: 'block',
                  margin: ' 0 auto',
                  border: '4px solid #FF0000',
                }}
                size={150}
                color="#123abc"
                loading={this.state.loading}
              />


            </div>
          </div>
          : null}

        {/* <Loading className="aasdsd"/> */}
        <div className="breadcumb_area bg-img" style={{ backgroundImage: `url(${breadcumb})` }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="page-title text-center">
                  <h2>Checkout</h2>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="checkout_area section-padding-80">
          <div className="container">
            <div className="row">

              <div className="col-12 col-md-6">
                <div className="checkout_details_area mt-50 clearfix">

                  <div className="cart-page-heading mb-30">
                    <h5>Billing Address</h5>
                  </div>

                  <form action="#" method="post">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="first_name">
                          First Name
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          value={billing_details.first_name}
                          onChange={this.handleChange}
                          onBlur={this.onBlurFirstName}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="last_name">
                          Last Name
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          value={billing_details.last_name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="col-12 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="company">Company Name</label>
                        <input
                          type="text"
                          name="company"

                          className="form-control"
                          id="company"
                          value={billing_details.company}
                          onChange={this.handleChange}

                        />
                      </div>
                      <div className="col-12 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="country">
                          Country
                          <span>*</span>
                        </label>
                        <select
                          className="w-100"
                          id="country"
                          name="country"
                          onChange={this.handleChange}
                        >
                          <option value="usa">United States</option>
                          <option value="uk">United Kingdom</option>
                          <option value="ger">Germany</option>
                          <option value="fra">France</option>
                          <option value="ind">India</option>
                          <option value="aus">Australia</option>
                          <option value="bra">Brazil</option>
                          <option value="cana">Canada</option>
                        </select>
                      </div>
                      <div className="col-12 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="street_address">
                          Address
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          id="street_address"
                          value={billing_details.address}
                          name="address"
                          onChange={this.handleChange}

                        />

                      </div>
                      <div className="col-12 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="postcode">
                          Postcode
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="postcode"
                          name="post_code"
                          value={billing_details.post_code}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="city">
                          Town/City
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="town_city"
                          value={billing_details.town_city}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="state">
                          Province
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="province"
                          value={billing_details.province}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="phone_number">
                          Phone No
                          <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                          min="0"
                          value={billing_details.phone_number}
                          onChange={this.handleChange}

                        />
                      </div>
                      <div className="col-12 mb-4">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="email_address">
                          Email Address
                          <span>*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email_address"
                          name="email"
                          value={billing_details.email}
                          onChange={this.handleChange}

                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
                <div className="order-details-confirmation">

                  <div className="cart-page-heading">
                    <h5>Your Order</h5>
                    <p>The Details</p>
                  </div>

                  <ul className="order-details-form mb-4">
                    <li>
                      <span>Product</span>

                      <span>Total</span>
                    </li>

                    {newTotalArr ? newTotalArr.map((m) => (
                     <ul key={m.orderId}>
                       <li>
                         <span>{m.name ? m.name : null}</span>
                         <span>
                          $
                           {m.price ? m.price : null}
                        </span>
                       </li>
                     </ul>
                    )) : null}

                    <li>
                      <span>Subtotal</span>
                      {/* eslint-disable-next-line no-shadow */}
                      {totalArr ? totalArr.filter((totalArr) => totalArr.subTotalPrice).map((m) => (
                        <span key={m.subTotalPrice}>
                          $
                          {m.subTotalPrice}
                        </span>
                      )) : null}
                    </li>
                    <li>
                      <span>Shipping</span>
                      <span>Free</span>
                    </li>
                    {newTotalArr && newTotalArr.length >= 10 ? (
                      <li>
                        <span>discount:</span>
                        <span style={{ color: 'red' }}>-15%</span>
                      </li>
                    ) : null}
                    <li>
                      <span>Total</span>
                      {/* eslint-disable-next-line no-shadow */}
                      {totalArr ? totalArr.filter((totalArr) => totalArr.totalPrice).map((m) => (
                        <span key={m.totalPrice} style={{ color: 'red', fontSize: '14px' }}>
                          $
                          {m.totalPrice}
                        </span>
                      )) : null}
                    </li>
                  </ul>

                  <div id="accordion" role="tablist" className="mb-4">
                    <Accordion>

                      <AccordionItem title="CREDIT CARD">
                        <div>
                          <Elements stripe={stripe}>

                            <ElementsConsumer>
                              {/* eslint-disable-next-line no-shadow */}
                              {({ elements, stripe }) => (
                                <CheckoutForm
                                  elements={elements}
                                  stripe={stripe}
                                  billing_details={this.state.billing_details}
                                  loading={this.loading}
                                />
                              )}
                            </ElementsConsumer>
                          </Elements>
                        </div>
                      </AccordionItem>
                      <AccordionItem title="PAYPAL">
                        <div>
                          Item 2 content
                        </div>
                      </AccordionItem>
                      <AccordionItem title="DELIVERY CASH">
                        <div>
                          Item 3 content
                        </div>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);

export default Container;
