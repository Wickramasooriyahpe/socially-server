import { IsEmail, IsString } from 'class-validator';
import { AdvertiserCreateDto } from './advertiser-create.dto';

export class AdvertiserUpdateDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    role: string;

    @IsString()
    lname: string;

    @IsString()
    company: string

    @IsString()
    address:string;

    @IsString()
    phone:string;

}