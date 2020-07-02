import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CardElement } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CardSection from './CardSection';
import { paymentPayedRequest, paymentResultRequest, sendToPayment } from '../store/actions/orders';
import {Redirect} from "react-router-dom";



class CheckoutForm extends Component {
  static propsTypes = {}


  async componentDidMount() {
    const totalArr = JSON.parse(localStorage.getItem('total'));
    // eslint-disable-next-line max-len,no-shadow
    const total = totalArr ? totalArr.filter((totalArr) => totalArr.totalPrice).map((m) => m.totalPrice) : null;
    // eslint-disable-next-line no-shadow
    const newTotalArr = totalArr ? totalArr.filter((totalArr) => totalArr.name && totalArr.type !== 'payed') : null;
    // eslint-disable-next-line react/prop-types
    this.props.paymentResultRequest(total ? Math.floor(total[0]) : null, newTotalArr || null);
  }


  handleSubmit = async (ev) => {
    ev.preventDefault();
    this.props.loading()
    // eslint-disable-next-line react/prop-types
    if (this.props.clientSecret) {

      const { billing_details, stripe, elements } = this.props;
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(this.props.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name:
              billing_details.first_name + "," +
              billing_details.last_name,
            address:
              billing_details.address +"," +
              billing_details.country +"," +
              billing_details.province +"," +
              billing_details.town_city +"," +
              billing_details.post_code,
            phone: billing_details.phone_number,
            email: billing_details.email,
          },
        },
      });
      if (result.error) {
        this.props.loading()
        if (NotificationManager.listNotify.length < 1) {
          NotificationManager.warning('Wrong data', null, 2000, () => {
          });
        }
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          this.props.loading();
          await this.props.paymentPayedRequest();
          const totalArr = JSON.parse(localStorage.getItem('total'));
          await this.props.sendToPayment(totalArr);
          localStorage.removeItem('total');
        }
      }
    } else if (NotificationManager.listNotify.length < 1) {
      NotificationManager.error('Wrong data', null, 3000, () => {
      });
    }
  };


  render() {
    if (this.props?.status === 'OK') {
      // eslint-disable-next-line react/prop-types
      if (NotificationManager.listNotify.length < 1) {
        NotificationManager.success('The purchases were successful', null, 3000, () => {
        });
       // window.location.reload();
         return <Redirect to="/shop"/>   //// Or so
      }
    }
    return (
      <>
        <NotificationContainer />
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          {/* eslint-disable-next-line react/prop-types,react/button-has-type */}
          <button disabled={!this.props.stripe} className="btn essence-btn">Confirm order</button>
        </form>
      </>

    );
  }
}
const mapStateToProps = (state) => ({
  clientSecret: state.orders.clientSecret,
  status: state.orders.status,
});
const mapDispatchToProps = {
  paymentResultRequest,
  paymentPayedRequest,
  sendToPayment,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutForm);
export default Container;
