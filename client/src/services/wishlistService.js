import { api } from '../axios/axios.js';

export const getWishlistProducts = async () => api.get('/api/wishlist');

export const addToWishlist = async (product) => api.post('/api/wishlist', { product });

export const removeFromWishlist = async (productId) => api.patch('/api/wishlist', { productId });