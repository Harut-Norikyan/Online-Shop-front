import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import bg1 from '../assets/img/bg-img/bg-1.jpg';
import bg2 from '../assets/img/bg-img/bg-2.jpg';
import bg5 from '../assets/img/bg-img/bg-5.jpg';
import brand1 from '../assets/img/core-img/brand1.png';
import brand2 from '../assets/img/core-img/brand2.png';
import brand3 from '../assets/img/core-img/brand3.png';
import brand4 from '../assets/img/core-img/brand4.png';
import brand5 from '../assets/img/core-img/brand5.png';
import brand6 from '../assets/img/core-img/brand6.png';
import CarouselHome from '../components/CarouselHome';
import Wrapper from '../components/Wrapper';
import {getCategoryRequest} from "../store/actions/category";


class Home extends Component {
  static propsTypes = {}


  render() {
    const { categories }=this.props;
    const category = categories ? categories?.filter((c) => c.type === 'category') : null;
    let removed = category?.splice(category.length - 3, 3);
    return (
      <Wrapper>

        <section
          className="welcome_area bg-img background-overlay"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="hero-content">
                  <h6>asoss</h6>
                  <h2>New Collection</h2>

                  <Link to="/shop/?page=1&sort=new_products" className="btn essence-btn">view collection</Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className="top_catagory_area section-padding-80 clearfix">
          <div className="container">
            <div className="row justify-content-center">
              {removed.map((i) => (
                <div key={i.id} className="col-12 col-sm-6 col-md-4">
                  <div
                    className="single_catagory_area d-flex align-items-center justify-content-center bg-img"

                    style={{ backgroundImage: `url(${bg2})` }}
                  >
                    <div className="catagory-content">

                      <Link to={`/shop?categories=${i.id}&page=1`}>{i.name}</Link>
                    </div>
                  </div>
                </div>

              ))}


            </div>
          </div>
        </div>


        <div className="cta-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="cta-content bg-img background-overlay"
                  style={{ backgroundImage: `url(${bg5})` }}
                >
                  <div
                    className="h-100 d-flex align-items-center justify-content-end"
                  >
                    <div
                      className="cta--text"
                    >
                      <h6>

                        -60 %
                      </h6>
                      <h2>Global Sale</h2>

                      <Link to="./" className="btn essence-btn">Buy Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <section className="new_arrivals_area section-padding-80 clearfix">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>Popular Products</h2>
                </div>
              </div>
            </div>
          </div>
          <CarouselHome />

        </section>


        <div className="brands-area d-flex align-items-center justify-content-between">

          <div className="single-brands-logo">
            <img src={brand1} alt="" />
          </div>

          <div className="single-brands-logo">
            <img src={brand2} alt="" />
          </div>

          <div className="single-brands-logo">
            <img src={brand3} alt="" />
          </div>

          <div className="single-brands-logo">
            <img src={brand4} alt="" />
          </div>

          <div className="single-brands-logo">
            <img src={brand5} alt="" />
          </div>

          <div className="single-brands-logo">
            <img src={brand6} alt="" />
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.category.categories.categories || [],

});

const mapDispatchToProps = {
  getCategoryRequest,

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Container;
