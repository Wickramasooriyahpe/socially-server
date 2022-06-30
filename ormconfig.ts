import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Campaign } from "src/campaign/campaign.entity";
import { Creative } from "src/creative/creative.entity";
// import { CreativeType } from "src/creative/creativeType.entity";
import { CreativeLibrary } from "src/creativeLibrary/creativeLibrary.entity";
import { uploadMdata } from "src/UploadMedia/metaData.entity";
//import { Advertiser } from "src/advertiser/advertiser.entity";
import { Publisher } from './src/Publisher/publisher.entity';
import { PublisherTransaction } from './src/publisher-transaction/publisher-transaction.entity';
//import { Advertiser } from "./src/advertiser/advertiser.entity";
import {Advertiser} from "./src/advertiser/advertiser.entity";
import { AdvertiserTransaction } from "src/advertiser-transaction/advertiser-transaction.entity";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Hpunsara159',
    database: 'socially',
    entities: [
        Campaign,
        Creative,
        Advertiser,
        Publisher,
        CreativeLibrary,
        uploadMdata,
        PublisherTransaction,AdvertiserTransaction
    ],
    //entities: ['**/src/entity/*{.ts,.js}'],
  synchronize: true,
  // dropSchema: true
}

export default config;
