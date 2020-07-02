import React, { Component } from 'react';

class Input extends Component {
  render() {
    const {
      // eslint-disable-next-line react/prop-types
      input, label, type, meta: { touched, error, warning },
    } = this.props;
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>{label}</label>
        <div>
          <input {...input} type={type} />
          {touched && error ? <span>{error}</span> : null}
          {touched && warning ? <span>{warning}</span> : null}
        </div>
      </div>
    );
  }
}

export default Input;
