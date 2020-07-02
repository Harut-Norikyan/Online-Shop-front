import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import email from './email';
import getProducts from './getProducts';
import getProductById from './getProductById';
import users from './users';
import category from './category';
import orders from './orders';
import posts from './posts';

import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  users,
  email,
  getProducts,
  getProductById,
  form,
  category,
  orders,
  posts,
  loadingBar: loadingBarReducer,

});
