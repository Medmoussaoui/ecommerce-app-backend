import { Request, Response } from "express";
import { AppResponce } from "../../core/constant/appResponce";
import { ShoppingCartModule } from "../../module/shoppingCart.module";

export class ProductDetailsController {

    async addToCard(req: Request, res: Response) {
        const { user_id } = res.locals.user;
        const { item_id, quantity } = req.body;

        const insert = await ShoppingCartModule.add(
            user_id, item_id, quantity
        );

        if (insert.success) {
            const item = await ShoppingCartModule.selectbyId(user_id, insert.data);
            return res.status(201).send(item.data);
        }

        AppResponce.serverFailure(res);
    }

    Favorite() {
        return (req: Request, res: Response) => {
            res.redirect('/favotite')
        }
    }

    getProductDetails() {
        return (req: Request, res: Response) => {

        }
    }

}