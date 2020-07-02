import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-web-tabs';
import ReactStars from 'react-stars';
import memoizeOne from 'memoize-one';
import Select from 'react-select';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Wrapper from '../components/Wrapper';
import 'react-web-tabs/dist/react-web-tabs.css';
import ShareIcon from '../components/ShareIcon';
import { getProductByIdRequest, rateProductsRequest } from '../store/actions/getProductById';
import UtilsFromCarousel from '../helpers/UtilsFromCarousel';
import { sendProductRequest, updateOrder } from '../store/actions/orders';
import 'react-notifications/lib/notifications.css';
import {IoIosRemove} from "react-icons/io"
import {IoIosAdd} from "react-icons/io"
class SingleProductDetails extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    votes: '',
    rating: '',
    count: 1,
    store: localStorage.getItem('heart') || [],
    heart: JSON.parse(localStorage.getItem('heart')),
    color:'',
    size:'',
    heartLength: localStorage.getItem('heart') && JSON.parse(localStorage.getItem('heart')).length,
    blinkSingle: '',
    quantity : 1,
    data: {
      product_id: '',
      color: '',
      size: '',
      quantity: '',
    },
  };


  getProductByIdRequest = memoizeOne((id) => {
    // eslint-disable-next-line react/prop-types
    this.props.getProductByIdRequest(id);
  })

  // eslint-disable-next-line react/sort-comp
  heartClick =(i) => {
    let store = [];
    const heart = JSON.parse(localStorage.getItem('heart'));
    if (heart && heart.some((item) => item.id === i.id)) {
      const filtered = JSON.parse(localStorage.getItem('heart')).filter((key) => key.id !== i.id);
      localStorage.setItem('heart', JSON.stringify(filtered));
      this.setState({
        heart: filtered,
        heartLength: JSON.parse(localStorage.getItem('heart')).length ? JSON.parse(localStorage.getItem('heart')).length : '0',
      });
    } else {
      // eslint-disable-next-line no-unused-expressions
      heart ? store = [...heart, i] : store = [i];
      localStorage.setItem('heart', JSON.stringify(store));
      this.setState({
        heart: store,
        heartLength: localStorage.getItem('heart') && JSON.parse(localStorage.getItem('heart')).length,
      });
    }
  }

  // async componentDidMount() {
  //   const { match: { params: { id } } } = this.props;
  //   this.props.getProductByIdRequest(id);
  // }

  handleSize=(size) => {
    this.setState({
      size: size.label,
    });
  }

  handleColor= (color) => {
     this.setState({
      color: color.color,
    });
  }


  toCart = async (ev) => {
    ev.preventDefault();
    const { orderId } = queryString.parse(this.props.location.search);
    const { product } = this.props;
    const defaultColor = product && product.Attributes.length ? product.Attributes.filter(m=>m.metaKey === 'color') : ''
    const defaultSize =product && product.Attributes.length ?  product.Attributes.filter(m=>m.metaKey === 'size') : ''
    await this.setState({
      data: {
        product_id: product.Attributes[0] ? product.Attributes[0].productId : '',
        color : this.state.color.length ? this.state.color : defaultColor.length ? defaultColor[0]?.metaValue[0] : '',
        size: this.state.size.length ? this.state.size : defaultSize.length ? defaultSize[0]?.metaValue[0] : '',
        quantity: this.state.quantity
      },
    });
    const { orders } = this.props;
    if (orders) {
      if (orderId) {
        this.props.updateOrder(orderId, this.state.data);
        if (NotificationManager.listNotify.length < 1) {
          NotificationManager.success('Product updated successfully.', null, 1000, () => {
          });
        }
      } else if (orders.some((u) =>
        u.productId === this.state.data.product_id
        && u.size === this.state.data.size
        && u.color === this.state.data.color
        && u.quantity === this.state.quantity
        && u.type !== "payed"
      )) {
        if (NotificationManager.listNotify.length < 1) {
          NotificationManager.error('The product with such parameters already exists', null, 2000, () => {
          });
        }
      }
      else {
          this.props.sendProductRequest(this.state.data);
      }
    }
    if (!this.props.token) {
      this.setState({
        blinkSingle: 'loginBlock',
      });
      setTimeout(() => {
        this.setState({ blinkSingle: '' });
      }, 4500);
    }
  }

  stopBlink=() => {
    this.setState({
      blinkSingle: '',
    });
  }


  handleRate=async () => {
    // eslint-disable-next-line react/prop-types
    const { product, match: { params: { id } } } = this.props;
    const { rating } = this.state;
    await this.setState({
      rating,
      // eslint-disable-next-line react/prop-types,react/no-unused-state
      votes: product.rateCount,
    });
    // eslint-disable-next-line react/prop-types,max-len
    await this.props.rateProductsRequest((this.state.rating + product.rate * product.rateCount) / (product.rateCount + 1), id);
  }


  minusQuantity=(ev)=>{
    ev.preventDefault()
    const { product } = this.props;
    const { quantity } = this.state;
    if (product.quantity && quantity >1){
      let {quantity} = this.state
      this.setState({
        quantity : quantity -1
      })
    }

  }
  plusQuantity=(ev)=>{
      ev.preventDefault()
    const { product } = this.props;
    const { quantity } = this.state;
    if (product.quantity && quantity < product.quantity){
      this.setState({
        quantity : quantity +1
      })
    }
  }

  render() {
    const { heart,quantity } = this.state;
    // eslint-disable-next-line no-unused-vars
    const favouriteStore = localStorage.getItem('heart') || [];
    // eslint-disable-next-line react/prop-types
    const { product, match: { params: { id } } } = this.props;
    this.getProductByIdRequest(id);


    const sizeOptions = [
      {  label: product && product.Attributes.length ? product.Attributes.map(m=>{if (m.metaKey === 'size'){
         return  m.metaValue[0]
        }}):null },
    ];

    const colorOptions = [
      { label: product && product.Attributes.length ? product.Attributes.map(m=>{if (m.metaKey === 'color'){
           return <div key={m.id} style={{ backgroundColor: `${m.metaValue[0]}`, color: '#ffffff' }} className="divColor" />
        }}):null  }
    ];


    return (

      <Wrapper
        heart={this.state.heartLength}
        blinkSingle={this.state.blinkSingle}
        stopBlink={() => this.stopBlink()}
      >
        <NotificationContainer />
        <section className="single_product_details_area d-flex align-items-center">
          <div className="single_product_thumb clearfix">
            <div className="product_thumbnail_slides owl-carousel">
              <div style={{ width: '100%', height: 600 }}>
                <Carousel
                  // autoplay
                  wrapAround
                >
                  {/* eslint-disable-next-line react/prop-types */}
                  {product ? JSON.parse(product.images).map((m) => (<img src={UtilsFromCarousel.fileUrl(m)} alt="i" key={m} />)) : null}
                </Carousel>
              </div>
            </div>
          </div>

          {product ? (
            <div className="single_product_desc clearfix">
              <Tabs
                defaultTab="one"
              >
                <TabList>
                  <Tab tabFor="one">Details</Tab>
                  <Tab tabFor="two">Description</Tab>
                  <Tab tabFor="three">Rate</Tab>
                  <Tab tabFor="four">Share</Tab>

                </TabList>
                <TabPanel tabId="one" className="descTab">
                  {/* eslint-disable-next-line react/prop-types */}
                  <span>{product.Categories ? product.Categories[1]?.name : null}</span>
                  <a>
                    {/* eslint-disable-next-line react/prop-types */}
                    <h2>{product.name ? product.name : null}</h2>
                  </a>

                  <p className="product-price">
                    <span className="old-price">
                      $
                      {/* eslint-disable-next-line react/prop-types */}
                      {product.price ? product.price : null}
                    </span>
                    $
                    {/* eslint-disable-next-line react/prop-types */}
                    {product.salePrice ? product.salePrice : null}
                  </p>
                  <p className="product-desc">
                    {/* eslint-disable-next-line react/prop-types */}
                    {product.shortDesc ? product.shortDesc : null}
                  </p>


                  <form className="cart-form clearfix" method="post">

                    <div className="select-box d-flex mt-50 mb-30">

                      {product?.Attributes.length ? (
                          <>
                            <div className="contentSelect">
                              {/* eslint-disable-next-line consistent-return */}
                              {product?.Attributes.map((i) => {
                                  if (i.metaKey === 'size') {
                                    return (
                                    <Select
                                      key={i.id}
                                      className="selects"
                                      defaultValue={sizeOptions[0]}
                                      options={i.metaValue.map((u) => ({ value: u, label: u }))}
                                      onChange={(size) => {
                                        this.handleSize(size);
                                      }}
                                    />
                                  );
                                }
                              }) }
                              {/* eslint-disable-next-line consistent-return */}
                              {product?.Attributes.map((i) => {
                                if (i.metaKey === 'color') {
                                  return (
                                    <Select
                                      key={i}
                                      className="selects"
                                      defaultValue={colorOptions[0]}
                                      options={i.metaValue.map((u) => ({
                                        value: u,
                                        label: (<div style={{ backgroundColor: `${u}`, color: '#ffffff' }} className="divColor" />),
                                        color: u,
                                      }))}
                                      onChange={(color) => {
                                        this.handleColor(color);
                                      }}
                                    />
                                  );
                                }
                              }) }
                            </div>
                            <div className="quantity">
                              <div className='main'>
                                <div className='down_count btn btn-info plusMinus' title='Down' onClick={this.minusQuantity}><IoIosRemove /></div>
                                <input
                                  className='counter'
                                  type="text"
                                  disabled
                                  value={quantity}
                                  onChange={e=>this.setState({
                                    quantity : e.target.value
                                  })}
                                />
                                <div className='up_count btn btn-info plusMinus' title='Up' onClick={this.plusQuantity}><IoIosAdd /></div>
                              </div>
                            </div>
                          </>
                        )
                        : null}
                    </div>

                    <div className="cart-fav-box d-flex align-items-center">

                      <button type="submit" name="addtocart" value="5" className="btn essence-btn" onClick={this.toCart}>
                        Add to
                        cart
                      </button>

                      <div className="product-favourite ml-4">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <div>
                          <i
                            className={`fa fa-heart ${heart && heart.some((b) => b.id === product.id) ? 'act_heart' : 'passive_heart'}`}
                            onClick={() => this.heartClick(product)}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </TabPanel>
                <TabPanel tabId="two" className="descTab">
                  <p className="product-desc">About product</p>
                  <p className="product-desc">
                    {/* eslint-disable-next-line react/prop-types */}
                    {product.longDesc ? product.longDesc : null}
                  </p>
                  <h2>
                    Code of the product is
                    <p className="product-price">
                      {/* eslint-disable-next-line react/prop-types */}
                      {product.sku ? product.sku : null}
                    </p>
                  </h2>
                  <p className="product-price">
                    Still
                    {product?.quantity ? product?.quantity : null}
                    items are available
                  </p>
                </TabPanel>
                <TabPanel tabId="three" className="descTab">
                  <h1>Rate current product</h1>

                  <ReactStars
                    count={5}
                    value={parseInt(this.state.rating)}
                    onChange={(r) => this.setState({
                      rating: r,
                    })}
                    size={48}
                    color2="#ffd700"
                  />
                  <span>
                    {/* eslint-disable-next-line react/prop-types */}
                    {this.props.product.rate ? (this.props.product.rate).toFixed(1) : 0}
                    Current Rate
                  </span>
                  <span>
                    {/* eslint-disable-next-line react/prop-types */}
                    {this.props.product.rateCount ? this.props.product.rateCount : null}
                    votes
                  </span>
                  <button onClick={this.handleRate} className="btn essence-btn"> Rate!</button>

                </TabPanel>
                <TabPanel tabId="four" className="descTab">
                  <h1>Share with your friends at</h1>
                  <ShareIcon />
                </TabPanel>
              </Tabs>
            </div>
          ) : null}
        </section>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  product: state.getProductById.productData.product,
  orders: state.orders.order,
  token: state.users.token,
});

const mapDispatchToProps = {
  getProductByIdRequest,
  sendProductRequest,
  updateOrder,
  rateProductsRequest,

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleProductDetails);

export default Container;
