import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Wrapper from '../components/Wrapper';
import Utils from '../helpers/Utils';
import { getProductByIdRequest } from '../store/actions/getProductById';
import breadcumb from "../assets/img/bg-img/breadcumb.jpg";

class WatchList extends Component {
  static propsTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      favouriteProducts:localStorage.getItem('heart')?JSON.parse(localStorage.getItem('heart')):[],
      heartLength: localStorage.getItem('heart') && JSON.parse(localStorage.getItem('heart')).length,
      heart: JSON.parse(localStorage.getItem('heart')),
    };
  }

  // handleQuickView=(i) => {
  //   // eslint-disable-next-line react/prop-types
  //   this.props.getProductByIdRequest(i.id);
  // }
  heartClick=(i) => {
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

  render() {
    const { heart } = this.state;
    const favouriteProducts=localStorage.getItem('heart')?JSON.parse(localStorage.getItem('heart')):[];
    return (
      <Wrapper heart={this.state.heartLength}>
        <div className="breadcumb_area bg-img" style={{ backgroundImage: `url(${breadcumb})` }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="page-title text-center">
                  <h2>WatchList</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container h-100">
          <div className="watchList">
            <div className="row">
              {favouriteProducts.length !==0?

                favouriteProducts.map((i) => (
                  <div className="col-12 col-sm-6 col-lg-4 favourite-product-block" key={i.id}>
                    <div className="single-product-wrapper">

                      <div className="product-img">

                        <img src={Utils.fileUrl(i.images)} alt="i"/>

                        <div className="product-favourite">
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

                          <div>
                            <i
                              className={`fa fa-heart heart_icon ${heart && heart.some((b) => b.id === i.id) ? 'active_heart' : 'passive_heart'}`}
                              onClick={() => this.heartClick(i)}
                            />
                          </div>
                        </div>

                      </div>


                      <div className="product-description">
                        <span>Category</span>
                        <Link to={`/single-product-details/${i.id}`}>
                          <h6>{i.name}</h6>
                        </Link>
                        <p className="product-price">
                          $ {i.salePrice ? i.salePrice : i.price}
                        </p>
                        <div className="hover-content">

                          <div className="add-to-cart-btn">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                              to={`/single-product-details/${i.id}`} className="btn essence-btn"
                              // onClick={() => this.handleQuickView(i)}
                            >Quick View</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )):
                <h1>There is no product at your watchlist</h1>

              }
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  productsList: state.getProducts.productsList,
  categories: state.category.categories.categories || [],
  productsCount: state.getProducts.productsCount.productCount,
});
const mapDispatchToProps = {
  getProductByIdRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WatchList);

export default Container;
