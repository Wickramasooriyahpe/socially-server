import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { SrtipeController } from './stripe.controller';
import {StripeService } from './stripe.service';

@Module({
  imports: [MailModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
        // ...
      })
    }),
   // ...
  ],
  controllers: [SrtipeController],
  providers: [StripeService, MailService]
})
export class StripeModule {}