import { Injectable } from '@nestjs/common';
//import { HttpException, HttpStatus, Injectable, Options, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreativeLibrary } from './creativeLibrary.entity';

@Injectable()
export class creativeLibraryService {

    constructor(
        @InjectRepository(CreativeLibrary)
        private creativeLibraryRepository: Repository<CreativeLibrary>,
        
        ) { }

        async getCreativeLibraryById(creativeLibraryId: number): Promise<CreativeLibrary> {
            const creativeLibrary = await this.creativeLibraryRepository.findOne(
                creativeLibraryId, 
              {
               
                withDeleted: true 
              }
            );
            if (creativeLibrary) {
              return creativeLibrary;
            }
            //throw new CategoryNotFoundException(id);
          }

    // //upload image with id
    // async uploadImage(@Param('id') id: number, @UploadedFile() file) {
    //     const creativeLibrary = await this.getCreativeLibraryById(id);
    //     if (creativeLibrary) {
    //       creativeLibrary.image = file.filename;
    //       return await this.creativeLibraryRepository.save(creativeLibrary);
    //     }
    //     return null;
    //   }
    
      //create a creative library
      async createCreativeLibrary(creativeLibraryCreation: CreativeLibrary): Promise<CreativeLibrary> {
      return await this.creativeLibraryRepository.save(creativeLibraryCreation);
      }
      
      //update a creative library
      // async updateCreativeLibrary(updateCreativeLibraryDTO:updateCreativeLibraryDTO ): Promise<CreativeLibrary>{
      //     const{thumbnailImagePath}= updateCreativeLibraryDTO;
      //     const creativelib = await this.getCreativeLibraryById(creativeLibraryId);
      //     creativelib.thumbnailImagePath = thumbnailImagePath;
      //     return this.creativeLibraryRepository.save(creativeLibraryId)
      // }
    // async  createavatar(Campaign:Campaign,): Promise<avatar> {  
    //   avatar.Advertiser = Advertiser;
    //   return await this.creativeRepository.save(avatar);
    //   }

       

}





