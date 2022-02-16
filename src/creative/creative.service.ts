import { HttpException, HttpStatus, Injectable, NotFoundException, Options, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creative } from './creative.entity';
import { UpdateCreativeDTO } from './updateCreativeDTO.dto';
//import {CategoryNotFoundException} from './exceptions/categoryNotFound.exception';
//import{}

@Injectable()
export class creativeService {

    constructor(
        @InjectRepository(Creative)
        private creativeRepository: Repository<Creative>,
            
    ) { }

    //gett all creatives
    async  findAll(): Promise<Creative[]> {
        return await this.creativeRepository.find();
    }
   //get a creative by id
   /* async getCreativeById(creativeId:number):Promise<Creative>{
    try{
        return this.creativeRepository.findOne({creativeId})
    }catch(err){
        throw err;
    }    
    }*/
    async getCreativeById(creativeId: number): Promise<Creative> {
        const creative = await this.creativeRepository.findOne(
            creativeId, 
          {
           
            withDeleted: true 
          }
        );
        if (creative) {
          return creative;
        }
        //throw new CategoryNotFoundException(id);
      }

    //Create a creative
    async  createCreative(creativeCreation: Creative): Promise<Creative> {
        return await this.creativeRepository.save(creativeCreation);
    }
    
    //update a creative
    async UpdateCreative(updateCreativeDTO:UpdateCreativeDTO ): Promise<Creative>{
        const{creativeId,creativeHeading,creativeDescription,costPerSale,destinationURL,creativeType,deletedAt,}= updateCreativeDTO;
        const Creative = await this.getCreativeById(creativeId);
        Creative.creativeHeading = creativeHeading;
        Creative.creativeDescription = creativeDescription;
        Creative.costPerSale = costPerSale;
        Creative.destinationURL=destinationURL;
        Creative.creativeType = creativeType;
        Creative.deletedAt=deletedAt
        return this.creativeRepository.save(Creative);
    }
   

    /*async  deleteCreative(creativeId:number):Promise<Creative>{
             const creative = await this.getCreativeById(creativeId);
             return this.creativeRepository.remove(creative);


    }

    async deleteCategory(creativeId: number): Promise<void> {
        const deleteResponse = await this.creativeRepository.softDelete(creativeId);
        if (!deleteResponse.affected) {
           // throw new CategoryNotFoundException(id);
           console.log('deleted');
          }
        }*/

      async softDeleteCreative(creativeId: number){
        const deleteRecord = await this.creativeRepository.findOne(creativeId);
        if(! deleteRecord){
          throw new NotFoundException('not found creative');
        }
        return this.creativeRepository.softDelete(deleteRecord);
      } 
      }
