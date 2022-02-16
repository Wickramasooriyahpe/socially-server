import { HttpException, HttpStatus, Injectable, NotFoundException, Options, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uploadMdata } from './metaData.entity';


@Injectable()
export class uploadService {

    constructor(
        @InjectRepository(uploadMdata)
        private uploadRepository: Repository<uploadMdata>,
            
    ) { }

    
}