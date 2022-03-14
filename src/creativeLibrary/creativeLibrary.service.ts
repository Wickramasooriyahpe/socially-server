import { Body, Controller,Injectable, Delete, Get, HttpCode, NotFoundException, Param, Post, Put,UseInterceptors,UploadedFile, Bind,UploadedFiles, Res, } from '@nestjs/common';
//import { HttpException, HttpStatus, Injectable, Options, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreativeLibrary } from './creativeLibrary.entity';
import { creativeLibraryController } from './creativeLibrary.controller';
import { updateCreativeLibraryDTO } from './updateCreativeLibraryDTO';
import { AdvertiserService } from 'src/advertiser/advertiser.service';


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
       

}
        
     

    

