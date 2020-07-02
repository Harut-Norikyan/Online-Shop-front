import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Wrapper from '../components/Wrapper';
import Utils from '../helpers/Utils';
import {getProductByIdRequest} from '../store/actions/getProductById';
import {deleteOrder, getProductFromOrders} from "../store/actions/orders";
import {IoIosCheckmarkCircle} from "react-icons/io";

class WatchList extends Component {
  static propsTypes = {}


  componentDidMount() {
    this.props.getProductFromOrders();
  }
  productRemove = async (i) => {
    // eslint-disable-next-line react/prop-types
    await this.props.deleteOrder(i.orderId);
  }


  render() {

    let {orders} = this.props
    const payedProducts = orders ? orders.filter((orders) => orders.name && orders.type === 'payed') : null;
    return (
      <Wrapper>
        <h2 className="titlePayed">Bought products</h2>
        <div className="containerPayed ">
          {payedProducts ? payedProducts.map((i) => (
            <div style={{backgroundImage: `url(${Utils.fileUrl(i.images)})`}}
                 className="favourite-product-block favourite-product-block-payed " key={i.orderId}>
              <div className="single-product-wrapper single-product-wrapper-payed">
                <div className="content-payed">

                   <span className="product-remove pro pro_payed" onClick={() => this.productRemove(i)}>
                      <i
                        className="fa fa-close proI"
                        aria-hidden="true"
                      />
                    </span>

                      <p style={{color : "#ffffff"}}>{i.name}</p>

                  {i.type === 'payed' ? (
                    <div className="payedBlock">
                      <IoIosCheckmarkCircle/>
                      <p className="payedDesc">payed</p>
                    </div>
                  ) : null}
                  {i.size ?
                    <p className="size">
                      Size:&nbsp;
                      {i.size}
                    </p>
                    : null}
                  {i.color ?
                    <div className="colorSelect">
                      <p>Color:</p>
                      <p className="divColorCart" style={{backgroundColor: `${i.color}`}}/>
                    </div>
                    : null}

                  <p className="color">
                    Price:&nbsp;
                    {i.salePrice ? i.salePrice : i.price}
                    $
                  </p>
                  <p className="color">
                    Quantity: &nbsp;
                    {i.quantity ? i.quantity : null}
                  </p>
                </div>
                </div>

            </div>
          )) : null}

        </div>
      </Wrapper>


    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.order,

  state
});
const mapDispatchToProps = {
  getProductFromOrders,
  deleteOrder
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WatchList);

export default Container;




