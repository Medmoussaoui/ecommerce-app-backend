import express from "express";
import { HomeController } from "../../controller/Home";
import { expressAsyncCatcher } from "../../core/middlewares/errors";
import { productDetailsRoute } from "./productDetailsRoute";

export const homeRoute = express.Router();
const homeController = new HomeController();

// Sub Routes
homeRoute.use('/productDetails', productDetailsRoute);

// Routes
homeRoute.get('/', expressAsyncCatcher(homeController.intialHome));

homeRoute.get('/search', homeController.searchOnItems);

homeRoute.get('/products', homeController.getProducts);


