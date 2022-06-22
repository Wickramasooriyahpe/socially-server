import { UseGuards, Request, UseInterceptors, UploadedFile, Bind, UploadedFiles, Res, StreamableFile, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { uploadService } from './media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdvertiserService } from 'src/advertiser/advertiser.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { avatar } from './profileImage.entity';
import { DeleteAvatarDTO } from './deleteAvatarDTO';


export const editFileName = (req, file, callback) => {
  // const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};//${name}-
//Image file filter
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(JPG|JPEG|jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('profileuploads')
export class uploadController {
  constructor(private readonly uploadService: uploadService, private AdvertiserService: AdvertiserService,) { }

  /*********************  upload profile Image *********************/
  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './avatar',
      filename: editFileName
    }),
    fileFilter: imageFileFilter,
  }))
  async uploadProfileImg(@UploadedFile() file, @Request() req, @Body() avatar: avatar) {
   
    const user = req.user.userId;
    console.log("User ID", user);
    console.log(file.path);
    avatar.adveID = user;
    avatar.filename = file.path;
 
    return this.uploadService.createavatar(user, avatar)
  }

  @Get('image/:filename')
  seeUploadedFile(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './avatar' });
  }

  @Get(':adveID')
 async seeUploadedFile2(@Param('adveID') adveID: number, @Res() res) {
    console.log("dffkgjdg");

    const file =await this.uploadService.getAvatarById(adveID);
    return res.status(200).send({ data: file });
  }
  @Delete(':adveID')
   @UseGuards(JwtAuthGuard)
     async deleteProfileImage(@Param('adveID' ) adveID:number , @Body() DeleteAvatarDTO:DeleteAvatarDTO)
     {
      console.log("delete Image API end point");
      DeleteAvatarDTO.adveID=adveID;
        return this.uploadService.deleteImage(adveID);
     }
}