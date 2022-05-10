import { Advertiser } from './../advertiser/advertiser.entity';
import { AdvertiserDto } from './../advertiser/advertiserDto';
import { Publisher } from './../Publisher/publisher.entity';
import { PublisherDto } from '../Publisher/Publisher.dto';
import { PublisherMobileDto } from './../Publisher/publisherMobile.dto';

export const toAdvertiserDto = (data: Advertiser):AdvertiserDto  =>  {  
    const { id, name, email,password,generatedOTP,otpSentTime ,isActive } = data;
    let advertiserDto: AdvertiserDto = { id, name, email,password,generatedOTP,otpSentTime,isActive};
    return advertiserDto;
};

export const toPublisherDto = (data:Publisher): PublisherDto =>{
    const {publisherId, userName, phoneNumber,otp} = data;
    let publisherDto : PublisherDto = {publisherId, userName, phoneNumber,otp}
    return publisherDto;
}

// export const toPublisherMobileDto = (data:Publisher):PublisherMobileDto=>{
//     const {publisherId, userName, mobileNumber} = data;
//     let publisherMobileDto : PublisherMobileDto = {mobileNumber}
//     return publisherMobileDto;
// }
