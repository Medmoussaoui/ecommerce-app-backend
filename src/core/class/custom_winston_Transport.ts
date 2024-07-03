import Transport from 'winston-transport'
import winston from 'winston';
import { mysqldb } from '../config/knex.db.config';


export class MySqlTransport extends Transport {

    constructor(opts?: winston.transport.TransportStreamOptions | undefined) {
        super(opts)
    }

    public async log(info: any, callback: any) {
        setImmediate(() => {
            this.emit('logged', info);
        });
        // Perform the writing to the remote service
        // Custom mysql dababase to save the logs 
        try {
            await mysqldb.insert({ log: info }).into("logs");
        } catch (err) {

        }
        callback();
    }

}
