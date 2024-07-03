import express from "express";
import { ShoppingCartController } from "../controller/shoppingCart";

export const shoppingCartRoute = express.Router();
const shoppingCartController = new ShoppingCartController();

// Routes
shoppingCartRoute.get('/:page', shoppingCartController.getItems);
shoppingCartRoute.delete('/remove/:id', shoppingCartController.removeItem);
shoppingCartRoute.put('/update', shoppingCartController.updateQuantity);

// shoppingCartRoute.get('/update', shoppingCartController.updateProperties);

