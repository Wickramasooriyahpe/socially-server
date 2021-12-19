import { Advertiser } from './../advertiser/advertiser.entity';
import { AdvertiserDto } from './../advertiser/advertiserDto';

export const toAdvertiserDto = (data: Advertiser):AdvertiserDto  =>  {  
    const { id, name, email,password } = data;
    let advertiserDto: AdvertiserDto = { id, name, email,password};
    return advertiserDto;
};