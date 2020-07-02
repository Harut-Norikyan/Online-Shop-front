import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPopularProductsRequest } from '../store/actions/getProducts';
import Utils from '../helpers/Utils';
import { getProductByIdRequest } from '../store/actions/getProductById';


class CarouselHome extends Component {
  static propTypes = {};


  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.props.getPopularProductsRequest();
  }

  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };


    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="popular-products-slides owl-carousel">

                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={false}
                  responsive={responsive}
                  ssr
                  infinite
                  autoPlay
                  autoPlaySpeed={5000}
                  keyBoardControl
                  transitionDuration={1000}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >

                  {/* eslint-disable-next-line react/prop-types */}

                  {this.props.popularProducts ? this.props.popularProducts.map((i) => (
                    <div key={i.productId} style={{ margin: 15 }} className="single-product-wrapper">
                      <div className="product-img">
                        <img src={Utils.fileUrl(i.images)} alt="" />
                      </div>

                      <div className="product-description">
                        <Link to={`/single-product-details/${i.id}`}>
                          <h6>{i.name}</h6>
                          <p>$ {i.price}</p>
                        </Link>
                        <p className="product-price">{i.salePrice}</p>
                        <div className="hover-content">
                          <div className="add-to-cart-btn">
                            <Link
                              to={`/single-product-details/${i.productId}`}
                              className="btn essence-btn"
                              // onClick={() => this.handleQuickView(i)}
                            >Quick View</Link>
                          </div>
                        </div>
                      </div>
                    </div>

                  )) : null}
                </Carousel>
              </div>
            </div>
          </div>
        </div>


      </>
    );
  }
}


const mapStateToProps = (state) => ({
  popularProducts: state.getProducts.popularProducts || [],
});

const mapDispatchToProps = {
  getPopularProductsRequest,
  getProductByIdRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarouselHome);

export default Container;
