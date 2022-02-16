import { Request,UseInterceptors,UploadedFile, Bind,UploadedFiles, Res, StreamableFile,Body,Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { uploadService } from './media.service';
import { FileInterceptor,FilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Observable, of } from 'rxjs';
import { Creative } from 'src/creative/creative.entity';
export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };
  

@Controller('uploads')
export class uploadController {
    constructor(private readonly uploadService : uploadService){}

    

    

}