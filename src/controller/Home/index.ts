import { Request, Response } from "express"
import { AppResponce } from "../../core/constant/appResponce";
import { CategoryModule } from "../../module/categorys.module"
import { ItemsModule } from "../../module/items.module";


export class HomeController {

    async searchOnItems(req: Request, res: Response) {

        const searchInput = req.header("searchInput");

        const suggestionItems = await ItemsModule.getSuggestionItemsName(searchInput!);
        if (suggestionItems.success) {
            res.send(suggestionItems.data);
            return;
        }
        AppResponce.serverFailure(res);

    }

    async getProducts(req: Request, res: Response) {

        let index = req.header("index") ?? "0";
        let itemName = req.header("itemName") ?? "";
        let category_id = req.header("categoryId") ?? "";        

        let items = await ItemsModule.getItemsProduct(
            parseInt(index),
            itemName,
            category_id,
        );

        if (items.success) {
            return res.status(200).send(items.data);
        }

        AppResponce.serverFailure(res);
    }

    async intialHome(req: Request, res: Response) {
        
        const data = await Promise.all([
            CategoryModule.getCategorys(),
            ItemsModule.getItemsProduct(0, ""),
        ]);

        const categorys = data[0];
        const items = data[1];
        /// test send multiple data of items
        //const multipleItems = [].concat(items.data, items.data, items.data, items.data);
        if (categorys.success || items.success) {
            return res.status(200).send({
                "categorys": categorys.data,
                "items": items.data,
            });
        }

        AppResponce.serverFailure(res);

    }

}





