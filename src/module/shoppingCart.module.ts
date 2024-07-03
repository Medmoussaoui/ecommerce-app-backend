import { mysqldb } from "../core/config/knex.db.config";
import { handlingPossibilityErrorAsync } from "../core/utils/catch_error_handler";

export class ShoppingCartModule {

    static async add(userId: string, itemId: string, quantity: number) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.insert({
                user_id: userId,
                item_id: itemId,
                quantity: quantity,
            }).into('shoppingcart').returning("*"),
            errorMessage: "can not insert item into shopping card Table",
        });
    }

    static async updateQuantity(id: string, quantity: number) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb
                .update({ "quantity": quantity })
                .from('shoppingcart')
                .where({ "id": id }),
            errorMessage: "can not update quantity from Shopping Cart Table"
        });
    }

    static updateProperties() {
        /// ... implement
    }

    static async delete(id: string) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.delete()
                .from('shoppingcart')
                .where({ "id": id }),
            errorMessage: "can not delete item from Shopping Cart Table",
        });
    }

    static async select(user_id: string, pageIndex: number) {
        pageIndex = (pageIndex == 0) ? 0 : pageIndex * 10;
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.select('*')
                .from('shoppingcartview')
                .where({ "user_id": user_id }).limit(10).offset(pageIndex),
            errorMessage: "can not select items Shopping Cart Table"
        });
    }

    static async selectbyId(user_id: string, id: number) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.select('*')
                .from('shoppingcartview')
                .where({ "user_id": user_id, id: id }),
            errorMessage: "can not select item by id from Shopping Cart Table"
        });
    }
}