import {Request, Body, Controller, Delete, Get,Req, HttpCode, NotFoundException, Param, Post, Put,UseInterceptors,UploadedFile, Bind,UploadedFiles, Res, StreamableFile, Response } from '@nestjs/common';
import path from 'path/posix';
import { creativeLibraryService } from './creativeLibrary.service';
import { FileInterceptor,FilesInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { Campaign } from 'src/campaign/campaign.entity';
import { Creative } from 'src/creative/creative.entity';


@Controller('media')
export class creativeLibraryController {
    SERVER_URL:  string  =  "http://localhost:3000/";
    constructor(private readonly creativeLibraryService: creativeLibraryService) {}    

     
    @Post(':userid/avatar')
    @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: './avatars', 
          filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
        })
      }
    )
    )
    uploadAvatar(@Param('userid') userId, @UploadedFile() file) {
      this.creativeLibraryService.setAvatar(Number(userId), `${this.SERVER_URL}${file.path}`);
    }

    @Get('avatars/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
      res.sendFile(fileId, { root: 'avatars'});
    }
// export const editFileName = (req, file, callback) => {
//   const name = file.originalname.split('.')[0];
//   const fileExtName = extname(file.originalname);
//   const randomName = Array(4)
//     .fill(null)
//     .map(() => Math.round(Math.random() * 16).toString(16))
//     .join('');
//   callback(null, `${name}-${randomName}${fileExtName}`);
// };



// @Controller('UploadMedia')
// export class creativeLibraryController {
//     constructor(private readonly creativeLibraryService : creativeLibraryService){}
// //':id/campaignId/creativeId'
//     @Post()
//     @UseInterceptors(FileInterceptor('file', {
//       storage: diskStorage({
//         destination:'./file1',
//         filename: editFileName
//       }),

//     }))
   
//     async uploadFile( @Param('id') id:number,@Param(' creativeId') creativeId:number,@Param('campaignId') campaignId:number,@UploadedFile() file) {
//       const response = {
//         originalname: file.originalname,
//         filename: file.filename,
//       };
//      return response;
     
//     }


    
//     @Post('multiple')
//     @UseInterceptors(
//     FilesInterceptor('files', 20, {
//     storage: diskStorage({
//       destination: './files2',
//       filename: editFileName,
//     }),
  
//   }),
//   )
    
//     async uploadMultipleFile(@UploadedFiles() files) {
//       const response = [];
//       files.forEach(file => {
//         const fileReponse = {
//           originalname: file.originalname,
//           filename: file.filename,
//         };
//         response.push(fileReponse);
//       });
//       return response;
// }



 
  }

