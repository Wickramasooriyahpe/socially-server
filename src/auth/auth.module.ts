import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdvertiserModule } from 'src/advertiser/advertiser.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { PublisherModule } from './../Publisher/publisher.module';
import { OtpModule } from './../OTP/otp.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [  

AdvertiserModule, 
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: jwtConstants.secret, signOptions: {
                expiresIn: '1200s',
            },
        }), MailModule,
        PublisherModule,
        OtpModule
    ], 
    controllers: [AuthController],  
    providers: [AuthService, JwtStrategy],  
    exports: [
        PassportModule, 
        JwtModule,
        AuthService
    ],
})
export class AuthModule {}
