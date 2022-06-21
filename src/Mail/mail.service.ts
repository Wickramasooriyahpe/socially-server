import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Advertiser } from 'src/advertiser/advertiser.entity';
import { Repository } from 'typeorm';
import { AdvertiserDto } from 'src/advertiser/dto/advertiserDto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(advertiser: Advertiser, otp: number) {
        await this.mailerService.sendMail({
            to: advertiser.email,
            subject: 'OTP verification Email',


            text: 'welcome',
            html: `
                    Thank you for registering!
                    <br/><br/>
                    Please verify your email by using the following OTP.
                    <br/><br/>
                    Your OTP is <b>${otp}</b>.
                    <br/><br/>
                    .<br/><br/>
                    Have a pleasant day.<br/><br/>`
            

            /* 
            template:'./confirmation',
            context:{
                otp
            }
           */ 
        })
    }

    //forgot Password
    async sendRestPasswordEmail(advertiser:Advertiser,url){   
        await this.mailerService.sendMail({
            to:advertiser.email,
            subject:'Veryfy User',
          
             
            text: 'welcome', 
            html: `
                    Thank you for using socially!
                    <br/><br/>
                    Please verify your email by using the following link.
                    <br/><br/>
                      '${url}'
                    <br/><br/>
                    <br/><br/>
                    Have a pleasant day.<br/><br/>`


            /* 
            template:'./confirmation',
            context:{
                otp
            }
           */
        })
    }
}