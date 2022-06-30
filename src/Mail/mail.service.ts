import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Advertiser } from 'src/advertiser/advertiser.entity';
import { Repository } from 'typeorm';
import { AdvertiserDto } from 'src/advertiser/dto/advertiserDto';
import CreatePaymentDto from 'src/Payments-stripe/createPayment.dto';

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
            subject:'Email Verification',
          
             
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


        })
    }

    //payment Success Email
    async sendPaymentEmail(paymentDTO: CreatePaymentDto,amount){
        await this.mailerService.sendMail({
            to:paymentDTO.token.email,
            subject:'Payment Acknoladgement',
          
             
            text: 'welcome', 
            html: `
                    Thank you for using socially!
                    <br/><br/>
                    Payment done successfully.
                    <br/><br/>
                      Your account is top up by LKR '${amount}'
                    <br/><br/>
                    <br/><br/>
                    Have a pleasant day.<br/><br/>`


        })
    }

}