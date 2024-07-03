import { mysqldb } from '../core/config/knex.db.config';
import { handlingPossibilityErrorAsync, HandlingExit } from '../core/utils/catch_error_handler';

export class CategoryModule {

    static async getCategorys(): Promise<HandlingExit> {
        return handlingPossibilityErrorAsync({
            callback: () => mysqldb.select("*").from("categorys"),
            successMessage: "categorys select successfuly",
            errorMessage: "Can not select caterogys",
            trys: 2
        });
    }
}