import Router from 'express';
import { addToWishlist, removeFromWishlist, getWishlistProducts } from '../Controllers/wishlistController.js';
import { authMiddlewere } from '../Middlewere/authMiddlewere.js';

export const wishlistRouter = Router();

wishlistRouter.post('/', authMiddlewere, addToWishlist);
wishlistRouter.patch('/', authMiddlewere, removeFromWishlist);
wishlistRouter.get('/', authMiddlewere, getWishlistProducts);