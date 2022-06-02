import { Injectable } from '@nestjs/common';
var otpGenerator = require('otp-generator');

@Injectable()
export class OtpService {
     createOtp():string{
        const otp = otpGenerator.generate(6,{alphabets:false,upperCase:false,lowerCase:false,specialChars:false})
        console.log(otp)
        return '123';
    }
}
