import { Advertiser } from './../advertiser/advertiser.entity';
import { AdvertiserDto } from './../advertiser/advertiserDto';
import { Publisher } from './../Publisher/publisher.entity';
import { PublisherDto } from './../Publisher/PublisherDto';

export const toAdvertiserDto = (data: Advertiser):AdvertiserDto  =>  {  
    const { id, name, email,password } = data;
    let advertiserDto: AdvertiserDto = { id, name, email,password};
    return advertiserDto;
};

export const toPublisherDto = (data:Publisher): PublisherDto =>{
    const {publisherId, userName, mobileNumber} = data;
    let publisherDto : PublisherDto = {publisherId, userName, mobileNumber}
    return publisherDto;
}