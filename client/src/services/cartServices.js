import { api } from '../axios/axios.js';

export const addToCart = async (product, token) => api.post('/api/cart', { product });

export const getCartProducts = async (token) => api.get('/api/cart');

export const decreaseProductQnt = async (productId, token) => api.patch('/api/cart', { productId });