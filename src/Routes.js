import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import RegularPage from "./pages/RegularPage";
import SingleBlog from "./pages/SingleBlog";
import Shop from "./pages/Shop";
import SingleProductDetails from "./pages/SingleProductDetails";
import WatchList from "./pages/WatchList";
import PayedProducts from "./pages/PayedProducts";

class Routes extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/blog" component={Blog}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/regular-page" component={RegularPage}/>
        <Route path="/single-blog/:id" component={SingleBlog}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/single-product-details/:id" component={SingleProductDetails}/>
        <Route path="/watchlist" component={WatchList}/>
        <Route path="/payed-products" component={PayedProducts}/>
      </Switch>
    );
  }
}

export default withRouter(Routes);
