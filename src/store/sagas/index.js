import { all, fork } from 'redux-saga/effects';
import email from './email';
import getProducts from './getProducts';
import getProductById from './getProductById';
import users from './users';
import category from './category';
import orders from './orders';
import posts from './posts';


export default function* watchers() {
  yield all([
    users,
    email,
    getProducts,
    getProductById,
    category,
    orders,
    posts,
  ].map(fork));
}
