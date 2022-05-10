import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { identity } from 'rxjs';
import { AdvertiserCreateDto } from 'src/advertiser/AdvertiserCreate.dto';
import { AdvertiserDto } from 'src/advertiser/advertiserDto';
import { AdvertiserLoginDto } from 'src/advertiser/advertiserLogin.dto';
import { AdvertiserService } from './../advertiser/advertiser.service';
import { LoginStatus, PublisherLoginStatus } from './interfaces/login-status.interface';
import { JwtPayload, publisherJwlPayload } from './interfaces/payload.interface';
import { PublisherRegisterStatus, publisherStatus, RegistrationStatus } from './interfaces/regisration-status.interface';
import { PublisherService } from './../Publisher/publisher.service';
import { PublisherDto } from './../Publisher/Publisher.dto';
import { PublisherMobileDto } from './../Publisher/publisherMobile.dto';
import { OtpService } from './../OTP/otp.service';
import { NewPublisherDto } from '../Publisher/newPublisher.dto';
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
        const token = this._createToken(advertiser);
        
        return {
             ...token,
             
        };  
    }

    private _createToken( AdvertiserDTO: AdvertiserDto): any {
        const expiresIn = '1200s';

       // const advertiser: JwtPayload = { email:email,id:id };    
        const accessToken = this.jwtService.sign(AdvertiserDTO);    
        return {
            //expiresIn,
            accessToken,    
        };  
    }

    async validateAdvertiser(payload: JwtPayload): Promise<AdvertiserDto> {
        const advertiser = await this.advertiserService.findByPayload(payload);    
        if (!advertiser) {      
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return advertiser;  
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
    async publisherLogin(otpDto:OtpDto):Promise<PublisherLoginStatus>{
        const publisher = await this.publisherService.findByLogin(otpDto);

        const token = this._createPublisherToken(publisher)

        return{
            phoneNumber:publisher.phoneNumber,...token,
        }
    }

    private _createPublisherToken({phoneNumber}:PublisherDto):any{
        const expiresIn = '60s';
        const publisher: publisherJwlPayload ={phoneNumber:phoneNumber}
        const accessToken = this.jwtService.sign(publisher)
        return{
            expiresIn,
            accessToken
        }
    }

    async phone(publisherMobileDto:PublisherMobileDto):Promise<publisherStatus>{
        let status = await this.publisherService.
        findPublisherStatus(publisherMobileDto);

        const otp = otpGenerator.generate(6,{alphabets:false,upperCase:false,lowerCase:false,specialChars:false})
        const publisher:NewPublisherDto={
            phoneNumber:publisherMobileDto.phoneNumber,
            otp
        }
        if(status.IsNewUser){
            try{
                await this.publisherService.createPublisher(publisher)
            }catch(err){
                throw new HttpException(err,HttpStatus.BAD_REQUEST)
            }
        }else{
           await this.publisherService.updatePublisher(publisher)
        }
        return status;
    }
}
