//import { async } from 'rxjs';
import { ChangePasswordStatus } from './../auth/interfaces/ChangePassword-Status';
import { AdvertiserPasswordChangeDto } from './dto/advertiserPasswordChange.dto';
//import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { HttpException, HttpStatus, Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertiser } from './entities/advertiser.entity';
import { AdvertiserCreateDto } from './dto/advertiser-create.dto';
import { AdvertiserUpdateDto } from './dto/AdvertiserUpdate.dto';
import { toAdvertiserDto } from './../shared/mapper';
import { AdvertiserLoginDto } from './dto/advertiserLogin.dto';
import { compare } from 'bcrypt';
import { AdvertiserDto } from './dto/advertiserDto';
import { comparePasswords } from './../shared/utils';
import { MailService } from 'src/mail/mail.service';
import { AdvertiserVerifyDto } from './dto/AdvertiserVerifyDto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdvertiserService {
    constructor(
        @InjectRepository(Advertiser) private advertiserRepository: Repository<Advertiser>, private mailService: MailService
    ) { }

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

    async findByLogin({ email, password }: AdvertiserLoginDto): Promise<AdvertiserDto> {
        const advertiser = await this.advertiserRepository.findOne({ where: { email } });

        if (!advertiser) {
            throw new HttpException('Advertiser Not Found', HttpStatus.UNAUTHORIZED);
        }

        //compare password
        const areEqual = await comparePasswords(advertiser.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
        }

        return toAdvertiserDto(advertiser)
    }

    async findByPayload({ email }: any): Promise<AdvertiserDto> {
        return await this.findOne({
            where: { email }
        });
    }




    //............................Advertiser register.................................. 

    //create Advertiser Temporary
    async createAdvertiser(advertiserDto: AdvertiserCreateDto): Promise<AdvertiserDto> {
        const { name, email, password } = advertiserDto;

        //Check if user already registered
        const searchAdvertiser = await this.advertiserRepository.findOne({ where: { email } });
        if (searchAdvertiser) {
            throw new HttpException('Advertiser already exists', HttpStatus.BAD_REQUEST);
        }

        //Genarate OTP
        const generatedOTP = (Math.floor(Math.random() * (9 * Math.pow(10, 3))) + Math.pow(10, 3));
        const advertiser: Advertiser = await this.advertiserRepository.create({ name, email, password, generatedOTP, otpSentTime: new Date(), isActive: false });

        //send Email
        await this.mailService.sendUserConfirmation(advertiser, generatedOTP);


        await this.advertiserRepository.save(advertiser);
        return toAdvertiserDto(advertiser);
    }

    async verifyOTP({ email, enteredOTP }: AdvertiserVerifyDto): Promise<AdvertiserDto> {
        // const{enteredOTP} =AdvertiserVerifyDto;
        const advertiser = await this.advertiserRepository.findOne({ where: { email } });

        const areEqual = advertiser.generatedOTP == enteredOTP;
        if (!areEqual) {
            throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
        }

        await this.advertiserRepository.update({ isActive: false }, { isActive: true });
        return toAdvertiserDto(advertiser);

    }
        
        //............................Advertiser register.................................. 

        //create Advertiser Temporary
        // async createAdvertiser(advertiserDto:AdvertiserCreateDto):Promise<AdvertiserDto>{
        //     const{name,email,password} =advertiserDto;

        //     //Check if user already registered
        //     const searchAdvertiser = await this.advertiserRepository.findOne({where: {email}});
        //     if(searchAdvertiser){
        //         throw new HttpException('Advertiser already exists', HttpStatus.BAD_REQUEST);
        //     }

        //     //Genarate OTP
        //     const generatedOTP=(Math.floor(Math.random() * (9 * Math.pow(10, 3))) + Math.pow(10, 3));
        //     const advertiser: Advertiser = await this.advertiserRepository.create({ name,email,password, generatedOTP, otpSentTime: new Date(), isActive: false});

        //     //send Email
        //     await this.mailService.sendUserConfirmation(advertiser, generatedOTP);

            
        //     await this.advertiserRepository.save(advertiser);
        //     return toAdvertiserDto(advertiser);  
        // }

        // async verifyOTP({email, enteredOTP}: AdvertiserVerifyDto):Promise<AdvertiserDto>{
        //    // const{enteredOTP} =AdvertiserVerifyDto;
        //     const advertiser = await this.advertiserRepository.findOne({where:  {email}});
            
        //     const areEqual = advertiser.generatedOTP == enteredOTP;
        //     if(!areEqual){
        //         throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
        //     }
        
        //         await this.advertiserRepository.update({isActive: false},{isActive: true});
        //     return toAdvertiserDto(advertiser); 
            
        // }

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
