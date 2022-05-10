import * as path from 'path';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path/posix';
import { MailerOptions } from '@nestjs-modules/mailer';

@Module({
  imports:[
    MailerModule.forRoot({
      transport: {
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        tls: { rejectUnauthorized: false },
        auth:{
          user: 'socially.team.epic@gmail.com',
          pass:'sgvsfpzflbotlwvx',
        },
      },
      defaults: {
        from: '"Socially" <hasinipunsara1997@gmail.com>',
      },
    /*
      template: {
        dir: join(__dirname + 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
*/
    }),
  ],
  
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
