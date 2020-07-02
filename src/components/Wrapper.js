import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Wrapper extends Component {
  render() {
    return (
      <>
        {/* eslint-disable-next-line max-len */}
        <Header heart={this.props?.heart} history={this.props} blinkSingle={this.props?.blinkSingle} stopBlink={this.props?.stopBlink} />
        {/* eslint-disable-next-line react/prop-types */}
        {this.props.children}
        <Footer />
      </>
    );
  }
}

export default Wrapper;
