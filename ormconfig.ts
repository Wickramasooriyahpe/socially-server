import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Advertiser } from './src/advertiser/advertiser.entity';

const config: MysqlConnectionOptions ={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'socially',
    entities: [Advertiser],
    synchronize: true
    // dropSchema: true
}

export default config;