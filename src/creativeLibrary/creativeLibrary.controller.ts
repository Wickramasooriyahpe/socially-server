import {Request, Body, Controller, Delete, Get,Req, HttpCode, NotFoundException, Param, Post, Put,UseInterceptors,UploadedFile, Bind,UploadedFiles, Res, StreamableFile, Response, UseGuards } from '@nestjs/common';
import path from 'path/posix';
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

// @Controller('media')
// export class creativeLibraryController {
//     SERVER_URL:  string  =  "http://localhost:3000/";
//     constructor(private readonly creativeLibraryService: creativeLibraryService) {}    

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};



@Controller('UploadMedia')
@UseGuards(JwtAuthGuard) 
export class creativeLibraryController {
    constructor(private readonly creativeLibraryService : creativeLibraryService){}
    @Post()
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination:'./file1',
        filename: editFileName
      }),

    }))
    
    async uploadFile( @UploadedFile() file,@Request() req: Observable<object>) {
      
      const response = {
       // originalname: file.originalname,
        filename: file.filename,
        //filepath:file.path,
        
      };
     return response;
     
    }
   


    
    @Post('multiple')
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


@Put(':creativeLibraryId')
async updateCreativeLibrary(@Param('creativeLibraryIdcreativeLibraryId') creativeLibraryId:number,@Body() updateCreativeLibraryDTO:updateCreativeLibraryDTO){
  updateCreativeLibraryDTO.creativeLibraryId = creativeLibraryId;
  return this.creativeLibraryService.updateCreativeLibrary(updateCreativeLibraryDTO);
}
 
  }

