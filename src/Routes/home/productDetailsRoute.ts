import express from "express";
import { ProductDetailsController } from "../../controller/ProducDetails";

export const productDetailsRoute = express.Router();
const productDetailsController = new ProductDetailsController();

// Routes
productDetailsRoute.get('/', productDetailsController.getProductDetails());

productDetailsRoute.post('/favorite', productDetailsController.Favorite());

productDetailsRoute.post('/addToCart', productDetailsController.addToCard);


