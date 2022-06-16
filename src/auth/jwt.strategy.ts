import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtPayload, publisherJwtPayload } from './interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) { //payload is decoded jwt
        console.log(payload)
        if (payload.phoneNumber) {
            const publisher = await this.authService.validatePublisher(payload);
            if (!publisher) {
                throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
            }
            return { userId: publisher.publisherId }
        }
        const advertiser = await this.authService.validateAdvertiser(payload);
        if (!advertiser) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return { userId: advertiser.id } //emil
    }
}
