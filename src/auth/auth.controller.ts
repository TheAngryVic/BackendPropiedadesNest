import {  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {


    constructor(private readonly authService: AuthService) {
  
  
    }
    @Post('/login')
    findUser(@Body() body: CreateUserDto) {
        let {Username, Password} = body
      return this.authService.signIn(Username, Password);
    }
    
 
  }