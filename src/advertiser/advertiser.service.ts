import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertiser } from './advertiser.entity';
import { AdvertiserCreateDto } from './AdvertiserCreate.dto';
import { AdvertiserUpdateDto } from './AdvertiserUpdate.dto';
import { toAdvertiserDto } from './../shared/mapper';
import { AdvertiserLoginDto } from './advertiserLogin.dto';
import { compare } from 'bcrypt';
import { AdvertiserDto } from './advertiserDto';
import { comparePasswords } from './../shared/utils';

@Injectable()
export class AdvertiserService {
    constructor(
        @InjectRepository(Advertiser) private advertiserRepository : Repository<Advertiser>
        ){}

        // getAll():Promise<Advertiser[]>{
        //     return this.advertiserRepository.find(); // SELECT * FROM Advertiser
        // }

        // async getAdvertiserById(id:number):Promise<Advertiser>{
        //     try{
        //         const advertiser = await this.advertiserRepository.findOneOrFail(id);  // SELECT * FROM Advertiser WHERE Advertiser.id = id
                
        //         return advertiser; 
        //     }catch(err){
        //         throw err;
        //     }    
        // }

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

        async findOne(options?: object): Promise<AdvertiserDto>{
            const advertiser = await this.advertiserRepository.findOne(options);
            return toAdvertiserDto(advertiser)
        }

        async findByLogin({email,password}: AdvertiserLoginDto):Promise<AdvertiserDto>{
            const advertiser = await this.advertiserRepository.findOne({where:  {email}});

            if(!advertiser){
                throw new HttpException('Advertiser Not Found', HttpStatus.UNAUTHORIZED);
            }

            //compare password
            const areEqual = await comparePasswords(advertiser.password, password);
            
            if(!areEqual){
                throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
            }

            return toAdvertiserDto(advertiser)
        }

        async findByPayload({ email }: any): Promise<AdvertiserDto> {
            return await this.findOne({ 
                where:  { email } });  
        }

        async createAdvertiser(advertiserDto:AdvertiserCreateDto):Promise<AdvertiserDto>{
            const{name,email,password} =advertiserDto;

            //Check if user already registered
            const usrerInDB = await this.advertiserRepository.findOne({where: {email}});

            if(usrerInDB){
                throw new HttpException('Advertiser already exists', HttpStatus.BAD_REQUEST);
            }
            const advertiser: Advertiser = await this.advertiserRepository.create({ name, password, email, });
            await this.advertiserRepository.save(advertiser);
            return toAdvertiserDto(advertiser);  
        }
}

