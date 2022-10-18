import { mailer } from "../config/nodemailer.config";
import { HandlingExit, handlingPossibilityErrorAsync } from "./catch_error_handler";

export async function sendMail(options: { to: string, subject: string, text: string }): Promise<HandlingExit> {
    return await handlingPossibilityErrorAsync({
        callback: () => mailer.sendMail({
            from: '"MsBarber" <moussaouifilm16@gmail.com>',
            to: options.to,
            subject: options.subject,
            text: options.text
        }),
        errorMessage: "Email Notification not send",
        successMessage: "Email is Send Successfuly",
        trys: 3
    });
}