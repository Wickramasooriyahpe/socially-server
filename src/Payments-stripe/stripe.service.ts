import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';
import { Advertiser } from 'src/advertiser/advertiser.entity';
import { MailService } from 'src/mail/mail.service';
import stripe from 'stripe';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import CreatePaymentDto from "./createPayment.dto";

@Injectable()
export class StripeService {
    private stripe: Stripe;
    private advertiserRepository : Repository<Advertiser>
    private mailService: MailService;
 
    constructor(private configService: ConfigService){
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
          apiVersion: '2020-08-27',
        });
      }

      //create stripe customer
      public async createCustomer(name: string, email: string) {
        return this.stripe.customers.create({
          name,
          email
        });
      }

      public async charge(amount:number,token: { id: any; email: any; }) {
          try {

            const paymentIntent = await this.stripe.charges.create(
              {
                amount: amount,
                currency: this.configService.get('STRIPE_CURRENCY'),
                source:token.id,
              receipt_email: token.email,
                description: `Account top up by LKR ${amount/100}`,
              }
            );

            //send Email
         // await this.mailService.sendPaymentEmail(token.email ,amount);
            
                if(paymentIntent){
                  return paymentIntent;
                }
            
          }
          catch (err){
            throw  err;
          }
      } 




       //making payments 
        // public async charge(amount:number,token: { id: any; email: any; }) {
        //   return this.stripe.charges.create(
        //     {
        //       amount: amount,
        //       currency: this.configService.get('STRIPE_CURRENCY'),
        //       source:token.id,
        //      receipt_email: token.email,
        //       description: `Account top up by LKR ${amount/100}`,
        //     }
        //   );
        // } 

      //save credit cards with setup intents
      public async attachCreditCard(paymentMethodId: string, customerId: string) {
        return this.stripe.setupIntents.create({
          customer: customerId,
          payment_method: paymentMethodId,
        })
      }

      //Listing saved credit cards
      public async listCreditCards(customerId: string) {
        return this.stripe.paymentMethods.list({
          customer: customerId,
          type: 'card',
        });
      }
}