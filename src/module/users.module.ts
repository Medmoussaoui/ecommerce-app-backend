import { mysqldb } from "../core/config/knex.db.config";
import { HandlingExit, handlingPossibilityErrorAsync } from "../core/utils/catch_error_handler";

interface User {
    user_id?: string
    user_first_name?: string,
    user_last_name?: string,
    user_email?: string,
    user_password?: string,
    user_approved: number,
    user_verifyCode: number
}

export class UsersModule {

    static async selectByEmail(email: string) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.select('*').from('users').where('user_email', '=', email),
            errorMessage: "have problem to select user by email in database",
            successMessage: "select User found"
        });
    }

    static async selectById(userId: string) {
        const result = await mysqldb.select('*').from('users').where('user_id', '=', userId);
    }

    static async setVerifyCode(email: string, code: number) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb("users").update({ "user_verifycode": code }).where('user_email', "=", email),
            errorMessage: "Have a problem to set OTP verify code into database",
            successMessage: "OTP Code set it successfuly"
        });
    }

    static async setApprove(email: string, approve: number) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb("users").update({ "user_approved": approve }).where('user_email', "=", email),
            errorMessage: "faild to update user account to approved",
            successMessage: "user account is approved successfuly"
        });
    }

    static async setPassword(newPassword: string, email: string) {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb("users").update({ "user_password": newPassword }).where('user_email', "=", email),
            errorMessage: "faild to update password",
            successMessage: "reset password successfuly"
        });
    }

    static async insert(user: User): Promise<HandlingExit> {
        return await handlingPossibilityErrorAsync({
            callback: () => mysqldb.insert(user).into('users'),
            errorMessage: "can't insert user have problem with database",
            successMessage: "user inserted successfuly"
        });
    }

    static delete() { }
}

