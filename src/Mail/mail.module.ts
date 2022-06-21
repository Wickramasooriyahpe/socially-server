import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        tls: { rejectUnauthorized: false },
        auth: {
          user: 'socially.team.epic@gmail.com',
          pass: 'sgvsfpzflbotlwvx',
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
export class MailModule { }
