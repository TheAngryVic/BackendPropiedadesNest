import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}


  @Post()
  @UseInterceptors( FileInterceptor('file'))
  uploadFile( 
    @UploadedFile() file : Express.Multer.File
    ){
      if (!file) {
        throw new BadRequestException("El archivo es obligatorio ")
      }

      return {
        status:200
      }
    }

}
