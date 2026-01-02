import { api } from '../axios/axios.js';

export const addToCart = async (product, token) => api.post('/api/cart', { product }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getCartProducts = async (token) => api.get('/api/cart', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const decreaseProductQnt = async (productId, token) => api.patch('/api/cart', { productId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});