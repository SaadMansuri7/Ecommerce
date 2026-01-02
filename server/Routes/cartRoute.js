import { Router } from "express";
import { addToCart, decreaseQnt, getCartProducts } from "../Controllers/cartController.js";
import { authMiddlewere } from "../Middlewere/authMiddlewere.js";

export const cartRouter = Router();

cartRouter.post('/', authMiddlewere, addToCart);
cartRouter.patch('/', authMiddlewere, decreaseQnt);
cartRouter.get('/', authMiddlewere, getCartProducts);