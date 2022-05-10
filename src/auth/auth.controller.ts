import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AdvertiserCreateDto } from 'src/advertiser/AdvertiserCreate.dto';
import { AdvertiserLoginDto } from 'src/advertiser/advertiserLogin.dto';
import { AuthService } from './auth.service';
import { LoginStatus, PublisherLoginStatus} from './interfaces/login-status.interface';
import { PublisherRegisterStatus, publisherStatus, RegistrationStatus } from './interfaces/regisration-status.interface';
import { NewPublisherDto } from '../Publisher/newPublisher.dto';
import { PublisherMobileDto } from './../Publisher/publisherMobile.dto';
import { OtpDto } from 'src/OTP/otp.dto';
import { PublisherCreateDto } from 'src/Publisher/publisherCreate.dto';
import { AdvertiserVerifyDto } from 'src/Advertiser/AdvertiserVerifyDto';
import { verificationStatus } from './interfaces/verificationStatus';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')  
    public async register(@Body() advertiserCreateDto: AdvertiserCreateDto,  ): Promise<RegistrationStatus> 
    {    
    const result:RegistrationStatus = await this.authService.register(advertiserCreateDto,);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
    }
    return result;  
}

    @Post('verify')  
    public async verify(@Body() AdvertiserVerifyDto: AdvertiserVerifyDto,  ): Promise<verificationStatus> 
    {    
    const result:verificationStatus = await this.authService.verify(AdvertiserVerifyDto,);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
    }
    return result; 
    }

    @Post('login')  
    public async login(@Body() advertiserLoginDto: AdvertiserLoginDto): Promise<LoginStatus> {
    return await this.authService.login(advertiserLoginDto);  
    }
    
    @Post('otp')
    public async otp(@Body() otpDto:OtpDto):Promise<PublisherLoginStatus>{
        return await this.authService.publisherLogin(otpDto);
    }

    @Post('publisherRegister')
    public async publisherRegister(@Body() publisherCreateDto:PublisherCreateDto):Promise<PublisherRegisterStatus>{
        return await this.authService.publisherRegister(publisherCreateDto)
    }

    @Post('phone')
    public async phone(@Body() publisherMobileDto:PublisherMobileDto ):Promise<publisherStatus> {
        return await this.authService.phone(publisherMobileDto);
    }

}
