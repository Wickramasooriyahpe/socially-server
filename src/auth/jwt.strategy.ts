import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { AdvertiserDto } from './../advertiser/advertiserDto';
import { JwtPayload } from './interfaces/payload.interface';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });  
    }
    
    async validate(payload: JwtPayload): Promise<AdvertiserDto> {
        const advertiser = await this.authService.validateAdvertiser(payload);
        if (!advertiser) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return advertiser;  
    }
}