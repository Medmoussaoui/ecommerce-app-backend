import { logger } from "../core/config/logger.config";

export function loggingErrors() {
    /// Errors
    process.on("uncaughtException", (ex) => {
        logger.error(ex.message, ex);
        console.log('Catch Error Thrown')
    });

    process.on("unhandledRejection", (ex) => {
        logger.error((ex as Error).message, ex);
        console.log("Catch unhadle Rejection");
    });
}