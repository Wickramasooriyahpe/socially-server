import {Request, Body, Controller, Delete, Get,Req, HttpCode, NotFoundException, Param, Post, Put,UseInterceptors,UploadedFile, Bind,UploadedFiles, Res, StreamableFile, Response, UseGuards } from '@nestjs/common';
import path, { join } from 'path/posix';
import { creativeLibraryService } from './creativeLibrary.service';
import { FileInterceptor,FilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { Campaign } from 'src/campaign/campaign.entity';
import { Creative } from 'src/creative/creative.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Observable } from 'rxjs';
import { updateCreativeLibraryDTO } from './updateCreativeLibraryDTO.dto';
import { AdvertiserService } from 'src/advertiser/advertiser.service';
import { request } from 'http';

//Genarate Uniqe File name
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
//Image file filter
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(JPG|JPEG|jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('UploadMedia')

export class creativeLibraryController {
    constructor(private readonly creativeLibraryService : creativeLibraryService,
      private AdvertiserService :AdvertiserService,){}
   
   
    @Post()
    @UseGuards(JwtAuthGuard) 
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination:'./file1',
        filename: editFileName
      }),
      fileFilter: imageFileFilter,

    }))
    
    async uploadFile( @UploadedFile() file,@Req() request:Advertiser) {
      
      const response = {
       // originalname: file.originalname,
        filename: file.filename,
        //filepath:file.path,
        
      };
     return response;
   
    }
   
    //Upload Multiple Images/Files
    @Post('multiple')
    @UseGuards(JwtAuthGuard) 
    @UseInterceptors(
    FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: './files2',
      filename: editFileName,
    }),
  
  }),
  )
    
    async uploadMultipleFile(@UploadedFiles() files) {
      const response = [];
      files.forEach(file => {
        const fileReponse = {
         // originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return response;
}

@Get('image/:filename')
seeUploadedFile(@Param('filename') image, @Res() res) { 
  return res.sendFile(image, { root: './file1' });
}

}

