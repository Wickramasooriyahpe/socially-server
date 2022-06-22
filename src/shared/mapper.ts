import { AdvertiserPasswordChangeDto } from './../advertiser/dto/advertiserPasswordChange.dto';
import { Advertiser } from '../advertiser/advertiser.entity';
import { AdvertiserDto } from '../advertiser/dto/advertiserDto';
import { Publisher } from './../Publisher/publisher.entity';
import { PublisherDto } from '../Publisher/Publisher.dto';

export const toAdvertiserDto = (data: Advertiser):AdvertiserDto  =>  {  
    const { id, name, email,role,password,generatedOTP,otpSentTime ,isActive ,stripeCustomerId} = data;
    let advertiserDto: AdvertiserDto = { id, name, email,role,password,generatedOTP,otpSentTime,isActive,stripeCustomerId};
    return advertiserDto;
};

export const toPublisherDto = (data: Publisher): PublisherDto => {
    const { publisherId, userName, phoneNumber, otp } = data;
    let publisherDto: PublisherDto = { publisherId, userName, phoneNumber, otp }
    return publisherDto;
}

// export const toAdvertiserPasswordDto = (data: AdvertiserPasswordChangeDto):AdvertiserPasswordChangeDto => {
//     const {password} = data;
//     let AdvertiserPasswordChangeDto: AdvertiserPasswordChangeDto = {password};
//     return AdvertiserPasswordChangeDto;
// }


// export const toPublisherMobileDto = (data:Publisher):PublisherMobileDto=>{
//     const {publisherId, userName, mobileNumber} = data;
//     let publisherMobileDto : PublisherMobileDto = {mobileNumber}
//     return publisherMobileDto;
// }
