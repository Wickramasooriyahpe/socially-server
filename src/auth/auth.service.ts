import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { identity } from 'rxjs';
import { AdvertiserCreateDto } from 'src/advertiser/AdvertiserCreate.dto';
import { AdvertiserDto } from 'src/advertiser/advertiserDto';
import { AdvertiserLoginDto } from 'src/advertiser/advertiserLogin.dto';
import { AdvertiserService } from './../advertiser/advertiser.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/regisration-status.interface';

@Injectable()
export class AuthService {
    constructor(private readonly advertiserService : AdvertiserService, private readonly jwtService: JwtService) {}

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
    

}
