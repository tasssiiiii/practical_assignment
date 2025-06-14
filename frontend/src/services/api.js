import axios from 'axios';

const API_URL = 'http://localhost:3333';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
export const getCategory = (id) => api.get(`/categories/${id}`);
export const getCategories = () => api.get('/categories/all');
export const getCategoryProducts = (id) => api.get(`/categories/${id}`);
export const getAllProducts = () => api.get('/products/all');
export const getProductById = (id) => api.get(`/products/${id}`);
export const sendOrder = (orderData) => api.post('/order/send', orderData);