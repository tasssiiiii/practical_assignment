import axios from 'axios';

const API_URL = 'http://localhost:3333'; 

export const api = {
  // Категории
  getCategories: () => axios.get(`${API_URL}/categories`),
  getCategory: (id) => axios.get(`${API_URL}/categories/${id}`),

  // Товары
  getProducts: (categoryId) => 
    axios.get(`${API_URL}/products${categoryId ? `?categoryId=${categoryId}` : ''}`),
  getProduct: (id) => axios.get(`${API_URL}/products/${id}`),

  // Корзина
  createOrder: (orderData) => axios.post(`${API_URL}/orders`, orderData),
};