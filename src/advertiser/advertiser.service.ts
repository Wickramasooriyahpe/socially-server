//import { async } from 'rxjs';
import { ChangePasswordStatus } from './../auth/interfaces/ChangePassword-Status';
import { AdvertiserPasswordChangeDto } from './dto/advertiserPasswordChange.dto';
//import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { HttpException, HttpStatus, Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertiser } from './advertiser.entity';
import { AdvertiserCreateDto } from './dto/advertiser-create.dto';
import { AdvertiserUpdateDto } from './dto/AdvertiserUpdate.dto';
import { toAdvertiserDto } from './../shared/mapper';
import { AdvertiserLoginDto } from './dto/advertiserLogin.dto';
import { compare } from 'bcrypt';
import { AdvertiserDto } from './dto/advertiserDto';
import { comparePasswords } from './../shared/utils';
import { MailService } from 'src/mail/mail.service';
import { StripeService } from 'src/Payments-stripe/stripe.service';
import { AdvertiserVerifyDto } from './dto/AdvertiserVerifyDto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdvertiserService {
    constructor(
        @InjectRepository(Advertiser) 
        private advertiserRepository : Repository<Advertiser>, 
        private mailService: MailService,
        private stripeService: StripeService
        ){}

    // getAll():Promise<Advertiser[]>{
    //     return this.advertiserRepository.find(); // SELECT * FROM Advertiser
    // }

    async getAdvertiserById(id: number): Promise<Advertiser> {
        try {
            const advertiser = await this.advertiserRepository.findOneOrFail(id);  // SELECT * FROM Advertiser WHERE Advertiser.id = id

            return advertiser;
        } catch (err) {
            throw err;
        }
    }

    // async updateAdvertiser(advertiserUpdateDto:AdvertiserUpdateDto):Promise<Advertiser>{
    //     const{id,name} = advertiserUpdateDto;
    //     const advertiser = await this.getAdvertiserById(id)
    //     advertiser.name = name;
    //     return this.advertiserRepository.save(advertiser);//INSERT
    // }

    // async deleteAdvertiser(id:number):Promise<Advertiser>{
    //     const advertiser = await this.getAdvertiserById(id);

    //     return this.advertiserRepository.remove(advertiser);
    // }

    //............................Advertiser Login..................................

    async findOne(options?: object): Promise<AdvertiserDto> {
        const advertiser = await this.advertiserRepository.findOne(options);
        return toAdvertiserDto(advertiser)
    }



    async findByLogin({ email, password }: AdvertiserLoginDto): Promise<AdvertiserDto>{
        //async findByLogin({email,password}: AdvertiserLoginDto):Promise<AdvertiserDto>{
            try {
                const advertiser = await this.advertiserRepository.findOne({where:  {email}});

            if(!advertiser){
                throw new HttpException('Advertiser Not Found', HttpStatus.UNAUTHORIZED);
            } else{
                if(!(advertiser.isActive)){
                    throw new HttpException('Advertiser Not Verified yet. Get verified using OTP', HttpStatus.UNAUTHORIZED);
                } else{
                    //compare password
            const areEqual = await comparePasswords(advertiser.password, password);
            
            if(!areEqual){
                throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
            }

            return toAdvertiserDto(advertiser)
                }
            }
                }

                catch (err){
                    throw  err;
                }
        }



    async findByPayload({ email }: any): Promise<AdvertiserDto> {
        return await this.findOne({
            where: { email }
        });
    }


    
    //............................Advertiser register.................................. 

    //create Advertiser Temporary
    async createAdvertiser(advertiserDto:AdvertiserCreateDto):Promise<AdvertiserDto>{
        const{name,email,password} =advertiserDto;

        //creating stripe customer
        const stripeCustomer = await this.stripeService.createCustomer(advertiserDto.name, advertiserDto.email);

        //Check if user already registered
        const searchAdvertiser = await this.advertiserRepository.findOne({where: {email}});
        if(searchAdvertiser){
            throw new HttpException('Advertiser already exists', HttpStatus.BAD_REQUEST);
        }

        //Genarate OTP
        const generatedOTP=(Math.floor(Math.random() * (9 * Math.pow(10, 3))) + Math.pow(10, 3));

        const advertiser: Advertiser = await this.advertiserRepository.create({ 
            name,
            email,
            password,
            generatedOTP, 
            otpSentTime: new Date(), 
            isActive: false, 
            stripeCustomerId: stripeCustomer.id});

        //send Email
        await this.mailService.sendUserConfirmation(advertiser, generatedOTP);
        
        await this.advertiserRepository.save(advertiser);
        return toAdvertiserDto(advertiser);  
    }

   //verify Registration
   async verifyOTP({email, enteredOTP}: AdvertiserVerifyDto):Promise<any>{
    const advertiser = await this.advertiserRepository.findOne({where:  {email}});
    try{ 
        if (!email || !enteredOTP){
            throw new HttpException('Empty code not allowed', HttpStatus.UNAUTHORIZED);
        } else {
            
            if ((advertiser.isActive) == true ){
                throw new HttpException('Email has been already verified.', HttpStatus.UNAUTHORIZED);
            }
            else {
                const otpSentTime = (advertiser.otpSentTime);
                const currentDate = new Date();
                const expiredOTP = currentDate.getMinutes() - otpSentTime.getMinutes();

                //console.log(advertiser.otpSentTime);
                //console.log(expiredOTP);
                //console.log(currentDate);

                if(expiredOTP >  15 ){
                    await this.advertiserRepository.delete({email});
                    throw new HttpException('OTP has expired. Sign-up again', HttpStatus.UNAUTHORIZED);
                } else {
                    const areEqual = advertiser.generatedOTP == enteredOTP;
                    if(!areEqual ){
                        
                       // throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
                       throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
                    } else{
                        advertiser.isActive= true;
                        await this.advertiserRepository.save(advertiser);
                        //await this.advertiserVerifyRepository.delete({email});
                        return toAdvertiserDto(advertiser);
                    }
                }
            }
        }
    } 
    catch (err){
        throw  err;
    }
}
        //Resend OTP
        async resendOTPEmail({email}: AdvertiserCreateDto):Promise<any>{
            const advertiser = await this.advertiserRepository.findOne({where:  {email}});

            //send Email
            await this.mailService.sendUserConfirmation(advertiser, advertiser.generatedOTP);
            
            return toAdvertiserDto(advertiser);  
        }

        //Send Forgot Password Email
        async sendforgotPasswordEmail({email}: AdvertiserCreateDto):Promise<any>{
            const advertiser = await this.advertiserRepository.findOne({where:  {email}});
            const pwToken = Math.random().toString(20).substring(2,10);

        const url = `http://localhost:3001/forgotPassword/${pwToken}`;
            //send Email
            await this.mailService.sendRestPasswordEmail(advertiser ,url);
            
            return toAdvertiserDto(advertiser);  
        }

        //Reset Password 
        async saveResetPassword({email,password}: AdvertiserCreateDto):Promise<any>{
            const advertiser = await this.advertiserRepository.findOne({where:  {email}});
            
            advertiser.password= password;
            await this.advertiserRepository.save(advertiser);
            return toAdvertiserDto(advertiser);
        }


        

//  /*****************Profile Update*************** */
        async findAll(): Promise<AdvertiserDto[]> {
            return await this.advertiserRepository.find();
         }

         findOneadvertiser(id: number): Promise<AdvertiserUpdateDto>{
            return this.advertiserRepository.findOne(id);
        }

         async getAdvertiser(id:number):Promise<Advertiser>{
            try{
                return this.advertiserRepository.findOne(id)
            }catch(err){
                throw err;
            }    
        }

         
     
         create(profile: AdvertiserUpdateDto): Promise<AdvertiserUpdateDto>{
            return this.advertiserRepository.save(profile);
        }
    
        async update(id: number, profile: AdvertiserUpdateDto){
            await this.advertiserRepository.update(id, profile);
        }

  
        async updateData(id:number, advertiserUpdateDto: AdvertiserUpdateDto){
            const advertiser = await this.advertiserRepository.findOne({id: id});

            if(advertiser){
                await this.advertiserRepository.update(id, advertiserUpdateDto);
            } else{
                throw new HttpException(
                    {
                      status: HttpStatus.NOT_FOUND,
                      message: `There is no advertiser related to given id: ${id}`,
                    },
                    HttpStatus.NOT_FOUND,
                  );
            }
            
            
        }
        
        // async remove(id: number): Promise<void>{
        //     await this.advertiserRepository.delete(id);
        // }

       // /***Change Password */

        async changePassword(id: number, advertiserPasswordChangeDto : AdvertiserPasswordChangeDto){
            const Advertiser = await this.advertiserRepository.findOne({where: {id:id}});

            if(!Advertiser){
                throw new HttpException('Advertiser Not Found', HttpStatus.UNAUTHORIZED);
            } 
            const areEqualPassword = await comparePasswords(Advertiser.password, advertiserPasswordChangeDto.password);

            if(!areEqualPassword){
                throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
            }

            const newpassword = await bcrypt.hash(advertiserPasswordChangeDto.newpassword, 10);

            console.log(newpassword);

            await this.advertiserRepository.update(id, {password:newpassword});
         }



 }
