import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CardElement } from '@stripe/react-stripe-js';


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {

      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',

    },
  },
};

// eslint-disable-next-line no-unused-vars
const createOptions = (fontSize, padding) => ({
  style: {
    base: {
      fontSize,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding,
    },
    invalid: {
      color: '#9e2146',
    },
  },
}); class CardSection extends Component {
  render() {
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className="cardLabel">

        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>

    );
  }
}

export default CardSection;
