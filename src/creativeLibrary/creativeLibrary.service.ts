import { Body, Controller,Injectable, Delete, Get, HttpCode, NotFoundException, Param, Post, Put,UseInterceptors,UploadedFile, Bind,UploadedFiles, Res, } from '@nestjs/common';
//import { HttpException, HttpStatus, Injectable, Options, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreativeLibrary } from './creativeLibrary.entity';
import { creativeLibraryController } from './creativeLibrary.controller';



@Injectable()
export class creativeLibraryService {

    constructor(
        @InjectRepository(CreativeLibrary)
        private creativeLibraryRepository: Repository<CreativeLibrary>,

        ) { }

        public async setAvatar(userId: number, avatarUrl: string){
            this.creativeLibraryRepository.update(userId, {avatar: avatarUrl});
        }

        /*async getImageById(filename:String):Promise<any>{
            try{
                return this.creativeLibraryRepository.findOne({})
            }catch(err){
                throw err;
            }    
        }*/
       
        // async saveLocalFileData(fileData: LocalFileDto) {
        //     const newFile = await this.creativeLibraryRepository.create(fileData)
        //     await this.creativeLibraryRepository.save(newFile);
        //     return newFile;
        //   }
      
     

    
}
