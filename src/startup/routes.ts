
import { authRoute } from "../Routes/auth/authRoute";
import { favoriteRoute } from "../Routes/favorite";
import { homeRoute } from "../Routes/home/homeRoute";
import { shoppingCartRoute } from "../Routes/shoppingCart";
import express, { Express } from "express";
import { isAuthenticated } from "../core/middlewares/auth";
import { resolve } from "path";


const uploadsPath = "C:\\Users\\mouss\\Desktop\\Node Js Projects\\ecommerce-app-backend\\src\\uploads";

export function routes(app: Express) {
    // Welcome Route
    app.get('/', (req, res) => { res.send("Runing On Port 8000") });

    // Routes
    app.use('/uploads', express.static(uploadsPath));
    app.use('/auth', authRoute);

    // Routes Shoud Authenticated 
    app.use(isAuthenticated);
    app.use('/home', homeRoute);
    app.use('/favorite', favoriteRoute);
    app.use('/shoppingcart', shoppingCartRoute);
}
