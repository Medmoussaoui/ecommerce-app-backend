import express from "express";
import { FavoriteController } from "../controller/Favorite";

export const favoriteRoute = express.Router();
const favoriteController = new FavoriteController();


favoriteRoute.get("/", favoriteController.getFavoriteItems());

favoriteRoute.post("/add", favoriteController.addToFavorite());

favoriteRoute.post("/remove", favoriteController.removeFromFavorite());
