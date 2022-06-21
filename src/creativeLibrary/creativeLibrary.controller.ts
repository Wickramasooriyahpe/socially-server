import { Request, Body, Controller, Delete, Get, Req, HttpCode, NotFoundException, Param, Post, Put, UseInterceptors, UploadedFile, Bind, UploadedFiles, Res, StreamableFile, Response, UseGuards } from '@nestjs/common';
import { creativeLibraryService } from './creativeLibrary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { updateCreativeLibraryDTO } from './updateCreativeLibraryDTO.dto';
import { AdvertiserService } from 'src/advertiser/advertiser.service';
import { request } from 'http';
import { CreativeLibrary } from './creativeLibrary.entity';


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
  constructor(private readonly creativeLibraryService: creativeLibraryService,
    private AdvertiserService: AdvertiserService,) { }

  //Upload a single image 
  @Post()
  // @UseGuards(JwtAuthGuard) 
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './file1',
      filename: editFileName
    }),
    fileFilter: imageFileFilter,

  }))

  async uploadFile(@UploadedFile() file) {

    const response = {
      // originalname: file.originalname,
      filename: file.filename,
      //filepath:file.path,

    };
    return response;

  }

  //Upload Multiple Images/Files
  @Post('multiple/:creID')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './files2',
        filename: editFileName,
      }),

    }),
  )

  async uploadMultipleFile(@UploadedFiles() files,@Param('creID') creID: number, @Request() req, @Body() creativeLibrary: CreativeLibrary) {
    const response = [];
  
    console.log(files);
    //console.log(files[0].path);
    //console.log(files[1].path);

    creativeLibrary.creID = creID;
    creativeLibrary.thumbnailImagePath = files[0].path;
    creativeLibrary.realImage = files[1].path;
 
    return this.creativeLibraryService.createCreativeLibrary(creativeLibrary)
  }

  @Get('image/:filename')
  seeUploadedFile(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './file1' });
  }
  // @Put(':creativeLibraryId') 
  // async updateCreativeLibrary (@Param('creativeLibraryId') creativeLibraryId:number,@Body() updateCreativeLibraryDTO:updateCreativeLibraryDTO){
  // updateCreativeLibraryDTO.creativeLibraryId =creativeLibraryId;
  // return this.creativeLibraryService.updateCreativeLibrary(updateCreativeLibraryDTO)
  // }
}

