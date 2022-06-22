import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { identity } from 'rxjs';
import { AdvertiserCreateDto } from 'src/advertiser/dto/advertiser-create.dto';
import { AdvertiserDto } from 'src/advertiser/dto/advertiserDto';
import { AdvertiserLoginDto } from 'src/advertiser/dto/advertiserLogin.dto';
import { AdvertiserService } from './../advertiser/advertiser.service';
import { LoginStatus, PublisherLoginStatus } from './interfaces/login-status.interface';
import { JwtPayload, publisherJwtPayload } from './interfaces/payload.interface';
import { PublisherRegisterStatus, OtpSendingStatus, RegistrationStatus } from './interfaces/regisration-status.interface';
import { PublisherService } from './../Publisher/publisher.service';
import { PublisherDto } from './../Publisher/Publisher.dto';
import { OtpService } from './../OTP/otp.service';
import { PublisherMobileNoDto } from './../Publisher/publisherMobile.dto';
import { OtpDto } from './../OTP/otp.dto';
import { PublisherCreateDto } from './../Publisher/publisherCreate.dto';
import { AdvertiserVerifyDto } from 'src/advertiser/dto/AdvertiserVerifyDto';
import { MailService } from 'src/mail/mail.service';
//import { AdvertiserVerifyDto } from '../advertiser/AdvertiserVerifyDto';
import { verificationStatus } from './interfaces/verificationStatus';

var otpGenerator = require('otp-generator');
@Injectable()
export class AuthService {
    constructor(private readonly publisherService:PublisherService,
        private readonly advertiserService : AdvertiserService,
        private readonly jwtService: JwtService,
        private readonly otpService:OtpService ) {}

    async register(advertiserDto: AdvertiserCreateDto): 
    Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,   
        message: 'Verification otp email sent',
    };
    try {
        await this.advertiserService.createAdvertiser(advertiserDto);
       //await this.advertiserService.create(advertiserDto);
    } catch (err) {
        status = {
            success: false,        
            message: err,
        };    

        }
        return status;
    }

    async verify(advertiserverifyDto: AdvertiserVerifyDto) : Promise<verificationStatus>{
        let status: verificationStatus = {
            success: true,   
            message: 'User Registered',
        };
    
        try {
           await this.advertiserService.verifyOTP(advertiserverifyDto);
           //await this.advertiserService.create(advertiserDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
    
        }      
    // generate and sign token    
    //const token = this._createToken(advertiser);
    
    return status;
    }


    async resendOTP(advertiserDto: AdvertiserCreateDto): 
    Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,   
        message: 'Verification otp email sent again',
    };
    try {
        await this.advertiserService.resendOTPEmail(advertiserDto);
       //await this.advertiserService.create(advertiserDto);
    } catch (err) {
        status = {
            success: false,        
            message: err,
        };    

    }
    return status;  
}

        async forgotPassword(advertiserDto: AdvertiserCreateDto): 
        Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'Please check your email',
        };
        try {
            await this.advertiserService.sendforgotPasswordEmail(advertiserDto);
        //await this.advertiserService.create(advertiserDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    

        }
        return status;  
        }

        async resetPassword(advertiserDto: AdvertiserCreateDto): 
        Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'Succes',
        };
        try {
            await this.advertiserService.saveResetPassword(advertiserDto);
        //await this.advertiserService.create(advertiserDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    

        }
        return status;  
        }

    async login(loginAdvertiserDto: AdvertiserLoginDto): Promise<LoginStatus> {    
        // find user in db    
        const advertiser = await this.advertiserService.findByLogin(loginAdvertiserDto);
        // generate and sign token    
        const payload: JwtPayload = { email: advertiser.email, id: advertiser.id }
        const token = this.jwtService.sign(payload);
        const expiresIn = '1d'

        return {
            userName: advertiser.name,
            userId: advertiser.id, 
            userRole: advertiser.role,          
            accessToken: token,
            expiresIn: expiresIn
        
            
        };
    }

    async validateAdvertiser(payload: JwtPayload): Promise<AdvertiserDto> {
        const advertiser = await this.advertiserService.findByPayload(payload);
        if (!advertiser) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return advertiser;
    }
    async validatePublisher(payload: publisherJwtPayload): Promise<PublisherDto> {
        const publisher = await this.publisherService.findByPublisherPayload(payload)
        if (!publisher) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
        }
        return publisher;
    }
    async publisherRegister(publisherCreateDto: PublisherCreateDto): Promise<PublisherRegisterStatus> {
        let status: PublisherRegisterStatus = {
            success: true,
            message: 'publisher registered',
            name: publisherCreateDto.userName
        };
        try {
            await this.publisherService.createVerifiedPublisher(publisherCreateDto)
        } catch (err) {
            status = {
                success: false,
                message: err,
                name: null
            }
        }

        return status;

    }
    async publisherOtpCheck(otpDto: OtpDto): Promise<PublisherLoginStatus> {
        const publisher = await this.publisherService.findByLogin(otpDto);

        if (publisher.userName) {
            const payload: publisherJwtPayload = { phoneNumber: publisher.phoneNumber, id: publisher.publisherId }
            const token = this.jwtService.sign(payload);
            const expiresIn = '60s'
            return {
                phoneNumber: publisher.phoneNumber, isNewUser: false, expireIn: expiresIn, accessToken: token, id: publisher.publisherId
            }
        } else {
            const payload: publisherJwtPayload = { phoneNumber: publisher.phoneNumber, id: publisher.publisherId }
            const token = this.jwtService.sign(payload);
            const expiresIn = '60s'
            return {
                phoneNumber: publisher.phoneNumber, isNewUser: true, accessToken: token, expireIn: expiresIn, id: publisher.publisherId
            }
        }
    }

    async phone(publisherMobileDto: PublisherMobileNoDto): Promise<OtpSendingStatus> {
        let status = await this.publisherService.sendOtp(publisherMobileDto);

        return status;
    }
}
