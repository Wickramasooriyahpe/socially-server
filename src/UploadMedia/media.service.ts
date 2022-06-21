import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { avatar} from './profileImage.entity';
import { Advertiser } from 'src/Advertiser/advertiser.entity';

@Injectable()
export class uploadService {

    constructor(
        @InjectRepository(avatar)
        private uploadRepository: Repository<avatar>,
            
    ) { }

    async  createavatar(Advertiser:Advertiser,avatar: avatar): Promise<avatar> {  
        avatar.Advertiser = Advertiser;
        return await this.uploadRepository.save(avatar);
        }
    async getAvatarById(adveID:number):Promise<avatar>{
        try{
return this.uploadRepository.findOne({adveID: adveID})
        }catch{
     console.error();

        }
    } 
    async deleteImage(adveID: number){
        const deleteRecord = await this.uploadRepository.findOne(adveID);
        if(! deleteRecord){
          throw new NotFoundException('Image not found');
        }
        return this.uploadRepository.delete(deleteRecord);
      }

    //   async getAvatarByadveId(adveID:number):Promise<avatar>{
    //     try{
    //         return this.uploadRepository.findOne({adveID})
    //     }catch(err){
    //         throw err;
    //     }    
    // }

}