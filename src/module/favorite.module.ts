import { mysqldb } from "../core/config/knex.db.config";
import { handlingPossibilityErrorAsync } from "../core/utils/catch_error_handler";

export class FavoriteModule {

    static async selectItems(index: number, userId: string) {
        const offset = (index == 0) ? 0 : (index * 10);
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.select("items.*")
                .from("items")
                .innerJoin("favorite", "items.item_id", "favorite.item_id")
                .where("favorite.user_id", "=", userId).limit(10).offset(offset),
            errorMessage: "Can not get favorite items"
        });
    }

    static async selectItemById(userId: string, item_id: string) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.select("items.*")
                .from("items")
                .innerJoin("favorite", "items.item_id", "favorite.item_id")
                .where({ "user_id": userId, "favorite.item_id": item_id }),
            errorMessage: "Can not get favorite item by id"
        });
    }

    static async removeItem(item_id: string, userId: string) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.delete()
                .from("favorite").where({
                    "user_id": userId,
                    "item_id": item_id,
                }),
            errorMessage: "Can not Delete Item From Favorite Table "
        });
    }

    static async addItem(itemId: string, userId: string) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.insert({
                user_Id: userId,
                item_id: itemId,
            }).into("favorite"),
            errorMessage: "Can not Add Favorite Item Into Database"
        });
    }

}