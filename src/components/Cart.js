import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import bag from '../assets/img/core-img/bag.svg';
import Utils from '../helpers/Utils';
import { deleteOrder, getProductFromOrders } from '../store/actions/orders';
import Select from "react-select";
import UtilsFromCarousel from "../helpers/UtilsFromCarousel";
import {Redirect} from "react-router-dom";

class Cart extends Component {
  static propTypes = {};

  // eslint-disable-next-line react/state-in-constructor
  state = {
    totalArray: [],
    totalPrice: {},
    subTotalPrice: {},
    redirect : false
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
      this.props.getProductFromOrders();
  }

  handleShowCart = () => {
    // eslint-disable-next-line react/prop-types
    this.props.handleShowCart();
  };

  productRemove = async (m) => {
    // eslint-disable-next-line react/prop-types
    await this.props.deleteOrder(m.orderId);
  }


  toCheckOut = async (sum, total) => {
    let { totalArray} = this.state;
    await this.setState({
      // eslint-disable-next-line react/no-unused-state
      sumPrice: {
        sumPrice: sum,
      },
      // eslint-disable-next-line react/no-unused-state
      totalPrice: {
        totalPrice: total,
      },

    });
    // eslint-disable-next-line react/prop-types
    const { orders } = this.props;
    if (orders) {
      totalArray = [{ subTotalPrice: sum }, { totalPrice: total }, ...orders];
      localStorage.setItem('total', JSON.stringify(totalArray));
      this.setState({
        redirect :true
      })
    }
      this.props.handleShowCart();
  }


  render() {
    const { token, orders } = this.props;
    const toCheckOutArr = orders ? orders.filter((orders) => orders.name && orders.type !== 'payed') : null;
    const payedProducts = orders ? orders.filter((orders) => orders.name && orders.type === 'payed') : null;
    const sum = toCheckOutArr && toCheckOutArr.length ? toCheckOutArr.map((m) => m.price * m.quantity).reduce((previousValue, currentValue) => previousValue + currentValue) : 0;
    const total = toCheckOutArr && toCheckOutArr.length < 10 ? sum : sum - (sum * 15 / 100)
    if (this.state.redirect && token && toCheckOutArr.length !==0){
      return <Redirect to="/checkout" />
    }
    return (
      <div className="right-side-cart-area showCart">
        <div onClick={this.handleShowCart} className="cart-button">
          <a id="rightSideCart" style={{ cursor: 'pointer' }}>
            <img src={bag} alt="" />
            {toCheckOutArr ? <span>{toCheckOutArr.length}</span> : null}
          </a>
        </div>

        <div className="cart-content d-flex">
          <div className="cart-list scrollbar" id="style-1">


            {orders ? orders.filter(f=>f.type !== "payed").map((m) => (
              <div className="single-cart-item" key={m.orderId}>
                {/* eslint-disable-next-line max-len */}
                <div className="product-image">
                  {/* <img src={product1} className="cart-thumb" alt="" /> */}

                  <img className="payedImg" src={Utils.fileUrl(m.images)} alt="" />

                  <div className="cart-item-desc">
                    <span className="product-remove pro" onClick={() => this.productRemove(m)}>
                      <i
                        className="fa fa-close proI"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="badge">{m.name}</span>

                    {m.type !== 'payed' ? (
                      <Link
                        to={`/single-product-details/${m.productId}?orderId=${m.orderId}`}
                        onClick={this.handleShowCart}
                      >
                        <h6>{m.name}</h6>
                      </Link>
                    ) : (
                      <Link to="">
                        <h6>{m.name}</h6>
                      </Link>
                    )}

                    {m.type === 'payed' ? (
                      <div className="payedBlock">
                        <IoIosCheckmarkCircle />
                        <p className="payedDesc">payed</p>
                      </div>
                    ) : null}
                    {m.size ?
                      <p className="size">
                        Size:&nbsp;
                        {m.size}
                      </p>
                      :null}
                    {m.color ?
                      <div className="colorSelect">
                        Color:
                        <p className="divColorCart" style={{ backgroundColor: `${m.color}` }} />
                      </div>
                      :null}
                    <p className="color">
                      Quantity: &nbsp;
                      {m.quantity ? m.quantity : null}
                    </p>
                    <p className="color">
                      Price:&nbsp;
                      {m.salePrice ? m.salePrice : m.price}
                      $
                    </p>
                    <p className="color">
                     Total Price:&nbsp;
                      {m.salePrice ? m.salePrice * m.quantity : m.price* m.quantity}
                      $
                    </p>

                  </div>
                </div>

              </div>
            )) : null}
          </div>


          <div className="cart-amount-summary">
            <h2>Summary</h2>
            <ul className="summary-table">
              <li>
                <span>subtotal:</span>
                <span>
                  {sum}
                  $
                </span>
              </li>

              {toCheckOutArr && toCheckOutArr.length >= 10 ? (
                <li>
                  <span>discount:</span>
                  <span style={{ color: 'red' }}>-15%</span>
                </li>
              ) : null}
              <li>
                <span>total:</span>

                <span>
                  {total}
                  $
                </span>
              </li>
            </ul>
            <div className="checkout-btn mt-100">
              <a
                onClick={() => this.toCheckOut(sum, total)}
                className="btn essence-btn"
                // to={token && toCheckOutArr ? '/checkout' : null}
              >
                check out
              </a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  token: state.users.token,
  user: state.users.user,
  orders: state.orders.order,
  ordersCount: state.orders.ordersCount,
  status: state.orders.status,
});

const mapDispatchToProps = {
  getProductFromOrders,
  deleteOrder,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);

export default Container;
