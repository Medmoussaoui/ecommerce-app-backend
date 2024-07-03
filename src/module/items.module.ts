import { mysqldb } from "../core/config/knex.db.config";
import { HandlingExit, handlingPossibilityErrorAsync } from "../core/utils/catch_error_handler";

export class ItemsModule {

    static async getItemsProduct(index: number, itemName: string, categoryId: string = ""): Promise<HandlingExit> {
        const categoryFilter = categoryId == "" ? "<>" : "=";
        const offset = (index > 0) ? index * 10 : index;
        return handlingPossibilityErrorAsync({
            callback: () => mysqldb.select("*")
                .from("items")
                .where("item_name", "like", `%${itemName}%`)
                .andWhere("item_category", categoryFilter, `${categoryId}`)
                .limit(10).offset(offset),
            successMessage: "items selected successfuly",
            errorMessage: "Can not select items from db",
            trys: 2
        });
        
    }

    static async getItemById(itemId: string): Promise<HandlingExit> {
        return handlingPossibilityErrorAsync({
            callback: () => mysqldb.select("*")
                .from("items")
                .where("item_id", "=", itemId),
            successMessage: "item selected successfuly",
            errorMessage: "Can not select items from db",
            trys: 2
        });
    }

    static async getSuggestionItemsName(itemName: string): Promise<HandlingExit> {

        return handlingPossibilityErrorAsync({
            callback: () => mysqldb.distinct().select("item_name")
                .from("items")
                .where("item_name", "like", `%${itemName}%`)
                .limit(10),
            successMessage: "items selected successfuly",
            errorMessage: "Can not select items from db",
            trys: 2
        });
    }

}