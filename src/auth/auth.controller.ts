import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AdvertiserCreateDto } from 'src/advertiser/AdvertiserCreate.dto';
import { AdvertiserLoginDto } from 'src/advertiser/advertiserLogin.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/regisration-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')  
    public async register(@Body() advertiserCreateDto: AdvertiserCreateDto,  ): Promise<RegistrationStatus> 
    {    
    const result:RegistrationStatus = await this.authService.register(advertiserCreateDto,);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
    }
    return result;  
}

    @Post('login')  
    public async login(@Body() advertiserLoginDto: AdvertiserLoginDto): Promise<LoginStatus> {
    return await this.authService.login(advertiserLoginDto);  
}

}
