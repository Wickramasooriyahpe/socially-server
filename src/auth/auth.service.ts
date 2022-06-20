import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { identity } from 'rxjs';
import { AdvertiserCreateDto } from 'src/advertiser/AdvertiserCreate.dto';
import { AdvertiserDto } from 'src/advertiser/advertiserDto';
import { AdvertiserLoginDto } from 'src/advertiser/advertiserLogin.dto';
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
import { AdvertiserVerifyDto } from 'src/Advertiser/AdvertiserVerifyDto';
import { MailService } from 'src/mail/mail.service';
import { verificationStatus } from './interfaces/verificationStatus';

var otpGenerator = require('otp-generator');
@Injectable()
export class AuthService {
    constructor(private readonly publisherService:PublisherService,private readonly advertiserService : AdvertiserService,private readonly jwtService: JwtService,private readonly otpService:OtpService ) {}

    async register(advertiserDto: AdvertiserCreateDto): 
    Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,   
        message: 'user registered!',
    };
    try {
        await this.advertiserService.createAdvertiser(advertiserDto);
    } catch (err) {
        status = {
            success: false,        
            message: err,
        };    

    }
    return status;  
}

    async verify(advertiserverifyDto: AdvertiserVerifyDto):  Promise<verificationStatus> {
        let status: verificationStatus = {
            success: true,   
            message: 'confirmed registration',
        };
    // find user in db    
        await this.advertiserService.verifyOTP(advertiserverifyDto);
            
    // generate and sign token    
    //const token = this._createToken(advertiser);
    
    return status;
    }

    async login(loginAdvertiserDto: AdvertiserLoginDto): Promise<LoginStatus> {    
        // find user in db    
        const advertiser = await this.advertiserService.findByLogin(loginAdvertiserDto);
        // generate and sign token    
        const payload:JwtPayload = {email:advertiser.email,id:advertiser.id}
        const token = this.jwtService.sign(payload);
        const expiresIn = '1d'

        return {
            userName:advertiser.name,
            id: advertiser.id,
            accessToken:token,
            expiresIn:expiresIn           
        };  
    }

    async validateAdvertiser(payload: JwtPayload): Promise<AdvertiserDto> {
        const advertiser = await this.advertiserService.findByPayload(payload);    
        if (!advertiser) {      
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return advertiser;  
    }
    async validatePublisher(payload:publisherJwtPayload):Promise<PublisherDto>{
        const publisher = await this.publisherService.findByPublisherPayload(payload)
        if(!publisher){
            throw new HttpException('Invalid Token',HttpStatus.UNAUTHORIZED);
        }
        return publisher;
    }
    async publisherRegister(publisherCreateDto:PublisherCreateDto):Promise<PublisherRegisterStatus>{
        let status:PublisherRegisterStatus={
            success:true,
            message:'publisher registered'
        };
        try{
            await this.publisherService.createVerifiedPublisher(publisherCreateDto)
        }catch(err){
            status={
                success:false,
                message:err
            }
        }
        return status;

    }
    async publisherOtpCheck(otpDto:OtpDto):Promise<PublisherLoginStatus>{
        const publisher = await this.publisherService.findByLogin(otpDto);
 
            if(publisher.userName){
                const payload:publisherJwtPayload = {phoneNumber:publisher.phoneNumber,id:publisher.publisherId}
                const token = this.jwtService.sign(payload);
                const expiresIn = '60s'
                return{
                    phoneNumber:publisher.phoneNumber,isNewUser:false,expireIn:expiresIn,accessToken:token,
                }
            }else{
                return{
                    phoneNumber:publisher.phoneNumber,isNewUser:true,accessToken:null, expireIn:null
                }
            }

    }

    async phone(publisherMobileDto:PublisherMobileNoDto):Promise<OtpSendingStatus>{
        let status = await this.publisherService.sendOtp(publisherMobileDto);

        return status;
    }
}
