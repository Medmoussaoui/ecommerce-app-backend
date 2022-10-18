import { mysqldb } from "../config/knex.db.config";
import { HandlingExit, handlingPossibilityErrorAsync } from "./catch_error_handler";

export async function isEmailExist(email: string): Promise<HandlingExit> {
    return await handlingPossibilityErrorAsync({
        callback: () => mysqldb('users').select("user_email").where('user_email', "=", email),
        errorMessage: "have problem to select user email from database",
        successMessage: "user email selected from database",
    });
}