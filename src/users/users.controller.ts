import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/files/helpers/fileFilter';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';




@Controller('users')
export class UsersController {

  

  constructor(private readonly usersService: UsersService) {
  
  
  }
  
  @Post('/krearUsrs')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  
  @Get('/vuskarUsrs/:term')
  findUser(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }




  


}
