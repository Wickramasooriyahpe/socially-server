import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Campaign } from "src/campaign/campaign.entity";
import { Creative } from "src/creative/creative.entity";
//import { CreativeType } from "src/creative/creativeType.entity";
import { CreativeLibrary } from "src/creativeLibrary/creativeLibrary.entity";
import { uploadMdata } from "src/UploadMedia/metaData.entity";
import { Advertiser } from "src/Advertiser/advertiser.entity";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Sk7*1997',
    database: 'socially',
    entities: [Campaign,Creative,Advertiser,
        CreativeLibrary,
        uploadMdata
    ],
    //entities: ['**/src/entity/*{.ts,.js}'],
    synchronize: true
    // dropSchema: true
}

export default config;
