import axios from 'axios';
import { stringify as qs } from 'querystring';

const API_URL = 'http://localhost:4000';
const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['authorization'] = token;
  }
  return config;
}, (err) => Promise.reject(err));
export class Api {
  static url = API_URL

  static getProducts(page, params) {
    const query = qs({
      page,
      ...params,
    });
    return api.get(`/products/?${query}`);
  }

  static addUser(data) {
    const formData = new FormData();
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const i in data) {
      formData.append(i, data[i]);
    }
    return api.post('/users/add', formData);
  }

  static updateDataUser(id, data) {
    const formData = new FormData();
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in data) {
      formData.append(i, data[i]);
    }
    return api.put(`/users/${id}`, formData);
  }

  static login(email, password) {
    return api.post('/users/login', { email, password });
  }

  static sendEmail(email) {
    return api.post('/users/subscribe', { email });
  }

  static getProductById(id) {
    return api.get(`/products/${id}`);
  }

  static getCategory() {
    return api.get('/categories');
  }

  static searchProduct(params) {
    const query = qs({
      ...params,
    });
    return api.get(`/products/search/?${query}`, params);
  }

  static getNewProducts() {
    return api.get('/products/newProducts');
  }

  static paymentPayed() {
    return api.post('/orders/payment');
  }

  // static paymentPayed(){
  //   return api.post(`/products/payment`,)
  // }
  static sendToPayment(data) {
    return api.post('/orders/payment', data);
  }

  static sendProduct(data) {
    return api.post('/orders', data);
  }

  static getProductFromOrders() {
    return api.get('/orders');
  }

  static deleteOrder(orderId) {
    return api.delete(`/orders/${orderId}`);
  }

  static uploadOrder(orderId, data) {
    return api.put(`/orders/${orderId}`, data);
  }

  static paymentResult(total, items) {
    return api.post('/orders/secret', { total, items });
  }

  static rateProduct(rating, id) {
    return api.post('/products/rate', { rating, id });
  }

  static getPopularProducts() {
    return api.post('/products/popular');
  }
  static deleteDataUser(id,password) {
    return api.delete(`/users/${id}`, {data:{password}});
  }
  static getList() {
    return api.get(`/posts/list`, );
  }
  static getPost(id) {
    return api.get(`/posts/getPost/${id}`, );
  }
}
export default Api;
