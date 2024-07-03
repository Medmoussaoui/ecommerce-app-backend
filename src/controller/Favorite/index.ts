import { Request, Response } from "express"
import { userInfo } from "os";
import { AppResponce } from "../../core/constant/appResponce";
import { FavoriteModule } from "../../module/favorite.module";

export class FavoriteController {
    getFavoriteItems() {
        return async (req: Request, res: Response) => {

            let index = parseInt(req.header("index") ?? "0");
            const { user_id } = res.locals.user;
            let items = await FavoriteModule.selectItems(index, user_id);

            if (items.success) {
                res.status(200).send(items.data);
                return;
            }
            AppResponce.serverFailure(res);

        }
    }

    addToFavorite() {
        return async (req: Request, res: Response) => {

            let { item_id } = req.body;
            const { user_id } = res.locals.user;
            const addItem = await FavoriteModule.addItem(item_id, user_id);

            if (addItem.success) {
                return res.status(200).send("Item added");
            }
            AppResponce.serverFailure(res);

        }
    }

    removeFromFavorite() {
        return async (req: Request, res: Response) => {
            let removeItem = await FavoriteModule.removeItem(
                req.body.item_id,
                res.locals.user.user_id
            );
            if (removeItem.success) {
                return res.status(200).send("Item Removed");
            }
            AppResponce.serverFailure(res);
        }
    }

}