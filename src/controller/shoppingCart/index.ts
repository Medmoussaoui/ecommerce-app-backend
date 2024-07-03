import { Request, Response } from "express";
import { it } from "node:test";
import { AppResponce } from "../../core/constant/appResponce";
import { ShoppingCartModule } from "../../module/shoppingCart.module";

export class ShoppingCartController {

    async getItems(req: Request, res: Response) {
        const items = await ShoppingCartModule.select(
            res.locals.user.user_id,
            parseInt(req.params.page),
        );
        if (items.success) {
            return res.status(200).send(items.data);
        }

        AppResponce.serverFailure(res);
    }

    async removeItem(req: Request, res: Response) {
        const deleteItem = await ShoppingCartModule.delete(req.params.id);

        if (deleteItem.success) {
            return res.status(200).send('Item Removed from Shopping Card');
        }

        AppResponce.serverFailure(res);

    }

    async updateQuantity(req: Request, res: Response) {
        const update = await ShoppingCartModule.updateQuantity(
            req.body.id,
            req.body.quantity
        );

        if (update.success) {
            return res.status(200).send("item quantity updated");
        }

        AppResponce.serverFailure(res);

    }

    updateProperties() {
        return (req: Request, res: Response) => {

        }
    }
}