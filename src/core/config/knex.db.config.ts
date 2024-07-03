import config from "config";

import knex from "knex";

export const mysqldb = knex({
    client: 'mysql',
    connection: {
        host: config.get('db.host'),
        user: config.get('db.user'),
        password: config.get('db.password'),
        database: config.get('db.database')
    }
});