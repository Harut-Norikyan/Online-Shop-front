import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CirclePicker } from 'react-color';
import InputRange from 'react-input-range';
import Pagination from 'react-js-pagination';
import queryString from 'query-string';
import _ from 'lodash';
import Select from 'react-select';
import memoizeOne from 'memoize-one';
import breadcumb from '../assets/img/bg-img/breadcumb.jpg';
import Wrapper from '../components/Wrapper';
import { getProductsRequest } from '../store/actions/getProducts';
import 'react-input-range/lib/css/index.css';
import { getCategoryRequest } from '../store/actions/category';
import 'bootstrap/dist/css/bootstrap.min.css';
import Utils from '../helpers/Utils';
import { getProductByIdRequest } from '../store/actions/getProductById';
import ColorWheel from '../assets/img/core-img/ColorWheel.png';

// eslint-disable-next-line import/order
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import LoadingBar from "react-redux-loading-bar";

class Shop extends Component {
  static propsTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      heart: JSON.parse(localStorage.getItem('heart')),
      heartLength: localStorage.getItem('heart') && JSON.parse(localStorage.getItem('heart')).length,
      selectedSort: '',
      sort: [
        { value: '', label: 'All' },
        { value: 'new_products', label: 'Newest' },
        { value: 'popular_products', label: 'Top Rated' }],
      sizes: [
        { id: '1', value: 'S', label: 'S' },
        { id: '2', value: 'M', label: 'M' },
        { id: '3', value: 'L', label: 'L' },
        { id: '4', value: 'X', label: 'X' },
        { id: '5', value: 'XL', label: 'XL' },
        { id: '6', value: 'XXL', label: 'XXL' },
        { id: '7', value: 'XXXL', label: 'XXXL' },
      ],
      // eslint-disable-next-line react/no-unused-state,react/prop-types
      activePage: this.props.match.params.page,
      sizeSelectAll:false,
      categoriesSelectAll:false,
      brandSelectAll:false
    };
  }


  getProducts = memoizeOne((page, query) => {
    // eslint-disable-next-line react/prop-types
    this.props.getProductsRequest(page, query);
  }, _.isEqual)

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.props.getCategoryRequest();
  }


  handleChange = (key, value) => {
    // eslint-disable-next-line react/prop-types
    const queryObj = queryString.parse(window.location.search);
    queryObj[key] = value;
    const query = queryString.stringify(queryObj);
    // eslint-disable-next-line react/prop-types
    this.props.history.replace(`/shop/?${query}`);
  }

  handleSort = (selectedOption) => {
    this.setState({ selectedSort: selectedOption });
  };

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
    const { sizes, heart } = this.state;
    const {
      // eslint-disable-next-line react/prop-types
      categories, match: { params: { page } }, productsCount,
    } = this.props;
    const queryObj = queryString.parse(window.location.search);
    this.getProducts(page, { ...queryObj });
    const brand = categories ? categories?.filter((b) => b.type === 'brand') : null;
    queryObj.categories = queryObj.categories ? queryObj.categories.split('-') : [];
    queryObj.size = queryObj.size ? queryObj.size.split('-') : [];
    const activePage = parseInt(queryObj.page);
    const category = categories ? categories?.filter((c) => c.type === 'category') : null;


    return (
      <Wrapper heart={this.state.heartLength}>

        <div className="breadcumb_area bg-img" style={{ backgroundImage: `url(${breadcumb})` }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="page-title text-center">
                  <h2>dresses</h2>
                </div>
              </div>
            </div>
          </div>
        </div>


        <section className="shop_grid_area section-padding-80">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="shop_sidebar_area">


                  <div className="widget catagory mb-50">

                    <Accordion allowMultipleExpanded allowZeroExpanded>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <p className="widget-title2 mb-30">Categories</p>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="catagories-menu">
                            <ul id="menu-content2" className="menu-content collapse show">
                              <li data-toggle="collapse" data-target="#clothing">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <div className="custom-control custom-checkbox d-block mb-2" key={'allc'}>
                                  <input
                                    className="custom-control-input"

                                    type="checkbox"

                                    id={`categoriesCustomCheckAll`}
                                    onChange={() => 1}
                                    value={this.state.categoriesSelectAll}
                                    onClick={() =>{if(queryObj.categories.length===0){
                                      category.map((i)=> {
                                        queryObj.categories.push(i.id)
                                      })

                                    }else
                                    {
                                      category.map((i)=> !queryObj.categories.includes(i.id.toString())&&  queryObj.categories.push(i.id))
                                    }

                                      this.handleChange('categories', queryObj.categories.join('-'));
                                    }

                                    }
                                  />
                                  <label htmlFor={`categoriesCustomCheckAll`}   className={`filterName `}>All Categories</label>
                                </div>
                                {category.map((i) => (

                                  <div key={i.id} className="custom-control custom-checkbox d-block mb-2">

                                    <input
                                      className="custom-control-input"
                                      onChange={() => 1}
                                      type="checkbox"

                                      id={`categoryCustomCheck${i.id}`}

                                      value={i.name}
                                      checked={queryObj.categories.includes(i.id.toString())}
                                      onClick={(e) => {
                                        const index = queryObj.categories.indexOf(i.id.toString());
                                        if (index > -1) {
                                          queryObj.categories.splice(index, 1);
                                        } else {
                                          queryObj.categories.push(i.id);
                                        }
                                        this.handleChange('categories', queryObj.categories.join('-'));
                                      }}

                                    />

                                    <label htmlFor={`categoryCustomCheck${i.id}`} className={`filterName ${queryObj.categories.includes(i.id.toString()) ? ' filterNameBold' : ''} `}>{i.name}</label>
                                  </div>
                                ))}
                              </li>
                            </ul>
                          </div>

                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <p className="widget-title2 mb-30">Brands</p>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>

                          <div className="widget-desc">
                            <ul>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <li>
                                <div className="custom-control custom-checkbox d-block mb-2" key={'allb'}>
                                  <input
                                    className="custom-control-input"

                                    type="checkbox"

                                    id={`brandCustomCheckAll`}
                                    onChange={() => 1}
                                    value={this.state.brandSelectAll}
                                    onClick={() =>{if(queryObj.categories.length===0){
                                      brand.map((i)=> {
                                        queryObj.categories.push(i.id)

                                      })
                                    }else
                                    {
                                      brand.map((i)=> !queryObj.categories.includes(i.id.toString())&&  queryObj.categories.push(i.id));this.setState({brandSelectAll:true})

                                    }

                                      this.handleChange('categories', queryObj.categories.join('-'));
                                    }

                                    }
                                  />

                                  <label htmlFor={`brandCustomCheckAll`}   className={`filterName `}>All Brands</label>
                                </div>
                                {brand.map((b) => (
                                  <div className="custom-control custom-checkbox d-block mb-2" key={b.id}>
                                    <input
                                      className="custom-control-input"
                                      type="checkbox"
                                      id={`brandCustomCheck${b.id}`}
                                      value={b.name}
                                      onChange={() => 1}

                                      checked={queryObj.categories.includes(b.id.toString())}
                                      onClick={(e) => {
                                        const index = queryObj.categories.indexOf(b.id.toString());
                                        if (index > -1) {
                                          queryObj.categories.splice(index, 1);
                                        } else {
                                          queryObj.categories.push(b.id);
                                        }
                                        this.handleChange('categories', queryObj.categories.join('-'));
                                      }}
                                    />


                                    <label htmlFor={`brandCustomCheck${b.id}`} className={`filterName ${queryObj.categories.includes(b.id.toString()) ? ' filterNameBold' : ''} `}>{b.name}</label>
                                  </div>
                                ))}
                              </li>

                            </ul>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <p className="widget-title2 mb-30">Sizes</p>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>

                          <div className="catagories-menu">
                            <ul id="menu-content2" className="menu-content collapse show">
                              <li data-toggle="collapse" data-target="#clothing">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <div className="custom-control custom-checkbox d-block mb-2" key={'alls'}>
                                  <input
                                    className="custom-control-input"

                                    type="checkbox"

                                    id={`sizeCustomCheckAll`}
                                    onChange={() => 1}
                                    value={this.state.sizeSelectAll}
                                    onClick={() =>{if(queryObj.size.length===0){
                                      sizes.map((i)=> {
                                        queryObj.size.push(i.value)
                                      })

                                    }else if(queryObj.size.length<sizes.length){

                                      sizes.map((i)=> {
                                        queryObj.size.includes(i.value)? queryObj.size.filter(z=>z===i.value): queryObj.size.push(i.value)
                                      })
                                    }
                                      this.handleChange('size', queryObj.size.join('-'));
                                    }

                                    }
                                  />
                                  <label htmlFor={`sizeCustomCheckAll`}   className={`filterName `}>All Sizes</label>
                                </div>
                                {sizes.map((i) => (


                                  <div className="custom-control custom-checkbox d-block mb-2" key={i.id}>

                                    <input
                                      className="custom-control-input"

                                      type="checkbox"

                                      id={`sizeCustomCheck${i.id}`}
                                      onChange={() => 1}
                                      value={i.value}
                                      onClick={(e) => {
                                        const index = queryObj.size.indexOf(i.value);
                                        if (index > -1) {
                                          queryObj.size.splice(index, 1);
                                        } else {
                                          queryObj.size.push(i.value);
                                        }
                                        this.handleChange('size', queryObj.size.join('-'));
                                      }}
                                    />


                                    <label htmlFor={`sizeCustomCheck${i.id}`} className={`filterName ${queryObj.size.includes(i.label) ? ' filterNameBold' : ''} `}>{i.label}</label>

                                  </div>
                                ))}

                              </li>
                            </ul>
                          </div>

                        </AccordionItemPanel>
                      </AccordionItem>

                    </Accordion>


                  </div>


                  <div className="widget price mb-50">

                    <h6 className="widget-title mb-30">Filter by</h6>

                    <p className="widget-title2 mb-30">Price</p>

                    <div className="widget-desc">
                      <div className="slider-range">

                        <InputRange
                          maxValue={100000}
                          minValue={0}
                          value={{
                            min: +queryObj.minPrice || 0,
                            max: +queryObj.maxPrice || 10000,
                          }}
                          onChange={(value) => {
                            this.handleChange('minPrice', value.min);
                            this.handleChange('maxPrice', value.max);
                          }}
                        />

                        <div className="range-price">
                          Range: $
                          {queryObj.minPrice ? queryObj.minPrice : 0}
                          - $
                          {queryObj.maxPrice ? queryObj.maxPrice : 10000}

                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="widget color mb-50">

                    <p className="widget-title2 mb-30">Color</p>
                    <div className="colorPicker">
                      <p className="colorPickerImg" onClick={()=>this.handleChange('color','')} > <img src={ColorWheel} alt=''/></p>
                      <p>All</p></div>
                    <div className="widget-desc">
                      <CirclePicker onChangeComplete={(color) => this.handleChange('color', color.hex)} />

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-8 col-lg-9">
                <div className="shop_grid_product_area">
                  <div className="row">
                    <div className="col-12">
                      <div
                        className="product-topbar d-flex align-items-center justify-content-between"
                      >

                        <div className="total-products">
                          <p>


                            <span>{productsCount}</span>
                            {' '}

                            products found
                          </p>
                        </div>

                        <div className="product-sorting d-flex">
                          <p>Sort by:</p>
                          <div className="selectSort">
                            <Select

                              value={this.state.selectedSort}
                              onChange={(v) => {console.log(111)
                                this.handleSort(v);
                                this.handleChange('sort', v.value);
                              }}
                              options={this.state.sort}
                              getOptionValue={o=>o.value}
                              getOptionLabel={o=>o.label}

                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">


                    {this.props.productsList ? this.props.productsList.map((i) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={i.id}>
                        <div className="single-product-wrapper">

                          <div className="product-img">
                            <img src={Utils.fileUrl(i.images)} alt="i" />

                            {i.salePrice && i.salePrice < i.price ?
                              (<div className="product-badge offer-badge">
                                <span>-{Math.round(((i.price - i.salePrice) * 100) / i.price)}%</span>
                              </div>) :
                              null }

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
                            <span>{i.Categories ? i.Categories[1]?.name : null}</span>
                            <Link to={`/single-product-details/${i.id}`}>
                              <h6>{i.name ? i.name : null}</h6>
                            </Link>
                            <p className="product-price">
                              <span
                                className="old-price"
                              >
                                $
                                {i.price ? i.price : null}
                              </span>
                              $
                              {i.salePrice ? i.salePrice : null}
                            </p>
                            <div className="hover-content">

                              <div className="add-to-cart-btn">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <Link to={`/single-product-details/${i.id}`} className="btn essence-btn" >Quick View</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    )) : null}


                  </div>
                </div>

                <nav aria-label="navigation">
                  <ul className="pagination mt-50 mb-70">
                    <li className="page-item">


                      <Pagination
                        activePage={activePage}
                        itemClass="page-item"
                        linkClass="page-link"
                        itemsCountPerPage={20}
                        totalItemsCount={productsCount?+productsCount:1}
                        pageRangeDisplayed={5}

                        onChange={(page) => this.handleChange('page', page)}

                      />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
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
  getProductsRequest,
  getCategoryRequest,
  getProductByIdRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shop);

export default Container;
