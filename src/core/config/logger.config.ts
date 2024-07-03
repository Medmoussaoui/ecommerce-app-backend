import winston, { format } from 'winston';
import { MySqlTransport } from '../class/custom_winston_Transport';


export const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
        new winston.transports.Console(),
        new MySqlTransport({ level: "error" })
    ],
});




